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
      register: function(e) {
        var self = this
        var url = $(e.target).attr('action')
        $.post(url,$(e.target).serialize(),function(data) {
          //window.location="/dashboard"
          //location.reload();
          //window.alert("Account created.")
          location.href="/login"
        })
        return false;
      },
      render: function() {
        return (
          <form className="form-signin" action="/register" method="POST" onSubmit={this.register}>
            <h2 className="form-signin-heading">registration now</h2>
            <div className="login-wrap">
              <p>Enter your personal details below</p>
              <input type="text" name="User[firstName]" defaultValue={this.props.user.firstName || ""} className="form-control" placeholder="First Name" autofocus />
              <input type="text" name="User[lastName]" defaultValue={this.props.user.lastName || ""} className="form-control" placeholder="Last Name" autofocus />
              <input type="text" name="User[country]" defaultValue={this.props.user.country || ""} className="form-control" placeholder="Country" autofocus />
              <p> Enter your account details below</p>
              <input type="text" name="User[username]" defaultValue={this.props.user.username || ""} className="form-control" placeholder="Username" autofocus />
              <input type="text" name="User[email]" defaultValue={this.props.user.email || ""} className="form-control" placeholder="Email" autofocus />
              <input type="password" name="User[password]" className="form-control" placeholder="Password" />
              <input type="password" name="User[re-password]" className="form-control" placeholder="Re-type Password" />
              <label className="checkbox">
                  <input type="checkbox" value="agree this condition" /> I agree to the Terms of Service and Privacy Policy
              </label>
              <button className="btn btn-lg btn-login btn-block" type="submit">Submit</button>
            </div>
          </form>
        );
      }
    })
    module.exports = App;
}());
