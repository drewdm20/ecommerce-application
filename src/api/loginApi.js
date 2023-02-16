/**
 * Function to invoke Login WebAPI
 * @returns {Promise<void>}
 */
async function login() {
    // API URL
    const URL = 'https://localhost:44328/api/Users/Login';
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const admin = document.getElementById('admin');
    let checked = false;
    // Check the value of the admin checkbox
    if (admin.checked){
        checked = true;
    }
    const errorMessage = document.getElementById('error-message');
    // API payload
    const payload = {
        "username":username,
        "password":password,
        "admin":checked.toString()
    };
    // Request options
    const requestOptions = {
        method:'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    try {
        // Fetch API and display response. Redirect to home if user's cart is empty or to the cart if it contains items
        const response = await fetch(URL, requestOptions);
        const data = await response.json();
        if (!response.ok){
            console.log(data);
            errorMessage.className = 'text-danger';
            errorMessage.textContent = data;
            setTimeout(() => errorMessage.textContent = "", 5000);
        } else {
            console.log(data);
            localStorage.setItem('user', JSON.stringify(username));
            errorMessage.className = 'text-success';
            errorMessage.textContent = data;
            setTimeout(() => errorMessage.textContent = "", 5000);
            if (checked === true){
                window.location.href = '../admin/adminHome.html';
            } else {
                if (localStorage.getItem('shopping-cart')){
                    window.location.href = '../cart/cart.html'
                } else {
                    window.location.href = '../index.html';
                }
            }
        }
    } catch (error){
        console.error(error);
    }
}
