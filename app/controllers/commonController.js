var systemConfig = require('../controllers/systemController');
const CouponService = require('../services/couponService');
var express = systemConfig.expressModule();
var commonRouter = express.Router();

var log = systemConfig.loggerModule();

commonRouter.get('/', function (req, res, next) {
    log.info("%s", "Lord Ganesh grace");
    let couponService = new CouponService();
    couponService.getAllCoupons().then(function (coupons) {
        res.render('home', {
            coupons: coupons
        });
    }).catch(function (err) {
        throw err;
    });
});

module.exports = commonRouter;