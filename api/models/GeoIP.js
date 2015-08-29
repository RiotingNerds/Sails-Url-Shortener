/**
* GeoIP.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'geoip',
  attributes: {
    networkIP: {
      type: 'string',
      size: 15
    },
    geoNameID: {
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
    postalCode: {
      type: 'string',
      size: 15,
      defaultsTo: 0
    }
  }
};
