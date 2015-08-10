(function() {
  'use strict'
  var IndexContent = require('../../../../react-components/domain/index.jsx'),
      React = require('react'),
      data = []
  if(typeof window.data !== 'undefined') {
    data = window.data
  }
  if($('#domainIndexWrapper').length) {
    React.render(
      <IndexContent data={data} />,
      document.getElementById('domainIndexWrapper')
    );
  }
}())
