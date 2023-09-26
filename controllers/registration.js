
module.exports = (req, res) => {
    res.render('registration', {
        nameError: '',
        emailError: '',
        usernameError: '',
        passwordError: '',
        password2Error: '',
        // usertypeError: '',
        registrationError: '' 
    });
}
