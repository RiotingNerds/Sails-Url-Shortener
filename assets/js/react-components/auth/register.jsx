(function() {
  'use strict'
  var ResetPasswordContent = require('../../../../react-components/auth/register.jsx'),
      React = require('react'),
      User  = {}
  if(typeof window.user !== 'undefined') {
    User = window.user
  }
  if($('#registerContentWrapper').length) {
    React.render(
      <ResetPasswordContent user={User} />,
      document.getElementById('registerContentWrapper')
    );
  }
}())
