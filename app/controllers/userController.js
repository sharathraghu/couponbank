var systemConfig = require('./systemController');
const User = require('../classes/user');
const CouponService = require('../services/couponService');
const UserService = require('../services/userService');

var express = systemConfig.expressModule();
var userRouter = express.Router();
var log = systemConfig.loggerModule();

userRouter.post("/navToUserDashbord", function (req, res, next) {
  let user = new User();
  var couponSession = req.session;
  let userService = new UserService();

  if (req.body.usrt === 'n') {
    user.setFisrstName(req.body.firstName);
    user.setLastName(req.body.lastName);
    user.setEmail(req.body.exampleInputEmail1);
    user.setPassword(req.body.exampleInputPassword1);

    userService.saveNewUser(user).then(function (product) {
      couponSession.user = user;
      navigateToUsrDashboard(res, user);
    }).catch(function (err) {
      throw err;
    });
  } else {
    userService.getUserByEmail(req.body.exampleInputEmail1).then(function (userDB) {
      if (userDB != null && userDB.password === req.body.exampleInputPassword1) {
        user.setFisrstName(userDB.first_name);
        user.setLastName(userDB.last_name);
        user.setEmail(userDB.email);
        couponSession.user = user;
        navigateToUsrDashboard(res, user);
      } else {
        navigateToUsrDashboard(res, user);
      }
    }).catch(function (err) {
      throw err;
    });
  }

});

userRouter.get('/userprofile', function (req, res, next) {
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  res.render('userprofile', {
    user: user
  });
  next();
});

userRouter.post('/updateProfile', function (req, res, next) {
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  UserModel.update({ email: user.getEmail() }, { $set: { password: req.body.inputPassword2 } }, function (err, rowsAffected) {
    if (err) throw err;
    res.render('userDashbord', {
      user: user
    });
  });
});

userRouter.get('/userLogout', function (req, res, next) {
  var couponSession = req.session;
  let couponService = new CouponService();

  couponSession.destroy(function (err) {
    console.log("User Logged out!!!");
  });

  couponService.getAllCoupons().then(function (coupons) {
    res.render('home', {
      coupons: coupons
    });
  }).catch(function (err) {
    throw err;
  });

});

function navigateToUsrDashboard(res, user) {
  let couponService = new CouponService();
  couponService.getAllCoupons().then(function (coupons) {
    res.render('userDashbord', {
      user: user,
      coupons: coupons
    });
  }).catch(function (err) {
    throw err;
  });
}

module.exports = userRouter;


