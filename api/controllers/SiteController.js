/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var React = require('../helpers/React')

module.exports = {
	index:function(req,res) {
		Domain.find({active:1}, function(err,results) {
			var shortenForm = React.renderToString('site/urlshortener.jsx',{domainData:results})			
			return res.view('site/index',{shortenForm:shortenForm,domainData:results})
		})
	}
};
