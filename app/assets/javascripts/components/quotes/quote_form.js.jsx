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
        {this.labelTitle(3, <p>Create<br />Quote</p>, level > 2)}
        {this.labelTitle(4, <p>Submit<br />Quote</p>, level > 3)}
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

var QuoteSentSuccess = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    const {trady_maintenance_requests_path, quote_options_path} = this.props;

    return (
      <div className="invoice-form success">
        <h5>
          Your Quote has been sent
        </h5>
        <div className="mark">
          <i className="fa fa-check" />
        </div>
        <p className="text-center">
          Congratulations!
        </p>
        <p className="text-center">
          Your quote has been successfully created and sent to the Agent.
        </p>
        <p className="text-center">
          To Head <b>Home</b> click the button below.
        </p>
        <p className="text-center">
          If you would like to create a different variation of you quote please <b>Create Another Quote</b> below
        </p>
        <div className="invoice-button">
          <button
            type="button"
            className="button-primary green"
            onClick={() => location.href = trady_maintenance_requests_path}
          >
            Home
          </button>
          <button
            type="button"
            className="button-primary green"
            onClick={() => location.href = quote_options_path}
          >
            Create Another Quote
          </button>
        </div>
      </div>
    )
  }
})

var QuoteSubmit = React.createClass({
  getInitialState() {
    return {
      quote: [],
      trady: this.props.trady || {},
    }
  },

  submitQuote(e) {
    e.preventDefault();
    const {quote_email_path} = this.props;
    location.href = quote_email_path;
    return false;
  },

  render() {
    const {
      trady_company, landlord, agency, edit_quote_path, quote, quote_items, quote_email_path, property
    } = this.props;
    const {invoices} = this.state;

    return (
      <div id="submit-invoice" className="container invoice-form well">
        <div className="send-email-quote">
          <div className="header-quote">
            <div className="logo">
              <a href="/"></a>
                <img src="/assets/logo.png" class="img" alt="logo"/>
            </div>
            <div className="info-quote">
              <p>
                <span>
                  {trady_company.company_name}
                </span>
              </p>
              <p>
                <span>
                  {trady_company.abn}
                </span>
              </p>
              <p>
                <span>
                  {trady_company.address}
                </span>
              </p>
              <p>
                <span>
                  {trady_company.mobile_number}
                </span>
              </p>
              <p>
                <span>
                  {trady_company.email}
                </span>
              </p>
            </div>
          </div>
          <hr/>
          <div className="quote">
            <div className="info-agency">
              <p className="color-grey bill-to">
                Bill To
              </p>
              <p className="text-capitalize">
                {landlord ? landlord.name : null}
              </p>
              <p>
                {agency ? "C/-" + agency.company_name : null}
              </p>
              <p>
                {agency ? agency.address : null}
              </p>
            </div>

            <div className="date-quote">
              <p>
                <span className="font-bold">
                  Quote Reference:
                </span>
                <span>
                  {quote.trady_quote_reference !== ""
                    ? quote.trady_quote_reference
                    : property.property_address
                  }
                </span>
              </p>
              <p>
                <span className="font-bold">
                  Quote Date:
                </span>
                <span>
                  {moment(quote.created_at).format('lll')}
                </span>
              </p>
            </div>
          </div>
          <div className="invoices-data">
            <div className="quote-items">
              <div className="title">
                Description
               </div>
              <div className="title">
                Pricing
               </div>
              <div className="title text-right">
                Rate
              </div>
              <div className="title text-right">
                Amount
              </div>
            </div>
            <div className="quote-item-data">
              {quote_items.map((quoteItem) => (
                <div className="invoice-item">
                  <div className="text-capitalize">
                    {quoteItem.item_description}
                  </div>
                  <div>
                    {quoteItem.pricing_type}
                  </div>
                  <div>
                    {quoteItem.pricing_type == 'Hourly'
                      ? quoteItem.amount
                      : ''
                    }
                  </div>
                  <div className="text-right">
                    {quoteItem.pricing_type == 'Fixed Cost'
                      ? `$ ${quoteItem.amount.toFixed(2)}`
                      : quoteItem.pricing_type == 'Range'
                        ? `$ ${quoteItem.min_price.toFixed(2)} - $ ${quoteItem.max_price.toFixed(2)}`
                        : ''
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="qf-button text-center">
          <button
            className="button-back button-primary"
            type="button"
            onClick={() => this.backButton.click()}
          >
            <a
              href={edit_quote_path}
              style={{ display: 'none'}}
              ref={elem => this.backButton = elem}
            />
            Back
          </button>
          <button
            className="button-submit button-primary green"
            type="button"
            onClick={() => location.href = quote_email_path}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
})
