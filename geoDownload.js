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
      moment = require('moment')

  Sails.load({
    log: {level: 'debug'},
    }, function(err, sails) {
    // Do some stuff with sails here
    if(fs.existsSync(tempFolder)) {
      rimraf.sync(tempFolder)
    }
    fs.mkdirSync(tempFolder)
    //tempFolder = __dirname+'/'+tempFolder
    download('http://geolite.maxmind.com/download/geoip/database/GeoLite2-City-CSV.zip',function() {
      var zip = new AdmZip(tempFolder+'geo.zip');
      var zipEntries = zip.getEntries();
      zip.extractAllTo(tempFolder, true);
      var row = 0;
      var updatedOn = moment().format('YYYY-MM-DD HH:mm:ss')
      zipEntries.forEach(function(zipEntry) {
        if(zipEntry.name == 'GeoLite2-City-Blocks-IPv4.csv') {
          callDataSet.push(function(cb){
            csv
             .fromPath(tempFolder+zipEntry.entryName, {headers: true})
             .transform(function(data){
               var newIP = ip.cidrSubnet(data.network)
               row++
               console.log(row)
               return {
                networkID: data.network,
                geoNameID:data.geoname_id || 0,
                highRange:ip.toLong(newIP.firstAddress),
                lowRange:ip.toLong(newIP.lastAddress),
                geoCountryNameID: data.registered_country_geoname_id || 0,
                postalCode:data.postal_code || '',
                latitude:data.latitude || 0,
                longitude:data.longitude || 0,
                updatedOn: updatedOn
                }
             })
             .pipe(csv.createWriteStream())
             .pipe(fs.createWriteStream(tempFolder+"ip.csv", {encoding: "utf8"}))
             .on("finish", function(){
               console.log(tempFolder+"ip.csv")
               sails.models.geoname.query("load data local infile '"+tempFolder+"ip.csv' into table geoip fields"
                   +" terminated by ',' enclosed by '\"'"
                   +" lines terminated by '\n'"
                   +" (networkIP,geoNameID,highRange,lowRange,geoCountryNameID,postalCode,latitude,longitude,updatedOn);",
               function(err, results) {
                 if (err)
                  console.log(err);
                  cb();
               });
             });
          }.bind(sails));
        }
        if(zipEntry.name == 'GeoLite2-City-Locations-en.csv') {
          callDataSet.push(function(cb){
            //geoname_id,locale_code,continent_code,continent_name,country_iso_code,country_name,subdivision_1_iso_code,subdivision_1_name,subdivision_2_iso_code,subdivision_2_name,city_name,metro_code,time_zone
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
               .pipe(fs.createWriteStream(tempFolder+"geoname.csv", {encoding: "utf8"}))
               .on("finish", function(){
                 sails.models.geoname.query("load data local infile '"+tempFolder+"geoname.csv' into table geoname fields"
                     +" terminated by ',' enclosed by '\"'"
                     +" lines terminated by '\n'"
                     +" (continent,geoNameID,continentName,ISOCode,countryName,cityName,subdivision,updatedOn);",
                 function(err, results) {
                   if (err) {
                     console.log(err);
                   }
                     cb();
                 });
               });
          }.bind(sails));
        }
      });

      async.parallel(callDataSet, function(err,results) {
        console.log('end')
        sails.models.geoip.query('delete from geoip where updatedOn<>"'+updatedOn+'"')
        sails.models.geoip.query('delete from geoname where updatedOn<>"'+updatedOn+'"')
        sails.lower()
        process.exit();
      })

    }.bind(moment))
  });


  function download(url, cb) {
    var data = "";
    var file = fs.createWriteStream(tempFolder+'geo.zip');
    var request = http.get(url, function(res) {
      res.pipe(file);
      file.on('finish', function() {
        file.close(cb);
      });
    });

    request.on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }

}())
