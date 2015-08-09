var _ = require('lodash')
module.exports = {
	res: function(res,statusCode,result,params) {
		res.status(statusCode)
		if(typeof params == 'undefined') {
			params = {}
		}
		return res.json(_.extend({result:result,code:statusCode},params))
	},
	success: function(res,params) {
		return this.res(res,200,'success',params)
	},
	error: function(res,params) {
		return this.res(res,500,'failed',params)
	},
	validationError: function(res,message,params) {
		if(typeof params == 'undefined') {
			params = {}
		}
		params.message = message
		return this.res(res,400,'failed',params)
	},
}