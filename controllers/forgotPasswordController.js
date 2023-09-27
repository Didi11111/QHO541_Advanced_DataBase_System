const users = require('../models/users');
const Token = require('../models/token'); 
const crypto = require('crypto');

module.exports = (req, res) => {
    const email = req.body.email;

    let resetTokenValue; // Define it here

    // Find user by email
    users.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.render('forgotPassword', { emailSent: false, error: 'No user with this email address' });
            }

            resetTokenValue = crypto.randomBytes(32).toString('hex'); // Assign value here

            const newToken = new Token({
                user: user._id, 
                token: resetTokenValue,
                expires: new Date(Date.now() + 3600000)  // 1 hour from now
            });

            return newToken.save();
        })
        .then(() => {
            console.log(`Password reset link: http://localhost:3000/reset-password/${resetTokenValue}`);
            res.render('forgotPassword', { emailSent: true, error: null });
        })
        .catch(err => {
            console.error("Error:", err);
            res.render('forgotPassword', { emailSent: false, error: 'Internal Error' });
        });
};
