var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var usersRoutes = require('./routes/user');
var serviceRoutes = require('./routes/service');
var notificationRoutes = require('./routes/notification');
var bodyParser = require('body-parser');
var cors = require('cors');
const passport = require('passport');


app.use(require('express-session')({
    secret: 'Tmx8Y=fEn!A2KF=5cU2#&UaHMJweeUcTSWN5-6pXTUEHpu?Yhv',
    resave: false,
    saveUninitialized: false
}));
//secret code password = 'Tmx8Y=fEn!A2KF=5cU2#&UaHMJweeUcTSWN5-6pXTUEHpu?Yhv';

app.use(passport.initialize());
app.use(passport.session());

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// set api prefix for users route
app.use('/api/', usersRoutes);
app.use('/api/service',serviceRoutes);
app.use('/api/notifications',notificationRoutes);

//listen 
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});

