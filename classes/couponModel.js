var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponSchema = new Schema({
    coupon_name :  String,
    company_name: String,
    binary_data: Buffer,
    file_type: String
},  {collection: 'coupons'});

var CouponModel = mongoose.model('coupons', couponSchema);

module.exports = CouponModel;