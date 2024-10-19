const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },    
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    likedIt: {
        type: [String],
        default: []
    },    
    userType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
