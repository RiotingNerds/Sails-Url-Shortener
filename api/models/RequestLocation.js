/**
* RequestLocation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var ip = require('ip'),
    moment = require('moment')

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
    }).then(function(result) {
      var returnName = null

      if(result) {
        returnName = GeoName.findOne({geoNameID:result.geoNameID})
      }
      return [result,returnName,request]
    }).spread(function(ipResult,nameResult,requestResult) {

      if(!nameResult || !ipResult) {
        console.log('add')
        Request.update({id:requestResult.id},{requestedDate:moment().format('YYYY-MM-DD HH:mm:ss')}).exec(function(err,result) {
          return cb(null)
        })
      } else {
        var params = {
          continent: nameResult.continent,
          continentName: nameResult.continentName,
          ISOCode: nameResult.ISOCode,
          countryName: nameResult.countryName,
          cityName: nameResult.cityName,
          subdivision: nameResult.subdivision,
          postalCode: ipResult.postalCode,
          latitude: ipResult.latitude,
          longitude: ipResult.longitude,
          requestID: requestResult.id
        }
        console.log(params)
        RequestLocation.create(params,function(err,result) {
          if(err) {
            Request.update({id:requestResult.id},{requestedDate:moment().format('YYYY-MM-DD HH:mm:ss')}).exec(function(err,result) {

            })
          }
          if(typeof cb === 'function') {
            cb(err,result)
          }
        })
      }
    })
    .catch(function(err) {
      if(typeof cb === 'function') {
        cb(err)
      }
    })
  }
};
