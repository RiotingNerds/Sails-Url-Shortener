(function(){
  'use strict'
  var React = require('react'),
      bootstrap = require('react-bootstrap'),
      classNames = require('classnames'),
      randomString = require('../../api/helpers/hash')

  var App = React.createClass({
      getInitialState: function() {
        return {
          showParameters: this.props.showParameters || false,
          hashCharCount:3,
          hash:""
        };
      },
      checkServer: function(value) {
        $.getJSON('/Url/checkHash',{hash:value}, function(data,statusCode){
          if(data.code != 200) {
            this.state.hashCharCount += 1
            checkServer(randomString(this.state.hashCharCount))
          } else {
            this.state.showParameters = true
            this.state.hash = value
          }
        })
      },
      randomString: function(event) {
        this.checkServer(randomString(this.state.hashCharCount))
      },
      render: function() {
        var paramsClass = classNames({
          'form-group':true,
          'parameterField':true,
          'showParameters':this.state.showParameters
        })
        return (
          <section className="panel" id="shorteningForm">
            <header className="panel-heading">
                Shorten Your URL
            </header>
            <div className="panel-body">
                <div className="position-center">
                    <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <label className="sr-only" htmlFor="Url_redirectURL">URL</label>
                        <input type="text" name="Url[redirectURL]" className="form-control input-lg" onBlur={this.randomString} id="Url_redirectURL" placeholder="URL" />
                    </div>
                    <div className={paramsClass}>
                        <label className="sr-only" htmlFor="Url_parameter">Parameter</label>
                        <input type="text" name="Url[parameter]" value={this.state.hash} className="form-control input-lg" id="Url_parameter" placeholder="Parameter" />
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
