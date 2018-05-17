var TradyRegistrationForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = ['terms-and-conditions', 'trady', 'trady-company', 'service', 'license', 'insurance'];

    return {
      errors: {},
      step,
      level: (level.indexOf(step) || 0) + 1,
    }
  },

  componentDidMount() {
    $('body > div.layout').css('background-color', 'white');
  },

  labelTitle(number, text, isPass) {
    return (
      <div className={"registration-label-title " + (isPass && 'pass' || '')}>
        <div className={"step-status " + (isPass && 'pass' || '')}>
          { number > 1 && <div className="separate-line "></div> }
        </div>
        <div className="step-number">{number}</div>
        <div className="step-text">{text}</div>
      </div>
    )
  },

  generateStepTitle() {
    const {level} = this.state;
    return (
      <div className="registration-title">
        {this.labelTitle(1, <p>Terms<br />&<br />Conditions</p>, level > 0)}
        {this.labelTitle(2, <p>User<br />Registration</p>, level > 1)}
        {this.labelTitle(3, <p>Company<br />Registration</p>, level > 2)}
        {this.labelTitle(4, <p>Services<br />Available</p>, level > 3)}
        {this.labelTitle(5, <p>Upload<br />License</p>, level > 4)}
        {this.labelTitle(6, <p>Upload<br />Insurance</p>, level > 5)}
      </div>
    )
  },

  generateTitle() {
    const {step} = this.state;

    switch (step) {
      case 'terms-and-conditions':
        return <h5 className="step-title text-center">Terms & Conditions</h5>
      case 'trady':
        return <h5 className="step-title text-center">User Registration</h5>
      case 'trady-company':
        return <h5 className="step-title text-center">Company Registration</h5>
      case 'service':
        return <h5 className="step-title text-center">Services Registration</h5>
      case 'license':
      return <h5 className="step-title text-center">Upload License</h5>
      case 'insurance':
      return <h5 className="step-title text-center">Upload Insurance</h5>
    }
  },

  generateForm() {
    const {step} = this.state;

    switch (step) {
      case 'terms-and-conditions':
        return <TradyTermsAndConditions {...this.props} />;
      case 'trady':
        return <Trady {...this.props} />;
      case 'trady-company':
        return <NewTradyCompany {...this.props} />;
      case 'service':
        return <ServiceList {...this.props} />;
      case 'license':
      return <TradyLicenseAndInsurance {...this.props} />;
      case 'insurance':
      return <TradyLicenseAndInsurance {...this.props} />;
    }
  },

  componentWillUnmount() {
    $('body > div.layout').css('background-color', '#F4F8FB');
  },

  render() {
    return (
      <div id="registration" className="trady-registration">
        {this.generateStepTitle()}
        {this.generateTitle()}
        {this.generateForm()}
      </div>
    )
  }
});

var TradyLicenseAndInsurance = React.createClass({
  getInitialState() {
    return {
      text: '',
      gallery: null,
      errors: []
    }
  },

  uploadImage(images, callback) {
    if (!images || !images.length) {
      return callback('Image Not Found');
    }

    this.setState({gallery: images[0]});
    return callback();
  },

  onSubmit(e) {
    e.preventDefault();
    const self = this;
    const {gallery} = this.state;
    // if (!gallery) return;
    
    $.ajax({
      type: self.props.isEdit ? 'PUT' : 'POST',
      url: self.props.isLicense ? '/licenses' : '/insurances',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: {
        picture: {
          image: JSON.stringify(gallery || {}),
          trady_id: self.props.trady_id,
          license_id: self.props.license_id,
          insurance_company: self.insurance_company.value, 
          policy_number: self.policy_number.value, 
          policy_expiry_date: self.policy_expiry_date.value, 
          insurance_id: self.props.insurance_id
        }
      },
      success(res) {
        self.setState({errors: res.errors || {}});
      },
      error(err) {

      }
    });
  },

  removeError: function({ target: { id } }) {
    let errors     = Object.assign({}, this.state.errors);
    if (errors[id]) {
      errors[id] = false;
      this.setState({ errors });
    }
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  render() {
    const {gallery, errors} = this.state;
    const {isLicense} = this.props;
    const renderErrorFunc = this.renderError;
    const removeErrorFunc = this.removeError;

    return (
      <div>
        <form role="form" className="form-horizontal" id="upload-license-insurance" onSubmit={this.onSubmit} >
          <div className="upload-description">
            {this.state.text}
          </div>
          {!isLicense && <div className="form-group">
            <div className="col-sm-10 text-center">
              <input

                type="text"
                id="insurance_company"
                placeholder="Insurance Company"
                defaultValue={this.props.insurance_company}
                ref={(ref) => this.insurance_company = ref}
                className={"form-control " + (errors['insurance_company'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['insurance_company'])}
            </div>
          </div>}
          {!isLicense && <div className="form-group">
            <div className="col-sm-10 text-center">
              <input

                type="text"
                id="policy_number"
                placeholder="Policy Number"
                defaultValue={this.props.policy_number}
                ref={(ref) => this.policy_number = ref}
                className={"form-control " + (errors['policy_number'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['policy_number'])}
            </div>
          </div>}
          {!isLicense && <div className="form-group">
            <div className="col-sm-10 text-center">
              <input
                type="text"
                id="policy_expiry_date"
                placeholder="Policy Expiry Date"
                defaultValue={this.props.policy_expiry_date}
                ref={(ref) => this.policy_expiry_date = ref}
                className={"form-control " + (errors['policy_expiry_date'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['policy_expiry_date'])}
            </div>
          </div>}
          { gallery &&
              <div className="image text-center">
                <img id="avatar" src={gallery.image_url} alt="Avatar Image"/>
              </div>
          }
          <div className="image-upload text-center">
            <ModalImageUpload
              uploadImage={this.uploadImage}
              gallery={gallery && [gallery] || []}
              text="Add/Change Photo"
              className="btn button-primary option-button"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="submit">submit</button>
          </div>
        </form>
      </div>
    )
  }
})