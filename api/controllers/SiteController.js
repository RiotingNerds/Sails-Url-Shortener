/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var React = require('../helpers/React')

module.exports = {
	index:function(req,res) {
		var shortenForm = React.renderToString('site/urlShortener.jsx')
		return res.view('site/index',{shortenForm:shortenForm})
	}
};
