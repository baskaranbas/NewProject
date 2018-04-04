var Express = require('express');
var compression = require('compression');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');

// // Initialize the Express App
const app = new Express();

// Import required modules
var mainRoute = require('./routes/route');
var serverConfig = require('./configuration/mongoConfig');
var auditLog = require('audit-log');
//const cron = require('./middleware/cronScheduler'); // eslint-disable-line
const expressValidator = require('express-validator');


// MongoDB Connection
const options = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0
};

mongoose.connect(serverConfig.mongoURL, options);

auditLog.addTransport('mongoose', { connectionString: 'mongodb://54.156.240.171:27017/aerobit' });
auditLog.addTransport('console');

var auditLogExpress = auditLog.getPlugin('express', {
    userIdPath: ['user', '_id'],
    whiteListPaths: [/^\/some\/particular\/path.*$/]
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use(expressValidator());
app.use(auditLogExpress.middleware);

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(function (err, req, res, next) {  // eslint-disable-line
    res.status(err.status || 500).json(res.error(err.status || 500));
});

process.on('uncaughtException', function (err) {
    console.log('An unknown error occured internally', err); // eslint-disable-line
});

setTimeout(function () {
}, 500);

app.use(logger('dev'));

app.use('/api', mainRoute);

// start app
app.listen(serverConfig.port, (error) => {
    if (!error) {
        console.log(`Aeroibit Health Server is running on port: ${serverConfig.port}!`); // eslint-disable-line
    }
});

module.exports = app;
