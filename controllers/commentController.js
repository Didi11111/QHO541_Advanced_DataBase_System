const mongoose = require('mongoose');
const Comment = require('../models/comments');

exports.deleteComment = async (req, res) => {
    try {
        console.log("Starting the deleteComment process");

        const comment = await Comment.findById(req.params.id);
        console.log("Searched for the comment:", comment);

        if (!comment) {
            console.log("Comment not found");
            return res.status(404).send({ message: 'Comment not found' });
        }

        if (!(comment instanceof mongoose.Document)) {
            console.log("comment is NOT a Mongoose document");
            return res.status(500).send({ message: 'Unexpected data format' });
        } else {
            console.log("comment is a Mongoose document");
        }

        console.log("Checking authorization. Logged-in user:", req.user.username, "Comment author:", comment.yourname);

        if (!req.user || req.user.username !== comment.yourname) {
            console.log("User not authorized or not logged in");
            return res.status(403).send({ message: 'You are not authorized to delete this comment' });
        }

        console.log("User authorized. Deleting the comment");
        
        // deleting comment
        await Comment.deleteOne({ _id: comment._id });

        console.log("Comment deleted");
        res.status(200).send({ message: 'Comment deleted successfully' });
        
    } catch (error) {
        console.error("Error encountered:", error);
        res.status(500).send({ message: 'Server error', details: error.message });
    }
};
