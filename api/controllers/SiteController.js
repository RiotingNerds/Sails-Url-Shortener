/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var React = require('../helpers/React')

module.exports = {
	index:function(req,res) {
		res.locals.layout = 'layouts/public'
  	var loginForm = React.renderToString('auth/login.jsx',{})
		return res.view('auth/login',{loginFormContent:loginForm})
	}
};
