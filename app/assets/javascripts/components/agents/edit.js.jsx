var AgentEdit = React.createClass({
  getInitialState: function () {
    const { image_url, profile_image = {}, agent = {} } = this.props;

    return {
      errors: {},
      gallery: {...profile_image, image_url},
    };
  },

  uploadImage: function(images, callback) {
    if (images.length == 0) {
      return;
    }
    const { gallery } = this.state;
    var FD = new FormData();
    images.map((image, index) => {
      var idx = index + 1;
      FD.append('picture[image]', JSON.stringify(image));
    });

    FD.append('picture[agent_id]', this.props.agent.id);
    if (gallery) {
      FD.append('picture[agent_profile_image_id]', gallery.id);
    }

    const self = this;
    $.ajax({
      type: gallery ? 'PUT' : 'POST',
      url: `/agent_profile_images${gallery ? '/' + gallery.id : ''}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success: function (res) {
          callback(res.errors);
          if (!res.errors && res.profile_image) {
            self.setState({ gallery: res.profile_image });
          }
      },
      error: function (err) {

      }
    });
    return false;
  },

  changeLicenseType: function({ target: {value} }) {
    this.setState({
      license_type: value,
      errors: {...this.state.errors, license_type: ''}
    });
  },

  onSubmit: function(e){

    var flag = false;
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;

    var agent = {
      company_name              : getValidValue(company_name),
      business_name             : getValidValue(business_name),
      abn                       : getValidValue(abn),
      address                   : getValidValue(address),
      mailing_address           : getValidValue(mailing_address),
      phone                     : getValidValue(phone),
      mobile_phone              : getValidValue(mobile_phone),
      corporation_license_number: getValidValue(corporation_license_number),
      license_type              : this.state.license_type,
    }

    var params = { agent };

    const self = this;
    $.ajax({
      type: 'PUT',
      url: `/agencies/${(this.props.agent || {}).id}`,
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
    const { agent = {} } = this.props;
    const value           = agent[field];

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
    let isInvoice          = this.props.system_plan === "Invoice";
    let agent              = this.props.agent || {};
    let {
      company_name, business_name, abn, address, mailing_address, phone, mobile_phone, corporation_license_number
    } = agent;

    let { errors = {}, license_type, gallery } = this.state;
    const renderTextField                      = this.renderTextField;
    const renderButtonFunc                     = this.renderButton;

    return (
      <div className="edit_profile">
        <div className="left">
          { gallery &&
              <img id="avatar" src={gallery.image_url} alt="Avatar Image"/>
          }
          <ModalImageUpload
            uploadImage={this.uploadImage}
            gallery={gallery && [gallery] || []}
            text="Add/Change Photo"
            className="btn button-primary option-button"
          />
          {renderButtonFunc('Reset Password', this.props.change_password_path)}
        </div>
        <form role="form" className="form-horizontal right" id="edit_agent" onSubmit={this.onSubmit} >
          <label className="control-label col-sm-2 required">
            Edit Agent Profile
          </label>          {renderTextField('name', 'Name')}
          {renderTextField('last_name', 'Last Name')}
          {renderTextField('phone', 'Phone')}
          {renderTextField('mobile_phone', 'Mobile Phone')}
          {renderTextField('license_number', 'License Number')}
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
