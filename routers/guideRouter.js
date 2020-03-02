const express = require('express');
const router = express.Router()

const Guides = require('./guideModel.js');

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
router.post('/', (req, res) => {
    const body = req.body;
    Guides.addGuide(body)
        .then(id => {
            Guides.findGuideById(id[0])
                .then(newGuide => {
                    res.status(201).json({ msg:'guide succesfully posted!', newGuide })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not post the guide'})
        })
});
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    Guides.removeGuide(req.params.id)
        .then(response => {
            res.status(200).json({msg: 'guide sucessfully deleted!'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'Server could not delete the guide'})
        })
})


module.exports = router;