var AgencyAdminEdit = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
      image_url: this.props.image_url || '',
      gallery: null,
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

    FD.append('picture[agency_admin_id]', this.props.agency_admin.id);

    var props = this.props;
    $.ajax({
      type: 'POST',
      url: '/agency_admin_profile_images',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success: function (res) {
          callback(res);
          if (!res.errors && res.profile_image) {
            this.setState({ gallery: res.profile_image });
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
    let image_url          = this.props.image_url;
    let agency_admin       = this.props.agency_admin || {};
    let {
      first_name, last_name, mobile_phone, license_number
    } = agency_admin;

    let { errors = {}, gallery }    = this.state;
    const renderErrorFunc           = this.renderError;
    const removeErrorFunc           = this.removeError;
    const renderButtonFunc          = this.renderButton;

    return (
      <div className="edit_agency_admin">
        <div className="left">
          {renderButtonFunc('Change Password', this.props.change_password_path)}
          <ModalImageUpload
            uploadImage={this.uploadImage}
            gallery={gallery || image_url && [{ image_url }]}
            text="Add/Change Photo"
            className="btn btn-default btn-back m-r-lg"
          />
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
