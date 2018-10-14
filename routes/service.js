const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/new',(req,res)=>{
    db.service.create(req.body).then(service=>{
        res.json(service);
    }).catch(err=>{
        res.send(err);
    });
});

router.post('/',(req,res)=>{
    db.service.find({userId:req.body.id}).then(services=>{
        res.json(services);
    }).catch(err=>{
        res.send(err);
    });
});

router.post('/delete',(req,res)=>{
    db.service.findByIdAndDelete(req.body.id).then(d=>{
        res.send({statusText:'delete succesfull',statusCode:200});
    }).catch(err=>{
        res.send('Notin come out');
    });
});

router.get('/:id',(req,res)=>{
    db.service.findOne({_id:req.params.id}).then(service=>{
        res.json(service);
    }).catch(err=>{
        res.send(err);
    })
})

module.exports = router;