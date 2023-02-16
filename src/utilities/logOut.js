/**
 * Function to log a user out
 */
function logOut () {
    if (localStorage.getItem('user')){
        localStorage.removeItem('user');
    }
}
