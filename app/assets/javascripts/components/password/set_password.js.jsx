var SetPassword = React.createClass({
  render: function() {
    const { authenticity_token, user } = this.props;
    return (
      <form role="form" className="edit_user" id="edit_user_5" action="/confirm_password" acceptCharset="UTF-8" method="post">
        <input name="utf8" type="hidden" value="✓" />
        <input type="hidden" name="_method" value="patch" />
        <input type="hidden" name="authenticity_token" value={ authenticity_token }/>
        <p>{ user.email }</p>
        <input value={ user.email } type="hidden" name="user[email]" id="user_email" />
        <div className="form-group">
          <label
            className="control-label required"
            htmlFor="user_password">
            Password
          </label>
          <input
            minLength="3"
            className="form-control"
            type="password"
            name="user[password]"
            id="user_password" />
        </div>
        <div className="form-group">
          <label
            className="control-label"
            htmlFor="user_password_confirmation">
            Password confirmation
          </label>
          <input
            autoComplete="off"
            minLength="3"
            className="form-control"
            type="password"
            name="user[password_confirmation]"
            id="user_password_confirmation" />
        </div>
        <button name="button" type="submit" className="button-primary green">Update</button>
      </form>
    );
  }
});