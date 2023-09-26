const users = require('../models/users');

module.exports = async (req, res) => {
    try {
        const loggedInUser = await users.findOne({ username: req.session.username });

        if (loggedInUser) {
            res.render('contactus', {
                name: loggedInUser.name,
                email: loggedInUser.email
            });
        } else {
            res.render('contactus');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user data.');
    }
};
