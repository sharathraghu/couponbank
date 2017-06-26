var systemConfig = require('../controllers/systemController');
const User = require('../classes/user');
var UserModel = require('../classes/userModel');

var express = systemConfig.expressModule();
var userRouter = express.Router();
var log = systemConfig.loggerModule();

userRouter.post("/navToUserDashbord", function (req, res, next) {
  let user = new User();
  var couponSession = req.session;

  if (req.body.usrt === 'n') {
    var newUser = new UserModel({
      first_name: req.body.firstName,
      last_name : req.body.lastName,
      email : req.body.exampleInputEmail1,
      password : req.body.exampleInputPassword1
    });

    user.setFisrstName(req.body.firstName);
    user.setLastName(req.body.lastName);
    user.setEmail(req.body.exampleInputEmail1);

    newUser.save(function(err) {
      if (err) throw err;
      couponSession.user = user;
      navigateToUsrDashboard(res, user);
      next();
    });
  } else {
    UserModel.findOne({email:req.body.exampleInputEmail1}, function(err, userDB) {
      if(err) throw err;
      if(userDB !=null && userDB.password === req.body.exampleInputPassword1) {
        user.setFisrstName(userDB.first_name);
        user.setLastName(userDB.last_name);
        user.setEmail(userDB.email);
        couponSession.user = user;
        navigateToUsrDashboard(res, user);
      } else {
         res.render('home');
      }
      next();
    });
  }
    
});

userRouter.post('/forgotPassword', function (req, res, next) {
  res.render('home');
  next();
});

userRouter.get('/userLogout', function (req, res, next) {
  var couponSession = req.session;
  couponSession.destroy(function (err) {
    console.log("User Logged out!!!");
  });
  res.render('home');
  next();
});

function navigateToUsrDashboard(res, user) {
  res.render('userDashbord', {
    user: user
  });
}

module.exports = userRouter;


