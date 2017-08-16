class Coupon {

    constructor() {
        this._couponName = "";
        this._couponCategory = "";
        this._fileBinData = "";
        this._reviews = [];
        this._email ="";
        this._couponTag = "";
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

    getEmail() {
        return this._email;
    }

    setEmail(email) {
        this._email = email;
    }

    getCouponTag() {
        return this._couponTag;
    }

    setCouponTag(couponTag) {
        this._couponTag = couponTag;
    }
}
module.exports = Coupon;