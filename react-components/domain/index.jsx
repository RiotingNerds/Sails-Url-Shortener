(function(){
  'use strict'
  var React = require('react'),
      DomainForm = require('./form.jsx'),
      DomainList = require('./list.jsx')
  var App = React.createClass({
      render: function() {        
        return (
          <section id="indexContent">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <DomainForm  />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <DomainList data={this.props.data} />
              </div>
            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
