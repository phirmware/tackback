var mongoose = require('mongoose');

var servicesSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name_of_service:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    service_heading:{
        type:String,
        default:''
    },
    service_summary:{
        type:String,
        required:true
    },
    service_details:{
        type:String,
        default:''
    }
});

var Service = mongoose.model('service',servicesSchema);
module.exports = Service;