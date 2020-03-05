const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2

const Guides = require('../schemes/guideModel.js');
const { validateGuideBody, validateGuideID } = require('../middleware/dataValidation/guideValidation.js');
const  restricted  = require('../middleware/authenticate.js');

router.put('/:id/img_upload', restricted, (req, res) => {
    const { id } = req.params;
    const file = req.files.guide_image
    let body = {};
    Guides.findGuideById(id)
        .then(guide => {
            cloudinary.uploader.upload(file.tempFilePath, function(err, result){
                if(err){
                    res.status(500).json({
                        error: err, 
                        err:'server could not upload the image :('
                    })
                } else if(result){
                    body = {
                        guide_name: guide.guide_name,
                        img_url: result.url,
                        category: guide.category,
                        score: guide.score,
                        description: guide.description
                    };
                    Guides.editGuide(body, id)
                        .then(eg => {
                            res.status(200).json({msg:'image uploaded!'})
                        })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'invalid guide ID'})
        })
})
router.get('/', (req, res) => {
    Guides.find()
        .then(guides => {
            res.status(200).json(guides)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not find all guides'})
        })
});
router.get('/:id', (req, res) => {
    Guides.findGuideById(req.params.id)
        .then(guide => {
            Guides.findGuideSteps(guide.guide_id)
                .then(steps => {
                    res.status(200).json({guide, steps})
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not find the guide'})
        })
});

router.get('/users/:id/', (req, res) => {
    Guides.getGuideByUser(req.params.id)
        .then(guides => {
            res.status(200).json(guides)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not find guides for that user'})
        })
});

router.post('/', restricted, validateGuideBody, (req, res) => {
    req.body.user_id = req.decodedToken.user_id
    const body = req.body;
    Guides.addGuide(body)
        .then(id => {
            const guideID = id[0];
            Guides.findGuideById(guideID)
                .then(newGuide => {
                    res.status(201).json({ msg:'guide succesfully posted!', newGuide })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not post the guide'})
        })
});
router.put('/:id', restricted, validateGuideID, validateGuideBody, (req, res) => {
    Guides.editGuide(req.body, req.params.id)
        .then(changes => {
            Guides.findGuideById(req.params.id)
                .then(editedGuide => {
                    res.status(202).json({ msg:'guide succesfully edited!', editedGuide })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not edit the guide'})
        })
});
router.delete('/:id', restricted, validateGuideID, (req, res) => {
    Guides.removeGuide(req.params.id)
        .then(response => {
            res.status(200).json({msg: 'guide sucessfully deleted!'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not delete the guide'})
        })
});

module.exports = router;



