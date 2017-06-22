var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://couponbank:bankcoupon@couponbankcluster-shard-00-00-myyod.mongodb.net:27017,couponbankcluster-shard-00-01-myyod.mongodb.net:27017,couponbankcluster-shard-00-02-myyod.mongodb.net:27017/couponbank?ssl=true&replicaSet=CouponBankCluster-shard-0&authSource=admin');

module.exports = function() { 
    return express;
};