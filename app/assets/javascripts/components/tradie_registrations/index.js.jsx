var TradyRegistrationForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = ['terms-and-conditions', 'trady', 'trady-company', 'service'];

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
