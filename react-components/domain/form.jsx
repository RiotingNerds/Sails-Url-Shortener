(function(){
  'use strict'
  var React = require('react'),
      bootstrap = require('react-bootstrap'),
      classNames = require('classnames'),
      randomString = require('../../api/helpers/hash')

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

        })
        return false;
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
              <form className="form-inline" role="form" method="POST" onSubmit={this.formSubmit}>
                <div className="form-group">
                    <label className="sr-only" htmlFor="Url_redirectURL">URL</label>
                    <input type="text" name="Domain[domain]" className="form-control" id="Domain_domain" placeholder="Domain" />
                </div>{" "}
                <div className="form-group">
                    <label className="sr-only" htmlFor="Url_redirectURL">Default Link</label>
                    <input type="text" name="Domain[defaultLink]" className="form-control" id="Domain_defaultLink" placeholder="Url to be redirected if hash is not found." />
                </div>{" "}
                <button type="submit" className="btn btn-success">Add</button>
              </form>
            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
