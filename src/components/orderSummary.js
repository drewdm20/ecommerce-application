/**
 * Function to dynamically load and display the order summary
 */
function showOrderSummary() {
    const cartTable = document.getElementById('orderSummaryBody');
    cartTable.innerHTML = "";

    let itemCount = 0;
    let grandTotal = 0;
    let vat = 0;
    let shippingCost = 200;
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
                    "</tr>";
                vat = subTotal * 0.15;
                grandTotal += subTotal + vat + shippingCost;
            }
        });
    }
    document.getElementById('itemCount').textContent = itemCount.toString();
    document.getElementById('totalAmount').textContent = "R " + grandTotal;
}


