(function() {
  'use strict'
  var LoginContent = require('../../../../react-components/auth/login.jsx'),
      React = require('react')
  if($('#loginContentWrapper').length) {
    React.render(
      <LoginContent />,
      document.getElementById('loginContentWrapper')
    );
  }
}())
