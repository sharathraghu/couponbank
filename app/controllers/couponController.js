var systemConfig = require('./systemController');
const User = require('../classes/user');
var CouponModel = require('../classes/couponModel');
const Coupon = require('../classes/coupon');
const Review = require('../classes/review');
const CouponService = require('../services/couponService');

var log = systemConfig.loggerModule();
var express = systemConfig.expressModule();
var couponRouter = express.Router();

couponRouter.post('/newCoupon', function (req, res, next) {
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();
  var pagesToDisp = 0;
  var perPageLimit = 5;
  let couponService = new CouponService();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  let newCoupon = new Coupon();
  newCoupon.setCouponName(req.body.couponName);
  newCoupon.setCouponCategory(req.body.couponCategory);
  newCoupon.setFileBinData(req.body.exampleInputFile);
  newCoupon.setEmail(user.getEmail());
  newCoupon.setCouponTag('uploaded');

  couponService.saveNewCoupon(newCoupon).then(function (product) {
    couponService.getCouponsByEmailIdAndTag(user.getEmail(), 'uploaded', perPageLimit, pageNum).then(function (coupons) {
      couponService.getTotalCouponCountByEmailAndTag(user.getEmail(), 'uploaded').then(function (count) {
        pagesToDisp = count / perPageLimit;
        rtrieveAndDisplay(coupons, res, user, pagesToDisp);
      }).catch(function (err) {
        throw err;
      });
    }).catch(function (err) {
      throw err;
    });
  }).catch(function (err) {
    throw err;
  });
});

couponRouter.get('/myCoupons', function (req, res, next) {
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();
  let couponService = new CouponService();

  var perPageLimit = 5;
  var pagesToDisp = 0;
  var pageNum = req.query.page === undefined ? 0 : req.query.page;

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  couponService.getCouponsByEmailIdAndTag(user.getEmail(), 'uploaded', perPageLimit, pageNum).then(function (coupons) {
    couponService.getTotalCouponCountByEmailAndTag(user.getEmail(), 'uploaded').then(function (count) {
      pagesToDisp = count / perPageLimit;
      rtrieveAndDisplay(coupons, res, user, pagesToDisp);
    }).catch(function (err) {
      throw err;
    });
  }).catch(function (err) {
    throw err;
  });

});

couponRouter.get('/dashboard', function (req, res, next) {
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();
  let couponService = new CouponService();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  couponService.getAllCoupons().then(function (coupons) {
    res.render('userDashbord', {
      user: user,
      coupons: coupons
    });
  }).catch(function (err) {
    throw err;
  });
});

couponRouter.post('/searchCoupon', function (req, res) {
  let couponService = new CouponService();

  couponService.searchCoupon(req.body.couponSrchBox).then(function (coupons) {
    res.render('home', {
      coupons: coupons
    });
  }).catch(function (err) {
    throw err;
  });
});

function rtrieveAndDisplay(coupons, res, user, pagesToDisp) {
  res.render('myCoupons', {
    user: user,
    coupons: coupons,
    pagesToDisp: Math.ceil(pagesToDisp)
  });
}

module.exports = couponRouter;