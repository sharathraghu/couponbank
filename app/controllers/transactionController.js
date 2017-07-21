var systemConfig = require('./systemController');
const User = require('../classes/user');
var TransactionModel = require('../classes/transactionModel');

var log = systemConfig.loggerModule();
var express = systemConfig.expressModule();
var transRouter = express.Router();

transRouter.get('/history', function (req, res, next) {

});

module.exports = transRouter;