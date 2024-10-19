const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    skills: {
        type: [String],
        default: []
    },
    grades: {
        type: [String],
        enum: ['Intern', 'Junior', 'Middle', 'Senior', 'Teamlead'],
        required: true,
        default: []
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vacancy', vacancySchema);
