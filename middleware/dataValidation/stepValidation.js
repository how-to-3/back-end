const Steps = require('../../schemes/stepsModel.js');

module.exports = {
    validateStepBody,
    validateStepID
};
function validateStepBody(req, res, next){
    const body = req.body;
    if(body.step && body.step_number){
        next();
    } else {
        res.status(400).json({err:'please provide a valid step body'})
    };
};
function validateStepID(req, res, next){
    Steps.findStepById(req.params.id)
        .then(step => {
            if(step.length > 0){
                next();
            } else {
                res.status(400).json({err:'please provide a valid StepID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not find the step'})
        })
};