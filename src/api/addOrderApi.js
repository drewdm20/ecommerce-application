/**
 * Function to call the addOrderApi
 * @returns {Promise<void>}
 */
async function confirmOrder() {
    // API URL
    let URL = "https://localhost:44328/api/Order/AddOrder";
    // Get the user associated with the user
    let user = JSON.parse(localStorage.getItem('user'));
    let itemsArray = [];
    let description = "";
    let price = 0;
    let quantity = 0;
    let subTotal = 0;
    let vat = 0;
    let shippingCost = 200;
    let grandTotal = 0;
    // If there is items in the shopping cart extract individual elements and add to payload
    if(localStorage.getItem('shopping-cart')){
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
        shoppingCart.forEach(function (item) {
            const cartItem = JSON.parse(item);
            description = cartItem.productDescription;
            price = parseInt(cartItem.price);
            quantity = parseInt(cartItem.quantity);
            subTotal = price * quantity;
            vat = subTotal * 0.15;
            grandTotal += subTotal + vat + shippingCost;
            // Create items object and add to array
            let orderItems = {
                description:description,
                price:price,
                quantity:quantity,
                subTotal:subTotal,
            };
            itemsArray.push(orderItems);
        });
        // Payload
        let payload = {
            user:user,
            orderItems:itemsArray,
            amount:grandTotal
        }
        console.log(payload);
        // API Request options
        const requestOptions = {
            method:'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        try {
            // Call API and return response
            const response = await fetch(URL, requestOptions);
            const data = response.json();
            if (!response.ok){
                console.log(data);
            } else {
                console.log(data);
                alert('Thank you your order is being processed!');
                localStorage.removeItem('shopping-cart');
                showOrderSummary();
                showCartCount();
            }
        } catch (error){
            console.error(error);
        }
    }

}
