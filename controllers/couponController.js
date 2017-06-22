var expressConfig = require('../controllers/systemController');
const User = require('../classes/user');

var express = expressConfig();
var couponRouter = express.Router();
var mongoose = require('mongoose');
var CouponModel = require('../classes/couponModel');

const Coupon = require('../classes/coupon.js');
mongoose.connect('mongodb://couponbank:bankcoupon@couponbankcluster-shard-00-00-myyod.mongodb.net:27017,couponbankcluster-shard-00-01-myyod.mongodb.net:27017,couponbankcluster-shard-00-02-myyod.mongodb.net:27017/couponbank?ssl=true&replicaSet=CouponBankCluster-shard-0&authSource=admin');

couponRouter.post('/newCoupon', function(req, res){
  let coupon = new Coupon();
  var coupons = [];
  var couponSession = req.session;
<<<<<<< HEAD
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
=======
  
  var newCoupon = new CouponModel(
    {
      coupon_name : req.body.couponName,
      company_name : req.body.companyName,
      file_type : req.files.exampleInputFile.mimetype,
      binary_data : new Buffer(req.files.exampleInputFile.data)
    }
  );

  newCoupon.save(function(err) {
    if (err) throw err;
    CouponModel.find({}, function(err, couponsFromDB) {
      if (err) throw err;
      couponsFromDB.forEach(function(element) {
          let coupon = new Coupon();
          coupon.setCouponName(element.coupon_name);
          coupon.setCompanyName(element.company_name);
          coupon.setFileBinData("data:"+element.file_type+";base64,"+new Buffer(element.binary_data).toString('base64'));
          coupons.push(coupon);
      });
    });
  });

>>>>>>> refs/remotes/origin/master
  res.render('myCoupons', {
    user: user,
    coupons: coupons
  });
});

couponRouter.get('/myCoupons', function(req, res){
  var coupons = [];
  var couponSession = req.session;

  CouponModel.find({}, function(err, couponsFromDB) {
    if (err) throw err;
    couponsFromDB.forEach(function(element) {
        let coupon = new Coupon();
        coupon.setCouponName(element.coupon_name);
        coupon.setCompanyName(element.company_name);
        coupon.setFileBinData("data:"+element.file_type+";base64,"+element.binary_data.toString('base64'));
        coupons.push(coupon);
    });
  });
});

module.exports = couponRouter;