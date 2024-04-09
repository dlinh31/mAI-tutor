const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },

    // Other user details can go here (e.g., email, passwordHash, etc.)
});
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, "sample key");
    return token
}

  

const User = mongoose.model('User', userSchema);

exports.User = User; 