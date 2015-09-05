/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var React = require('../helpers/React')
module.exports = {
	index:function(req,res) {
		//console.log(req.user)
		Domain.getAvailableURL(req.user.account?req.user.account.id:-1,function(err,results) {
			var shortenForm = React.renderToString('site/urlshortener.jsx',{domainData:results})
			Url.getUrlFromAccount(req.user.account?req.user.account.id:-1, function(err,urlResults) {
				var urlTopList = React.renderToString('url/topList.jsx',{data:urlResults})
				return res.view('site/index',{shortenForm:shortenForm,urlTopList:urlTopList,domainData:results,urlData:urlResults})
			})
		})
	}
};
