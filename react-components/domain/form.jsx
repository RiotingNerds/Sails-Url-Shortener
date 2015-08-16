(function(){
  'use strict'
  var React = require('react'),
      bootstrap = require('react-bootstrap'),
      classNames = require('classnames'),
      randomString = require('../../api/helpers/hash'),
      validator = require('validator')

  var App = React.createClass({
      getInitialState: function() {
        return {
          hashCharCount:3,
          hash:"",
          hashChanged: false
        };
      },
      formSubmit: function(event) {
        var params = $(event.target).serialize();

        $.post('/domain',params, function(data) {
          $(window).trigger('refreshList')
        })
        return false;
      },
      componentDidMount: function() {
        $.validator.addMethod('validDomain',function(value,element) {
          return validator.isURL(value,{
            require_protocol:false,
            protocols:['http','https']
          })
        },"Domain is not valid, Do no include http or https")
        $.validator.addMethod('validDefaultURL',function(value,element) {
          return validator.isURL(value,{
            require_protocol:true,
            protocols:['http','https']
          })
        },"Link must be a valid URL with http or https")
        $("form#domainForm").validate({
          rules: {
            "Domain[domain]": {
              required: true,
              minlength: 4,
              validDomain: true
            },
            "Domain[defaultLink]": {
              minlength: 6,
              validDefaultURL: true
            },
          },
          messages: {
            "Domain[domain]": {
              required: "Please enter your Tiny Domain",
              minlength: "Your domain must consist of at least 4 characters"
            },
            "Domain[defaultLink]": {
              minlength: "Your default link must be at least 6 characters long"
            },
          }
        });
      },
      render: function() {
        var paramsClass = classNames({
          'form-group':true,
          'parameterField':true,
          'showParameters':true
        })
        return (
          <section className="panel" id="domainForm">
            <div className="panel-body">
              <div className="position-center">
                <form className="form-horizontal" role="form" method="POST" id="domainForm" onSubmit={this.formSubmit}>
                  <div className="form-group">
                      <label className="" htmlFor="Url_redirectURL">URL</label>
                      <input type="text" name="Domain[domain]" className="form-control input-lg" id="Domain_domain" placeholder="Domain" />
                  </div>{" "}
                  <div className="form-group">
                      <label className="" htmlFor="Url_redirectURL">Default Link</label>
                      <input type="text" name="Domain[defaultLink]" className="form-control input-lg" id="Domain_defaultLink" placeholder="Url to be redirected if hash is not found." />
                  </div>{" "}
                  <button type="submit" className="btn btn-success btn-lg">Add</button>
                </form>
              </div>

            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
