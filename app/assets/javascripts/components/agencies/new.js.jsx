var AgencyAttributes = React.createClass({
  getInitialState: function () {
    return {
      same_address: false,
      address: '',
      mailing: '',
      errors: {},
    };
  },

  generateAtt: function(name_id, type) {
    if (name_id == "name") {
        return "agency[" + type + "]";
    }
    else if (name_id == "id") {
        return type;
    }
  },

  handleChange: function(event) {
    this.setState({address: event.target.value});
    this.removeError(event);
    if (this.state.same_address) {
      this.removeError({
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
    this.removeError({
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
    const {agency} = this.props;
    e.preventDefault();
    var FD = new FormData(document.getElementById('agencies'));

    $.ajax({
      type: agency ? 'PUT' : 'POST',
      url: agency ? ('/agencies/' + agency.id) : '/agencies',
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
    const {agency} = this.props;
    const {errors} = this.state;
    const renderError = this.renderError;
    const generateAtt = this.generateAtt;
    const removeError = this.removeError;

    return (
      <form className="fields agencies" id="agencies" onSubmit={this.onSubmit}>
        <h4 className="text-center"> Agency Information </h4>
        <div className="agency-name">
          <div className="company-name">
            <input
              type="text"
              placeholder="Company Name"
              defaultValue={agency && agency.company_name}
              id={generateAtt("id", "company_name")}
              name={generateAtt("name", "company_name")}
              className={errors[generateAtt("id", "company_name")] ? ' has-error' : ''}
              onChange={removeError}
            />
            {renderError(errors[generateAtt("id", "company_name")])}
          </div>

          <div className="business-name">
            <input
              type="text"
              placeholder="Business name"
              defaultValue={agency && agency.business_name}
              id={generateAtt("id", "business_name")}
              name={generateAtt("name", "business_name")}
              className={errors[generateAtt("id", "business_name")] ? ' has-error' : ''}
              onChange={removeError}
            />
            {renderError(errors[generateAtt("id", "business_name")])}
          </div>
        </div>

        <div className="address">
          <input
            type="text"
            placeholder="Address"
            defaultValue={agency && agency.address}
            onChange={this.handleChange}
            id={generateAtt("id", "address")}
            name={generateAtt("name", "address")}
            className={errors[generateAtt("id", "address")] ? ' has-error' : ''}
          />
          {renderError(errors[generateAtt("id", "address")])}
        </div>
        <div className="field text-center">
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

          <input
            type="text"
            placeholder="Mailing address"
            defaultValue={agency && agency.mailing_address}
            readonly={this.state.same_address}
            id={generateAtt("id", "mailing_address")}
            name={generateAtt("name", "mailing_address")}
            className={errors[generateAtt("id", "mailing_address")] ? ' has-error' : ''}
            onChange={this.onChangeMailing}
            value={!!this.state.same_address ? this.state.address : this.state.mailing}
          />
          {renderError(errors[generateAtt("id", "mailing_address")])}
        </div>

        <div className="agency-contact">
          <div className="agency-phone">
            <input
              type="text"
              placeholder="Phone"
              defaultValue={agency && agency.phone}
              id={generateAtt("id", "phone")}
              name={generateAtt("name", "phone")}
              className={errors[generateAtt("id", "phone")] ? ' has-error' : ''}
              onChange={removeError}
            />
            {renderError(errors[generateAtt("id", "phone")])}
          </div>

          <div className="agency-mobile">
            <input
              type="text"
              placeholder="Mobile phone"
              defaultValue={agency && agency.mobile_phone}
              id={generateAtt("id", "mobile_phone")}
              name={generateAtt("name", "mobile_phone")}
              className={errors[generateAtt("id", "mobile_phone")] ? ' has-error' : ''}
              onChange={removeError}
            />
            {renderError(errors[generateAtt("id", "mobile_phone")])}
          </div>
        </div>
        <div className="agency-button">
          <input
            type="submit"
            name="commit"
            value="Sign Up"
            className="button-primary agency-button-submit green"
          />
        </div>
      </form>
    )
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
      url: '/register_agency_admin',
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
    const {edit_agency_registration_path} = this.props;

    return <form role="form" className="agencies" id="new_user" onSubmit={this.onSubmit}>
      <input name="utf8" type="hidden" value="✓"/>
      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}/>
      <input type="hidden" name="user[agency_admin_attributes][agency_id]" value={this.props.agency_id}/>

      <div className="user-email">
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

      <div className="user-name">
        <div className="user-first-name">
          <input
            type="text"
            placeholder="First name"
            id="agency_admin_attributes.first_name"
            name="user[agency_admin_attributes][first_name]"
            onChange={removeError}
            className={errors['agency_admin_attributes.first_name'] ? 'has-error' : ''}
          />
          {renderError(errors['agency_admin_attributes.first_name'])}
        </div>

        <div className="user-last-name">
          <input
            type="text"
            placeholder="Last name"
            id="agency_admin_attributes.last_name"
            name="user[agency_admin_attributes][last_name]"
            onChange={removeError}
            className={errors['agency_admin_attributes.last_name'] ? 'has-error' : ''}
          />
          {renderError(errors['agency_admin_attributes.last_name'])}
        </div>
      </div>

      <div className="user-mobile">
        <input
          type="text"
          placeholder="Mobile phone"
          id="agency_admin_attributes.mobile_phone"
          name="user[agency_admin_attributes][mobile_phone]"
          onChange={removeError}
          className={errors['agency_admin_attributes.mobile_phone'] ? 'has-error' : ''}
        />
        {renderError(errors['agency_admin_attributes.mobile_phone'])}
      </div>

      <div className="user-button">
        <input
          type="button"
          name="commit"
          value="Back"
          onClick={() => {
            location.href = edit_agency_registration_path;
          }}
          className="button-primary button-user-back green"
        />
        <input
          type="submit"
          name="commit"
          value="Sign Up"
          className="button-primary button-user-submit green"
        />
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
