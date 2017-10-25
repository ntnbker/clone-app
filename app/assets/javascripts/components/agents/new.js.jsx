var AgentNew = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
    };
  },

  onSubmit: function(e){

    const getValidValue = obj => obj && obj.value;
    var agent = {
      agency_id     : this.props.agency_id,
      email         : getValidValue(this.email),
      name          : getValidValue(this.name),
      last_name     : getValidValue(this.last_name),
      mobile_phone  : getValidValue(this.mobile_phone),
      license_number: getValidValue(this.license_number),
    }

    var params = { agent };
    const self = this;
    $.ajax({
      type: 'POST',
      url: '/agents',
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

    return (
      <div className="form-group">
          <input
            type="text"
            id={field}
            placeholder={textHolder}
            ref={(ref) => this[field] = ref}
            className={"form-control " + (errors[field] ? "has-error" : "")}
            onChange={this.removeError}
          />
          {this.renderError(errors[field])}
      </div>
    )
  },

  render: function() {
    const renderTextField  = this.renderTextField;
    const renderButtonFunc = this.renderButton;

    return (
      <div className="new_agent new_profile">
        <form role="form" className="form-horizontal" id="new_agent" onSubmit={this.onSubmit} >
          <h5 className="control-label col-sm-2 required title">
            Add Another Agency Admin to this agency
          </h5>
          {renderTextField('email', 'Email')}
          {renderTextField('name', 'Name')}
          {renderTextField('last_name', 'Last Name')}
          {renderTextField('mobile_phone', 'Mobile Phone')}
          {renderTextField('license_number', 'License Number')}
          <div className="text-center">
            <button type="submit" className="button-primary green option-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
});
