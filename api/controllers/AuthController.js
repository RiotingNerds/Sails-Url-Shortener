/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport'),
		React = require('../helpers/React'),
		response = require('../helpers/response'),
		nodemailer = require('nodemailer'),
		mandrillTransport = require('nodemailer-mandrill-transport'),
		crypto = require('crypto')
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
	resetPassword: function(req,res) {
		res.locals.layout = 'layouts/public'
		var code = req.param('c',null)
		if(code) {
			var resetPasswordContent = {code:code}
			var lostPasswordContent = React.renderToString('auth/resetPassword.jsx',{resetPasswordContent:resetPasswordContent})
			if(req.method == 'POST') {
				var params = req.param('ChangePassword')
				if(params.password && params.repassword && params.code) {

				}
			}

			return res.view('auth/resetPassword',{lostPasswordContent:lostPasswordContent})
		} else {

		}
	},
	lostPassword: function(req,res) {
		res.locals.layout = 'layouts/public'
		var lostPasswordContent = React.renderToString('auth/lostPassword.jsx',{})



		if(req.method == 'POST') {
			var params = req.param('LostPassword')
			if(params.email) {
				User.find({email:params.email}, function(err,result) {
					if(!err && result) {
						var transport = nodemailer.createTransport(mandrillTransport({
						  auth: {
						    apiKey: 'WLBAZtYxRKO6GpcEjn2uwA'
						  }
						}));
						res.render('mails/lostPassword',{name:result.username,code:User.makeRandomResetCode(12)}, function(err,html) {
							transport.sendMail({
								from: 'no-reply@boxe.sg',
								to: params.email,
								subject: 'Heard you lost your password',
								html:html
							}, function(err, info) {
								if (err) {
									console.error(err);
								} else {
									console.log(info);
								}
							});
						})

					}
				})

			}
		}

		return res.view('auth/lostPassword',{lostPasswordContent:lostPasswordContent})
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
