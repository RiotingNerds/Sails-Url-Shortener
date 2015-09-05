(function(){
  'use strict'
  var React = require('react'),
      classNames = require('classnames'),
      randomString = require('../../api/helpers/hash'),
      validator = require('validator')
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
          <div class="right-sidebar">
            <div class="search-row">
                <input type="text" placeholder="Search" class="form-control">
            </div>
            <div class="right-stat-bar">
              <ul class="right-side-accordion">
                <li class="widget-collapsible">
                    <a href="#" class="head widget-head red-bg active clearfix">
                        <span class="pull-left">Account</span>
                        <span class="pull-right widget-collapse"><i class="fa fa-minus"></i></span>
                    </a>
                    <ul class="widget-container">
                        <li>
                            <div class="col-md-12">
                                <div class="prog-row">
                                    <h4>Target sell</h4>
                                    <p>
                                        25%, Deadline 12 june 13
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    })
    module.exports = App;
}());
