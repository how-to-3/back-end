const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findGuideById,
    findGuideSteps,
    addGuide,
    editGuide,
};
function editGuide(changes, guideID){
    return db('guides')
        .where({ 'id': guideID})
        .update(changes)
};
function addGuide(guide){
    return db('guides')
        .insert(guide)
};
function findGuideSteps(guideID){
    return db('steps as s')
        .select('s.id as step_id',
            's.step as step_name',
            's.guide_id',
            's.step_number'
        )
        .where({ 's.guide_id': guideID })
};
function findGuideById(guideID){
    return db('guides as g')
        .join('users as u', 'g.user_id', 'u.id' )
        .select('g.guide_name',
            'g.id as guide_id',
            'u.username as author',
            'u.id as author_id',
            'g.category',
            'g.score'
        )
        .where({ 'g.id': guideID })
        .first();
};
function find(){
    return db('guides')
};

// return db('steps as s')
// .join('guides as g', 's.guide_id', 'g.id')
// .join('users as u', 'g.user_id', 'u.id')
// .select('g.guide_name',
//     'g.id as guide_id',
//     'u.username as author',
//     'u.id as author_id',
//     'g.category',
//     'g.score',
//     ''
// )