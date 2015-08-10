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
      checkServer: function(value) {
        var app = this;
        $.getJSON('/Url/checkHash',{hash:value}, function(data,statusCode){
          if(data.code != 200) {
            app.state.hashCharCount += 1
            checkServer(randomString(app.state.hashCharCount))
          } else {
            app.setState({
              hash:value
            })
          }
        })
      },
      handleHashChange: function(event) {
        this.setState({hashChanged:true})
        this.checkServer(event.target.value)
      },
      randomString: function(event) {
        if(!this.state.hashChanged)
          this.checkServer(randomString(this.state.hashCharCount))
      },
      formSubmit: function(event) {
        var params = $(event.target).serialize();

        $.post('/Url/create',params, function(data) {

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
          <section className="panel" id="shorteningForm">
            <header className="panel-heading">
                Shorten Your URL
            </header>
            <div className="panel-body">
                <div className="position-center">
                    <form className="form-horizontal" role="form" onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <label htmlFor="Url_redirectURL">URL</label>
                        <input type="text" name="Url[redirectURL]" className="form-control input-lg" onBlur={this.randomString} id="Url_redirectURL" placeholder="URL" />
                        <input type="hidden" name="Url[domainID]" value="5" />
                    </div>
                    <div className={paramsClass}>
                        <label htmlFor="Url_parameter">Hash</label>
                        <input type="text" onChange={this.handleHashChange} name="Url[hash]" value={this.state.hash} className="form-control input-lg" id="Url_parameter" placeholder="Hash" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Shorten It</button>
                </form>
                </div>
            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
