var systemConfig = require('../controllers/systemController');
var mongoose = systemConfig.mongooseModule();
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    user_id :  String,
    coupon_id: String,
    trans_date: Date,
    trans_type: String
},  {collection: 'transactions'});

var TransactionsModel = mongoose.model('transactions', transactionSchema);

module.exports = TransactionsModel;