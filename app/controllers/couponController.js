var systemConfig = require('./systemController');
const User = require('../classes/user');
var CouponModel = require('../classes/couponModel');
const Coupon = require('../classes/coupon');
const Review = require('../classes/review');

var log = systemConfig.loggerModule();
var express = systemConfig.expressModule();
var couponRouter = express.Router();

couponRouter.post('/newCoupon', function(req, res,next){
  var coupons = [];
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();
  var perPageLimit = 5;

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);
  user.setPassword(suser._password);

  var newCoupon = new CouponModel(
    {
      coupon_name : req.body.couponName,
      coupon_categoty : req.body.couponCategory,
      binary_data : req.body.exampleInputFile
    }
  );

  newCoupon.save(function(err) {
    if (err) throw err;
    CouponModel.find({}, function(err, couponsFromDB) {
      if (err) throw err;
      rtrieveAndDisplay(couponsFromDB,coupons,res, user, perPageLimit);
      next();
    });
  });
});

couponRouter.get('/myCoupons', function(req, res,next){
  var coupons = [];
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();
  var perPageLimit = 5;
  var pageNum = req.query.page === undefined?0:req.query.page;

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);
  user.setPassword(suser._password);

  CouponModel.find({}, {}, {limit: perPageLimit, skip:(perPageLimit * pageNum)}, function(err, couponsFromDB) {
    if (err) throw err;
    rtrieveAndDisplay(couponsFromDB,coupons,res, user, perPageLimit);
    next();
  });
});

couponRouter.get('/dashboard', function(req, res, next) {
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);
  user.setPassword(suser._password);

    res.render('userDashbord',{
      user:user
    });
});

function rtrieveAndDisplay(couponsFromDB, coupons, res, user, perPageLimit) {
  couponsFromDB.forEach(function(element) {
        let coupon = new Coupon();

        coupon.setCouponName(element.coupon_name);
        coupon.setCouponCategory(element.coupon_categoty);
        coupon.setFileBinData(element.binary_data);  
            
        coupons.push(coupon);          
  });  
  res.render('myCoupons', {
    user: user,
    coupons: coupons,
    pagesToDisp:(coupons.length)/perPageLimit
  });
  log.info((coupons.length)/perPageLimit);
}

module.exports = couponRouter;