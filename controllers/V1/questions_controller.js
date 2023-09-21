const Question = require('../../models/questions');
const Option = require('../../models/options');
const { json } = require('express');

// Create a question
exports.createQuestion = async (req, res) => {
  try {
    
    const { text } = req.body;
    console.log(req.body);
    const question = await Question.create({ text });
    return res.status(201).json(question);
  } catch (error) {
    if (error.name === 'MongoError' || error.code === 11000) {
      // Handle duplicate key error (question with the same ID already exists)
      return res.status(409).json({ message: 'Question already created' });
    }
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// View a question with options and votes
exports.viewQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('options');
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    if (question.options.length > 0) {
      return res.status(400).json({ error: 'Cannot delete a question with options' });
    }
    
    const result = await Question.deleteOne({ _id: question });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Question is alredy deleted!!' });
    }

    res.status(200).json({ message: 'Question is deleted!!' });
    res.status(204).end();

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};
