const users = require('../models/users');
const Token = require('../models/token'); // Ensure you adjust the path to your Token model
const crypto = require('crypto');

module.exports = (req, res) => {
    const email = req.body.email;

    // Find user by email
    users.findOne({ email: email })
        .then(user => {
            if (!user) {
                // User not found
                return res.render('forgotPassword', { emailSent: false, error: 'No user with this email address' });
            }

            // Generate a reset token 
            const resetTokenValue = crypto.randomBytes(32).toString('hex');

            // Create and save the token to the database
            const newToken = new Token({
                user: user._id, 
                token: resetTokenValue,
                expires: new Date(Date.now() + 3600000) // 1 hour from now
            });

            newToken.save()
                .then(() => {
                    // Log the reset link to the console 
                    console.log(`Password reset link: http://localhost:3000/reset-password/${resetTokenValue}`);

                    // Render the page with a success message
                    res.render('forgotPassword', { emailSent: true, error: null });
                })
                .catch(err => {
                    console.error("Error saving the token:", err);
                    res.render('forgotPassword', { emailSent: false, error: 'Internal Error' });
                });

        })
        .catch(err => {
            console.error(err);
            res.render('forgotPassword', { emailSent: false, error: 'Internal Error' });
        });
};

