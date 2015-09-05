var request = require('supertest'),
    should = require('should'),
    moment = require('moment')

describe('AuthController', function() {
  describe('/doLogin', function() {
    it('should redirect to /login', function (done) {
      request(sails.hooks.http.app)
        .get('/doLogin')
        .expect(302)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    });
    it('should not login directly to doLogin', function(done) {
      request(sails.hooks.http.app)
        .post('/doLogin')
        .send({
          Login: {
            email: 'monkeymon@gmail.com',
            password: 'shohoku10'
          }
        })
        .expect(404)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should login with email', function(done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({
          Login: {
            email: 'monkeymon@gmail.com',
            password: 'shohoku10'
          }
        })
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should login with username', function(done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({
          Login: {
            email: 'monkeymon',
            password: 'shohoku10'
          }
        })
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should not login with username for inactive', function(done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({
          Login: {
            email: 'monkeymon4@gmail.com',
            password: 'shohoku10'
          }
        })
        .expect(404)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should not login with username for inactive', function(done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({
          Login: {
            email: 'monkeymon4',
            password: 'shohoku10'
          }
        })
        .expect(404)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
  });
  describe('/activate-user', function() {
    it('should activate user', function(done) {
      request(sails.hooks.http.app)
        .get('/activate-user/1ryz9XZoA3XX')
        .expect(302)
        .end(function(err,res) {
          should.not.exist(err)
          should(res.headers).have.property('location','/')
          User.findOne(3, function(err,result) {
            result.active.should.equal(true)
            should(result.code).not.be.ok()
            should(result.codeExpire).not.be.ok()
            done()
          })
        })
    })
    it('should not be able to find anyone', function(done) {
      request(sails.hooks.http.app)
        .get('/activate-user/12cqdqwd8402')
        .expect(302)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should not be able to find anyone if the code already expire', function(done) {
      request(sails.hooks.http.app)
        .get('/activate-user/1ryz9XZoA3XX22')
        .expect(302)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
  })
  describe('/register', function() {
    it('should not access /doRegister by get', function(done) {
      request(sails.hooks.http.app)
        .get('/doRegister')
        .expect(302)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should not access /doRegister by post', function(done) {
      request(sails.hooks.http.app)
        .post('/doRegister')
        .expect(404)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should access register page', function(done) {
      request(sails.hooks.http.app)
        .get('/register')
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should not register user (exist)', function(done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({
          User: {
            username: "monkeymon",
            email: "monkeymon@gmail.com",
            password: "shohoku10",
            firstName: "Chris",
            lastName: "Sim"
          }
        })
        .expect(400)
        .end(function(err,res) {
          res.body.errorAttributes.username.should.containDeep([{message:'Username already exist'}])
          res.body.errorAttributes.email.should.containDeep([{message:'Email already exist'}])
          done();
        })
    })
    it('should not register user (exist in account)', function(done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({
          User: {
            username: "testingName",
            email: "monkeymon@gmail.com",
            password: "shohoku10",
            firstName: "Chris",
            lastName: "Sim"
          }
        })
        .expect(400)
        .end(function(err,res) {
          res.body.errorAttributes.username.should.containDeep([{message:'Username already registered'}])
          done();
        })
    })
    it('should not register user (validate error)', function(done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({
          User: {
            username: "",
            email: "monkeymon@gmail",
            password: "",
            firstName: "",
            lastName: ""
          }
        })
        .expect(400)
        .end(function(err,res) {
          res.body.errorAttributes.should.have.property('username')
          res.body.errorAttributes.username.should.containDeep([
            {message:'Username cannot be empty'}
          ])
          res.body.errorAttributes.should.have.property('email')
          res.body.errorAttributes.email.should.containDeep([
            {message:'Email is invalid'}
          ])
          res.body.errorAttributes.should.have.property('password')
          res.body.errorAttributes.password.should.containDeep([
            {message:'Password cannot be empty'}
          ])
          res.body.errorAttributes.should.have.property('firstName')
          res.body.errorAttributes.firstName.should.containDeep([
            {message:'First Name cannot be empty'}
          ])
          res.body.errorAttributes.should.have.property('lastName')
          res.body.errorAttributes.lastName.should.containDeep([
            {message:'Last Name cannot be empty'}
          ])
          done();
        })
    })
    it('should not register user (validate long char)', function(done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({
          User: {
            username: "qwdmqwdibqwdhqwdjbqwdkhjbqwdkjbhqwdkjhbqwdkjbqwdkjhbqwdkhjbqwdkjhbqwdkjhbqwdkjhqbwdkjhqbwdkjhqwbdkjqwhbdkqjhwdbqkwdjhb",
            email: "lqkwbdlqwqdqwdqwdqwdqwdqwdhqwdjhbqwdjbqjwdhbqjhwdbqjhwdbqjwdhbqjhwdbqjhwdbjqhwdbqjhwdbjqhdwbjhqwbdjhqbdwjhqbwdjqhwdbjhqkbdqwjdbqlwkdbqkwlbdqjhb12kb12k3b1kb31lnqlndqiubwdqlwdbvklwdvblkbvhevhkbkhjrbfkjhbdqkjhdbqkjhdwbqkhjwdbqkwdjhbqwdkjhbqwdkjhbqwdkjhqbdwkjhqbdwkjqhdbqkjhwdbqkjhwdbqkjhwdbqkjwdhbqkjhwdbqwkdjhbqwdkjhbqwdkjhqbwdkjhqbwdkjhqwdbqkjhwdbkqjhwdbqkjhwdbqkwjdhbqwdkjhqbwdkjhqbwdkjhqdwbqkjhwdbqkjhdwbqkjhdwbqkjhwdbqkjwdhbqkdjwhbqkwdjhbqkdjhbqdwkjhbqdwkjhqbdwkjhqbdwkjqhbdwkjqhbdwkqjhdwbqkjhwdbqkjwdbqkjdwhbqkdhbqwdkjhqbdwkjhqbdwkqjhwdbkqjhwdbqkjwdhbqkdwjhbqwdkjqbdwkjhqwbdkqjhdbqwkjdhbqkwdjhbqkwdjbqwdkbqwdkjhbqwdhqwdoihoieoqiweoiquweoiquweoqiueoiquweoquie@qwdqw.com",
            password: "qwdmqwdibqwdhqwdjbqwdkhjbqwdkjbhqwdkjhbqwdkjbqwdkjhbqwdkhjbqwdkjhbqwdkjhbqwdkjhqbwdkjhqbwdkjhqwbdkjqwhbdkqjhwdbqkwdjhb",
            firstName: "qwdmqwdibqwdhqwdjbqwdkhjbqwdkjbhqwdkjhbqwdkjbqwdkjhbqwdkhjbqwdkjhbqwdkjhbqwdkjhqbwdkjhqbwdkjhqwbdkjqwhbdkqjhwdbqkwdjhb",
            lastName: "qwdmqwdibqwdhqwdjbqwdkhjbqwdkjbhqwdkjhbqwdkjbqwdkjhbqwdkhjbqwdkjhbqwdkjhbqwdkjhqbwdkjhqbwdkjhqwbdkjqwhbdkqjhwdbqkwdjhb"
          }
        })
        .expect(400)
        .end(function(err,res) {

          res.body.errorAttributes.should.have.property('username')
          res.body.errorAttributes.username.should.containDeep([
            {message:'Username cannot be more than 50 char'}
          ])
          res.body.errorAttributes.should.have.property('email')
          res.body.errorAttributes.email.should.containDeep([
            {message:'Email cannot be more than 255 char'}
          ])
          res.body.errorAttributes.should.have.property('password')
          res.body.errorAttributes.password.should.containDeep([
            {message:'Password cannot be more than 25 char'}
          ])
          res.body.errorAttributes.should.have.property('firstName')
          res.body.errorAttributes.firstName.should.containDeep([
            {message:'First Name cannot be more than 50 char'}
          ])
          res.body.errorAttributes.should.have.property('lastName')
          res.body.errorAttributes.lastName.should.containDeep([
            {message:'Last Name cannot be more than 50 char'}
          ])
          done();
        })
    })
    /*
    it('should renew register user', function(done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({
          User: {
            username: "renewUser",
            email: "renewUser1234@gmail.com",
            password: "shohoku10",
            firstName: "Chris",
            lastName: "Sim"
          }
        })
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err)
          User.findOne({id:6})
            .then(function(userModel){
              var userProfileModel = UserProfile.findOne({userID:userModel.id})
              var accountModel = Account.findOne({name:result.username})
              var accountUserModel = AccountUser.findOne({userID:result.id})
              return [userModel,userProfileModel,accountModel]
            })
            .spread(function(userModel,userProfileModel,accountModel) {
              should.exist(userModel)
              should(userModel.code).not.be.empty()
              userModel.code.should.not.equal('1ryz9XZoA3XX22')
              userModel.codeExpire.should.not.equal('2014-09-02 03:50:14')
              userModel.email.should.equal('renewUser1234@gmail.com')
              accountModel.name.should.equal('renewUser')
            })
            .catch(function(err) {
              should.not.exist(err)
            })
            .error(function(err) {
              should.not.exist(err)
            })
            .finally(function(){
              done()
            })
        })
    })
    */
    it('should register user', function(done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({
          User: {
            username: "monkeymon123",
            email: "monkeymon123@gmail.com",
            password: "shohoku10",
            firstName: "Chris",
            lastName: "Sim"
          }
        })
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err)
          User.findOne({email:'monkeymon123@gmail.com'})
            .then(function(result){
              var accountModel = Account.findOne({name:result.username})
              var accountUserModel = AccountUser.findOne({userID:result.id})
              return [result,accountModel,accountUserModel]
            })
            .spread(function(userModel,accountModel,accountUserModel) {
              should.exist(userModel)
              should.exist(accountModel)
              should.exist(accountUserModel)
              accountUserModel.accountID.should.equal(accountModel.id)
              should(userModel.code).not.be.empty()
              userModel.codeExpire.should.ok()
            })
            .catch(function(err) {
              should.not.exist(err)
            })
            .error(function(err) {
              should.not.exist(err)
            })
            .finally(function(){
              done()
            })
        })
    })
  })
});
