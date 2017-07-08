var superagent = require('superagent');
var port = (process.env.PORT === undefined) ? '9088' : process.env.PORT;

describe('homepage', function(){
  it('should respond to GET',function(){
    superagent
      .get('http://localhost:'+port)
      .end(function(res){
        expect(res.status).to.equal(200);
    });
  });
});

describe('login', function(){
  it('should respond to POST login',function(){
    superagent
      .post('http://localhost:'+port+'/navToUserDashbord')
      .send({ usrt: '', exampleInputEmail1: 'ganesh@gmail.com', exampleInputPassword1:'shiva' })
      .end(function(res){
        expect(res.status).to.equal(200);
    });
  });
});