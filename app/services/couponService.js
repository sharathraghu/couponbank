var CouponModel = require('../classes/couponModel');
const Coupon = require('../classes/coupon');

class CouponService {

    getAllCoupons() {
        var coupons = [];
        var promise = CouponModel.find().exec();
        promise.then(function (couponsFromDB) {            
            couponsFromDB.forEach(function (element) {
                let coupon = new Coupon();

                coupon.setCouponName(element.coupon_name);
                coupon.setCouponCategory(element.coupon_categoty);
                coupon.setFileBinData(element.binary_data);
                coupons.push(coupon);
            });            
        }).catch(function(err) {
            console.log(err);
            throw err;
        });
        return coupons;
    }
}

module.exports = CouponService;