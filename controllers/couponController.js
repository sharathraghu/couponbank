var expressConfig = require('../controllers/systemController');
const User = require('../classes/user');

var express = expressConfig();
var couponRouter = express.Router();

const Coupon = require('../classes/coupon.js');

couponRouter.post('/newCoupon', function(req, res){
  let coupon = new Coupon();
  var coupons = [];
  var couponSession = req.session;
  coupon.setCouponName(req.body.couponName);
  coupon.setCompanyName(req.body.companyName);
  coupon.setFilePath(req.files.exampleInputFile.name);
  coupon.setFileBinData("data:"+req.files.exampleInputFile.mimetype+";base64,"+new Buffer(req.files.exampleInputFile.data).toString('base64')); 
  coupons.push(coupon);
  
  var user = new User();
  user.setFisrstName(couponSession.user._firstName);
  user.setFisrstName(couponSession.user._lastName);
  user.setFisrstName(couponSession.user._email);
  user.setFisrstName(couponSession.user._password);
  res.render('myCoupons', {
    user: user,
    coupons: coupons
  });
});

module.exports = couponRouter;