(function() {
  'use strict'
  var LostPasswordContent = require('../../../../react-components/auth/lostPassword.jsx'),
      React = require('react')
  if($('#lostPasswordContentWrapper').length) {
    React.render(
      <LostPasswordContent />,
      document.getElementById('lostPasswordContentWrapper')
    );
  }
}())
