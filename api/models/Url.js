/**
* Url.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  types: {
    companyExists: function(companyID,err){
      if(companyID > 0 && !err)
        return true;
      return false;
    }
  },
  attributes: {
    domainID : { type: 'integer' },
    redirectURL: {
      type: 'text',
      required: true
    },
    fullURL: {
      type: 'string'
    },
    accountID: {
      type: 'integer',
      defaultsTo: 0
    },
    hash: {
      type:'string',
      size: 125,
    },
    lastRequested: {
      type: 'datetime'
    },
    totalRequested: {
      type: 'integer',
      defaultsTo: 0
    },
    activeOn: {
      type: 'datetime'
    },
    expiredOn: {
      type: 'datetime'
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    },
    linkableFullURL: function() {
      return "http://"+this.fullURL
    }
  },
  beforeValidate: function (values, cb) {
    values.hash = this.makeDash(values.hash)
    cb()
  },
  makeDash: function(input) {
    return input
      .replace(/^\s\s*/, '')     // Remove Preceding white space
      .replace(/\s\s*$/, '')     // Remove Trailing white space
      .replace(/([\s]+)/g, '-'); // Replace remaining white space with dashes
  },
  getUrlFromAccount: function(accountID,cb) {
    Url.find({where: {accountID:accountID,active:true}, sort: 'totalRequested DESC'})
      .limit(10)
      .exec(cb)
  }
};
