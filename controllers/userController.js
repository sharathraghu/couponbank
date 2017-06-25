var systemConfig = require('../controllers/systemController');
const User = require('../classes/user');

var express = systemConfig.expressModule();
var userRouter = express.Router();
var log = systemConfig.bunyanModule();

userRouter.post("/navToUserDashbord", function(req, res, next) {
  let user = new User();
  var couponSession = req.session;
  if(req.body.usrt === 'n') {
      user.setFisrstName(req.body.firstName);
      user.setLastName(req.body.lastName);
  }
  user.setEmail(req.body.exampleInputEmail1);
  user.setPassword(req.body.exampleInputPassword1);
  couponSession.user = user;

  res.render('userDashbord', {
    user: user,
    imgData: ""
  });

  next();
});

userRouter.post('/forgotPassword', function(req, res, next) { 
  res.render('home');
  next();
});

userRouter.get('/userLogout', function(req, res, next) {
  var couponSession = req.session;
  couponSession.destroy(function(err) {
    console.log("User Logged out!!!");
  });
  res.render('home');
  next();
});

module.exports = userRouter;


