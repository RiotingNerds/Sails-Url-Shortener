(function() {
  var fs = require('fs'),
      Sails = require('sails'),
      AdmZip = require('adm-zip'),
      tempFolder = 'tempFolder/',
      http = require("http"),
      fs = require('fs'),
      rimraf = require('rimraf'),
      async = require('async'),
      callDataSet = [],
      csv = require('fast-csv'),
      csvLocation = require('fast-csv'),
      ip = require('ip'),
      moment = require('moment'),
      request = require('request')


  Sails.load({log:{level:'debug'}}, function(err, sails) {
    // Do some stuff with sails here
    console.log(err);
    sails.models.request.query("select r.*,rl.requestID from request r left join requestlocation rl on rl.requestID = r.id where rl.requestID is null limit 0,10",
    function(err, results) {
      if (err) {
        console.log(err);
      }
      if(results) {
        results.forEach(function(value){
          sails.models.requestlocation.addRecord(value);
        })
        sails.lower();
        process.exit(0);
      }
    });
  });
}())
