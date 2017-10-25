var TradyEdit = React.createClass({
  getInitialState: function () {
    const trady         = this.props.trady || {};
    const profile_image = this.props.profile_image || {};
    const image_url     = this.props.image_url || '/default-avatar.png';


    return {
      errors: {},
      gallery: {...profile_image, image_url },
    };
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

    FD.append('picture[trady_id]', this.props.trady.id);
    if (id) {
      FD.append('picture[trady_profile_image_id]', id);
    }

    const self = this;
    $.ajax({
      type: id ? 'PUT' : 'POST',
      url: `/trady_profile_images${id ? '/' + id : ''}`,
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
    e.preventDefault();
    var flag = false;
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;

    var trady = {
      name        : getValidValue(this.name),
      company_name: getValidValue(this.company_name),
      mobile      : getValidValue(this.mobile),
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
    const { trady = {} }  = this.props;
    const value           = trady[field];

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
    let trady                              = this.props.trady || {};
    let trady_company                      = this.props.trady_company || {};
    let { errors = {}, gallery }           = this.state;
    const renderTextField                  = this.renderTextField;
    const renderButtonFunc                 = this.renderButton;
    const haveCompanyClass                 = !trady_company.id ? 'no-company' : '';

    return (
      <div className="edit_profile edit_trady_profile">
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
          {!haveCompanyClass && renderButtonFunc('Edit Tradie Company Details', this.props.change_trady_company_information_path + '?id=' + trady_company.id)}
        </div>
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
