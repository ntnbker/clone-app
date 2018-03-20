var TradyOnboardingRegistrationForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = ['terms-and-conditions', 'setup-password', 'service'];

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
        {this.labelTitle(2, <p>Setup<br />Password</p>, level > 1)}
        {this.labelTitle(3, <p>Services<br />Available</p>, level > 2)}
      </div>
    )
  },

  generateTitle() {
    const {step} = this.state;

    switch (step) {
      case 'terms-and-conditions':
        return <h5 className="step-title text-center">Terms & Conditions</h5>
      case 'setup-password':
        return <h5 className="step-title text-center">Setup Password</h5>
      case 'service':
        return <h5 className="step-title text-center">Services Registration</h5>
    }
  },

  generateForm() {
    const {step} = this.state;

    switch (step) {
      case 'terms-and-conditions':
        return <TradyTermsAndConditions {...this.props} />;
      case 'setup-password':
        return <SetPassword {...this.props} />;
      case 'service':
        return <ServiceList {...this.props} />;
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
