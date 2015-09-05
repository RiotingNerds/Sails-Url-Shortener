/**
* Account.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name : {
      type: 'string',
      maxLength: 125,
      required: true
    },
    updatedAt: {
      type:'datetime',
      columnName: 'lastModifiedDate'
    },
    createdAt: {
      type:'datetime',
      columnName: 'createDate'
    },
    lastModifiedBy : { type: 'integer' },
    createBy : { type: 'integer' }
  },
  createDefaultUserAccount: function(userModel) {
    Account.create({
      name:userModel.username,
      createBy: userModel.id,
      lastModifiedBy: userModel.id
    }).then(function(result) {
      var accountUser = AccountUser.create({
        accountID: result.id,
        userID: userModel.id,
        role: AccountUser.role.Owner,
        createBy: userModel.id,
        lastModifiedBy: userModel.id
      })
      return [result,accountUser]
    }).spread(function(result,accountUser) {
      
    }).catch(function(err) {

    })
  }
};
