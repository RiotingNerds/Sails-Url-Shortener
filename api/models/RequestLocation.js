/**
* RequestLocation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var ip = require('ip')

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
  addRecord: function(request,cb) {
    var ipLong = ip.toLong(request.ip)
    GeoIP.findOne({
      highRange: {
        '>=':ipLong
      },
      lowRange: {
        '<=':ipLong
      }
    })
    .exec(function(err,result) {
      if(!err && result) {

        result.getCountry(function(err,country) {
          if(err) {
            if(typeof cb == 'function') {
              cb(err)
            }
          }
          var params = {
            continent: country.continent,
            continentName: country.continentName,
            ISOCode: country.ISOCode,
            countryName: country.countryName,
            cityName: country.cityName,
            subdivision: country.subdivision,
            postalCode: result.postalCode,
            latitude: result.latitude,
            longitude: result.longitude,
            requestID: request.id
          }
          RequestLocation.create(params,function(err,result) {
            if(err)
              console.log(err)
            if(typeof cb == 'function') {
              cb(err,result)
            }
          })
        })

      }
    })
  }
};
