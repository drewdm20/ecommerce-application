/**
 * Function to validate the register form
 * @returns {boolean}
 */
function validateRegisterForm() {
    if (document.registerForm.username.value.length < 5){
        alert("Username cannot be less than 5 characters.");
        return false;
    }
    if (document.registerForm.password.value.length < 8){
        alert("Password should be 8 characters");
        return false;
    }
    if (document.registerForm.confirmPassword.value !== document.registerForm.password.value) {
        alert("Passwords should match.");
        return false;
    }
    return true;
}
