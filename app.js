var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var usersRoutes = require('./routes/user');
var serviceRoutes = require('./routes/service');
var notificationRoutes = require('./routes/notification');
var messageRoutes = require('./routes/message');
var bodyParser = require('body-parser');
var cors = require('cors');
let http = require('http');
let server = http.Server(app);
const passport = require('passport');
let socketIO = require('socket.io');
let io = socketIO(server);
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('user connected');
});


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
app.use('/api/messages',messageRoutes);

//listen 
server.listen(port, () => {
    console.log(`listening at port ${port}`);
});