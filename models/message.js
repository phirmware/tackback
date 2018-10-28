var mongoose = require('mongoose');
var express = require('express');

var messageSchema = new mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    proId:{
        type:String,
        required:true
    },
    messages:[]
});

var Messages = mongoose.model('messages',messageSchema);
module.exports = Messages;