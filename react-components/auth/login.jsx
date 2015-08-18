(function(){
  'use strict'
  var React = require('react')

  var App = React.createClass({
      getInitialState: function() {
        return {
          accountID:this.props.accountID,
          data: this.props.data
        };
      },
      getInitialProps: function() {
        return {
          data:[],
          accountID: 0
        };
      },
      refreshUrl: function() {
        var self = this
        $.getJSON('/url/topList',function(data){
          self.setState({data:data.data})
        })
      },
      componentDidMount: function() {
        $(window).bind('refreshUrlList',this.refreshUrl)
        $(window).bind('refreshList',this.refreshUrl)
      },
      componentWillUnmount: function() {
        $(window).unbind('refreshUrlList',this.refreshUrl)
        $(window).unbind('refreshList',this.refreshUrl)
      },
      render: function() {
        return (
          <form className="form-signin" action="index.html">
        <h2 className="form-signin-heading">sign in now</h2>
        <div className="login-wrap">
            <div className="user-login-info">
                <input type="text" name="Login[email]" className="form-control" placeholder="E-mail" autofocus />
                <input type="password" className="form-control" name="Login[password]" placeholder="Password" />
              </div>
            <label className="checkbox">
                <input type="checkbox" value="remember-me" /> Remember me
                <span className="pull-right">
                    <a data-toggle="modal" href="#myModal"> Forgot Password?</a>
                </span>
            </label>
            <button className="btn btn-lg btn-login btn-block" type="submit">Log in</button>
        </div>
      </form>
        );
      }
    })
    module.exports = App;
}());
