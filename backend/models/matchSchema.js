const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    firstUsername: {
        type: String,
        required: true
    },
    secondUsername: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Match', matchSchema);
