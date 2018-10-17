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

// edit section

// edit name of service
router.post('/nameofservice/:id',(req,res)=>{
    db.service.findById(req.params.id).then(service=>{
        service.name_of_service = req.body.name_of_service;
        service.save();
        res.send({statusText:'Updated',statusCode:200});
    }).catch(err=>{
        res.send(err);
    });
});

//edit service heading
router.post('/serviceheading/:id',(req,res)=>{
    db.service.findById(req.params.id).then(service=>{
        service.service_heading = req.body.service_heading;
        service.save();
        res.send({statusText:'Updated',statusCode:200});
    }).catch(err=>{
        res.send(err);
    });
});

//edit service details
router.post('/servicedetails/:id',(req,res)=>{
    db.service.findById(req.params.id).then(service=>{
        service.service_details = req.body.service_details;
        service.save();
        res.send({statusText:'Updated',statusCode:200});
    }).catch(err=>{
        res.send(err);
    });
});

//edit service summary
router.post('/servicesummary/:id',(req,res)=>{
    db.service.findById(req.params.id).then(service=>{
        service.service_summary = req.body.service_summary;
        service.save();
        res.send({statusText:'Updated',statusCode:200});
    }).catch(err=>{
        res.send(err);
    });
});

//search for service
router.post('/search',(req,res)=>{
    db.service.find({name_of_service:req.body.search}).then(services=>{
        res.json(services);
    }).catch(err=>{
        res.send(err);
    });
})
module.exports = router;