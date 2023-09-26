const users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { username, password } = req.body;

    users.findOne({ username: username }).then(function (person) {
        if (person) {
            // console.log('Found user in DB:', person.username);
            // console.log('Hashed password in DB:', person.password);
            // console.log('Attempted password:', password);
            
            bcrypt.compare(password, person.password, (error, same) => {
                if (error) {
                    console.error('Error during password comparison:', error);
                    res.status(500).send('Internal error during password comparison.');
                    return;
                }

                // console.log('Password comparison result:', same);

                if (same) {
                    req.session.userId = person._id;
                    req.session.userType = person.usertype;
                    req.session.username = person.username;
                    res.redirect('/');
                } else {
                    res.render('login', {
                        invalidUserError: null,
                        invalidPasswordError: 'Wrong password'
                    });
                }
            });
        } else {
            // console.log(`No user found for username: ${username}`);
            res.render('login', {
                invalidUserError: 'Invalid User',
                invalidPasswordError: null
            });
        }
    }).catch(error => {
        // console.error('Error in user login:', error);
        res.status(500).send('Internal Server Error');
    });
};

