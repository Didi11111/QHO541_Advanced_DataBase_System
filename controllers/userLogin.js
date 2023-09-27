// const users = require('../models/users');
// const bcrypt = require('bcrypt');

// module.exports = (req, res) => {
//     //const { username, password } = req.body;
//     const { username } = req.body;
//     const password = req.body.password.trim();


//     users.findOne({ username: username }).then(function (person) {
//         if (person) {
//             // console.log('Found user in DB:', person.username);
//             // console.log('Hashed password in DB:', person.password);
//             // console.log('Attempted password:', password);
//             console.log('Login attempt started for username:', username);
            
//             bcrypt.compare(password, person.password, (error, same) => {
//                 if (error) {
//                     console.error('Error during password comparison:', error);
//                     res.status(500).send('Internal error during password comparison.');
//                     return;
//                 }

//                 // console.log('Password comparison result:', same);

//                 if (same) {
//                     req.session.userId = person._id;
//                     req.session.userType = person.usertype;
//                     req.session.username = person.username;
//                     res.redirect('/');
//                 } else {
//                     res.render('login', {
//                         invalidUserError: null,
//                         invalidPasswordError: 'Wrong password'
//                     });
//                 }
//             });
//         } else {
//             // console.log(`No user found for username: ${username}`);
//             res.render('login', {
//                 invalidUserError: 'Invalid User',
//                 invalidPasswordError: null
//             });
//         }
//     }).catch(error => {
//         // console.error('Error in user login:', error);
//         res.status(500).send('Internal Server Error');
//     });
// };

const users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt started for username:', username);

    users.findOne({ username: username }).then(function (person) {
        if (person) {
            console.log('Comparing incoming password with hashed password from DB for user:', username);
            
            bcrypt.compare(password.trim(), person.password, (error, same) => {
                if (error) {
                    console.error('Error during password comparison:', error);
                    res.status(500).send('Internal error during password comparison.');
                    return;
                }

                console.log('Password comparison result for', username, ':', same);

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
            console.warn(`No user found for username: ${username}`);
            res.render('login', {
                invalidUserError: 'Invalid User',
                invalidPasswordError: null
            });
        }
    }).catch(error => {
        console.error('Error in user login:', error);
        res.status(500).send('Internal Server Error');
    });
};
