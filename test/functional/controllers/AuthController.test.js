var request = require('supertest');

describe('AuthController', function() {

  describe('/doLogin', function() {
    it('should redirect to /login', function (done) {
      request(sails.hooks.http.app)
        .get('/doLogin')
        .expect('location','/login', done);
    });
    it('should login with email', function(done) {
      request(sails.hooks.http.app)
        .post('/doLogin')
        .send({
          Login: {
            email: 'monkeymon@gmail.com',
            password: 'shohoku10'
          }
        })
        .expect()
    })
  });

});
