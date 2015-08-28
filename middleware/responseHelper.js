module.exports.init = function() {
  return function(req, res, next) {
    var response = function(statusCode,result,params) {
  		if(typeof params == 'undefined') {
  			params = {}
  		}
  		return res.json(statusCode,_.extend({result:result,code:statusCode},params))
  	}
  	var addMessage = function(msg,params) {
  		if(typeof params == 'undefined') {
  			params = {}
  		}
  		if(!_.isUndefined(msg) && !_.isEmpty(msg))
  			params.message = msg
  		return params
  	}
  	res.success = function(message,params) {
  		params = addMessage(message,params)
  		return response(200,'success',params)
  	}
  	res.makeError = function(message,params) {
  		params = addMessage(message,params)
  		return response(500,'failed',params)
  	}
  	res.validationError = function(message,params) {
  		params = addMessage(message,params)
  		return response(400,'failed',params)
  	}
    next();
  }

}
