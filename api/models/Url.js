/**
* Url.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

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
  getUrlFromAccount: function(accountID,cb) {
    Url.find({accountID:accountID,active:true})
      .limit(10)
      .exec(cb)
  }
};
