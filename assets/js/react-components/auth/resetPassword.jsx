(function() {
  'use strict'
  var ResetPasswordContent = require('../../../../react-components/auth/resetPassword.jsx'),
      React = require('react'),
      Data  = {}
  if(typeof window.data !== 'undefined') {
    Data = window.data
  }
  if($('#resetPasswordContentWrapper').length) {
    React.render(
      <ResetPasswordContent data={Data} />,
      document.getElementById('resetPasswordContentWrapper')
    );
  }
}())
