var systemConfig = require('./app/controllers/systemController');
var express = systemConfig.expressModule();
var bodyParser = require('body-parser');
var fileUploadUtil = require('express-fileupload');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var redisClient  = redis.createClient();
var favicon = require('serve-favicon');
var path = require('path');
var log = systemConfig.loggerModule();
var properties = require('./app/config/properties');
var csurf = require("csurf");

var userRouter = require('./app/controllers/userController');
var couponRouter = require('./app/controllers/couponController');
const CouponService = require('./app/services/couponService');

var app = express();

app.use("/asset", express.static(__dirname + '/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUploadUtil());
app.use(session({ store: new redisStore({host: 'localhost', port: 6379, client: redisClient}), secret: 'CouponBank', resave: false, saveUninitialized: false, cookie: { maxAge: 1800000 }, name: 'id' }));
app.use(csurf());
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(userRouter, couponRouter);


app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/dist/views');
app.set('view engine', 'html');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
systemConfig.mongooseModule().connect(properties[env].mongoDBURL, { useMongoClient: true });

app.get('/', function (req, res, next) {
  log.info("%s", "Lord Ganesh grace");  
  let couponService = new CouponService();
  couponService.getAllCoupons().then(function (coupons) {
    res.render('home', {
      coupons: coupons,
      couponCsrfToken: req.csrfToken()
    });
  }).catch(function (err) {    
    throw err;
  });
});

var port = (process.env.PORT === undefined) ? '9088' : process.env.PORT;
app.listen(port);