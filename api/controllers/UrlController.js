/**
 * UrlController
 *
 * @description :: Server-side logic for managing urls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash'),
		response = require('../helpers/Response')

module.exports = {
  create: function(req,res) {
		var params = req.body
		Domain.findOne({id:params.domainID}).exec(function(err,result) {
			params.fullURL = result.domain+'/'+params.parameter
			Url.create(params).exec(function(err,result) {
				return res.json(result)
			})
		})
	},
	checkHash: function(req,res) {
		var hash = req.param('hash','')
		if(_.isEmpty(hash)) {
			return response.validationError(res,"No hash provided")
		}
		Url.findOne({hash:hash}, function(err, result) {
			if(result || err) {
				return response.validationError(res,"Hash already exists")
			}
			return response.success(res,"Hash can be use")
		})
	}
};
