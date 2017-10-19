var AgencyAdminEdit = React.createClass({
  getInitialState: function () {
    const profile_image = this.props.profile_image || {};
    const image_url = this.props.image_url;
    return {
      errors: {},
      gallery: {...profile_image, image_url},
    };
  },

  detectAndroid: function () {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
      this.setState({
        isAndroid: true
      });
    }
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

    FD.append('picture[agency_admin_id]', this.props.agency_admin.id);
    if (gallery.id) {
      FD.append('picture[agency_admin_profile_image_id]', gallery.id);
    }

    const self = this;
    $.ajax({
      type: gallery.id ? 'PUT' : 'POST',
      url: `/agency_admin_profile_images${gallery.id ? '/' + gallery.id : ''}`,
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
      <button className="btn button-primary option-button" onClick={() => location.href = link} title={text}>
        {text}
      </button>
    );
  },

  render: function() {
    let isInvoice          = this.props.system_plan === "Invoice";
    let agency_admin       = this.props.agency_admin || {};
    let {
      first_name, last_name, mobile_phone, license_number
    } = agency_admin;

    let { errors = {}, gallery } = this.state;
    const renderErrorFunc        = this.renderError;
    const removeErrorFunc        = this.removeError;
    const renderButtonFunc       = this.renderButton;

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
          {renderButtonFunc('Change Password', this.props.change_password_path)}
        </div>
        <form
          role="form"
          className="form-horizontal right"
          id="edit_agency_admin"
          onSubmit={this.onSubmit}
        >

          <h5 className="control-label col-sm-2 required title">
            Edit Agency Admin Profile
          </h5>
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
          <button type="submit" className="btn button-primary green option-button">
            Update Your Profile
          </button>
        </form>
      </div>
    );
  }
});
