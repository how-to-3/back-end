const db = require('../database/dbConfig.js');

module.exports = {
    addStep,
    findStepById,
    editStep,
    removeStep
};
function addStep(step, guideID){
    return db('steps')
        .insert({...step, 'guide_id': guideID})
};
function findStepById(stepID){
    return db('steps')
        .where({'id': stepID})
};
function editStep(changes, stepId){
    return db('steps')
        .where({'id': stepId})
        .update(changes)

};
function removeStep(stepId){
    return db('steps')
        .where({'id': stepId})
        .del();
};