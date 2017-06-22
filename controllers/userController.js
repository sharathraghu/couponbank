var expressConfig = require('../controllers/systemController');
var express = expressConfig();
var userRouter = express.Router();

const User = require('../classes/user');

userRouter.post("/navToUserDashbord", function(req, res) {
  let user = new User();
  var couponSession = req.session;
  if(req.body.usrt === 'n') {
      user.setFisrstName(req.body.firstName);
      user.setLastName(req.body.lastName);
  }
  user.setEmail(req.body.exampleInputEmail1);
  user.setPassword(req.body.exampleInputPassword1);
  couponSession.user = user;
  
  res.render('userDashbord', {
    user: user,
    imgData: ""
  });
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


