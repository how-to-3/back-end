const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findGuideById,
    findGuideSteps,
    addGuide,
    editGuide,
    removeGuide,
    getGuideByUser
};
function removeGuide(guideID){
    return db('guides')
        .where({ 'id': guideID })
        .delete();
};
function editGuide(changes, guideID){
    return db('guides')
        .where({ 'id': guideID })
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
            'g.score',
            'g.img_url',
            'g.description'
        )
        .where({ 'g.id': guideID })
        .first();
};
function find(){
    return db('guides')
};

function getGuideByUser(id){
    return db("guides")
            .select("guides.guide_name","guides.category", "guides.score", "guides.id")
            .where("guides.user_id", id)
}

