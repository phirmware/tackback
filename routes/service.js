const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/new', (req, res) => {
    db.service.create(req.body).then(service => {
        res.json(service);
    }).catch(err => {
        res.send(err);
    });
});

router.post('/', (req, res) => {
    db.service.find({ userId: req.body.id }).then(services => {
        res.json(services);
    }).catch(err => {
        res.send(err);
    });
});

router.post('/delete', (req, res) => {
    db.service.findByIdAndDelete(req.body.id).then(d => {
        res.send({ statusText: 'delete succesfull', statusCode: 200 });
    }).catch(err => {
        res.send('Notin come out');
    });
});

router.get('/:id', (req, res) => {
    db.service.findOne({ _id: req.params.id }).then(service => {
        res.json(service);
    }).catch(err => {
        res.send(err);
    })
})

// edit section

// edit name of service
router.post('/nameofservice/:id', (req, res) => {
    db.service.findById(req.params.id).then(service => {
        service.name_of_service = req.body.name_of_service;
        service.save();
        res.send({ statusText: 'Updated', statusCode: 200 });
    }).catch(err => {
        res.send(err);
    });
});

//edit service heading
router.post('/serviceheading/:id', (req, res) => {
    db.service.findById(req.params.id).then(service => {
        service.service_heading = req.body.service_heading;
        service.save();
        res.send({ statusText: 'Updated', statusCode: 200 });
    }).catch(err => {
        res.send(err);
    });
});

//edit service details
router.post('/servicedetails/:id', (req, res) => {
    db.service.findById(req.params.id).then(service => {
        service.service_details = req.body.service_details;
        service.save();
        res.send({ statusText: 'Updated', statusCode: 200 });
    }).catch(err => {
        res.send(err);
    });
});

//edit service summary
router.post('/servicesummary/:id', (req, res) => {
    db.service.findById(req.params.id).then(service => {
        service.service_summary = req.body.service_summary;
        service.save();
        res.send({ statusText: 'Updated', statusCode: 200 });
    }).catch(err => {
        res.send(err);
    });
});

//search for service
router.post('/search', (req, res) => {
    const regex = new RegExp(escapeRegex(req.body.search), 'gi');
    db.service.find({ service_details: regex }).then(services => {
        res.json(services);
    }).catch(err => {
        res.send(err);
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


// upload image
const multer = require('multer');
const path = require('path');

// set storage engine
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// initialize upload
const upload = multer({
    storage: storage
}).single('photo');

router.post('/upload/:id', (req, res) => {
    db.service.findById(req.params.id).then(service=>{
        console.log(service);
        upload(req, res, (err) => {
            if (err) {
                res.send({ error: 'An error ocurred' });
            } else {
                console.log(req.file);
                var image = req.headers.host + '/uploads/' + req.file.filename
                service.images.push(image);
                service.save();
                res.send({statusText:'Uploaded Successfully', statusCode:200});
            }
        });
    }).catch(err=>{
        res.send({statusText:'somthing went wrong'});
    })
});

module.exports = router;