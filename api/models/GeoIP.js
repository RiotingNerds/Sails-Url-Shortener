/**
* GeoIP.js
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
    geoName: {
      type: 'integer',
      model: 'geoname',
      columnName: 'geoNameID',
      via: 'geoNameID'
    },
    highRange: {
      type: 'integer'
    },
    lowRange: {
      type: 'integer'
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    updatedOn: {
      type: 'datetime'
    },
    geoCountryNameID: {
      type: 'integer',
      defaultsTo: 1
    },
    postalCode: {
      type: 'string',
      size: 15,
      defaultsTo: 0
    }
  }
};
