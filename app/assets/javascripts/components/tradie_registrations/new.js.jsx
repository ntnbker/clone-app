var Trady = React.createClass({
  getInitialState : function() {
    return {
      errors: {}
    }
  },

  removeError: function({ target: { id } }) {
    const {errors} = this.state;
    errors[id] = '';
    this.setState({ errors });
  },

  renderError: function(error) {
      return <p id="errorbox" className="error">{error && error[0] || ''}</p>;
  },

  fillEmail({ target: { value, id }}) {
    this.removeError({target: {id}});
    this.setState({
      email: value
    })
  },

  onSubmit(e) {
    const self = this;
    e.preventDefault();
    var FD = new FormData(document.getElementById('new_user'));

    $.ajax({
      type: 'POST',
      url: '/tradie_registrations',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success: function (res) {
        if (res.errors) {
          self.setState({errors: res.errors});
        }
      },
      error: function (err) {

      }
    });
  },

  render: function(){
    const renderError     = this.renderError;
    const removeError     = this.removeError;
    const fillEmail       = this.fillEmail;
    const {errors, email} = this.state;

    return <form role="form" className="agencies" id="new_user" onSubmit={this.onSubmit}>
      <input name="utf8" type="hidden" value="✓"/>
      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}/>
      <input type="hidden" name="user[trady_attributes][jfmo_participant]" value={true}/>
      <input
        type="hidden"
        name="user[trady_attributes][trady_company_id]"
        value={this.props.trady_company_id || ''}
      />
      <input
        type="hidden"
        name="user[trady_attributes][maintenance_request_id]"
        value={this.props.maintenance_request_id || ''}
      />
      <div className="user-email">
        <input
          type="text"
          id="email"
          name="user[email]"
          placeholder="Email"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          onChange={fillEmail}
          className={errors['email'] ? 'has-error' : ''}
        />
        {renderError(errors['email'])}
      </div>
      <div className="user-password">
        <input
          type="password"
          id="password"
          name="user[password]"
          placeholder="Password"
          onChange={removeError}
          className={errors['password'] ? 'has-error' : ''}
        />
        {renderError(errors['password'])}
      </div>

      <div className="user-password-confirmation">
        <input
          type="password"
          placeholder="Password Confirmation"
          id="password_confirmation"
          name="user[password_confirmation]"
          onChange={removeError}
          className={errors['password_confirmation'] ? 'has-error' : ''}
        />
        {renderError(errors['password_confirmation'])}
      </div>

      <div className="agency-name trady-name">
        <input
          type="text"
          placeholder="Name"
          id="trady.name"
          name="user[trady_attributes][name]"
          onChange={removeError}
          className={errors['trady.name'] ? 'has-error' : ''}
        />
        {renderError(errors['trady.name'])}
      </div>

      <div className="agency-name trady-name">
        <input
          type="text"
          value={email}
          name="user[trady_attributes][email]"
          style={{display: 'none'}}
        />
      </div>

      <div className="agency-name trady-company-name">
        <input
          type="text"
          placeholder="Company Name"
          id="trady.company_name"
          name="user[trady_attributes][company_name]"
          onChange={removeError}
          className={errors['trady.company_name'] ? 'has-error' : ''}
        />
        {renderError(errors['trady.company_name'])}
      </div>

      <div className="user-mobile">
        <input
          type="text"
          placeholder="Mobile phone"
          id="trady.mobile"
          name="user[trady_attributes][mobile]"
          onChange={removeError}
          className={errors['trady.mobile'] ? 'has-error' : ''}
        />
        {renderError(errors['trady.mobile'])}
      </div>

      <div className="agency-button">
        <button
          type="submit"
          className="button-primary button-submit green"
        >
          Next
        </button>
      </div>

      {false &&
        <div className="have-account text-center">
          <p>Already have an Account?</p>
          <a href="/login">Login</a>
        </div>
      }
    </form>
  }
});
