/**
 * Function to add item to cart
 * @param e
 */
function addToCart(e) {
    // Get elements from page
    const productParent  = $(e).closest('.product-parent');
    const itemId = $(e).closest('.product-parent').data('id');
    const productDescription  = $(productParent).find('.description').text();
    const priceElement = $(productParent).find('.price').text();
    const quantity = $(productParent).find('.product-quantity').val();
    // Cart item object
    const cartItem = {
        id:parseInt(itemId),
        productDescription: productDescription,
        price: priceElement,
        quantity: quantity
    };
    // Stringify object
    const cartItemJSON = JSON.stringify(cartItem);

    let cartArray = [];

    if (localStorage.getItem('shopping-cart')){
        cartArray = JSON.parse(localStorage.getItem('shopping-cart'));
    }
    // Add item to cart
    cartArray.push(cartItemJSON);

    // Store cart item in localStorage
    const cartJSON = JSON.stringify(cartArray);
    localStorage.setItem('shopping-cart', cartJSON);
    showCartCount();
}

/**
 * Function to empty the cart
 */
function emptyCart() {
    if (localStorage.getItem('shopping-cart')){
        localStorage.removeItem('shopping-cart');
        showCart();
        showCartCount();
    }
}

/**
 * Function to dynamically load and display the cart from localStorage
 */
function showCart() {
    const cartTable = document.getElementById('tableCartBody');
    cartTable.innerHTML = "";

    let itemCount = 0;
    let grandTotal = 0;
    let index = 0;
    let price = 0;
    let quantity = 0;
    let subTotal = 0;

    // If there is items in the cart iterate and dynamically display on table
    if (localStorage.getItem('shopping-cart')) {
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
        itemCount = shoppingCart.length;

        shoppingCart.forEach(function (item) {
            {
                const cartItem = JSON.parse(item);
                price = parseInt(cartItem.price);
                quantity = parseInt(cartItem.quantity);
                subTotal = price * quantity;

                cartTable.innerHTML += "<tr>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + cartItem.productDescription +"</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>R " + price + "</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + quantity + "</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>R " + subTotal + "</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + "<button id='"+cartItem.id+"' class='remove btn btn-primary'>"+ "<i class='bi bi-trash hover:cursor-pointer'>" + "</i>" +"</button>" + "</td>" +
                    "</tr>";
                grandTotal += subTotal;
                index++;
            }
        });
    }
    document.getElementById('itemCount').textContent = itemCount.toString();
    document.getElementById('totalAmount').textContent = "R " + grandTotal;
}

/**
 * Function to go to the checkout page
 */
function checkOut() {
    // If the user is logged in, go to the summary page else go to the login page
    if (localStorage.getItem('user')){
        window.location.href = '../orders/orderSummary.html'
    } else {
        alert('You need to login or register first');
        window.location.href = '../account/login.html';
    }
}

/**
 * Function to show the number of items in the cart
 */
function showCartCount(){
    if(localStorage.getItem('shopping-cart')){
        let cart = JSON.parse(localStorage.getItem('shopping-cart'));
        document.getElementById('cartCount').textContent = cart.length;
    }
}

/**
 * Function to remove an item from the cart by its index
 */
$("#tableCartBody").on('click','.remove', function (e) {
    const target = $(e.target);
    const id = $(target).attr('id');
    let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
    const index = shoppingCart.findIndex(item => item.id === id);
    if (index > -1){
        shoppingCart.splice(index,1);
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
        showCart();
        showCartCount();
    }
})

