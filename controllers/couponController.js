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
  coupons.push(coupon);
 var user = couponSession.user;
 console.log(user);
  res.render('myCoupons', {
    user: user,
    coupons: coupons
  });
});

module.exports = couponRouter;