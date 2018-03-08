var CreateQuoteForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = [
      'quote-option', 'trady-company', 'make-quote', 'submit-quote', 'success'
    ];

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
        {this.labelTitle(1, <p>Quote<br />Option</p>, level > 0)}
        {this.labelTitle(2, <p>Trady<br />Company<br />Infomation</p>, level > 1)}
        {this.labelTitle(4, <p>Create<br />Quote</p>, level > 2)}
        {this.labelTitle(3, <p>Submit<br />Quote</p>, level > 3)}
      </div>
    )
  },

  generateTitle() {
    const {step} = this.state;

    switch (step) {
      case 'quote-option':
        return <h5 className="step-title text-center">Quote Option</h5>
      case 'trady-company':
        return <h5 className="step-title text-center">Trady Company Information</h5>
      case 'make-quote':
        return <h5 className="step-title text-center">Create Quote</h5>
      case 'submit-quote':
        return <h5 className="step-title text-center">Submit Quote</h5>
      case 'success':
        return <h5 className="step-title text-center">Success</h5>
    }
  },

  generateForm() {
    const {step} = this.state;
    const {is_edit: isEdit } = this.props;
    switch (step) {
      case 'quote-option':
        return <QuoteOption {...this.props} />;
      case 'trady-company':
        return isEdit
          ? <EditTradyCompany {...this.props} />
          : <AddTradycompany {...this.props} />;
      case 'make-quote':
        return <QuoteFields {...this.props} />;
      case 'submit-quote':
        return <QuoteSubmit {...this.props} />;
      case 'success':
        return <QuoteSentSuccess {...this.props} />;
    }
  },

  componentWillUnmount() {
    $('body > div.layout').css('background-color', '#F4F8FB');
  },

  render() {
    return (
      <div id="registration" className="create-quote-form">
        {this.generateStepTitle()}
        {this.generateTitle()}
        {this.generateForm()}
      </div>
    )
  }
})
