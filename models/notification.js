var mongoose = require('mongoose');
var express = require('express');

var notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    pro: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    time_sent:{
        type:Date,
        default:Date.now
    }
});

var Notifications = mongoose.model('notification', notificationSchema);
module.exports = Notifications;