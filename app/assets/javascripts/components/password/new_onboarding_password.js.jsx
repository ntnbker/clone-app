var NewOnboardingPassword = React.createClass({
  getInitialState: function () {
    return {
      errors: '',
    };
  },

  onSubmit: function(e) {
    var self = this, formData = new FormData(document.getElementById('onboarding-password'));
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/create_onboarding_password',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: formData,
      success: function (res) {
        if (res.errors) {
          self.setState({errors: res.errors});
        }
      },
      error: function (err) {}
    });
  },

  removeError: function() {
    this.setState({ errors: '' });
  },

  render: function() {
    const { user, authenticity_token, trady_id, maintenance_request_id } = this.props;
    const { errors } = this.state;
    return (
      <div className="container reset-password onboarding-form">
          <form role="form" className="edit_user onboarding-password" id="onboarding-password" acceptCharset="UTF-8" onSubmit={this.onSubmit}>
            <input name="utf8" type="hidden" value="✓" />
            <input type="hidden" name="authenticity_token" value={authenticity_token} />
            <p>{user.email}</p>
            <input value={user.email} type="hidden" name="user[email]" id="user_email" />
            <div className="form-group">
              <input
                placeholder="Password"
                minLength="3"
                className={`form-control ${errors.password ? 'has-error' : ''}`}
                type="password"
                name="user[password]" 
                id="user_password"
                onChange={this.removeError} />
              {errors.password && <span className="help-block">{errors.password[0]}</span>}
            </div>
            <div className="form-group">
              <input
                placeholder="Password confirmation"
                autoComplete="off"
                minLength="3"
                className={`form-control ${errors.password_confirmation ? 'has-error' : ''}`}
                type="password"
                name="user[password_confirmation]"
                id="user_password_confirmation"
                onChange={this.removeError} />
              {errors.password_confirmation && <span className="help-block">{errors.password_confirmation[0]}</span>}
            </div>
            <input
              value={maintenance_request_id}
              type="hidden"
              name="user[maintenance_request_id]"
              id="user_maintenance_request_id" />
            <input
              value={trady_id}
              type="hidden"
              name="user[trady_id]"
              id="user_trady_id" />
            <button name="button" type="submit" className="button-primary green">Submit</button>
          </form>
      </div>
    );
  }
})