var CouponModel = require('../classes/couponModel');
const Coupon = require('../classes/coupon');
var BBPromise = require('bluebird');

class CouponService {

    getAllCoupons() { 
        return new BBPromise(function(resolve, reject){
            CouponModel.find().exec().then(function(couponsFromDB) {
                var coupons = [];
                couponsFromDB.forEach(function (element) {
                  let coupon = new Coupon();
            
                  coupon.setCouponName(element.coupon_name);
                  coupon.setCouponCategory(element.coupon_categoty);
                  coupon.setFileBinData(element.binary_data);
                  coupons.push(coupon);
                });
                resolve(coupons);
            }).catch(function(err){
                reject(err);
            });
        });
    }
}

module.exports = CouponService;