var express = require('express');
var mongoose = require('mongoose');
var Logger = require('bunyan');

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
  { return mongoose; }
};