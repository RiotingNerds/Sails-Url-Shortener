/**
* AccountUser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  role: {
    SuperAdmin: 99,
    Owner: 20,
    Admin: 10,
    User: 0
  },
  attributes: {
    accountID : { type: 'integer' },
    userID : { type: 'integer' },
    role : { type: 'integer' },
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
  }
};
