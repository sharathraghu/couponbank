var express = require('express');
var mongoose = require('mongoose');
var Logger = require('bunyan');

mongoose.connect('mongodb://couponbank:bankcoupon@couponbankcluster-shard-00-00-myyod.mongodb.net:27017,couponbankcluster-shard-00-01-myyod.mongodb.net:27017,couponbankcluster-shard-00-02-myyod.mongodb.net:27017/couponbank?ssl=true&replicaSet=CouponBankCluster-shard-0&authSource=admin');

var log = new Logger({
  name: 'couponbankapi',
  streams: [
    {
      stream: process.stdout,
      level: 'debug'
    },
    {
      path: 'sysout.log',
      level: 'trace'
    }
  ]
});

module.exports = {
    expressModule : function()
    { return express; },
    loggerModule: function()
    { return log; },
    mongooseModule: function() 
    { return mongoose; }
}