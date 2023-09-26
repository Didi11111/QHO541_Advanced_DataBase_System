module.exports = (req, res) => {
    res.render('login', {
        invalidUserError: null,
        invalidPasswordError: null
    })
}