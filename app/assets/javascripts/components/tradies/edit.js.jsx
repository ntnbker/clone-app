var ModalEditService = React.createClass({
getInitialState: function () {
    return {
      errors: {},
    };
  },

  render() {
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">
                Services
              </h4>
            </div>
            <div className="modal-body">
              <ServiceList {...this.props} onBack={this.props.close} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var TradyEdit = React.createClass({
  getInitialState: function () {
    const trady         = this.props.trady || {};
    const profile_image = this.props.profile_image || {};
    const image_url     = this.props.image_url || '/default-avatar.png';


    return {
      errors: {},
      trady_skills: this.props.trady_skills || [],
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
        if (res.error || res.errors) return callback(res.error || res.errors);
        callback();
        if (!res.errors && res.profile_image) {
          self.setState({ gallery: res.profile_image });
        }
      },
      error: function (err) {

      }
    });
    return false;
  },

  uploadDocument(images, isLicense, callback) {
    const self = this;
    const {license, insurance} = this.props;

    const data = {
      trady_id: self.props.trady.id,
      image: JSON.stringify(images[0]),
    }
    if (isLicense) data.license_id = license && license.id;
    else data.insurance_id = insurance && insurance.id;

    $.ajax({
      type: 'POST',
      url: isLicense ? '/licenses' : '/insurances',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: {
        picture: data,
      },
      success(res) {
        callback(res.error);
      },
      error(err) {
        callback(err.responseText);
      }
    });
  },

  uploadInsurance(images, callback) {
    return uploadDocument(images, false, callback);
  },

  uploadLicense(images, callback) {
    return uploadDocument(images, true, callback);
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

  submitPayment(params, callback) {
    const self = this;
    params.trady_id = this.props.trady.id;

    $.ajax({
      type: 'PUT',
      url: '/trady_payment_registrations/' + this.props.trady.id,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return callback(res.errors);
        }
        self.setState({
          isModal: true,
          modal: 'message',
          customer: res.customer,
          notification: {
            title: "Credit or debit card",
            content: res.message,
            bgClass: "bg-success",
          }
        })
      },
      error: function(err) {
        self.setState({
          isModal: true,
          modal: 'message',
          notification: {
            title: "Credit or debit card",
            content: err.responseText,
            bgClass: "bg-error",
          }
        })
      }
    })
  },

  editServices(params, callback) {
    const self = this;

    $.ajax({
      type: 'POST',
      url: '/update_services',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return callback(res.errors);
        }
        self.setState({
          isModal: true,
          modal: 'message',
          trady_skills: params.skill.skill.map(skill => ({skill})),
          notification: {
            title: "Services",
            content: res.message,
            bgClass: "bg-success",
          }
        })
      },
      error: function(err) {
        self.setState({
          isModal: true,
          modal: 'message',
          notification: {
            title: "Services",
            content: err.responseText,
            bgClass: "bg-error",
          }
        })
      }
    })
  },

  removeError: function({ target: { id } }) {
    this.setState({ errors: {...this.state.errors, [id]: ''} });
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  renderButton: function(text, link) {
    const onClickFunc = typeof link === 'function' ? link : () => location.href = link;
    return (
      <button type="button" className="btn button-primary option-button" onClick={onClickFunc} title={text}>
        {text}
      </button>
    );
  },

  isClose: function() {
    if(this.state.isModal == true) {
      this.setState({
        isModal: false,
        modal: "",
      });
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    var div = document.getElementsByClassName('modal-backdrop in')[0];
    if(div){
      div.parentNode.removeChild(div);
    }
  },

  openModal(modal) {
    this.setState({
      isModal: true,
      modal,
    })
  },

  renderModal: function() {
    if (this.state.isModal) {
      var body = document.getElementsByTagName('body')[0];
      body.className += " modal-open";
      var div = document.getElementsByClassName('modal-backdrop in');

      if(div.length === 0) {
        div = document.createElement('div')
        div.className  = "modal-backdrop in";
        body.appendChild(div);
      }

      switch (this.state.modal) {
        case 'payment':
          const paymentNotes = [
            'Maintenance App does not save your credit card information. Maintenance App uses Stripe to process credit cards. Stripe offers the highest security to keep your credit card information safe.',
            'MaintenanceApp only processes our service fee 30 days after the due date of the invoice you have created.',
            'Out of the 15% service fee MaintenanceApp charges, 5% goes to the agency that you did the job for. This will encourage them to use you again rather than tradies outside of our platform'
          ]

          return (
            <ModalAddPayment
              close={this.isClose}
              submit={this.submitPayment}
              paymentNotes={paymentNotes}
            />
          )

        case 'service':
          return (
            <ModalEditService
              close={this.isClose}
              editServices={this.editServices}
              services={this.props.services}
              trady_skills={this.state.trady_skills}
              trady_id={this.props.trady.id}
              is_edit={true}
            />
          )

        case 'message':
          return (
            <ModalNotification
              close={this.isClose}
              bgClass={this.state.notification.bgClass}
              title={this.state.notification.title}
              content={this.state.notification.content}
            />
          )


        default:
        return '';
      }
    }
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
    let trady                    = this.props.trady || {};
    let trady_company            = this.props.trady_company || {};
    let customer                 = this.props.customer || {};
    let { errors = {}, gallery } = this.state;
    const renderTextField        = this.renderTextField;
    const renderButtonFunc       = this.renderButton;
    const haveCompanyClass       = !trady_company.id ? 'no-company' : '';

    return (
      <div className="edit_profile edit_trady_profile">
        <div className="left">
          { gallery &&
              <AvatarImage imageUri={gallery.image_url} alt="Avatar Image"/>
          }
          <ModalImageUpload
            uploadImage={this.uploadImage}
            gallery={gallery && [gallery] || []}
            text="Add/Change Photo"
            className="btn button-primary option-button"
          />
          {renderButtonFunc('Reset Password', this.props.change_password_path)}
          {renderButtonFunc('Edit Services Provided', () => this.openModal('service'))}
          { customer && customer.customer_id &&
            renderButtonFunc('Edit Payment Details', () => this.openModal('payment'))}
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
        { this.renderModal() }
      </div>
    );
  }
});
