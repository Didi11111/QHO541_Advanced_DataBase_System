const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();



// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set up sessions
app.use(session({
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to false if not using HTTPS
}));


//ssession middleware
app.use((req, res, next) => {
    req.loggedIn = Boolean(req.session.userId);
    req.userType = req.session.userType;
    req.user = {
        username: req.session.username,
        id: req.session.userId,
        type: req.session.userType
    };
    next();
});



//middlewares/authentication
function ensureLoggedIn(req, res, next) {
    if (req.loggedIn) {
        return next();
    } else {
        res.redirect('/login');  // Redirect to the login page if not logged in
    }
}


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set the 'views' directory for rendering views using EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/movies', { useNewUrlParser: true });
// mongoose.connect('mongodb://127.0.0.1/movies', { useNewUrlParser: true, useUnifiedTopology: true });



// // Set up event listeners
// mongoose.connection.on('connected', function() {
//     console.log('Mongoose successfully connected to MongoDB.');
// });

// mongoose.connection.on('error', function(err) {
//     console.error('Mongoose encountered an error:', err);
// });

// mongoose.connection.on('disconnected', function() {
//     console.log('Mongoose has been disconnected from MongoDB.');
// });

// mongoose.connection.on('reconnected', function() {
//     console.log('Mongoose reconnected to MongoDB.');
// });


// Import controllers


const homeController = require('./controllers/home');
const allmoviesController = require('./controllers/allmovies');
const movieController = require('./controllers/movie_detail');
const addCommentController = require('./controllers/addComment');
const showCommentController = require('./controllers/showComment');
const contactusController = require('./controllers/contactus');
const savecontactController = require('./controllers/savecontact')
const loginController = require('./controllers/login');
const registrationController = require('./controllers/registration');
const userRegisterController = require('./controllers/userRegister');
//const registrationValidationRules = require('./controllers/registrationValidation'); never used
const userLoginController = require('./controllers/userLogin');
const logoutController = require('./controllers/logout');
const commentController = require('./controllers/commentController');
const passwordController = require('./controllers/password');
const forgotPasswordController = require('./controllers/forgotPasswordController');
const resetPasswordFormController = require('./controllers/resetPasswordFormController');
const updatePasswordController = require('./controllers/updatePasswordController');



// Routes
app.get('/', homeController);
app.get('/allmovies', allmoviesController);
app.get('/movie/detail/:movieId', movieController);
app.post('/add/Comment/:movieId', addCommentController);
app.get('/showComment', showCommentController);
app.get('/contactus', contactusController);
app.post('/savecontact', savecontactController);
app.get('/login', loginController);
app.get('/registration', registrationController);
// app.post('/user/registerForm/', registrationValidationRules, userRegisterController);
app.post('/user/registerForm/', userRegisterController);
app.post('/user/login/', userLoginController);
app.post('/logout', logoutController);
app.delete('/comment/:id', ensureLoggedIn, commentController.deleteComment);
app.get('/forgotPassword', passwordController);
//console.log(typeof forgotPasswordController);
app.post('/forgotPassword', forgotPasswordController);
app.get('/reset-password/:token', resetPasswordFormController);
app.post('/update-password', updatePasswordController);


//global error handler 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start the server
app.listen(3000, () => {
    console.log("Server started");
});
