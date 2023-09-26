const mongoose = require("mongoose");
const comments = require('../models/comments');
const movies = require('../models/movies');

module.exports = async (req, res) => {
    try {
        // Retrieve movieId from the URL parameter
        const movieId = req.params.movieId;
        // console.log('Received movieId:', movieId);

        // Check if the movieId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            // console.log('Invalid movieId:', movieId);
            return res.status(400).send('Invalid movieId');
        }

        // Convert the movieId to a valid ObjectId
        const movieObjectId = new mongoose.Types.ObjectId(movieId);

        // Create a new comment and include the movieId
        const newComment = new comments({
            yourname: req.body.yourname,
            title: req.body.title,
            message: req.body.message,
            movieId: movieObjectId // Use the ObjectId retrieved from the movie document
        });

        // Save the comment to the database
        await newComment.save();
        // console.log('Comment saved:', newComment);

        // Redirect to the movie detail page
        res.redirect(`/movie/detail/${movieId}`);
    } catch (error) {
        // console.error('Error:', error);
        res.status(500).send('Error creating comment.');
    }
};
