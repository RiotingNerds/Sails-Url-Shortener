module.exports.init = function() {
  return function(req, res, next) {
    var hostName = req.headers.host
    console.log(req)
  }
}
