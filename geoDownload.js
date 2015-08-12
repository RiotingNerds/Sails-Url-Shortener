var fs = require('fs'),
    Sails = require('sails'),
    AdmZip = require('adm-zip'),
    tempFolder = 'tempFolder/',
    http = require("http"),
    fs = require('fs'),
    rimraf = require('rimraf'),
    savingData = [],
    async = require('async'),
    asyncTwo = require('async'),
    callDataSet = [],
    csv = require('fast-csv'),
    csvLocation = require('fast-csv'),
    ip = require('ip')

Sails.load({
  log: {level: 'debug'},
  }, function(err, sails) {
  // Do some stuff with sails here
  if(fs.existsSync(tempFolder)) {
    rimraf.sync(tempFolder)
  }
  fs.mkdirSync(tempFolder)
  download('http://geolite.maxmind.com/download/geoip/database/GeoLite2-City-CSV.zip',function() {
    var zip = new AdmZip(tempFolder+'geo.zip');
    var zipEntries = zip.getEntries();
    zip.extractAllTo(tempFolder, true);
    zipEntries.forEach(function(zipEntry) {
      if(zipEntry.name == 'GeoLite2-City-Blocks-IPv4.csv') {
        var row = 0;
        var networkID,geoNameID,highRange,lowRange,geoCountryNameID,postalCode,lat,long
        callDataSet.push(function(cb){
          csv
             .fromPath(tempFolder+zipEntry.entryName)
             .on("data", function(data){
                 if(row == 0) {
                   networkID = data.indexOf('network')
                   geoNameID = data.indexOf('geoname_id')
                   geoCountryNameID = data.indexOf('registered_country_geoname_id')
                   postalCode = data.indexOf('postal_code')
                   lat = data.indexOf('latitude')
                   long = data.indexOf('longitude')
                 }
                 else {
                   var newIP = ip.cidrSubnet(data[networkID])
                   savingData.push(function(cont) {
                     GeoIP.create({
                       networkID: data[networkID],
                       geoNameID:data[geoNameID] || 0,
                       highRange:ip.toLong(newIP.firstAddress),
                       lowRange:ip.toLong(newIP.lastAddress),
                       geoCountryNameID: data[geoCountryNameID] || 0,
                       postalCode:data[postalCode] || '',
                       lat:data[lat] || 0,
                       long:data[long] || 0
                     }, function(err,result) {
                       cont();
                     })
                   })
                 }
                 row ++;
                 console.log(savingData.length)
             })
             .on("end", function(){
                 cb();
             });
        });
      }
      if(zipEntry.name == 'GeoLite2-City-Locations-en.csv') {
        callDataSet.push(function(cb){
          var row = 0;
          var continent,geoNameID,continentName,ISOCode,countryName,cityName,updatedOn,subdivision
          csvLocation
             .fromPath(tempFolder+zipEntry.entryName)
             .on("data", function(data){
               if(row == 0) {
                 continent = data.indexOf('continent_code')
                 geoNameID = data.indexOf('geoname_id')
                 continentName = data.indexOf('continent_name')
                 ISOCode = data.indexOf('country_iso_code')
                 countryName = data.indexOf('country_name')
                 cityName = data.indexOf('city_name')
                 subdivision = data.indexOf('subdivision_1_name')
               }
               else {

                 savingData.push( function(cont) {
                   GeoName.create({
                     continent: data[continent],
                     geoNameID:data[geoNameID] || 0,
                     continentName:data[continentName],
                     ISOCode:data[ISOCode],
                     countryName: data[countryName],
                     cityName:data[cityName] || '',
                     subdivision:data[subdivision],
                   }, function(err,result) {
                     cont();
                   })
                 })
               }
               row ++;
               console.log(savingData.length)
             })
             .on("end", function(){
                 console.log("done");
             });
        });
      }
    });

    async.parallel(callDataSet, function(err,results) {
      asyncTwo.parallel(savingData,function(err,n) {
        sails.down()
      })
    })

  })


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
