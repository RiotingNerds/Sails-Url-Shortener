(function(){
  'use strict'
  var React = require('react'),
      classNames = require('classnames'),
      randomString = require('../../api/helpers/hash'),
      validator = require('validator')

  var InputGroup = React.createClass({
    getInitialState: function() {
      return {
        domainID:(this.props.domainData.length)?this.props.domainData[0].id: 0,
        domainName:(this.props.domainData.length)?this.props.domainData[0].domain: ""
      };
    },
    changeDomainID: function(event) {
      this.setState({
        domainID:$(event.target).attr('data-domainid'),
        domainName:$(event.target).attr('data-domainname')
      })
    },
    render: function() {
      var self = this
      var nodes = this.props.domainData.map(function(domain) {
        return (
          <li key={domain.id}><a href="#" onClick={self.changeDomainID} data-domainid={domain.id} data-domainname={domain.domain}>{domain.domain}</a></li>
        )
      })
      return (
        <div className="input-group-btn">
          <button type="button" className="btn-lg btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">{this.state.domainName+' '}<span className="caret"></span></button>
          <input name="Url[domainID]" type="hidden" value={this.state.domainID} />
          <ul className="dropdown-menu">
            {nodes}
          </ul>
        </div>
      )
    }
  })

  var App = React.createClass({
      getInitialState: function() {
        return {
          hashCharCount:3,
          hash:"",
          hashChanged: false,
          shortURL: ""
        };
      },
      checkServer: function(value) {
        var app = this;
        $.getJSON('/Url/check-hash',{hash:value}, function(data,statusCode){
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
        this.setState({hashChanged:true,hash: event.target.value})

        this.checkServer(event.target.value)
      },
      randomString: function(event) {
        if(!this.state.hashChanged && $(event.target).val() != "")
          this.checkServer(randomString(this.state.hashCharCount))
      },
      formSubmit: function(event) {
        var params = $(event.target).serialize();
        var self = this
        $.post('/Url/create',params, function(data) {
          self.setState({
            shortURL:data.message.fullURL
          })
          $(window).trigger('refreshUrlList')
        })
        return false;
      },
      componentDidMount: function() {
        $("#urlShortenerForm").validate({
          rules: {
            "Url[redirectURL]": {
              required: true,
              minlength: 6
            },
            "Url[hash]": {
              required: true,
              minlength: 3
            },
          },
          messages: {
            "Url[redirectURL]": {
              required: "Please enter a URL",
              minlength: "Your username must consist of at least 6 characters"
            },
            "Url[hash]": {
              required: "Hash cannot be empty",
              minlength: "Your password must be at least 3 characters long"
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
        var resultParamsClass = classNames({
          'parameterField':true,
          'showParameters':(this.state.shortURL == '')?false:true,
          'alert':true,
          "alert-success":true,
          "alert-block": true,
          "fade":true,
          "in":(this.state.shortURL == '')?false:true
        })
        return (
          <section className="panel" id="shorteningForm">
            <header className="panel-heading">
                Shorten Your URL
            </header>
            <div className="panel-body">
                <div className="position-center">
                  <div className={resultParamsClass}>
                      <button data-dismiss="alert" className="close close-sm" type="button">
                          <i className="fa fa-times"></i>
                      </button>
                      <h4>
                          <i className="icon-ok-sign"></i>
                          URL created
                      </h4>
                      <p>Copy the following link. <a target="_blank" href={"http://"+this.state.shortURL}>{"http://"+this.state.shortURL}</a></p>
                  </div>
                  <form className="form-horizontal" role="form" id="urlShortenerForm" onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <label htmlFor="Url_redirectURL">URL</label>
                        <input type="text" name="Url[redirectURL]" className="form-control input-lg" onBlur={this.randomString} id="Url_redirectURL" placeholder="URL" />
                    </div>
                    <div className={paramsClass}>
                      <label htmlFor="Url_parameter">Hash</label>
                      <div className="input-group">
                        <InputGroup domainData={this.props.domainData} />
                        <input type="text" onChange={this.handleHashChange} name="Url[hash]" value={this.state.hash} className="form-control input-lg" id="Url_parameter" placeholder="Hash" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Generate</button>
                  </form>

                </div>
            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
