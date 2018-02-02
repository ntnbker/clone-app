var TenantEdit = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
    };
  },

  onSubmit: function(e){
    e.preventDefault();

    const getValidValue = obj => obj && obj.value;

    var tenant = {
      name        : getValidValue(this.name),
      mobile      : getValidValue(this.mobile),
    }

    var params = { tenant };

    const self = this;
    $.ajax({
      type: 'PUT',
      url: `/tradies/${(this.props.tenant || {}).id}`,
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
    const { tenant = {} } = this.props;
    const value           = tenant[field];

    return (
      <div className="form-group">
        <div className="col-sm-10">
          <input
            type="text"
            id={field}
            placeholder={textHolder}
            defaultValue={value}
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
    let tenant             = this.props.tenant || {};
    let { errors = {}}     = this.state;
    const renderTextField  = this.renderTextField;
    const renderButtonFunc = this.renderButton;

    return (
      <div className="edit_profile edit_trady_profile">
        <form
          role="form"
          className={"form-horizontal right " + haveCompanyClass}
          id="edit_trady"
          onSubmit={this.onSubmit}
        >
          <h5 className="control-label col-sm-2 required title" >
            Edit Trady Profile
          </h5>
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
