var AgencyAdminEdit = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
    };
  },

  onSubmit: function(e){

    var flag = false;
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;

    var agency_admin = {
      last_name:      getValidValue(last_name),
      first_name:     getValidValue(first_name),
      mobile_phone:   getValidValue(mobile_phone),
      license_number: getValidValue(license_number),
    }

    var params = { agency_admin };

    const self = this;
    $.ajax({
      type: 'PUT',
      url: `/agency_admins/${this.props.agency_admin.id}`,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({errors: res.errors || {}});
      },
      error: function(err) {
      }
    });

    e.preventDefault();

    return;
  },

  removeError: function({ target: { id } }) {
      this.setState({ errors: {...this.state.errors, [id]: ''} });
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  renderButton: function(text, link) {
    return (
      <a className="btn btn-default btn-back m-r-lg" href={link}>
        {text}
      </a>
    );
  },

  render: function() {
    let isInvoice          = this.props.system_plan === "Invoice";
    let agency_admin       = this.props.agency_admin || {};
    let {
      first_name, last_name, mobile_phone, license_number
    } = agency_admin;

    let { errors = {} }    = this.state;
    const renderErrorFunc  = this.renderError;
    const removeErrorFunc  = this.removeError;
    const renderButtonFunc = this.renderButton;

    return (
      <div className="agency_admin">
        <div className="left">
          {renderButtonFunc('Change Password', this.props.change_password_path)}
          {renderButtonFunc('Add New Agency', this.props.new_agent_path)}
          {renderButtonFunc('Add New Admin Agency', this.props.new_agency_admin_path)}
        </div>
        <form role="form" className="form-horizontal right" id="edit_agency_admin" onSubmit={this.onSubmit} >
          <div className="form-group">
            <div className="col-sm-10">
              <input

                type="text"
                id="first_name"
                placeholder="First Name"
                defaultValue={first_name}
                ref={(ref) => this.first_name = ref}
                className={"form-control " + (errors['first_name'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['first_name'])}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-10">
              <input

                type="text"
                id="last_name"
                placeholder="Last Name"
                defaultValue={last_name}
                ref={(ref) => this.last_name = ref}
                className={"form-control " + (errors['last_name'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['last_name'])}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-10">
              <input

                type="text"
                id="mobile_phone"
                placeholder="Mobile Phone"
                defaultValue={mobile_phone}
                ref={(ref) => this.mobile_phone = ref}
                className={"form-control " + (errors['mobile_phone'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['mobile_phone'])}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-10">
              <input

                type="text"
                id="license_number"
                placeholder="License Number"
                defaultValue={license_number}
                ref={(ref) => this.license_number = ref}
                className={"form-control " + (errors['license_number'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['license_number'])}
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="button-primary green option-button">
              Update Your Profile
            </button>
          </div>
        </form>
      </div>
    );
  }
});
