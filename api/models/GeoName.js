/**
* Domain.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    continent: {
      type: 'string',
      size: 5
    },
    geoNameID: {
      type: 'integer'

    },
    continentName: {
      type: 'string',
      size: 256
    },
    ISOCode: {
      type: 'string',
      size: 5
    },
    countryName: {
      type: 'string',
      size: 256
    },
    cityName: {
      type: 'string',
      size: 256
    },
    updatedOn: {
      type: 'datetime'
    },
    subdivision: {
      type: 'string',
      size: 256
    },
  }
};
