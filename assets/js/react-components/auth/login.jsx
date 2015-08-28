(function() {
  'use strict'
  var LoginContent = require('../../../../react-components/auth/login.jsx'),
      React = require('react'),
      Notify = {}
  if(typeof window.notify !== 'undefined') {
    Notify = window.notify
  }
  if($('#loginContentWrapper').length) {
    React.render(
      <LoginContent notify={Notify} />,
      document.getElementById('loginContentWrapper')
    );
  }
}())
