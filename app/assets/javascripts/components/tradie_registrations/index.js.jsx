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
      type: 'POST',
      url: self.props.isLicense ? '/licenses' : '/insurances',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: {
        [self.props.isLicense ? 'license' : 'insurance']: JSON.stringify(gallery || {}),
        trady_id: self.props.trady_id
      },
      success(res) {

      },
      error(err) {

      }
    });
  },

  render() {
    const {gallery} = this.state;
    return (
      <div>
        <form role="form" className="form-horizontal" id="upload-license-insurance" onSubmit={this.onSubmit} >
          <div className="upload-description">
            {this.state.text}
          </div>
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