const express = require('express');
const router = express.Router();

const optionsController = require('../../controllers/V1/options_controller');

router.post('/:id/create', optionsController.createOption); // create option
router.delete('/:id/delete', optionsController.deleteOption); // delete option 
router.get('/:id/add_vote', optionsController.addVote); // add vote to the option



module.exports = router;