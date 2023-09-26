
const Comments = require('../models/comments');
const movies = require('../models/movies');

module.exports = async (req, res) => {
    const movieId = req.params.movieId; // Check if 'movieId' is used here
    const movieComments = await Comments.find({ movieId });

    try {
        const movie = await movies.findOne({ _id: movieId }); // Query the database to find the specific movie

        if (!movie) {
            // Handle the case where the movie with the given ID doesn't exist
            return res.status(404).send('Movie not found');
        }

        res.render('movie', {
            movie: movie, // Include the movie data
            movieId: movieId, // Pass the specific movie data to the view
            comments: movieComments,
            username: req.session.username
            
        });
    } catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).send('Error fetching movie data.');
    }
};