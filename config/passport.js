var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
  if(user.id == 0 && user.username == 'admin')
    return done(null,user);
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
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
