module.exports = (req, res) => {
    res.render('forgotPassword', {
        emailSent: false,
        error: null
    });
}