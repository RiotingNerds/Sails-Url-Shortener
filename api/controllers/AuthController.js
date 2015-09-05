/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport'),
		React = require('../helpers/React'),
		response = require('../helpers/Response'),
		nodemailer = require('nodemailer'),
		moment = require('moment'),
		_ = require('lodash')

module.exports = {
	doLogin: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.notFound("Unable to find user");
      }
			console.log('before login')
      req.logIn(user, function(err) {
        if (err)
					res.send(err);
				return res.success(info.message,{data:user})
      });
    })(req, res);
  },
	activateUser: function(req,res) {
		var code = req.param('code','')
		if(code) {
			User
				.findOne({active:false,code:code,codeExpire:{'>=':moment().format('YYYY-MM-DD H:m:s')}})
				.then(function(result) {
					if(_.isEmpty(result))
						throw new Error('Account not found');
					var updateUser = User.update({id:result.id},{code:null,codeExpire:null,active:true})
					return [result,updateUser]
				}).spread(function(find,update) {
					req.session.notify = {message:'Account activated.',title: 'Success'}
					return res.redirect('/')
				})
				.catch(function(err) {
					req.session.notify =  {message:'Code not found',title: 'Error'}
					return res.redirect('/')
				})
		} else {
			req.session.notify =  {message:'Code not found',title: 'Error'}
			return res.redirect('/')
		}
	},
	resetPassword: function(req,res) {
		res.locals.layout = 'layouts/public'
		var code = req.param('code',null)
		if(code) {
			var resetPasswordParams = {code:code}
			var resetPasswordContent = React.renderToString('auth/resetPassword.jsx',resetPasswordParams)
			if(req.method == 'POST') {
				var params = req.param('ChangePassword')
				if(params.password && params.repassword && params.code) {

				}
			}

			return res.view('auth/resetPassword',{resetPasswordContent:resetPasswordContent})
		} else {

		}
	},
	doRegister: function(req,res) {
		var user = req.param('User')
		User.createNewAccount(user, function(err,userResult,userProfileResult) {
			if(!err) {
				return res.success('Registered')
			} else {

				return res.validationError('error',{errorAttributes:err.Errors});
			}
		})
	},
	register: function(req,res) {
		res.locals.layout = 'layouts/public'
		var User = {}
		var registerContent = React.renderToString('auth/register.jsx',{user:User})
		return res.view('auth/register',{registerContent:registerContent,user:User})
	},
	lostPassword: function(req,res) {
		res.locals.layout = 'layouts/public'
		var lostPasswordContent = React.renderToString('auth/lostPassword.jsx',{})
		if(req.method == 'POST') {
			var params = req.param('LostPassword')
			if(params.email) {
				User.findOne({email:params.email}, function(err,result) {
					if(!err && result) {
						User.sendResetCode(result)
					}
				})

			}
		}

		return res.view('auth/lostPassword',{lostPasswordContent:lostPasswordContent})
	},
	login: function(req, res) {
		res.locals.layout = 'layouts/public'
  	var loginForm = React.renderToString('auth/login.jsx',{})
		var notify = {}
		if(!_.isEmpty(req.session.notify)) {
			notify = req.session.notify
		}
		return res.view('auth/login',{loginFormContent:loginForm,notify:notify})
  },
  logout: function(req, res) {
		req.logOut();
		req.session.destroy(function(err) {
     // cannot access session here
		 res.redirect('/');
  	})
  }
};
