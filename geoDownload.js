var fs = require('fs'),
    Sails = require('sails'),
    AdmZip = require('adm-zip'),
    tempFolder = 'tempFolder/',
    http = require("http"),
    fs = require('fs'),
    rimraf = require('rimraf'),
    savingData = [],
    async = require('async'),
    callDataSet = [],
    csv = require('fast-csv'),
    csvLocation = require('fast-csv')

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
        callDataSet.push(function(cb){
          csv
             .fromPath(zipEntry.entryName)
             .on("data", function(data){
                 
             })
             .on("end", function(){
                 console.log("done");
             });
        });
      }
      if(zipEntry.name == 'GeoLite2-City-Locations-en.csv') {
        callDataSet.push(function(cb){
          csvLocation
             .fromPath(zipEntry.entryName)
             .on("data", function(data){
                 console.log(data);
             })
             .on("end", function(){
                 console.log("done");
             });
        });
      }
    });
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
