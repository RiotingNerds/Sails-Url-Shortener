(function() {
  'use strict'
  var ShortenerForm = require('../../../../react-components/site/urlshortener.jsx'),
      React = require('react'),
      data = []
  if(typeof window.domainData !== 'undefined') {
    data = window.domainData
  }
  if($('#site-shortener-form').length) {
    React.render(
      <ShortenerForm domainData={data} />,
      document.getElementById('site-shortener-form')
    );
  }
}())
