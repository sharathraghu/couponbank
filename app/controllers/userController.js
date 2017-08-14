var systemConfig = require('./systemController');
const User = require('../classes/user');
const Coupon = require('../classes/coupon');
var UserModel = require('../classes/userModel');
const CouponService = require('../services/couponService');

var express = systemConfig.expressModule();
var userRouter = express.Router();
var log = systemConfig.loggerModule();

userRouter.post("/navToUserDashbord", function (req, res, next) {
  let user = new User();
  var couponSession = req.session;

  if (req.body.usrt === 'n') {
    var newUser = new UserModel({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.exampleInputEmail1,
      password: req.body.exampleInputPassword1
    });

    user.setFisrstName(req.body.firstName);
    user.setLastName(req.body.lastName);
    user.setEmail(req.body.exampleInputEmail1);

    newUser.save(function (err) {
      if (err) throw err;
      couponSession.user = user;
      navigateToUsrDashboard(res, user);
      next();
    });
  } else {
    UserModel.findOne({ email: req.body.exampleInputEmail1 }, function (err, userDB) {
      if (err) throw err;
      if (userDB != null && userDB.password === req.body.exampleInputPassword1) {
        user.setFisrstName(userDB.first_name);
        user.setLastName(userDB.last_name);
        user.setEmail(userDB.email);
        couponSession.user = user;
        navigateToUsrDashboard(res, user);
      } else {
        navigateToUsrDashboard(res, user);
      }
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

  couponSession.destroy(function (err) {
    console.log("User Logged out!!!");
  });

  getAllCoupons(res);
});

function getAllCoupons(res) {
  let couponService = new CouponService();
  couponService.getAllCoupons().then(function (couponsFromDB) {
    var coupons = [];
    couponsFromDB.forEach(function (element) {
      let coupon = new Coupon();

      coupon.setCouponName(element.coupon_name);
      coupon.setCouponCategory(element.coupon_categoty);
      coupon.setFileBinData(element.binary_data);
      coupons.push(coupon);
    });
    res.render('home', {
      coupons: coupons
    });
  }).catch(function (err) {
    throw err;
  });
}

function navigateToUsrDashboard(res, user) {
  let couponService = new CouponService();
  couponService.getAllCoupons().then(function (couponsFromDB) {
    var coupons = [];
    couponsFromDB.forEach(function (element) {
      let coupon = new Coupon();

      coupon.setCouponName(element.coupon_name);
      coupon.setCouponCategory(element.coupon_categoty);
      coupon.setFileBinData(element.binary_data);
      coupons.push(coupon);
    });
    res.render('userDashbord', {
      user: user,
      coupons: coupons
    });
  }).catch(function (err) {
    throw err;
  });
}

module.exports = userRouter;


