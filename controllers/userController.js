var expressConfig = require('../controllers/systemController');
var express = expressConfig();
var userRouter = express.Router();

const User = require('../classes/user');

userRouter.post("/navToUserDashbord", function(req, res) {
  var email = req.body.exampleInputEmail1;
  var password = req.body.exampleInputPassword1;
  let user = new User();
  var couponSession = req.session;
  user.setEmail(email);
  user.setPassword(password);
  couponSession.user = user;
  
  res.render('userDashbord', {
    user: user,
    imgData: ""
  });
});

userRouter.post('/createNewUser',function(req, res){
  let user = new User();
  var couponSession = req.session;
  user.setEmail(req.body.exampleInputEmail1);
  user.setPassword(req.body.exampleInputPassword1);
  user.setFisrstName(req.body.firstName);
  user.setLastName(req.body.lastName);
  couponSession.user = user;
 
  res.render('userDashbord', {
    user: user,
    imgData: ""
  })
});

userRouter.post('/forgotPassword', function(req, res) { 
  res.render('home');
});

userRouter.get('/userLogout', function(req, res) {
  var couponSession = req.session;
  couponSession.destroy(function(err) {
    console.log("User Logged out!!!");
  });
  res.render('home');
});

module.exports = userRouter;


