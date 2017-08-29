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

    req.checkBody('exampleInputEmail1','Email is not valid').notEmpty().isEmail();
    req.checkBody('exampleInputPassword1','Password is not valid').isLength({min: 6});
    var errors = req.validationErrors();
    if(errors) {
      res.render('userLogin', {
        hasError: true,
        errorMessage: 'User Name already existis, please try with different user name',
        couponCsrfToken: req.csrfToken()
      });
    }
    userService.getUserByEmail(req.body.exampleInputEmail1).then(function (userDB) {
      if(userDB == null) {
        userService.saveNewUser(user).then(function (product) {
          couponSession.user = user;
          navigateToUsrDashboard(res, user);
        }).catch(function (err) {
          throw err;
        });
      } else {
        res.render('userLogin', {
          hasError: true,
          errorMessage: 'User Name already existis, please try with different user name',
          couponCsrfToken: req.csrfToken()
        });
      }
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
        navigateToHome(req, res);
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
  let userService = new UserService();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  userService.updateUserPasswordUsingEmail(user.getEmail(), req.body.inputPassword2).then(function (rowsAffected) {
    navigateToUsrDashboard(res, user);
  });
});

userRouter.get('/userLogout', function (req, res, next) {
  navigateToHome(req, res);
});

userRouter.get('/userstuff', function(req, res){
  res.render('userLogin', {
    couponCsrfToken: req.csrfToken(),
    hasError: false
  });
});

function navigateToHome(req, res) {
  var couponSession = req.session;
  let couponService = new CouponService();

  couponSession.destroy(function (err) {
    console.log("User Logged out!!!");
  });

  couponService.getAllCoupons().then(function (coupons) {
    res.render('home', {
      coupons: coupons
    });
    return null;
  }).catch(function (err) {
    throw err;
  });
}

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


