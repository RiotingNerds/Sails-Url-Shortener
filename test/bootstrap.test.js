var Sails = require('sails'),
  sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift({
    // configuration for testing purposes
    models: {
      connection: 'testingDB',
      migrate: 'drop'
    }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.

    var Barrels = require('barrels');
    var barrels = new Barrels();
    var fixtures = barrels.data;
    barrels.populate(function(err) {
      if(err) {
        done(err);
      }
      done(err, sails);
    });
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});
