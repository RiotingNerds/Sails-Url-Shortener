(function(){
  'use strict'
  var React = require('react'),
      classNames = require('classnames'),
      randomString = require('../../api/helpers/hash'),
      validator = require('validator')

  var AccountSection = React.createClass({
    getInitialState: function() {
      return {
        accounts:(this.props.accounts.length)?this.props.domainData: []
      };
    },
    render: function() {
      var self = this
      var nodes = this.props.accounts.map(function(account) {
        return (
          <li>
              <div className="col-md-12">
                  <div className="prog-row">
                      <h4>{account.name}</h4>
                      <p>
                          {" "}
                      </p>
                  </div>
              </div>
          </li>
        )
      })
      return (
        <li className="widget-collapsible">
            <a href="#" className="head widget-head red-bg active clearfix">
                <span className="pull-left">Accounts</span>
                <span className="pull-right widget-collapse"><i className="fa fa-minus"></i></span>
            </a>
            <ul className="widget-container">
                {nodes}
            </ul>
        </li>
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
      getInitialProps: function() {
        return {
          accounts: []
        }
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
          <div className="right-stat-bar">
            <ul className="right-side-accordion">
              <AccountSection accounts={this.props.accounts} />
            </ul>
          </div>
        );
      }
    })
    module.exports = App;
}());
