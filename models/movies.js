const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
   
    id: Number,
    director_name : String,
    duration : Number,
    actor_1_name : String,
    actor_2_name : String,
    actor_3_name : String,
    gross : Number,
    genres : String,
    movie_title : String,
    plot_keywords : String,
    movie_imdb_link : String,
    language : String,
    country : String,
    budget : Number,
    title_year : Number,
    imdb_score : Number,
    Images : String,

});

const movies = mongoose.model('movies', moviesSchema, 'movies')
module.exports = movies