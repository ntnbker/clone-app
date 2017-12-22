var TenantEdit = React.createClass({
  getInitialState: function () {

    return {
      errors: {},
    };
  },

  changeLicenseType: function({ target: {value} }) {
    this.setState({
      license_type: value,
      errors: {...this.state.errors, license_type: ''}
    });
  },

  onSubmit: function(e){
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;
    var tenant = {
      name      : getValidValue(this.name),
      email     : getValidValue(this.email),
      mobile    : getValidValue(this.mobile),
    }

    var params = { tenant };

    const self = this;
    $.ajax({
      type: 'PUT',
      url: `/tenants/${(this.props.tenant || {}).id}`,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          self.setState({errors: res.errors || {}});
        }
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
      <button className="btn button-primary option-button" onClick={() => location.href = link} title={text}>
        {text}
      </button>
    );
  },

  renderTextField: function(field, textHolder) {
    const { errors }      = this.state;
    const { tenant = {} }  = this.props;

    return (
      <div className="form-group">
        <div className="col-sm-10">
          <input
            type="text"
            id={field}
            placeholder={textHolder}
            defaultValue={tenant[field]}
            ref={(ref) => this[field] = ref}
            className={"form-control " + (errors[field] ? "has-error" : "")}
            onChange={this.removeError}
          />
          {this.renderError(errors[field])}
        </div>
      </div>
    )
  },

  render: function() {
    let isInvoice          = this.props.system_plan === "Invoice";
    let tenant              = this.props.tenant || {};
    let {
      company_name, business_name, abn, address, mailing_address, phone, mobile_phone, corporation_license_number
    } = tenant;

    let { errors = {}, license_type, gallery } = this.state;
    const renderTextField                      = this.renderTextField;
    const renderButtonFunc                     = this.renderButton;

    return (
      <div className="edit_tenant_profile edit_profile">
        <form role="form" className="form-horizontal full" id="edit_tenant" onSubmit={this.onSubmit} >
          <h5 className="control-label col-sm-2 required title">
            Edit tenant Profile
          </h5>
          {renderTextField('name', 'Name')}
          {renderTextField('mobile', 'Mobile')}
          {renderTextField('email', 'email')}
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
