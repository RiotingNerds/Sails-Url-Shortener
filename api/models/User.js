/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    moment = require('moment'),
    validator = require('validator'),
    _ = require('lodash'),
    validatorMsg = require('sails-validation-messages')

module.exports = {
  types: {
    existInDB: function(username,count){
      if(count>0)
        return false;
      return true;
    },
    existInAccount: function(username,count) {
      if(count>0)
        return false;
      return true;
    }
  },
  attributes: {
    username : {
      type: 'string',
      required: true,
      maxLength: 50,
      existInDB: function(cb) {
        User.count({username:this.username}).exec(function(err,result) {
          return cb(result)
        })
      },
      existInAccount: function(cb) {
        Account.count({name:this.username}).exec(function(err,result) {
          return cb(result)
        })
      }
    },
    password : {
      required:true,
      type: 'string',
      minLength: 8,
      maxLength: 15
    },
    email: {
      type: 'email',
      maxLength: 255,
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
    },
    profile: {
      collection: 'userProfile',
      via: 'userID'
    },
    getDefaultAccount: function() {
      return Account.findOne({name:this.username})
    }
  },
  validationMessages: { //hand for i18n & l10n
    email: {
      existInDB: 'Email already exist',
      required: 'Email cannot be empty',
      email: 'Email is invalid',
      maxLength: 'Email cannot be more than 255 char'
    },
    password: {
      required: 'Password cannot be empty',
      minLength: 'Password must be at least 8 letter long',
      maxLength: 'Password cannot be more than 25 char'
    },
    username: {
      existInDB: 'Username already exist',
      required: 'Username cannot be empty',
      maxLength: "Username cannot be more than 50 char",
      existInAccount: "Username already registered"
    }
  },
  createNewAccount: function(user,cb) {
    var creatingUser = function() {
      User.create({
        email:user.email || "",
        username: user.username || "",
        password: user.password || "",
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
        Account.createDefaultUserAccount(result)
        if(typeof cb === 'function')
          cb(null,result,userProfile)
      }).catch(function(e) {
        if(typeof cb === 'function')
          cb(e)
      })
    }
    User.validate({
      email:user.email || "",
      username: user.username || "",
      password: user.password || ""
    }, function(userErr) {
      UserProfile.validate({
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country
      }, function(userProfileErr) {
        if(userErr || userProfileErr) {
          var userErrorAttribute = userErr?userErr.invalidAttributes || {}: {}
          var userProfileErrorAttribute = userProfileErr?userProfileErr.invalidAttributes || {}:{}
          var error = _.extend({},validatorMsg(User,userErrorAttribute),validatorMsg(UserProfile,userProfileErrorAttribute))
          cb({Errors:error})
        } else {
          creatingUser()
        }
      })
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
    User.findOne(searchFilter)
      .then(function(result) {
        if(result) { // To remove or change default login when production
          bcrypt.compare(password, result.password, function (err, res) {
            if (!res)
              return cb("Invalid user");
            UserProfile.findOne({userID:result.id})
              .then(function(userProfile) {
                var accountModel = result.getDefaultAccount()
                return [result,userProfile,accountModel]
              })
              .spread(function(user,userProfile,accountModel) {
                return cb(null, {
                  id:result.id,
                  username: result.username,
                  fullName: userProfile.fullName(),
                  profile : userProfile,
                  account: accountModel
                });
              })
              .catch(function(err) {
                return cb("Invalid user")
              })
          });
        } else {
          return cb("Invalid user");
        }
      })
      .catch(function(err) {
        cb("Invalid user");
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
