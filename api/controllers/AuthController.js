/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport'),
		React = require('../helpers/React'),
		response = require('../helpers/Response')
module.exports = {
	doLogin: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.success(info.message,{
          data: user
        });
      }

      req.logIn(user, function(err) {
        if (err)
					res.send(err);
				return res.success(info.message,{data:user})
      });
    })(req, res);
  },
	login: function(req, res) {
		res.locals.layout = 'layouts/public'
  	var loginForm = React.renderToString('auth/login.jsx',{})
		return res.view('auth/login',{loginFormContent:loginForm})
  },
  logout: function(req, res) {
		req.logOut();
		req.session.destroy(function(err) {
     // cannot access session here
		 res.redirect('/');
  	})
  }
};
