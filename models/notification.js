var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
   location:{
       type:String,
       required:true
   },
   details:{
       type:String,
       required:true
   },
   price:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true
   },
   phone:{
       type:String,
       required:true
   }
});

var Notifications = mongoose.model('notification',notificationSchema);
module.exports = Notifications;