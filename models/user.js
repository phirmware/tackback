var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    verificationToken: String,
    verificationExpires: Date,
    verification_link:String,
    referal_link:{
        type:String,
        default:'none'
    },
    verified: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);


var User = mongoose.model('user', userSchema);
module.exports = User;