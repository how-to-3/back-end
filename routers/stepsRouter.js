const express = require('express');
const router = express.Router();

const Steps = require('../schemes/stepsModel.js');
const { validateStepBody, validateStepID } = require('../middleware/dataValidation/stepValidation.js');
const { validateGuideID } = require('../middleware/dataValidation/guideValidation.js');
const  restricted  = require('../middleware/authenticate.js');

router.post('/:id/steps/', restricted, validateGuideID, validateStepBody, (req, res) => {
    Steps.addStep(req.body, req.params.id)
        .then(resp => {
            console.log(resp);
            res.status(201).json({msg:`new step has been added!`})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not add the step'})
        })
})
router.put('/:id/steps/:step_id/', validateStepID, validateStepBody, (req, res) => {
    Steps.editStep(req.body, req.params.step_id)
        .then(changes => {
            res.status(200).json({msg:'Step has been edited'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not edit the step'})
        })
});
router.delete('/:id/steps/:step_id/', validateStepID, (req, res) => {
    Steps.removeStep(req.params.step_id)
        .then(del => {
            res.status(200).json({msg:'step has been deleted'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not delete the step'})
        })
});

module.exports = router;



