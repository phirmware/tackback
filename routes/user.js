const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");
const async = require('async');
const crypto = require('crypto');
const AuthController = {};

passport.use(new localStrategy(db.user.authenticate()));
passport.serializeUser(db.user.serializeUser());
passport.deserializeUser(db.user.deserializeUser());




//test app
router.get('/',(req,res)=>{
    res.send(req.headers.host);
});


//user signup
router.post("/signup", (req, res) => {
    if (!req.body.email || req.body.email == '') return res.send('Email Needed');
    db.user.register(
        new db.user({ 
                      username: req.body.email,
                      first_name:req.body.first_name,
                      last_name:req.body.last_name,
                      email: req.body.email,
                      address:req.body.address,
                      city:req.body.city,
                      country:req.body.country
                     }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.send({message:err});
            } else {
                res.json({ message: 'successfully registered' });
            }
        }
    );
});


//user login
router.post('/login', (req, res, next) => {
    AuthController.login(req, res, next); //Holds the properties in an object before sending the parameters
});
AuthController.login = async (req, res) => {
    //try and catch error to determine look out before and after getting the authentication.
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: 'Something is not right with your input'
            });
        }
        passport.authenticate('local', { session: false }, (err, user) => {
            if (err || !user) {
                return res.status(200).json({
                    message: 'Something is not right',
                    username: user,
                    statusCode: 400,
                    statusText: 'Invalid Username or Password',
                    error: err
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed jwt web token with the contents of user object and return it in the response
                const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, 'Tmx8Y=fEn!A2KF=5cU2#&UaHMJweeUcTSWN5-6pXTUEHpu?Yhv');
                db.user.find({ username: req.body.username }).then((user) => {
                    res.send({ token: token, email: req.body.email, username: req.body.username, statusCode: 200, statusText: 'Successful login' });
                });
            });
        })(req, res);
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = router;