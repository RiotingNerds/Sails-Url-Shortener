(function() {
  var fs = require('fs'),
      Sails = require('sails'),
      AdmZip = require('adm-zip'),
      tempFolder = 'tempFolder/',
      http = require("http"),
      fs = require('fs'),
      rimraf = require('rimraf'),
      async = require('async'),
      innerAsync = require('async'),
      callDataSet = [],
      csv = require('fast-csv'),
      csvLocation = require('fast-csv'),
      ip = require('ip'),
      moment = require('moment'),
      request = require('request')


    if(fs.existsSync(tempFolder)) {
      rimraf.sync(tempFolder)
    }
    fs.mkdirSync(tempFolder)
    var updatedOn = moment().format('YYYY-MM-DD HH:mm:ss')
    //tempFolder = __dirname+'/'+tempFolder
    download('http://geolite.maxmind.com/download/geoip/database/GeoLite2-City-CSV.zip',function() {
      var zip = new AdmZip(tempFolder+'geo.zip');
      var zipEntries = zip.getEntries();
      zip.extractAllTo(tempFolder, true);
      var row = 0;
      zipEntries.forEach(function(zipEntry) {
        if(zipEntry.name == 'GeoLite2-City-Blocks-IPv4.csv') {
          callDataSet.push(function(cb){
            var ipCSVFS = fs.createWriteStream(tempFolder+"ip.csv", {encoding: "utf8"})
            ipCSVFS
              .on('finish',function() {
                cb()
              })
            csv
             .fromPath(tempFolder+zipEntry.entryName, {headers: true})
             .transform(function(data){
               var newIP = ip.cidrSubnet(data.network)
               row++
               console.log(row)
               return {
                networkID: data.network,
                geoNameID:data.geoname_id || 0,
                highRange:ip.toLong(newIP.lastAddress),
                lowRange:ip.toLong(newIP.firstAddress),
                geoCountryNameID: data.registered_country_geoname_id || 0,
                postalCode:data.postal_code || '',
                latitude:data.latitude || 0,
                longitude:data.longitude || 0,
                updatedOn: updatedOn
                }
             })
             .pipe(csv.createWriteStream())
             .pipe(ipCSVFS)
          });
        }
        if(zipEntry.name == 'GeoLite2-City-Locations-en.csv') {
          callDataSet.push(function(cb){
            var geonameFS = fs.createWriteStream(tempFolder+"geoname.csv", {encoding: "utf8"})
            geonameFS
              .on('finish', function() {
                cb();
              });
            csvLocation
               .fromPath(tempFolder+zipEntry.entryName, {headers: true})
               .transform(function(data){
                 row++
                 console.log(row)
                 return {
                   continent: data.continent_code,
                   geoNameID:data.geoname_id || 0,
                   continentName:data.continent_name,
                   ISOCode:data.country_iso_code,
                   countryName: data.country_name,
                   cityName:data.city_name || '',
                   subdivision:data.subdivision_1_name,
                   updatedOn:updatedOn
                 }
               })
               .pipe(csvLocation.createWriteStream())
               .pipe(geonameFS)
          });
        }
      });
      async.parallel(callDataSet, function(err,results) {
        console.log('end')
        console.log(err)
        Sails.load({log:{level:'debug'}}, function(err, sails) {
          // Do some stuff with sails here
          console.log(err);
          innerAsync.waterfall([
            function(cb) {
              sails.models.geoname.query("TRUNCATE geoname", function(err,result) {
                cb(err)
              })
            },
            function(cb) {
              sails.models.geoname.query("TRUNCATE geoip", function(err,result) {
                cb(err)
              })
            },
            function(cb) {
              sails.models.geoname.query("load data local infile '"+tempFolder+"geoname.csv' into table geoname fields"
                  +" terminated by ',' enclosed by '\"'"
                  +" lines terminated by '\n'"
                  +" (continent,geoNameID,continentName,ISOCode,countryName,cityName,subdivision,updatedOn);",
              function(err, results) {
                if (err) {
                  console.log(err);
                }
                cb(err)
              )
            },
            function(cb) {
              sails.models.geoname.query("load data local infile '"+tempFolder+"ip.csv' into table geoip fields"
                  +" terminated by ',' enclosed by '\"'"
                  +" lines terminated by '\n'"
                  +" (networkIP,geoNameID,highRange,lowRange,geoCountryNameID,postalCode,latitude,longitude,updatedOn);",
              function(err, results) {
                if (err)
                 console.log(err);
                cb(err)
              });
            }
          ], function(err,result) {
            sails.lower()
            process.exit(1)
          })
        });
      })
    })



  function download(url, cb) {
    var data = "";
    var file = fs.createWriteStream(tempFolder+'geo.zip');
    console.log('downloading')
    file
    .on('error',function(e) {
      console.log(e)
      console.log('file error')
    })
    .on('finish', function() {
      file.close(cb);
    });
    var row = 0;
    request
      .get(url)
      .on('error', function(e) {
        console.log("Got error: " + e.message);
      })
      .pipe(file)
  }
}())
