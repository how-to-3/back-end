const db = require('../database/dbConfig')

function getGuides(){
    return db("guides")
        .select()
}

async function getGuideByID(id){
    const guide = await db("guides")
            .select("guides.guide_name","guides.category", "guides.score", "guides.id")
            .where("guides.id", id)
            .first()
    const steps = await db("steps")
                .select("steps.step", "steps.step_number")
                .where("steps.guide_id", id)
                .orderBy("step_number")    
    const newGuide = guide;
    newGuide.steps = steps;
    
    return newGuide;
}

function getGuideByUser(id){
    return db("guides")
            .select("guides.guide_name","guides.category", "guides.score", "guides.id")
            .where("guides.user_id", id)
}

module.exports = {
    getGuides, getGuideByID, getGuideByUser
}