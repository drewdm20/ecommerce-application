/**
 * Function to invoke POST WebAPI to register new user
 * @returns {Promise<void>}
 */
async function addUser() {
    // API URL
    const URL = 'https://localhost:44328/api/Users/AddUser';
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    // Payload
    const payload = {
        'fullName':fullName,
        'email':email,
        'username':username,
        'password':password
    };
    // API Request options
    const requestOptions = {
        method:'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    };

    try {
        // Call API and display response to user
        const response = await fetch(URL, requestOptions);
        const data = await response.json();
        if (!response.ok){
            console.log(data);
            message.className = 'text-danger';
            message.textContent = data;
            setTimeout(() => message.textContent = '', 2000);
        } else {
            console.log(data);
            message.className = 'text-success'
            message.textContent = data;
            setTimeout(() => message.textContent = '', 2000);
            window.location.href = '../account/login.html';
        }
    } catch (error){
        console.error(error);
    }
}
