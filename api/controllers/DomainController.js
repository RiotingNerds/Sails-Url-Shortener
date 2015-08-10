/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var react = require('../helpers/React'),
    response = require('../helpers/Response')

module.exports = {
  /**
   * `DomainController.url()`
   */
  create: function (req, res) {

  },
  saveForm: function(req,res) {
    var domain = req.param('Domain',{})
    if(domain.domain) {
      Domain.create({domain:domain.domain}).exec(function(err,result) {
        if(!err && result) {
          return response.success(res,{result:result})
        } else {
          if(err.errors) {
            return response.validationError(res,"valification error",err.errors)
          } else {
            return response.makeError(res,'Unknown Error')
          }
        }
      })
    } else {
      return response.validationError(res,"Domain cannot be empty")
    }
  },
  index: function (req, res) {
    Domain.find({}).exec(function(err,results){
      var indexContent = react.renderToString("domain/index.jsx",{data:results})
      return res.view('domain/index',{content:indexContent,data:results})
    })
  }
};
