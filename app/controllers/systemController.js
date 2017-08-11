var express = require('express');
var mongoose = require('mongoose');
var Logger = require('bunyan');
var BBPromise = require("bluebird");

var log = new Logger({
  name: 'couponbankapi',
  streams: [
    {
      path: 'sysout.log',
      level: 'trace'
    },
    {
      level: 'trace',
      stream: process.stdout
    }
  ]
});

module.exports = {
  expressModule: function ()
  { return express; },
  loggerModule: function ()
  { return log; },
  mongooseModule: function ()
  { 
    BBPromise.promisifyAll(mongoose);
    mongoose.Promise = BBPromise;
    return mongoose; 
  }
};