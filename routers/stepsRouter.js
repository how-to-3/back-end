const express = require('express');
const router = express.Router();

const Steps = require('../schemes/stepsModel.js');
const { validateStepBody, validateStepID } = require('../middleware/dataValidation/stepValidation.js');

router.put('/:id', validateStepID, validateStepBody, (req, res) => {
    Steps.editStep(req.body, req.params.id)
        .then(changes => {
            res.status(200).json({msg:'Step has been edited'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not edit the step'})
        })
});
router.delete('/:id', validateStepID, (req, res) => {
    Steps.removeStep(req.params.id)
        .then(del => {
            res.status(200).json({msg:'step has been deleted'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not delete the step'})
        })
});

module.exports = router;



