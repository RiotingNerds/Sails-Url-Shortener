/**
* Domain.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    accountID: {
      type: 'integer'
    },
    domain: {
      type: 'string',
      size: 125,
      required: true
    },
    active: {
      type: 'boolean',
      defaultsTo: 1
    },
    totalShortenURL: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};
