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
      maxLength: 125
    },

    firstName : {
      required: true,
      type: 'string',
      maxLength: 50
    },

    lastName : {
      required:true,
      type: 'string',
      maxLength: 50
    },
    fullName: function() {
      return this.firstName+ ' '+this.lastName
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
  },
  validationMessages: { //hand for i18n & l10n
    firstName: {
      required: 'First Name cannot be empty',
      maxLength: 'First Name cannot be more than 50 char'
    },
    lastName: {
      required: 'Last Name cannot be empty',
      maxLength: 'Last Name cannot be more than 50 char'
    },
    country: {
      maxLength: 'Country cannot be more than 125 char'
    }
  },
};
