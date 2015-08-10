/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	redirect: function(req,res) {
		var hash = req.param('hash','')
		if(hash != '') {
			var hostName = req.hostName			
			Domain.findOne({domain:hostName}, function(err,domainResult) {
				if(domainResult) {
					Url.findOne({domainID:domainResult.id,hash:hash}, function(err,result) {
						if(result) {
							Request.addRequest(req,result)
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
};
