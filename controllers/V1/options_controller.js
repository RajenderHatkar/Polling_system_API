const Question = require('../../models/questions');
const Option = require('../../models/options');
// Create an option for a specific question
exports.createOption = async (req, res) => {
  try {
    const questionId = req.params.id;
    console.log(questionId)
    const { text } = req.body;

    // Check if the question exists
    const question = await Question.findById(questionId);
    console.log(question)
    if (!question) {
      
      return res.status(404).json({ error: 'Question not found' });
    }

    // Create the option and associate it with the question
    const option = new Option({
      text,
      question: questionId,
    });

    await option.save();

    // Add the option to the question's options array
    question.options.push(option);
    await question.save();

    res.status(201).json(option);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Delete an option
exports.deleteOption = async (req, res) => {
    try {
      const option = await Option.findById(req.params.id);
      if (!option) {
        return res.status(404).json({ error: 'Option not found' });
      }
      if (option.votes > 0) {
        return res.status(400).json({ error: 'Cannot delete an option with votes' });
      }
      await option.remove();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Increment the count of votes for an option
  exports.addVote = async (req, res) => {
    try {
      const option = await Option.findById(req.params.id);
      if (!option) {
        return res.status(404).json({ error: 'Option not found' });
      }
      option.votes++;
      await option.save();
      res.status(200).json(option);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  