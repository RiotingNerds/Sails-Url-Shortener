(function() {
  'use strict'
  var ShortenerForm = require('../../../../react-components/site/urlshortener.jsx'),
      React = require('react'),
      UrlTopList = require('../../../../react-components/url/topList.jsx'),
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
  if($('#siteIndexUrlList').length) {
    var urlData = []
    if(typeof window.urlData !== 'undefined') {
      urlData = window.urlData
    }
    React.render(
      <UrlTopList data={urlData} />,
      document.getElementById('siteIndexUrlList')
    )
  }
}())
