const contactus = require('../models/contactus');

module.exports = async (req, res) => {
    try {
        const newContact = await contactus.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Validation failed" });
    }
};
