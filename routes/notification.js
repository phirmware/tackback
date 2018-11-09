const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/new', (req, res) => {
    const io = req.app.get('io');
    db.notifications.create(req.body).then(notification => {
        io.emit('newNotificationAdded');
        res.json({ statusText: 'Successfully sent', statusCode: 200 });
    }).catch(err => {
        res.send(err);
    });
});


router.get('/general', (req, res) => {
    db.notifications.find().then(nots => {
        res.json(nots);
    }).catch(err => {
        res.send(err);
    });
});


router.get('/:id', (req, res) => {
    db.notifications.find({ userId: req.params.id }).then(notifications => {
        res.json(notifications);
    }).catch(err => {
        res.send(err);
    });
});


module.exports = router;