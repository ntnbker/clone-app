var AgencyRegistrationForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = ['agency-company', 'agency-admin', 'terms-and-conditions', 'payment'];

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
        {this.labelTitle(1, <p>Company<br />Registration</p>, level > 0)}
        {this.labelTitle(2, <p>Agency Admin<br />Registration</p>, level > 1)}
        {this.labelTitle(4, <p>Terms<br />&<br />Conditions</p>, level > 2)}
        {this.labelTitle(3, <p>Payment<br />Information</p>, level > 3)}
      </div>
    )
  },

  generateTitle() {
    const {step} = this.state;

    switch (step) {
      case 'agency-company':
        return <h5 className="step-title text-center">Company Registration</h5>
      case 'agency-admin':
        return <h5 className="step-title text-center">Agency Admin Registration</h5>
      case 'terms-and-conditions':
        return <h5 className="step-title text-center">Terms & Conditions</h5>
      case 'payment':
        return <h5 className="step-title text-center">Payment Information</h5>
    }
  },

  generateForm() {
    const {step} = this.state;

    switch (step) {
      case 'agency-company':
        return <AgencyAttributes {...this.props} />;
      case 'agency-admin':
        return <Agency {...this.props} />;
      case 'terms-and-conditions':
        return <AgencyTermsAndConditions {...this.props} />;
      case 'payment':
        return <AgencyPayment {...this.props} />;
    }
  },

  componentWillUnmount() {
    $('body > div.layout').css('background-color', '#F4F8FB');
  },

  render() {
    return (
      <div id="registration" className="agency-registration">
        {this.generateStepTitle()}
        {this.generateTitle()}
        {this.generateForm()}
      </div>
    )
  }
});
