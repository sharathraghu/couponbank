var expressConfig = require('../controllers/systemController');
var express = expressConfig();
var couponRouter = express.Router();

const Coupon = require('../classes/coupon.js');

couponRouter.post('/newCoupon', function(req, res){
  let coupon = new Coupon();
  var coupons = [];
  var couponSession = req.session;
  console.log(couponSession);
  coupon.setCouponName(req.body.couponName);
  coupon.setCompanyName(req.body.companyName);
  coupon.setFilePath(req.files.exampleInputFile.name);
  coupon.setFileBinData("data:"+req.files.exampleInputFile.mimetype+";base64,"+new Buffer(req.files.exampleInputFile.data).toString('base64')); 
  coupons.push(coupon);
  coupons.push(coupon);
  res.render('myCoupons', {
    coupons: coupons
  });
});

module.exports = couponRouter;