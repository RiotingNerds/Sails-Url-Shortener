(function() {
  var fs = require('fs'),
      Sails = require('sails'),
      async = require('async'),
      moment = require('moment'),
      sqlStatement = 'select r.* from request r left join requestlocation rl on rl.requestID = r.id where rl.id is null and (DATE_ADD(requestedDate, INTERVAL 5 day) < "'+moment().format('YYYY-MM-DD HH:mm:ss')+'" or requestedDate is null)',
      locationArray = [],
      _ = require("lodash")
  Sails.load({log:{level:'debug'}}, function(err, sails) {
    sails.models.geoname.query(sqlStatement, function(err, results) {
      if (err) {
        console.log(err);
      }
      async.forEachOfSeries(results,function(value,index,cb) {
        sails.models.requestlocation.addRecord(value,cb)
      }, function (err) {
        console.log('end')
        sails.lower();
        process.exit(1)

      })

    });
  });
}())
