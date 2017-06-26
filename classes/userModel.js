var systemConfig = require('../controllers/systemController');
var mongoose = systemConfig.mongooseModule();
var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
},  {collection: 'users'});

var UserModel = mongoose.model('users',userSchema);

module.exports = UserModel;