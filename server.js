var systemConfig = require('./controllers/systemController');
var express = systemConfig.expressModule();
var bodyParser = require('body-parser');
var fileUploadUtil = require('express-fileupload');
var session = require('express-session');
var favicon = require('serve-favicon');
var path = require('path');
var log = systemConfig.loggerModule();

var userRouter = require('./controllers/userController');
var couponRouter = require('./controllers/couponController');

var app = express();

app.use("/asset", express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileUploadUtil());
app.use(session({secret: 'CouponBank', resave: false, saveUninitialized: false, cookie: {maxAge: 1800000}, name:'id'}));
app.use(favicon(path.join(__dirname,'views','imgs','favicon.ico')));

app.use(userRouter, couponRouter);

app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res) {
  log.info("%s","Lord Ganesh grace");
  res.render('home');
});

var port = (process.env.PORT === undefined) ? '9088' : process.env.PORT;
app.listen(port);