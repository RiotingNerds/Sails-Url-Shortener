/**
* Domain.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    networkIP: {
      type: 'string',
      size: 15
    },
    geoNameID: {
      type: 'integer'

    },
    highRange: {
      type: 'integer'
    },
    lowRange: {
      type: 'integer'
    },
    lat: {
      type: 'float'
    },
    long: {
      type: 'float'
    },
    updatedOn {
      type: 'datetime'
    },
    geoCountryNameID: {
      type: 'integer'
      defaultsTo: 1
    },
    postalCode: {
      type: 'string',
      size: 15,
      defaultsTo: 0
    }
  }
};
