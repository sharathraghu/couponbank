var expressConfig = require('./controllers/systemController');
var express = expressConfig();
var bodyParser = require('body-parser');
var fileUploadUtil = require('express-fileupload');
var session = require('express-session');
var favicon = require('serve-favicon');
var path = require('path');

var userRouter = require('./controllers/userController');
var couponRouter = require('./controllers/couponController');

var app = express();

app.use("/asset", express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileUploadUtil());
app.use(session({secret: 'CouponBank', resave: false, saveUninitialized: false, cookie: {maxAge: 30000}, name:'id'}));
app.use(favicon(path.join(__dirname,'views','imgs','favicon.ico')));

app.use(userRouter);
app.use(couponRouter);

app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res) {
  var couponSession = req.session;
  res.render('home');
});

var port = (process.env.PORT === undefined) ? '9088' : process.env.PORT;
app.listen(port);