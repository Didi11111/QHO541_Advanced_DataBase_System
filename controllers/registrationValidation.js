const { body, validationResult } = require('express-validator');

const registrationValidationRules = [
    // Validate name
    body('name').notEmpty().withMessage('Name is required'),
  
    // Validate email
    body('email').isEmail().withMessage('Invalid email address'),
  
    // Validate password
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/\d/).withMessage('Password must contain at least one number'),
  
    // Validate username
    body('username').isAlphanumeric().withMessage('Username must be alphanumeric'),

    //check if both passwords match
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
  
    // Validate usertype
    //body('usertype').notEmpty().withMessage('Usertype is required'),
  
  ];

//   const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//}

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorsObj = {
            nameError: '',
            emailError: '',
            usernameError: '',
            passwordError: '',
            password2Error: '',
            // usertypeError: '', 
            registrationError: '' 
        };

        errors.array().forEach(error => {
            errorsObj[`${error.param}Error`] = error.msg;
        });

        return res.render('registration', errorsObj);
    }
    next();
}


module.exports = [...registrationValidationRules, handleValidationErrors];


//// is never used
