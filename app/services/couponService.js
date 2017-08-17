var CouponModel = require('../classes/couponModel');
const Coupon = require('../classes/coupon');
var BBPromise = require('bluebird');

class CouponService {

    getAllCoupons() {
        return new BBPromise(function (resolve, reject) {
            CouponModel.find().exec().then(function (couponsFromDB) {
                var coupons = [];
                couponsFromDB.forEach(function (element) {
                    let coupon = new Coupon();

                    coupon.setCouponName(element.coupon_name);
                    coupon.setCouponCategory(element.coupon_categoty);
                    coupon.setFileBinData(element.binary_data);
                    coupons.push(coupon);
                });
                resolve(coupons);
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    saveNewCoupon(coupon) {
        return new BBPromise(function (resolve, reject) {
            var newCoupon = new CouponModel({
                coupon_name: coupon._couponName,
                coupon_categoty: coupon._couponCategory,
                binary_data: coupon._fileBinData,
                user_id: coupon._email,
                coupon_tag: coupon._couponTag
            });
            newCoupon.save().then(function (product) {
                resolve(product);
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    getCouponsByEmailIdAndTag(email, tag, perPageLimit, pageNum) {
        return new BBPromise(function (resolve, reject) {
            CouponModel.find({ $and: [{ user_id: email }, { coupon_tag: tag }] }, {}, { limit: perPageLimit, skip: (perPageLimit * pageNum) }).exec().then(function (couponsFromDB) {
                var coupons = [];
                couponsFromDB.forEach(function (element) {
                    let coupon = new Coupon();

                    coupon.setCouponName(element.coupon_name);
                    coupon.setCouponCategory(element.coupon_categoty);
                    coupon.setFileBinData(element.binary_data);

                    coupons.push(coupon);
                });
                resolve(coupons);
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    getTotalCouponCountByEmailAndTag(email, tag) {
        return new BBPromise(function (resolve, reject) {
            CouponModel.count({ $and: [{ user_id: email }, { coupon_tag: tag }] }).exec().then(function (count) {
                resolve(count);
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    searchCoupon(key) {
        return new BBPromise(function (resolve, reject) {
            CouponModel.find({ $or: [{ coupon_name: key }, { coupon_categoty: key }] }, {}).exec().then(function (couponsFromDB) {
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