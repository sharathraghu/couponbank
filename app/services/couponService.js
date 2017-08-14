var CouponModel = require('../classes/couponModel');
const Coupon = require('../classes/coupon');

class CouponService {

    getAllCoupons() {        
        return CouponModel.find().exec();
    }
}

module.exports = CouponService;