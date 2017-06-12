class Coupon {

    constructor() {
        this._couponName = "";
        this._companyName = "";
        this._filePath = "";
        this._fileBinData = "";
    }

    getCouponName() {
        return this._couponName;
    }

    setCouponName(couponName) {
        this._couponName = couponName;
    }

    getCompanyName() {
        this._companyName;
    }

    setCompanyName(companyName) {
        this._companyName = companyName;
    }

    getFilePath(){
        return this._filePath;
    }

    setFilePath(filePath) {
        this._filePath = filePath;
    }

    setFileBinData(fileBinData) {
        this._fileBinData = fileBinData;
    }

    getFileBinData() {
        return this._fileBinData;
    }
}
module.exports = Coupon;