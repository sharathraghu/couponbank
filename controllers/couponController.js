var expressConfig = require('../controllers/systemController');
const User = require('../classes/user');

var express = expressConfig();
var couponRouter = express.Router();
var CouponModel = require('../classes/couponModel');

const Coupon = require('../classes/coupon.js');

couponRouter.post('/newCoupon', function(req, res,next){
  var coupons = [];
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);
  user.setPassword(suser._password);

  var newCoupon = new CouponModel(
    {
      coupon_name : req.body.couponName,
      company_name : req.body.companyName,
      file_type : req.files.exampleInputFile.mimetype,
      binary_data : req.files.exampleInputFile.data
    }
  );

  newCoupon.save(function(err) {
    if (err) throw err;
    CouponModel.find({}, function(err, couponsFromDB) {
      if (err) throw err;
      rtrieveAndDisplay(couponsFromDB,coupons,res, user);
      next();
    });
  });
});

couponRouter.get('/myCoupons', function(req, res,next){
  var coupons = [];
  var couponSession = req.session;
  var suser = couponSession.user;
  let user = new User();

  user.setFisrstName(suser._firstName);
  user.setLastName(suser._lastName);
  user.setEmail(suser._email);
  user.setPassword(suser._password);

  CouponModel.find({}, function(err, couponsFromDB) {
    if (err) throw err;
    rtrieveAndDisplay(couponsFromDB,coupons,res, user);
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

function rtrieveAndDisplay(couponsFromDB, coupons, res, user) {
  couponsFromDB.forEach(function(element) {
        let coupon = new Coupon();
        coupon.setCouponName(element.coupon_name);
        coupon.setCompanyName(element.company_name);
        coupon.setFileBinData("data:"+element.file_type+";base64,"+element.binary_data.toString('base64'));
        coupons.push(coupon);          
  });
  res.render('myCoupons', {
    user: user,
    coupons: coupons
  });
}

module.exports = couponRouter;