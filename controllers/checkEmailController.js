const users = require('../models/users');

const checkEmailController = async (req, res) => {
    try {
        const user = await users.findOne({ email: req.query.email });
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = checkEmailController;