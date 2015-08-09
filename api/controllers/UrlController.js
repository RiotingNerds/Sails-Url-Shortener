/**
 * UrlController
 *
 * @description :: Server-side logic for managing urls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	_config: {
			rest:false
		},

  create: function(req,res) {
		var params = req.body
		Domain.findOne({id:params.domainID}).exec(function(err,result) {
			params.fullURL = result.domain+'/'+params.parameter
			Url.create(params).exec(function(err,result) {
				return res.json(result)
			})
		})

	}
};
