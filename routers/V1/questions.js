const express = require('express');
const router = express.Router();


const questionsController = require('../../controllers/V1/questions_controller');
const optionsController = require('../../controllers/V1/options_controller');

router.post('/create', questionsController.createQuestion); // create question
router.delete('/:id/delete', questionsController.deleteQuestion); // delete question
router.get('/:id', questionsController.viewQuestion); // get question object | details

module.exports = router;