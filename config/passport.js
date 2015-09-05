var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
RememberMeStrategy = require('passport-remember-me').Strategy
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null,user)
});

passport.use(new LocalStrategy({
    usernameField: 'Login[email]',
    passwordField: 'Login[password]'
  },
  function(username, password, done) {
    User.findUser(username,password,function(err,user) {
      if(err){
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null,user,{message: 'Logged in'})
    })
  }
));

passport.use(new RememberMeStrategy(
  function (token, cb) {
    User.consumeSessionToken(token, function (err, user) {
      cb(err, user);
    });
  },
  function( token,cb) {

  }
));
