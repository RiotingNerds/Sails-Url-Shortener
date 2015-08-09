/**
* Url.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    domainID : { type: 'integer' },
    redirectURL: { type: 'text' },
    fullURL: {type: 'string'},
    parameter: {type:'string'},
    lastRequested: {type: 'datetime'},
    activeDate: {type: 'datetime'},
    active: {type: 'boolean'},

  }
};
