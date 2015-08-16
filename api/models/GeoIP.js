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
      model: 'GeoName',
      columnName: 'geoNameID'
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
    country: {
      type: 'integer',
      defaultsTo: 1,
      model: 'geoname',
      columnName: 'geoCountryNameID'
    },
    postalCode: {
      type: 'string',
      size: 15,
      defaultsTo: 0
    }
  }
};
