var _ = require('lodash')
module.exports = {
	res: function(res,statusCode,result,params) {
		res.status(statusCode)
		if(typeof params == 'undefined') {
			params = {}
		}
		return res.json(_.extend({result:result,code:statusCode},params))
	},
	addMessage: function(msg,params) {
		if(typeof params == 'undefined') {
			params = {}
		}
		if(!_.isUndefined(msg) && !_.isEmpty(msg))
			params.message = msg
		return params
	},
	success: function(res,message,params) {
		params = this.addMessage(message,params)
		return this.res(res,200,'success',params)
	},
	makeError: function(res,message,params) {
		params = this.addMessage(message,params)
		return this.res(res,500,'failed',params)
	},
	validationError: function(res,message,params) {
		params = this.addMessage(message,params)
		return this.res(res,400,'failed',params)
	},
}
