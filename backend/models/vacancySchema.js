const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    skills: {
        type: String,
        required: true
    },
    userId: {
        type: Boolean,
        required: true
    },
    isEmployer: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vacancy', vacancySchema);
