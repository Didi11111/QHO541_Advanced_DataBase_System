
const Comments = require('../models/comments'); 

// Define a route for displaying comments for a specific movie
module.exports = async (req, res) =>{
  try {
    const movieId = req.params.movieId;

    // Fetch comments associated with the movie using its ID
    const movieComments = await Comments.find({ movieId });

    // Render a view to display the comments (created a view for this purpose)
    res.render('commentsPage', { comments: movieComments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}