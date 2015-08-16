(function(){
  'use strict'
  var React = require('react'),
      DomainForm = require('./form.jsx'),
      DomainList = require('./list.jsx')
  var App = React.createClass({
      refreshList:function() {

      },
      componentDidMount: function() {
        window.addEventListener('refreshList', this.refreshList);
      },
      componentWillUnmount: function() {
        window.removeEventListener('refreshList', this.refreshList);
      },
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
