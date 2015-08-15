/**
* RequestLocation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var geoip = require("geoip-native");
module.exports = {

  attributes: {
    requestID: {type: 'integer'},
    continent: {
      type: 'string',
      size: 5
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
    subdivision: {
      type: 'string',
      size: 256
    },
    postalCode: {
      type: 'string',
      size: 15,
      defaultsTo: 0
    },
    lat: {
      type: 'float'
    },
    long: {
      type: 'float'
    },
  },
  addRecord: function(request) {
    var ipLong = ip.toLong(request.ip)
    GeoIP.findOne({
      highRange: {
        '>=':ipLong
      },
      lowRange: {
        '<=':ipLong
      }
    })
    .populate('geoname')
    .exec(function(err,result) {
      if(!err) {
        var params = {
          continent: result.geoName.continent,
          continentName: result.geoName.continentName,
          ISOCode: result.geoName.ISOCode,
          countryName: result.geoName.countryName,
          cityName: result.geoName.cityName,
          subdivision: result.geoName.subdivision,
          postalCode: result.postalCode,
          lat: result.lat,
          long: result.long
        }
        RequestLocation.create(params,function(err,result) {
          
        })
      }
    })
  }
};
