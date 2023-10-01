 document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const emailError = document.querySelector(".error");
    const registerForm = document.getElementById("registerForm");
    const passwordInput = document.getElementById("password");
    const password2Input = document.getElementById("password2");
    const submitError = document.getElementById("submit-error");

    registerForm.addEventListener("submit", function (event) {
       if (passwordInput.value !== password2Input.value) {
         event.preventDefault(); // Prevent the form from submitting
         submitError.textContent = "Passwords do not match";
       }

    let timeout = null;
    emailInput.addEventListener('input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(async function () {
            try {
                const response = await fetch(`/user/check-email?email=${emailInput.value}`);
                const data = await response.json();
                  if (data.exists) {
                      emailError.textContent = 'Email already exists. Please choose a different email.';
                  } else {
                      emailError.textContent = ''; // clear the error
                  }
              } catch (error) {
                  console.error('Error checking email:', error);
              }
           }, 500); // Wait 500ms after the user stops typing to check
       });
  });