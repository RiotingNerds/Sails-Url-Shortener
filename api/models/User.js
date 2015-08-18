/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    username : { type: 'string' },
    password : { type: 'string' },
    email: {type: 'string'},
    updatedAt: {
      type:'datetime',
      columnName: 'lastModifiedDate'
    },
    createdAt: {
      type:'datetime',
      columnName: 'createDate'
    }
  },
  findUser: function(username,password,cb) {
    if(username=="admin" && password == "admin") {
      return cb(null,{
        id: 0,
        username:'admin'
      })
    }
    User.findOne({username:username}, function(err,result) {
      if(result && !err) { // To remove or change default login when production
        bcrypt.compare(password, result.password, function (err, res) {
          if (!res)
            return cb("Invalid user");
          if(!result) {
            result = {
              username: "admin"
            }
          }
          return cb(null, result);
        });
      } else {
        return cb("Invalid user");
      }

    })
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            user.password = hash;
            cb();
        }
      });
    });
  }
};
