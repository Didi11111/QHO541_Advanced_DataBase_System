 document.addEventListener("DOMContentLoaded", function () {
     const registerForm = document.getElementById("registerForm");
     const passwordInput = document.getElementById("password");
     const password2Input = document.getElementById("password2");
     const submitError = document.getElementById("submit-error");

     registerForm.addEventListener("submit", function (event) {
       if (passwordInput.value !== password2Input.value) {
         event.preventDefault(); // Prevent the form from submitting
         submitError.textContent = "Passwords do not match";
       }
     });
  });

// document.addEventListener("DOMContentLoaded", function() {
//   const registerForm = document.getElementById("registerForm");
//   const passwordInput = document.getElementById("password");
//   const password2Input = document.getElementById("password2");
//   const submitError = document.getElementById("submit-error");

//   function clearAllErrors() {
//       document.querySelectorAll('.error').forEach(el => el.textContent = '');
//   }

//   registerForm.addEventListener("submit", function(event) {
//       event.preventDefault(); // Prevent the default form submission
//       clearAllErrors(); // Clear all previous errors

//       // Check if the passwords match
//       if (passwordInput.value !== password2Input.value) {
//           document.getElementById("password2Error").textContent = "Passwords do not match";
//           return; 
//       }

//       let formData = new FormData(event.target);

//       fetch('/user/registerForm/', {
//           method: 'POST',
//           body: formData
//       })
//       .then(response => {
//         if (!response.ok) {
//             throw new Error('Server responded with status: ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         // handle the JSON data here
//     })
//     .catch(err => {
//         if (err.message.startsWith('Unexpected token')) {
//             submitError.textContent = "An internal server error occurred. Please contact support.";
//         } else {
//             submitError.textContent = err.message || "An error occurred. Please try again.";
//         }
//     });
    
//   });
// });
