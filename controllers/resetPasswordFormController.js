module.exports = (req, res) => {
    console.log('Inside resetPasswordFormController');
    const token = req.params.token;
    res.render('resetPasswordForm', { token: token });
};
