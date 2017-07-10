var systemConfig = require('../controllers/systemController');
var mongoose = systemConfig.mongooseModule();
var Schema = mongoose.Schema;

var couponSchema = new Schema({
    coupon_name :  String,
    coupon_categoty: String,
    binary_data: Buffer,
    reviews: {
        comments: String,
        rating: String,
        oneliner: String
    },
    user_id: String
},  {collection: 'coupons'});

var CouponModel = mongoose.model('coupons', couponSchema);

module.exports = CouponModel;