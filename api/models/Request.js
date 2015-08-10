/**
* Request.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    URLID: {type: 'integer'},
    requestDate: {type: 'datetime'},
    browser: {type: 'string'},
    location : {type: 'string'},
    ip: {type: 'string'},
    ipv6: {type: 'string'},
    rawRequest: {type: 'text'},
    referrer: {type: 'text'},
    requestType: {type: 'string'},
    queryString: {type: 'string'},
    payload: {type: 'text'}
  },
  addRequest: function(req) {
    
  }
};
