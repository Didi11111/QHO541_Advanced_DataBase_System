const movies = require('../models/movies')

module.exports = (req, res) => {
    movies.find().then(function(result){
        // console.log(result)
        res.render('all_movies', {
            movies: result
        })
    })
}