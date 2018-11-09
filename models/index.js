var mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.connect('mongodb://phirmware:itachi1@ds135061.mlab.com:35061/crypto');
//mongoose.connect('mongodb://localhost/trikkkle', { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports.user = require('./user');
module.exports.service = require('./services');
module.exports.notifications = require('./notification');
module.exports.messages = require('./message');

