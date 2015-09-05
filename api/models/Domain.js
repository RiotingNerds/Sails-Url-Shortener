/**
* Domain.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    accountID: {
      type: 'integer',
      defaultsTo:0
    },
    domain: {
      type: 'string',
      size: 125,
      required: true
    },
    defaultLink: {
      type:'string',
      size: 1024
    },
    active: {
      type: 'boolean',
      defaultsTo: 1
    },
    system: {
      type: 'boolean',
      defaultsTo: 0
    },
    totalShortenURL: {
      type: 'integer',
      defaultsTo: 0
    }
  },
  getAvailableURL: function(accountID,cb) {
    Domain.find({active:1, or: [
      {accountID: accountID},
      {system: 1}
    ]},cb)
  }
};
