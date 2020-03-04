const express = require('express');
const router = express.Router();

const Guides = require('../schemes/guideModel.js');
const Steps = require('../schemes/stepsModel.js');
const { validateGuideBody, validateGuideID } = require('../middleware/dataValidation/guideValidation.js');
const { validateStepBody } = require('../middleware/dataValidation/stepValidation.js');
const  restricted  = require('../middleware/authenticate.js');

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
router.post('/', restricted, validateGuideBody, (req, res) => {
    req.body.user_id = req.decodedToken.user_id
    const body = req.body;
    // if(!body.user_id){
    //     res.status(400).json({err:'please send a valid user_id'});
    // }
    // const guideBody = {
    //     guide_name: body.guide_name, 
    //     user_id: body.user_id,
    //     category: body.category
    // };
    // let steps = [];
    // if(body.steps){
    //      steps = body.steps;
    // };
    Guides.addGuide(body)
        .then(id => {
            const guideID = id[0];
            // if(steps.length > 0){
            //     console.log(steps.length)
                // async function asyncMap(steps){
                //     const promises = steps.map(step => {
                //         Steps.addStep(step, guideID)
                //     });
                //     await Promise.all(promises);
                    // Guides.findGuideById(guideID)
                    //     .then(newGuide => {
                    //         res.status(201).json({ msg:'guide succesfully posted!', newGuide })
                    //     })
                    //     .catch(err => {
                    //         console.log(err);
                    //         res.status(500).json({err:'could not post guide with steps'})
                    //     })
                // };
            // } else {
                Guides.findGuideById(guideID)
                    .then(newGuide => {
                        res.status(201).json({ msg:'guide succesfully posted!', newGuide })
                    })
            // };
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
router.post('/:id/step', restricted, validateGuideID, validateStepBody, (req, res) => {
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

module.exports = router;



