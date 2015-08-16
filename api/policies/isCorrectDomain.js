module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  var hostName = req.hostWithoutPort
  if(hostName != 'boxe.sg' && hostName != 'localhost:1337') {
    Domain.findOne({domain:hostName}, function(err,domainResult) {
			if(err) {
        return next()
      }
      if(domainResult) {
        var redirectUrl = domainResult.defaultLink || 'http://boxe.sg'
        if (!res.getHeader('Cache-Control'))
					res.setHeader('Cache-Control', 'public, max-age=' + (60*60*24*7));
        return res.redirect(302,redirectUrl);
      } else {
        return next();
      }
		})
  } else {
    return next();
  }
};
