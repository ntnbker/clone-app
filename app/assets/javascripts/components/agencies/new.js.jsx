var AgencyAttributes = React.createClass({
    getInitialState: function () {
      return {
        same_address: false,
        address: '',
        mailing: '',
        errors: this.props.errors,
      };
    },

    generateAtt: function(name_id, type) {
      if (name_id == "name") {
          return "user[agency_admin_attributes][agency_attributes][" + type + "]";
      }
      else if (name_id == "id") {
          return "agency_admin.agency." + type;
      }
    },

    handleChange: function(event) {
      this.setState({address: event.target.value});
      this.props.removeError(event);
      if (this.state.same_address) {
        this.props.removeError({
          target: {
            id: this.generateAtt('id', 'mailing_address'),
          }
        });
        this.setState({
          mailing: event.target.value,
          address: event.target.value
        });
      }
    },

    onSame: function() {
      this.setState({
        same_address: !this.state.same_address,
        mailing: ''
      });
      this.props.removeError({
        target: {
          id: this.generateAtt('id', 'mailing_address')
        }
      });
    },

    onChangeMailing: function(e) {
      this.setState({
        mailing: e.target.value
      });
      this.props.removeError(e);
    },

    renderError: function(error) {
        return <p id="errorbox" className="error">{error && error[0] || ''}</p>;
    },

    render: function(){
      const {removeError, errors} = this.props;
      const renderError = this.renderError;
      const generateAtt = this.generateAtt;

      return <div className="fields">
        <h4> Agency Information </h4>
        <p> Company Name </p>
        <input
          type="text"
          placeholder="Company Name"
          id={generateAtt("id", "company_name")}
          name={generateAtt("name", "company_name")}
          className={errors[generateAtt("id", "company_name")] ? ' has-error' : ''}
          onChange={removeError}
        />
        {renderError(errors[generateAtt("id", "company_name")])}

        <p> Business name </p>
        <input
          type="text"
          placeholder="Business name"
          id={generateAtt("id", "business_name")}
          name={generateAtt("name", "business_name")}
          className={errors[generateAtt("id", "business_name")] ? ' has-error' : ''}
          onChange={removeError}
        />
        {renderError(errors[generateAtt("id", "business_name")])}

        <p> Address </p>
        <input
          type="text"
          placeholder="Address"
          onChange={this.handleChange}
          id={generateAtt("id", "address")}
          name={generateAtt("name", "address")}
          className={errors[generateAtt("id", "address")] ? ' has-error' : ''}
        />
        {renderError(errors[generateAtt("id", "address")])}

        <div className="field">
          <label>
            <input
              value="1"
              type="checkbox"
              onChange={this.onSame}
              id={generateAtt("id", "mailing_same_address")}
              name={generateAtt("name", "mailing_same_address")}
            />
            Mailing address same as billing address
          </label>

          <p> Mailing address </p>
          <input
            type="text"
            placeholder="Mailing address"
            readonly={this.state.same_address}
            id={generateAtt("id", "mailing_address")}
            name={generateAtt("name", "mailing_address")}
            className={errors[generateAtt("id", "mailing_address")] ? ' has-error' : ''}
            onChange={this.onChangeMailing}
            value={!!this.state.same_address ? this.state.address : this.state.mailing}
          />
          {renderError(errors[generateAtt("id", "mailing_address")])}
        </div>

        <p> Phone </p>
        <input
          type="text"
          placeholder="Phone"
          id={generateAtt("id", "phone")}
          name={generateAtt("name", "phone")}
          className={errors[generateAtt("id", "phone")] ? ' has-error' : ''}
          onChange={removeError}
        />
        {renderError(errors[generateAtt("id", "phone")])}

        <p> Mobile phone </p>
        <input
          type="text"
          placeholder="Mobile phone"
          id={generateAtt("id", "mobile_phone")}
          name={generateAtt("name", "mobile_phone")}
          className={errors[generateAtt("id", "mobile_phone")] ? ' has-error' : ''}
          onChange={removeError}
        />
        {renderError(errors[generateAtt("id", "mobile_phone")])}
      </div>
    }
});

var Agency = React.createClass({
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

  onSubmit(e) {
    const self = this;
    e.preventDefault();
    var FD = new FormData(document.getElementById('new_user'));

    $.ajax({
      type: 'POST',
      url: '/agencies',
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
    const renderError = this.renderError;
    const removeError = this.removeError;
    const {errors} = this.state;

    return <form role="form" className="agencies" id="new_user" onSubmit={this.onSubmit}>
      <input name="utf8" type="hidden" value="✓"/>
      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}/>

      <p> Email </p>
      <input
        type="text"
        id="email"
        name="user[email]"
        placeholder="Email"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        onChange={removeError}
        className={errors['email'] ? 'has-error' : ''}
      />
      {renderError(errors['email'])}

      <p> Password </p>
      <input
        type="password"
        id="password"
        name="user[password]"
        placeholder="Password"
        onChange={removeError}
        className={errors['password'] ? 'has-error' : ''}
      />
      {renderError(errors['password'])}

      <p> Password confirmation </p>
      <input
        type="password"
        placeholder="Password"
        id="password_confirmation"
        name="user[password_confirmation]"
        onChange={removeError}
        className={errors['password_confirmation'] ? 'has-error' : ''}
      />
      {renderError(errors['password_confirmation'])}

      <p> First name </p>
      <input
        type="text"
        placeholder="First name"
        id="agency_admin_attributes.first_name"
        name="user[agency_admin_attributes][first_name]"
        onChange={removeError}
        className={errors['agency_admin_attributes.first_name'] ? 'has-error' : ''}
      />
      {renderError(errors['agency_admin_attributes.first_name'])}

      <p> Last name </p>
      <input
        type="text"
        placeholder="Last name"
        id="agency_admin_attributes.last_name"
        name="user[agency_admin_attributes][last_name]"
        onChange={removeError}
        className={errors['agency_admin_attributes.last_name'] ? 'has-error' : ''}
      />
      {renderError(errors['agency_admin_attributes.last_name'])}

      <p> Mobile phone </p>
      <input
        type="text"
        placeholder="Mobile phone"
        id="agency_admin_attributes.mobile_phone"
        name="user[agency_admin_attributes][mobile_phone]"
        onChange={removeError}
        className={errors['agency_admin_attributes.mobile_phone'] ? 'has-error' : ''}
      />
      {renderError(errors['agency_admin_attributes.mobile_phone'])}

      <hr/>

      <AgencyAttributes removeError={this.removeError} errors={this.state.errors} />

      <input
        type="submit"
        name="commit"
        value="Sign Up"
        className="button-primary green"
      />

      <div className="have-account text-center">
          <p>Already have an Account?</p>
          <a href="/login">Login</a>
      </div>
    </form>
  }
});
