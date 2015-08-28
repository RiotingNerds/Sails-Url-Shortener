(function() {
  var fs = require('fs'),
      Sails = require('sails'),
      async = require('async'),
      sqlStatement = 'select * from request r left join requestlocation rl on rl.requestID = r.id where rl.id is null',
      locationArray = []
      Sails.load({log:{level:'debug'}}, function(err, sails) {
        // Do some stuff with sails here
        console.log(err);

        sails.models.geoname.query(sqlStatement,
        function(err, results) {
          if (err) {
            console.log(err);
          }
          results.forEach(function(result) {
            console.log(result)
            locationArray.push(function(cb) {

              sails.models.requestlocation.addRecord(result,cb)
            })
          })
          async.parallel(locationArray, function(err,_results) {
            console.log(_results)
          });
        });

      });
}())
