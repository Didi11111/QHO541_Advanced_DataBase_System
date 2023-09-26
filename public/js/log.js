var emailError = document.getElementById('email-error')
var passwordError = document.getElementById('password-error')
var submitError = document.getElementById('submit-error')

function validateEmail(){
    var email = document.getElementById('contact-email').value;
    if(email.length == 0){
        emailError.innerHTML = 'Email is required'
        return false;  
    }
    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        emailError.innerHTML = 'Email Invalid'
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;

}



function validatePassword(){
    var password = document.getElementById('password').value;
    if(password.length == 0){
        passwordError.innerHTML = 'Password is required'
        return false;  
    }
    if(!password.match(/[a-z]/g) && password.match(
        /[A-Z]/g) && str.match(
        /[0-9]/g) && str.match(
        /[^a-zA-Z\d]/g) && str.length >= 8){
         emailError.innerHTML = 'Pasword Invalid'
         return false;
    }
    // passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;

}


function validateForm(){
    if(!validateEmail() ||!validatePassword()){
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please compleat all fields';
        setTimeout(function(){submitError.style.display = 'none';}, 3000);
        return false;
        }

    }