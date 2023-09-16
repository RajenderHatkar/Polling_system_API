const mongoose = require('mongoose');
const Question=require('./questions');
const optionsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, { timestamps: true });

const Option = mongoose.model('Option', optionsSchema);
module.exports = Option;