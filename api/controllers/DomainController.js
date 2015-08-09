/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	_config: {
			rest:false
		},
  /**
   * `DomainController.url()`
   */
  create: function (req, res) {
    	Domain.create({domain:'dv.sg'}).exec(function(err,result) {
				return res.json(result)
			});
  },


  /**
   * `DomainController.request()`
   */
  request: function (req, res) {
    return res.json({
      todo: 'request() is not implemented yet!'
    });
  }
};
