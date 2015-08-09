(function() {
  'use strict'
  var ShortenerForm = require('../../../../react-components/site/urlShortener.jsx'),
      React = require('react')

  React.render(
    <ShortenerForm />,
    document.getElementById('site-shortener-form')
  );
}())
