/**
* UserProfile.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'userProfile',
  attributes: {

    userID : {
      type: 'integer'
    },

    country : {
      type: 'string',
      size: 125
    },

    firstName : {
      type: 'string',
      size: 50
    },

    lastName : {
      type: 'string',
      size: 50
    },

    createBy : { type: 'integer' },
    lastModifiedBy : { type: 'integer' },
    updatedAt: {
      type:'datetime',
      columnName: 'lastModifiedDate'
    },
    createdAt: {
      type:'datetime',
      columnName: 'createDate'
    }
  }
};
