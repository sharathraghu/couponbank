var UserModel = require('../classes/userModel');
var BBPromise = require('bluebird');

class UserService {

    saveNewUser(user) {
        return new BBPromise(function (resolve, reject) {
            var newUser = new UserModel({
                first_name: user._firstName,
                last_name: user._lastName,
                email: user._email,
                password: user._password
            });
            newUser.save().then(function(product){
                resolve(product);
            }).catch(function(err){
                reject(err);
            });
        });
    }

    getUserByEmail(email) {       
        return new BBPromise(function (resolve, reject) {
            UserModel.findOne({ email: email }).exec().then(function(userFromDB) {
                resolve(userFromDB);
            }).catch(function(err){
                reject(err);
            });
        });
    }
}

module.exports = UserService;