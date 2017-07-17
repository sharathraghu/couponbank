var systemConfig = require('./systemController');
const User = require('../classes/user');
var CouponModel = require('../classes/couponModel');
const Coupon = require('../classes/coupon');
const Review = require('../classes/review');

var log = systemConfig.loggerModule();
var express = systemConfig.expressModule();
var couponRouter = express.Router();

couponRouter.post('/newCoupon', function (req, res, next) {
  var coupons = [];
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();
  var pagesToDisp = 0;
  var perPageLimit = 5;

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  var newCoupon = new CouponModel(
    {
      coupon_name: req.body.couponName,
      coupon_categoty: req.body.couponCategory,
      binary_data: req.body.exampleInputFile,
      user_id : user.getEmail(),
      coupon_tag: 'uploaded'
    }
  );

  newCoupon.save(function (err) {
    if (err) throw err;
    CouponModel.find({$and: [{user_id:user.getEmail()}, {coupon_tag: 'uploaded'}]}, function (err, couponsFromDB) {
      if (err) throw err;
      CouponModel.count({}, function (err, count) {
        pagesToDisp = count / perPageLimit;
        rtrieveAndDisplay(couponsFromDB, coupons, res, user, pagesToDisp);
        next();
      });
    });
  });
});

couponRouter.get('/myCoupons', function (req, res, next) {
  var coupons = [];
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();
  var perPageLimit = 5;
  var pagesToDisp = 0;
  var pageNum = req.query.page === undefined ? 0 : req.query.page;

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  CouponModel.find({$and: [{user_id:user.getEmail()}, {coupon_tag: 'uploaded'}]}, {}, { limit: perPageLimit, skip: (perPageLimit * pageNum) }, function (err, couponsFromDB) {
    if (err) throw err;
    CouponModel.count({}, function (err, count) {
      pagesToDisp = count / perPageLimit;
      rtrieveAndDisplay(couponsFromDB, coupons, res, user, pagesToDisp);
      next();
    });
  });
});

couponRouter.get('/dashboard', function (req, res, next) {
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);

  res.render('userDashbord', {
    user: user
  });
});

function rtrieveAndDisplay(couponsFromDB, coupons, res, user, pagesToDisp) {
  couponsFromDB.forEach(function (element) {
    let coupon = new Coupon();

    coupon.setCouponName(element.coupon_name);
    coupon.setCouponCategory(element.coupon_categoty);
    coupon.setFileBinData(element.binary_data);

    coupons.push(coupon);
  });
  res.render('myCoupons', {
    user: user,
    coupons: coupons,
    pagesToDisp: Math.ceil(pagesToDisp)
  });
}

module.exports = couponRouter;