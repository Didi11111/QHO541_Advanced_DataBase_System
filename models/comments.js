const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    yourname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies'
    }
});

const comments = mongoose.model('comments', commentsSchema, 'comments')
module.exports = comments;
