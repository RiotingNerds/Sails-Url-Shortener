/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport'),
		React = require('../helpers/React')
module.exports = {
	doLogin: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user: user
        });
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.send({
          message: info.message,
          user: user
        });
      });
    })(req, res);
  },
	login: function(req, res) {
  	var loginForm = React.renderToString('auth/login.jsx',{})
		return res.view('auth/login',{loginFormContent:loginForm})
  },
  logout: function(req, res) {
	  req.logout();
	  res.redirect('/');
  }
};
