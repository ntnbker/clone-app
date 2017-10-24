var AgencyEdit = React.createClass({
  getInitialState: function () {
    const agency = this.props.agency || {};
    const profile_image = this.props.profile_image || {};
    const image_url = this.props.image_url;

    return {
      license_type: agency.license_type,
      errors: {},
      gallery: {...profile_image, image_url},
    };
  },

  changeLicenseType: function({ target: {value} }) {
    this.setState({
      license_type: value,
      errors: {...this.state.errors, license_type: ''}
    });
  },

  uploadImage: function(images, callback) {
    if (images.length == 0) {
      return;
    }
    const { gallery: { id } } = this.state;
    var FD = new FormData();
    images.map((image, index) => {
      var idx = index + 1;
      FD.append('picture[image]', JSON.stringify(image));
    });

    FD.append('picture[agency_id]', this.props.agency.id);
    if (id) {
      FD.append('picture[agency_profile_image_id]', id);
    }

    const self = this;
    $.ajax({
      type: id ? 'PUT' : 'POST',
      url: `/agency_profile_images${id ? '/' + id : ''}`,
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

  onSubmit: function(e){

    var flag = false;
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;

    var agency = {
      company_name              : getValidValue(this.company_name),
      business_name             : getValidValue(this.business_name),
      abn                       : getValidValue(this.abn),
      address                   : getValidValue(this.address),
      mailing_address           : getValidValue(this.mailing_address),
      phone                     : getValidValue(this.phone),
      mobile_phone              : getValidValue(this.mobile_phone),
      corporation_license_number: getValidValue(this.corporation_license_number),
      license_type              : this.state.license_type,
    }

    var params = { agency };

    const self = this;
    $.ajax({
      type: 'PUT',
      url: `/agencies/${(this.props.agency || {}).id}`,
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
    const { agency = {} } = this.props;
    const value           = agency[field];

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

    let { errors = {}, license_type, gallery } = this.state;
    const renderTextField                      = this.renderTextField;
    const renderButtonFunc                     = this.renderButton;

    return (
      <div className="edit_profile edit_agency_profile">
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
          {renderButtonFunc('Add New Agent', this.props.new_agent_path)}
          {renderButtonFunc('Add New Admin Agency', this.props.new_agency_admin_path)}
        </div>
        <form role="form" className="form-horizontal right" id="edit_agency" onSubmit={this.onSubmit} >
          <h5 className="control-label col-sm-2 required title">
            Edit Agency Profile
          </h5>
          {renderTextField('company_name', 'Company Name')}
          {renderTextField('business_name', 'Business Name')}
          {renderTextField('abn', 'ABN')}
          {renderTextField('address', 'Address')}
          {renderTextField('mailing_address', 'Mailing Address')}
          {renderTextField('phone', 'Phone')}
          {renderTextField('mobile_phone', 'Mobile Phone')}
          <div className="license-type">
            <p> License Type </p>
            <label className="one-half column">
              <input
                type="radio"
                value="Individual License"
                checked={license_type === "Individual License"}
                ref={e => this.license_type_individual_license = e}
                name="license_type"
                id="license_type_individual_license"
                onChange={this.changeLicenseType}
              />
              Individual License
            </label>
            <label className="one-half column">
              <input
                type="radio"
                value="Corporate License"
                checked={license_type === "Corporate License"}
                ref={e => this.license_type_corporate_license = e}
                name="license_type"
                id="license_type_corporate_license"
                onChange={this.changeLicenseType}
              />
              Corporate License
            </label>
            {this.renderError(errors['license_type'])}
          </div>
          {renderTextField('corporation_license_number', 'Corporation License Number')}
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
