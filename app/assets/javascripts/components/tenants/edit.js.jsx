var TenantEdit = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
      hideMessage: true,
      message: 'deafult message'
    };
  },
  onSubmit: function(e){
    e.preventDefault();
    let isInvoice = this.props.system_plan === 'Invoice';
    const getValidValue = obj => obj && obj.value;
    var tenant = {
      id    : this.props.tenant.id,
      name  : getValidValue(this.name),
      // email     : getValidValue(this.email),
      mobile: getValidValue(this.mobile),
    }
    var params = { tenant, id: this.props.tenant.id };
    const self = this;
    $.ajax({
      type: 'POST',
      url: `/edit_tenant`,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return self.setState({errors: res.errors || {}});
        }
        self.setState({message: res.message, tenant: res.tenant, hideMessage: false});
      },
      error: function(err) {
      }
    });
    return;
  },
  removeError: function({ target: { id } }) {
      this.setState({ errors: {...this.state.errors, [id]: ''}, hideMessage: true });
  },
  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },
  renderMessage: function() {
    const {message, hideMessage} = this.state;
    return (
      <p
        id="message"
        className={"message " + (hideMessage && 'hide-message')}
      >
        {message}
      </p>
    )
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
    const { tenant = {} } = this.props;
    return (
      <div className="form-group">
        <div className="col-sm-10">
          <input
            type="text"
            id={field}
            placeholder={textHolder}
            defaultValue={tenant[field]}
            readOnly={field === 'email'}
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
    let tenant                 = this.props.tenant || {};
    let {errors = {}, message} = this.state;
    const renderTextField      = this.renderTextField;
    const renderButtonFunc     = this.renderButton;
    const renderMessage        = this.renderMessage;
    return (
      <div className="edit_profile edit_tenant_profile">
        <form
          role="form"
          className="form-horizontal right "
          id="edit_trady"
          onSubmit={this.onSubmit}
        >
          <h5 className="control-label col-sm-2 required title" >
            Edit Tenant Profile
          </h5>
          {renderMessage()}
          {renderTextField('email', 'email')}
          {renderTextField('name', 'Name')}
          {renderTextField('mobile', 'Mobile')}
          <div className="text-center">
            <button type="submit" className="button-primary green option-button">
              Update Your Profile
            </button>
          </div>
          {renderButtonFunc('Reset Password', this.props.change_password_path)}
        </form>
      </div>
    );
  }
});
