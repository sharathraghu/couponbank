class Coupon {

    constructor() {
        this._couponName = "";
        this._couponCategory = "";
        this._fileBinData = "";
        this._reviews = new Array();
    }

    getCouponName() {
        return this._couponName;
    }

    setCouponName(couponName) {
        this._couponName = couponName;
    }

    getCouponCategory() {
        return this._couponCategory;
    }

    setCouponCategory(couponCategory) {
        this._couponCategory = couponCategory;
    }

    getFileBinData() {
        return this._fileBinData;
    }

    setFileBinData(fileBinData) {
        this._fileBinData = fileBinData;
    }

    getReviews() {
        return this._reviews;
    }

    setReviews(reviews) {
        this._reviews = reviews;
    }
}
module.exports = Coupon;