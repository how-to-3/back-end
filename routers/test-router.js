const express = require('express');

const Guides = require('../schemes/guide-model')

const router = express.Router();

router.get('/guides', (req, res) => {
    Guides.getGuides()
    .then(e => {
        res.json(e);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get users' });
    });
});

router.get('/guides/:id', (req, res) => {
    Guides.getGuideByID(req.params.id)
    .then(e => {
        res.json(e);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get guides' });
    });
})

router.get('/users/:id/guides', (req, res) => {
    Guides.getGuideByUser(req.params.id)
    .then(e => {
        res.json(e);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get guides' });
    });
})


module.exports = router;