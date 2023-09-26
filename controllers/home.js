const movies = require('../models/movies')

module.exports = (req, res) => {
    movies.find().then(function(result){
        if (req.session.userId){
            res.render('index', {
                movies: result
            });
        }
        else{
            res.redirect('/login');
        }
    });
}
