const Guides = require('../../schemes/guideModel.js');

module.exports = {
    validateGuideBody,
    validateGuideID
};
function validateGuideBody(req, res, next){
    if(!req.body.img_url){
        req.body.img_url = 'https://picsum.photos/200'
    };
    const body = req.body;
    if(body.guide_name 
        && body.category
        && body.score
        && body.description){
        next();
    } else {
        res.status(400).json({err:'please provide a valid guide body'})
    }
};

function validateGuideID(req, res, next){
    const { id } = req.params
    Guides.findGuideById(id)
        .then(guide => {
            if(guide && guide.guide_id){
                next();
            } else {
                res.status(400).json({err:'please provide a valid guide ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not find the guide'})
        })
};