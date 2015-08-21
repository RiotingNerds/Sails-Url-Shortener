(function(){
  'use strict'
  var React = require('react')

  var App = React.createClass({
      getInitialState: function() {
        return {
          data: this.props.code || {code:""}
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
          <form className="form-signin form-reset-code" onSubmit={this.login} method="POST" action="/auth/resetPassword">
        <h2 className="form-signin-heading form-reset-code-heading">change password</h2>
        <div className="login-wrap reset-code-wrap">
              <div className="user-login-info lostpasswor-info">
                <input type="hidden" name="ChangePassword[code]" value={this.state.data.code} />
                <input type="text" name="ChangePassword[password]" className="form-control" placeholder="Password" autofocus />
              </div>
              <div className="user-login-info lostpasswor-info">
                <input type="text" name="ChangePassword[repassword]" className="form-control" placeholder="Re-Password" />
              </div>
            <button className="btn btn-lg btn-login btn-block" type="submit">Reset Password</button>
        </div>
      </form>
        );
      }
    })
    module.exports = App;
}());
