/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    moment = require('moment'),
    validator = require('validator')

module.exports = {
  types: {
    existInDB: function(username,count){
      if(count>0)
        return false;
      return true;
    }
  },
  attributes: {
    username : {
      type: 'string',
      required: true,
      existInDB: function(cb) {
        User.count({username:this.username}).exec(function(err,result) {
          return cb(result)
        })
      }
    },
    password : {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true,
      existInDB: function(cb) {
        User.count({email:this.email}).exec(function(err,count) {
          return cb(count)
        })
      }
    },
    code: {
      type: 'string'
    },
    codeExpire: {
      type: 'datetime'
    },
    active: {
      type: 'boolean',
      defaultsTo: 0
    },
    updatedAt: {
      type:'datetime',
      columnName: 'lastModifiedDate'
    },
    createdAt: {
      type:'datetime',
      columnName: 'createDate'
    }
  },
  createNewAccount: function(user,cb) {
    User.create({
      email:user.email,
      username: user.username,
      password: user.password,
      code:User.makeRandomResetCode(12),
      codeExpire: moment().add(3, 'days').format('YYYY-MM-DD H:m:s')
    }).then(function(result) {
      var userProfile = UserProfile.create({
        userID: result.id,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country
      })

      sails.hooks.email.send(
        'register',
        {user:result},
        {
          to: result.email,
          subject: 'Your new account information'
        },
        function(err, info) {

        })

      return [result,userProfile]
    }).spread(function(result,userProfile) {
      if(typeof cb === 'function')
        cb(null,result,userProfile)
    }).catch(function(e) {
      if(typeof cb === 'function')
        cb(e)
    })
  },
  findUser: function(username,password,cb) {
    var searchFilter = {
      active:true,
      username:username
    }
    if(validator.isEmail(username)) {
      searchFilter = {
        active:true,
        email:username
      }
    }

    User.findOne(searchFilter, function(err,result) {
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
  makeRandomResetCode: function (howMany, chars) {
      chars = chars || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
      var rnd = crypto.randomBytes(howMany),
          value = new Array(howMany),
          len = chars.length;

      for (var i = 0; i < howMany; i++) {
          value[i] = chars[rnd[i] % len]
      };

      return value.join('');
  },
  sendResetCode: function(userResult,cb) {
    var updateParams = {
      code:User.makeRandomResetCode(12),
      codeExpire: moment().add(3, 'days').format('YYYY-MM-DD H:m:s')
    }
    User.update({id:userResult.id},updateParams, function(err,result) {
      if(err && typeof cb == 'function')
        return cb(err)
      sails.hooks.email.send(
        'lostPassword',
        {name:userResult.username,code:result.code},
        {
          to: userResult.email,
          subject: 'Heard you lost your password'
        },
        function(err, info) {
          if(typeof cb == 'function') {
            cb(err,info)
          }
        })
    })
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      console.log(user.password)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            user.password = hash;
            console.log(user.password)
            cb();
        }
      });
    });
  }
};
