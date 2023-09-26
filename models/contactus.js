const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const contactusSchema = new Schema({
   
//     fullname : {
//         type: String,
//         required:true
//     },

//     email: {
//         type: String,
//         required:true
//     },

//     message: {
//         type: String,
//         require:true
//     }
// });

// const contactus = mongoose.model('contactus', contactusSchema, 'contactus');

// module.exports = contactus;

const contactusSchema = new Schema({
    name : {
        type: String,
        required:true
    },

    email: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required: true
    }
});

const contactus = mongoose.model('contactus', contactusSchema, 'contactus');
module.exports = contactus;