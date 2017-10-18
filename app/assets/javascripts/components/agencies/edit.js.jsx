var AgencyEdit = React.createClass({
  getInitialState: function () {
    const agency = this.props.agency || {};
    const image_url = this.props.image_url;

    return {
      license_type: agency.license_type,
      errors: {},
      gallery: image_url && { image_url } || null,
    };
  },

  uploadImage: function(images, callback) {
    if (images.length == 0) {
      return;
    }

    var FD = new FormData();
    images.map((image, index) => {
      var idx = index + 1;
      FD.append('picture[image]', JSON.stringify(image));
    });

    FD.append('picture[agency_id]', this.props.agency.id);

    const self = this;
    $.ajax({
      type: 'POST',
      url: '/agency_profile_images',
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

    var agency = {
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
      <a className="btn btn-default btn-back m-r-lg" href={link} title={text}>
        {text}
      </a>
    );
  },

  renderTextField: function(field, textHolder) {
    const { errors }      = this.state;
    const { agency = {} } = this.props;
    const value           = agency[field];

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
    let agency             = this.props.agency || {};
    let {
      company_name, business_name, abn, address, mailing_address, phone, mobile_phone, corporation_license_number
    } = agency;

    let { errors = {}, license_type, gallery } = this.state;
    const renderTextField                      = this.renderTextField;
    const renderButtonFunc                     = this.renderButton;

    return (
      <div className="edit_agency">
        <div className="left">
          { gallery &&
              <img id="avatar" src={gallery.image_url} alt="Avatar Image"/>
          }
          <ModalImageUpload
            uploadImage={this.uploadImage}
            gallery={gallery && [gallery] || []}
            text="Add/Change Photo"
            className="btn btn-default btn-back m-r-lg"
          />
          {renderButtonFunc('Add New Agency', this.props.new_agent_path)}
          {renderButtonFunc('Add New Admin Agency', this.props.new_agency_admin_path)}
        </div>
        <form role="form" className="form-horizontal right" id="edit_agency_admin" onSubmit={this.onSubmit} >
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
