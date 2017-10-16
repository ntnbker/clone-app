var TradyEdit = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
    };
  },

  onSubmit: function(e){

    var flag = false;
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;

    var trady = {
      name        : getValidValue(name),
      company_name: getValidValue(company_name),
      mobile      : getValidValue(mobile),
    }

    var params = { trady };

    const self = this;
    $.ajax({
      type: 'PUT',
      url: `/tradies/${(this.props.trady || {}).id}`,
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
      <a className="btn btn-default btn-back m-r-lg" href={link}>
        {text}
      </a>
    );
  },

  renderTextField: function(field, textHolder) {
    const { errors }      = this.state;
    const { trady = {} } = this.props;
    const value           = trady[field];

    return (
      <div className="form-group">
        <label className="control-label col-sm-2 required">{textHolder}</label>
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
    let trady = this.props.trady || {};
    let { errors = {}}                 = this.state;
    const renderTextField              = this.renderTextField;
    const renderButtonFunc             = this.renderButton;

    return (
      <div className="edit_trady">
        <div className="left">
          {renderButtonFunc('Reset Password', this.props.change_password_path)}
          {renderButtonFunc('Edit Tradie Company Details', this.props.change_trady_company_information_path + '/' + trady.trady_company)}
        </div>
        <form role="form" className="form-horizontal right" id="edit_trady" onSubmit={this.onSubmit} >
          {renderTextField('name', 'Name')}
          {renderTextField('company_name', 'Company Name')}
          {renderTextField('mobile', 'Mobile')}
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
