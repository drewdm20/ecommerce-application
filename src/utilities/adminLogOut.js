/**
 * Function to log an admin out
 */
function adminLogOut () {
    if (localStorage.getItem('user')){
        localStorage.removeItem('user');
        window.location.href = '../index.html';
    }
}
