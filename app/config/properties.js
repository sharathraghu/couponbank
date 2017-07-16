var properties = {
    "development":{
        "mongoDBURL" : "mongodb://couponbank:bankcoupon@ds147842.mlab.com:47842/couponbank"
    },
    "production" : {
        "mongoDBURL" : "mongodb://couponbank:bankcoupon@couponbankcluster-shard-00-00-myyod.mongodb.net:27017,couponbankcluster-shard-00-01-myyod.mongodb.net:27017,couponbankcluster-shard-00-02-myyod.mongodb.net:27017/couponbank?ssl=true&replicaSet=CouponBankCluster-shard-0&authSource=admin"
    }
};

module.exports = properties;