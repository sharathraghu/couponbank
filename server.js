var systemConfig = require('./app/controllers/systemController');
var express = systemConfig.expressModule();
var bodyParser = require('body-parser');
var fileUploadUtil = require('express-fileupload');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var redisClient  = redis.createClient("redis://:bankcoupon@pub-redis-18816.us-west-2-1.1.ec2.garantiadata.com:18816");
var favicon = require('serve-favicon');
var path = require('path');
var validate = require('express-validator');
var log = systemConfig.loggerModule();
var properties = require('./app/config/properties');
var csurf = require("csurf");

var userRouter = require('./app/controllers/userController');
var couponRouter = require('./app/controllers/couponController');
var commonRouter = require('./app/controllers/commonController');

var app = express();

app.use("/asset", express.static(__dirname + '/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUploadUtil());
app.use(session({ store: new redisStore({host: 'pub-redis-18816.us-west-2-1.1.ec2.garantiadata.com', port: 18816, client: redisClient, pass:'bankcoupon'}), secret: 'CouponBank', resave: false, saveUninitialized: false, cookie: { maxAge: 1800000 }, name: 'id' }));
app.use(csurf());
app.use(validate());
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(userRouter, couponRouter, commonRouter);

app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/dist/views');
app.set('view engine', 'html');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
systemConfig.mongooseModule().connect(properties[env].mongoDBURL, { useMongoClient: true });

var port = (process.env.PORT === undefined) ? properties.devPort : process.env.PORT;
app.listen(port);