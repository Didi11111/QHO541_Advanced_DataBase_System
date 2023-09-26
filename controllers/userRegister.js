const users = require('../models/users');
const { validationResult } = require('express-validator');

// console.log("Inside userRegisterController");
module.exports = async (req, res) => {
    // console.log("Endpoint /user/registerForm/ hit");
    const errors = validationResult(req);
    let errorsObj = {
      nameError: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
      password2Error: '',
      // usertypeError: '', 
      registrationError: '' 
  }; // Initialize the registrationError variable

  
    if (!errors.isEmpty()) {
      errors.array().forEach(error => {
          errorsObj[`${error.param}Error`] = error.msg;
      });
  
      // return res.render('registration', errorsObj);
      return res.render('registration', {...errorsObj, registrationError: '' });

  }

        try {
            // Create a new user in the database
            // console.log("Attempting to save user:", req.body);
            await users.create({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                usertype: req.body.usertype,
            });
            res.redirect('/login');
        
        } catch (error) {
            // console.error("Error during user registration:", error);
        
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                return res.render('registration', {...errorsObj, registrationError: 'Email already exists. Please choose a different email.' });
            }
        
            // Handle other errors
            return res.render('registration', {...errorsObj, registrationError: `An error occurred: ${error.message}`});
        }
        
};


