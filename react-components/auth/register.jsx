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
          <form className="form-signin" action="index.html">
            <h2 className="form-signin-heading">registration now</h2>
            <div className="login-wrap">
                <p>Enter your personal details below</p>
                <input type="text" name="User[fullName]" className="form-control" placeholder="Full Name" autofocus>
                <input type="text" name="User[country]" className="form-control" placeholder="Country" autofocus>
                <p> Enter your account details below</p>
                <input type="text" name="User[email]" className="form-control" placeholder="Email" autofocus>
                <input type="password" name="User[password]" className="form-control" placeholder="Password">
                <input type="password" name="User[re-password]" className="form-control" placeholder="Re-type Password">
                <label className="checkbox">
                    <input type="checkbox" value="agree this condition"> I agree to the Terms of Service and Privacy Policy
                </label>
                <button className="btn btn-lg btn-login btn-block" type="submit">Submit</button>

                <div className="registration">
                    Already Registered.
                    <a class="" href="login.html">
                        Login
                    </a>
                </div>

            </div>

          </form>
        );
      }
    })
    module.exports = App;
}());
