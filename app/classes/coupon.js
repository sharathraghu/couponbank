class Coupon {

    constructor() {
        this._couponName = "";
        this._companyName = "";
        this._fileType = "";
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

    getFileType(){
        return this._fileType;
    }

    setFileType(fileType) {
        this._fileType = fileType;
    }

    setFileBinData(fileBinData) {
        this._fileBinData = fileBinData;
    }

    getFileBinData() {
        return this._fileBinData;
    }
}
module.exports = Coupon;