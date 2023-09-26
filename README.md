# QHO541 Advanced DataBase System

## Node JS project

This project is a Node.js web application designed around movie-related functionalities, developed using the Express.js framework. The movie database has been downloaded from www.kaggle.com. 

## Starting the project

### 1. Setting up Node.js:

To work with Node.js, first, installe Node.js

Install Dependencies:

```bash
npm install
```
### 2. Run Server
The `npm start` command to run the server, is typically configured in the `package.json` file under the `scripts` property.

There is no need for a specific library to use `npm start`, but it needs to be set up in the `package.json` to define what "start" means for the application.

Example:

```json
{
  "name": "qho541_project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    ...
  }
}
```

In this case, when you run `npm start`, it's equivalent to running `node index.js`.

However, many developers use the package `nodemon` in development because it automatically restarts the server whenever you save a file. This can be especially helpful during the development phase to see changes in real-time without manually restarting the server each time.

To set up `nodemon`:

1. Install it as a development dependency:

```bash
npm install nodemon 
```

2. Adjust the `package.json`:

```json
{
  ...
  "scripts": {
    "start": "nodemon index.js"
  },
  ...
}
```

Now, when is run `npm start`, `nodemon` will start the application and watch for changes, restarting the server when changes are detected.

### 2. Installing Libraries:

#### Express:

Express is a minimal and flexible Node.js web application framework.

```bash
npm install express
```

#### Mongoose:

Mongoose provides MongoDB object modeling for Node.js.

```bash
npm install mongoose
```

#### bcrypt:

bcrypt is a library for hashing passwords.

```bash
npm install bcrypt
```

#### EJS:

EJS is a simple templating engine for generating HTML with JavaScript.

```bash
npm install ejs
```

### 3. Setting up Express:

To set up an Express server:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
```

### 4. Connecting to MongoDB with Mongoose:

Once you've installed Mongoose, you can connect to a MongoDB instance:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

### 5. Defining Models with Mongoose:

Mongoose models provide an interface to the MongoDB collection. For example:

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    // schema definition here...
});

const movies = mongoose.model('movies', moviesSchema, 'movies');
module.exports = movies;
```

1. **Framework & Language**: 
The backbone of this application is the **Express.js** framework, a standard choice for building web applications in Node.js. 
```javascript
const express = require('express');
const app = express();
```

2. **Database Integration**: 
The application interfaces with **MongoDB** using the `mongoose` library, storing movie details, user data, and more.
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/movies', { useNewUrlParser: true });
```

3. **User Management**: 
User authentication is an essential part of the app, and it handles both registration and login functionalities. Password management features, including resetting forgotten passwords, are also present.
```javascript
app.get('/login', loginController);
app.get('/registration', registrationController);
app.post('/user/registerForm/', userRegisterController);
app.post('/user/login/', userLoginController);
```

4. **Session Management**: 
`express-session` is utilized for session handling, making user interactions persistent across requests.
```javascript
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
```

5. **Views & Frontend**: 
The **EJS** templating engine allows for server-side rendering of dynamic content. Static assets are served from the `public` directory.
```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
```

6. **Middleware**: 
The application uses various middleware functions, like `body-parser` for request handling and custom middleware to check user login status.
```javascript
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    req.loggedIn = Boolean(req.session.userId);
    // ... more logic ...
    next();
});
```

7. **Routing & Controllers**: 
Distinct controllers manage each route's logic, from home pages to movie details and user operations.
```javascript
app.get('/', homeController);
app.get('/allmovies', allmoviesController);
// ... other routes ...
```

8. **Error Handling**: 
A global error handler ensures any unforeseen issues are handled gracefully.
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

### Ejs Templates 

1. **MovieHunter Page**:
    - Homepage is a website about movies.
    - Lists top-rated movies, newest movies, and big budget movies.
    - Uses EJS (Embedded JavaScript) to dynamically generate movie listings based on a list of movies (`movies` array).
    - Each movie has an image and IMDb score displayed.

2. **Login Page**:
    - A user login form.
    - Users can input their username and password.
    - Displays errors related to invalid username or password.
    - Links for password recovery and user registration are provided.
    - Uses EJS to display error messages conditionally.

3. **Registration Page**:
    - A user registration form.
    - Fields: name, email, username, password, confirm password, and user type (user or admin).
    - Displays various error messages conditionally using EJS (for example, if the passwords do not match).
    - Uses JavaScript for form validation (`reg.js`).

4. **Movie Details Page**:
    - Detailed view of a single movie.
    - Displays movie attributes like title, year, genre, country, language, director, actors, duration, and budget.
    - Allows users to post comments about the movie.
    - Lists all comments for the movie with a delete option.
    - Uses EJS to display movie details and comments dynamically.

5. **Contact Form Page**:
    - Allows users to send a message using a form.
    - Fields include: name, email, subject, and message.
    - The form action is set to `/savecontact`, suggesting that contact messages will be saved to a backend.
    - Styling provided by the linked stylesheet (`/css/new_style.css`).

General Observations:
- **EJS**: All these templates use EJS, a templating language that allows you to generate HTML with JavaScript. The `<% %>`, `<%= %>`, and `<%- %>` syntax is specific to EJS. `<%= %>` outputs the value into the template (escaped), `<%- %>` outputs the unescaped value, and `<% %>` is used for logic without output.
  
- **Styling & JS**: Each template has its own styles and JavaScript associated, linked at the top inside the `<head>` tag.
  
- **Includes**: There are various `include` statements (e.g., `<%- include('layouts/header'); -%>`) that are used to incorporate common elements, like headers and footers, into the pages.

---

**User Registration Process**:

1. **Schema Definition**:
   
   The user data model is designed using Mongoose's `Schema`. The user has attributes like `name`, `email`, `username`, `password`, and `usertype`.
   ```javascript
   const usersSchema = new Schema({
       name: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       username: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       usertype: { type: String }
   });
   ```

2. **Password Hashing**:
   
   Before saving a user to the database, the plain text password gets encrypted using `bcrypt`. This ensures security as encrypted passwords are stored in the database, not plain text.
   ```javascript
   usersSchema.pre('save', function(next){
       const user = this;
       bcrypt.hash(user.password, 10, (error, hash) => {
           user.password = hash;
           next();
       });
   });
   ```

3. **Registration Endpoint**:
   
   On user registration, if there are no validation errors, a new user is created in the database with hashed passwords.
   ```javascript
   module.exports = async (req, res) => {
       // ... validation code here ...

       try {
           await users.create({
               name: req.body.name,
               email: req.body.email,
               username: req.body.username,
               password: req.body.password,
               usertype: req.body.usertype,
           });
           res.redirect('/login');
       } catch (error) {
           // ... error handling code here ...
       }
   };
   ```

---

**User Login Process**:

1. **Login Endpoint**:

   When a user tries to log in, the system fetches the user's hashed password from the database based on the given `username` and compares it with the entered password after encrypting it.
   ```javascript
   module.exports = (req, res) => {
       const { username, password } = req.body;

       users.findOne({ username: username }).then(function (person) {
           if (person) {
               bcrypt.compare(password, person.password, (error, same) => {
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
               res.render('login', {
                   invalidUserError: 'Invalid User',
                   invalidPasswordError: null
               });
           }
       }).catch(error => {
           // ... error handling code here ...
       });
   };
   ```

---

**Session Management**:

- Logging out involves destroying the user's session and clearing associated cookies. This ensures the user has to log in again to establish a new session.
  ```javascript
  module.exports = (req, res) => {
      req.session.destroy((err) => {
          res.clearCookie('connect.sid'); 
          res.redirect('/login');
      });
  };
  ```

---

**Password Reset Process**:

- When a user forgets a password and opts for resetting it, a reset token is used to verify the legitimacy of the request. The new password, after verification, replaces the old hashed password in the database.
  ```javascript
  module.exports = async (req, res) => {
      const { token, newPassword, confirmPassword } = req.body;

      // ... password validation and hashing code ...

      const resetToken = await Token.findOne({ token, expires: { $gt: Date.now() } });

      if (resetToken) {
          const user = await User.findById(resetToken.user);
          user.password = hashedPassword;
          await user.save();
          await Token.deleteOne({ _id: resetToken._id });
          res.send('Password updated successfully');
      }
      // ... more code and error handling ...
  };
  ```

---
**CRUD OPERATIONS**:

 1. **Movie Schema and Model**
```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
...
const movies = mongoose.model('movies', moviesSchema, 'movies');
module.exports = movies;
```
- **Description**: 
  - A Mongoose model for movies is defined using the `moviesSchema` which describes the structure for movies in the MongoDB database.
  - This model corresponds to the `movies` collection in the MongoDB database.
  - The model is exported so it can be used in other parts of the application.

---

2. **Creating a Comment for a Movie**
```javascript
const mongoose = require("mongoose");
const comments = require('../models/comments');
const movies = require('../models/movies');
...
res.redirect(`/movie/detail/${movieId}`);
```
- **Description**: 
  - This function allows users to create and save a new comment associated with a movie.
  - It first checks if the provided `movieId` is valid and then converts it into a Mongoose ObjectId.
  - A new comment is created with details provided in the request body.
  - The comment is then saved to the MongoDB database.
  - Upon successful save, the user is redirected to the movie's detail page.

---

3. **Deleting a Comment**
```javascript
const mongoose = require('mongoose');
const Comment = require('../models/comments');
...
res.status(200).send({ message: 'Comment deleted successfully' });
```
- **Description**: 
  - This function facilitates the deletion of a comment given its ID.
  - The function first retrieves the comment from the database.
  - There is an authorization check to ensure the logged-in user is the author of the comment.
  - If the check passes, the comment is deleted from the database.

---

4. **Displaying Comments for a Movie**
```javascript
const Comments = require('../models/comments'); 
...
res.render('commentsPage', { comments: movieComments });
```
- **Description**: 
  - This function fetches and displays all comments associated with a specific movie.
  - Given the `movieId`, the function retrieves all comments linked to that movie.
  - The comments are then rendered in a view named `commentsPage`.

---

This part specifically pertains to the **Update** operation in CRUD:
The code is from updating password it has been discribed above.
```javascript
const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
User.updateOne({ _id: user._id }, { password: hashedPassword }, (err, result) => {
    ...
});
```

This portion completes the CRUD operations:

- **Create**: Adding new comments.
- **Read**: Retrieving comments or movie details.
- **Update**: Changing the password (as shown above).
- **Delete**: Removing specific comments.


---

**Overall**, the provided code facilitates operations related to comments in a movie application. Users can add comments to movies, delete their comments, and view comments for specific movies. Both the movie and comment structures are defined using Mongoose schemas and stored in MongoDB. The operations are neatly encapsulated within asynchronous functions that handle potential errors gracefully.

---

**CONCLUSION**
In conclusion, this project offers a comprehensive web platform focused on movies, combining the robustness of Express.js, MongoDB, and various other tools and libraries to create an engaging user experience.
