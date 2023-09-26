const bcrypt = require('bcrypt');
const User = require('../models/users');
const Token = require('../models/token');

module.exports = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        // Verify that the newPassword matches the confirmPassword
        console.log("Password to hash:", newPassword);
        if (newPassword !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        // Trim any extra white spaces from the newPassword
        const cleanedPassword = newPassword.trim();

        // Generate a hashed version of the cleanedPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(cleanedPassword, salt);
        console.log("Hashed password:", hashedPassword);

        // Find the token in the database that matches the provided token and is not expired
        const resetToken = await Token.findOne({ token, expires: { $gt: Date.now() } });

        if (!resetToken) {
            // Check if the issue is due to an invalid token or an expired token
            if (!await Token.findOne({ token })) {
                console.log('Token not found in the database:', token);
                return res.status(400).send('Token is invalid.');
            } else {
                console.log('Token found but has expired:', token);
                return res.status(400).send('Token has expired.');
            }
        }

        // Fetch the user associated with the reset token
        const user = await User.findById(resetToken.user);
        if (!user) {
            console.log('No user associated with this token:', token);
            return res.status(400).send('No user associated with this token.');
        }
        
        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Verify that the hashedPassword works as expected for the cleanedPassword
        const isMatch = await bcrypt.compare(cleanedPassword, hashedPassword);
        console.log("Immediate compare result:", isMatch);

        // Delete the reset token from the database to prevent reuse
        await Token.deleteOne({ _id: resetToken._id });

        res.send('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Server error');
    }
};
