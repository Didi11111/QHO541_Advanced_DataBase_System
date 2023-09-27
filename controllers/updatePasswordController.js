const User = require('../models/users');  
const Token = require('../models/token');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        // Verify that the newPassword matches the confirmPassword
        if (newPassword !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        const cleanedPassword = newPassword.trim();

        // Generate a hashed version of the cleanedPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(cleanedPassword, salt);

        // Find the token in the database
        const resetToken = await Token.findOne({ token, expires: { $gt: Date.now() } });

        if (!resetToken) {
            if (!await Token.findOne({ token })) {
                return res.status(400).send('Token is invalid.');
            } else {
                return res.status(400).send('Token has expired.');
            }
        }

        // Fetch the user associated with the reset token
        const user = await User.findById(resetToken.user);
        if (!user) {
            return res.status(400).send('No user associated with this token.');
        }
        
        user.password = hashedPassword;
        await user.save();

        //const isMatch = await bcrypt.compare(cleanedPassword, hashedPassword);

        await Token.deleteOne({ _id: resetToken._id });

        res.send('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Server error');
    }
};
