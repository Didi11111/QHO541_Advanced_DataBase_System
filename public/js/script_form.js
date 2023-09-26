var messageError = document.getElementById('message-error')
var submitError = document.getElementById('submit-error')



function validateMessage(){
    var message = document.getElementById('message').value;
    var required = 30;
    var left = required - message.length;
    
    if(left > 0){
        messageError.innerHTML = left + ' more characters required';
        return false;
    }
  
    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}



function validateForm(){
    if(!validateMessage()){
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please compleat all fields';
        setTimeout(function(){submitError.style.display = 'none';}, 3000);
        return false;
        }

    }