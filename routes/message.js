const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/create-chat',(req,res)=>{
   db.messages.create(req.body).then(messages=>{
       res.json({statusText:'Successfully Created',statusCode:200});
   }).catch(err=>{
       res.send({statusCode:400,statusText:'Couldnt create chat'});
   });
});

router.post('/find-chat',(req,res)=>{
    db.messages.find(req.body).then(messages=>{
        if(messages.length == 0){
            res.send({statusCode:400});
        } else{
            res.json(messages);
        }
    }).catch(err=>{
        res.send({err:'Not found',statusCode:400});
    });
});

router.post('/inbox',(req,res)=>{
    db.messages.find(req.body).then(inbox=>{
        res.json(inbox);
    }).catch(err=>{
        res.send({statusCode:400});
    });
});

router.post('/send',(req,res)=>{
    db.messages.findById(req.body.id).then(mess=>{
        mess.messages.push({message:req.body.message,time_sent:req.body.time,senderId:req.body.sender});

        mess.save();
        res.send({statusCode:200 , message:mess});
    }).catch(err=>{
        res.send({statusCode:400});
    });
});

router.post('/find-inbox',(req,res)=>{
    db.messages.findById(req.body.id).then(mess=>{
        res.json(mess);
    }).catch(err=>{
        res.send({statusCode:400});
    });
});


router.post('/delete-chat',(req,res)=>{
    db.messages.findByIdAndDelete(req.body.id).then(mess=>{
        res.json(mess);
    }).catch(err=>{
        ({statusCode:400});
    })
})

module.exports = router;