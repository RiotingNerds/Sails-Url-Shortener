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
      login: function(e) {
        var self = this
        var url = $(e.target).attr('action')
        $.post(url,$(e.target).serialize(),function(data) {
          //window.location="/dashboard"

          location.reload();
        })

        return false;
      },
      render: function() {
        return (
          <form className="form-signin form-lostpassword" onSubmit={this.login} method="POST" action="/auth/lostPassword">
        <h2 className="form-signin-heading form-lostpassword-heading">reset your password</h2>
        <div className="login-wrap lostpasswor-wrap">
            <div className="user-login-info lostpasswor-info">
                <input type="text" name="LostPassword[email]" className="form-control" placeholder="E-mail" autofocus />
              </div>
            <button className="btn btn-lg btn-login btn-block" type="submit">Reset</button>
        </div>
      </form>
        );
      }
    })
    module.exports = App;
}());
