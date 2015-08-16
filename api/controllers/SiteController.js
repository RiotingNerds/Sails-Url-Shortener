/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var React = require('../helpers/React')

module.exports = {
	index:function(req,res) {
		Domain.getAvailableURL(0,function(err,results) {
			var shortenForm = React.renderToString('site/urlshortener.jsx',{domainData:results})
			Url.getUrlFromAccount(0, function(err,urlResults) {
				var urlTopList = React.renderToString('url/topList.jsx',{data:urlResults})
				return res.view('site/index',{shortenForm:shortenForm,urlTopList:urlTopList,domainData:results,urlData:urlResults})
			})
		})
	}
};
