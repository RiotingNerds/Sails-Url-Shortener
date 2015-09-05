var request = require('supertest'),
    should = require('should'),
    moment = require('moment')

describe('DomainController', function() {
  var loginCookie
  describe('/domain', function() {
    it('should not access domain page', function(done) {
      request(sails.hooks.http.app)
        .get('/domain')
        .expect(302)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should login', function(done) {
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
          res.headers.should.have.property('set-cookie')
          loginCookie = res.headers['set-cookie']
          done()
        })
    })
    it('should access domain page', function(done) {
      request(sails.hooks.http.app)
        .get('/domain')
        .set('cookie',loginCookie)
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err)
          done()
        })
    })
    it('should create a new domain', function(done) {
      request(sails.hooks.http.app)
        .post('/domain')
        .set('cookie', loginCookie)
        .send({
          Domain: {
            domain: 'http://ap.sg',
            defaultLink: 'http://antpolis.com'
          }
        })
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err)
          Domain.findOne({id:1}, function(err,result) {
            result.domain.should.equal('http://ap.sg')
            result.defaultLink.should.equal('http://antpolis.com')
            //console.log(result)
            result.accountID.should.equal(2)
            done()
          })

        })
    })
  })
})
