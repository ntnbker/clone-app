var ChangePassword = React.createClass({
  render: function() {
    const { authenticity_token, current_user } = this.props;

    return (
      <form role="form" className="edit_user" id="edit_user_2" action="/update_password" acceptCharset="UTF-8" method="post">
        <input name="utf8" type="hidden" value="✓" />
        <input type="hidden" name="_method" value="patch" />
        <input type="hidden" name="authenticity_token" value={ authenticity_token }/>
        <p>{ current_user.email }</p>
        <div className="form-group">
          <label
            className="control-label required"
            htmlFor="user_password">
            Password
          </label>
          <input
            required="required"
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
            required="required"
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