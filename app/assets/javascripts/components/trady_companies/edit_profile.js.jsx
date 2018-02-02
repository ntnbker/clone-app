var TradyCompanyEdit = React.createClass({
  getInitialState: function () {
    const trady_company = this.props.trady_company || {};
    const profile_image = this.props.profile_image || {};
    const image_url     = this.props.image_url || '/default-avatar.png';

    return {
      gst_registration: trady_company.gst_registration,
      errors: {},
      gallery: {...profile_image, image_url},
    };
  },

  changeGstRegistration: function({ }) {
    this.setState({
      gst_registration: !this.state.gst_registration,
      errors: {...this.state.errors, gst_registration: ''},
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

    FD.append('picture[trady_company_id]', this.props.trady_company.id);
    if (id) {
      FD.append('picture[trady_company_profile_image_id]', id);
    }

    const self = this;
    $.ajax({
      type: id ? 'PUT' : 'POST',
      url: `/trady_company_profile_images${id ? '/' + id : ''}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success: function (res) {
        if (res.error || res.errors) return callback(res.error || res.errors);
        callback();
        if (!res.errors && res.company_image) {
          self.setState({ gallery: res.company_image });
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

    e.preventDefault();
    const getValidValue = obj => obj && obj.value;

    var trady_company = {
      company_name        : getValidValue(this.company_name),
      trading_name        : getValidValue(this.trading_name),
      abn                 : getValidValue(this.abn),
      address             : getValidValue(this.address),
      mailing_address     : getValidValue(this.mailing_address),
      mobile_number       : getValidValue(this.mobile_number),
      account_name        : getValidValue(this.account_name),
      bsb_number          : getValidValue(this.bsb_number),
      bank_account_number : getValidValue(this.bank_account_number),
      gst_registration    : this.state.gst_registration,
      id                  : this.props.trady_company.id,
    }
    var params = { trady_company };

    const self = this;
    $.ajax({
      type: 'PATCH',
      url: '/update_trady_company_information',
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
    const { errors }             = this.state;
    const { trady_company = {} } = this.props;
    const value                  = trady_company[field];

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
    let trady_company      = this.props.trady_company || {};
    let {
      company_name, trading_name, abn, address, mailing_address, mobile_phone, account_name, bsb_number, bank_account_number
    } = trady_company;

    let { errors = {}, gst_registration, gallery } = this.state;
    const renderTextField                          = this.renderTextField;
    const renderButtonFunc                         = this.renderButton;

    return (
      <div className="edit_profile edit_trady_company_profile">
        <div className="left">
          { gallery &&
              <AvatarImage imageUri={gallery.image_url} alt="Avatar Image" />
          }
          <ModalImageUpload
            uploadImage={this.uploadImage}
            gallery={gallery && [gallery] || []}
            text="Add/Change Photo"
            className="btn button-primary option-button"
          />
          {renderButtonFunc('Reset Password', this.props.change_password_path)}
          {renderButtonFunc('Trady Account Settings', this.props.edit_trady_path)}
        </div>
        <form role="form" className="form-horizontal right" id="edit_agency" onSubmit={this.onSubmit} >
          <h5 className="control-label col-sm-2 required title">
            Edit Trady Company Profile
          </h5>
          {renderTextField('company_name', 'Company Name')}
          {renderTextField('trading_name', 'Business Name')}
          {renderTextField('abn', 'ABN')}
          {renderTextField('address', 'Address')}
          {renderTextField('mailing_address', 'Mailing Address')}
          {renderTextField('mobile_number', 'Mobile Number')}
          <div className="form-group">
            <div className="col-sm-10">
              <input
                type="checkbox"
                id="gst_registration"
                onChange={this.changeGstRegistration}
                checked={gst_registration ? "checked" : false}
              />
              GST  Registration
            </div>
          </div>
          {this.renderError(errors['gst_registration'])}
          {renderTextField('account_name', 'Account Name')}
          {renderTextField('bsb_number', 'BSB Number')}
          {renderTextField('bank_account_number', 'Bank Account Number')}
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
