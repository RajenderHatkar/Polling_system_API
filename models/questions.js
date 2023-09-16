const mongoose = require('mongoose');
const Option=require('./options');

const questionsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]

}, { timestamps: true });


const Question = mongoose.model('Question', questionsSchema);
module.exports = Question;