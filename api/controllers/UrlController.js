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
		var params = req.body.Url
		Domain.findOne({id:params.domainID}).exec(function(err,result) {
			if(result) {
				params.fullURL = result.domain+'/'+params.hash
				Url.create(params).exec(function(err,result) {
					return response.success(res,result)
				})
			} else {
				return response.makeError(res,"Unable to find domain")
			}
		})
	},
	redirect: function(req,res) {
		var hash = req.param('hash','')
		if(hash != '') {
			var hostName = req.hostName
			hostName = 'dv.sg'
			Domain.findOne({domain:hostName}, function(err,domainResult) {
				if(domainResult) {
					Url.findOne({domainID:domainResult.id,hash:hash}, function(err,result) {
						if(result) {
							return res.redirect(301, result.redirectURL);
						}
						else
							return res.redirect(301, '/');
					})
				} else {
					return res.redirect(301, '/');
				}

			})
		}
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
