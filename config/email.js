var mandrillTransport = require('nodemailer-mandrill-transport')
module.exports.email = {
  transporter: mandrillTransport({
    auth: {
      apiKey: 'WLBAZtYxRKO6GpcEjn2uwA'
    }
  }),
  from: 'no-reply@boxe.sg',
  testMode: false
};
