const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const usersSchema = new Schema({
   
    name: {
        type: String,
        required:true,
    },

    email: {
        type: String,
        required:true,
        unique:true
            
    },
    username: {
        type: String,
        required: true,
        unique:true
        
        
    },
    password: {
        type: String,
        required: true
    },

    usertype: {
        type: String,
         
      }
});

usersSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10, (error, hash) =>{
        user.password = hash
        next();
    })
})

const users = mongoose.model('users', usersSchema, 'users')
module.exports = users