const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Corrected reference
    token: String,
    expires: Date,
    createdAt: { type: Date, default: Date.now }
});

tokenSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 3600 });  // tokens expire after 1 hour

const Token = mongoose.model('Token', tokenSchema, 'Token'); // Consistent naming
module.exports = Token; // Export as Token

