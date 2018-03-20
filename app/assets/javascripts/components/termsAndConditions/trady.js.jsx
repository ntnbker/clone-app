var TradyTermsAndConditions = React.createClass({
  getInitialState: function () {
    return {
      card: null,
      isAgree: false,
      errors: '',
    };
  },

  termsAndConditionsText() {
    return (
      <TermsAndConditions />
    )
  },

  generateHowItWorks() {
    return (
      <div className="how-it-works">
        <label className="how-it-works-title text-center">HOW IT WORKS</label>
        <div className="how-it-works-item">
          <label className="number">1</label>
          <label className="text">We provide you with free high quality leads from strata and property managers</label>
        </div>
        <div className="how-it-works-item">
          <label className="number">2</label>
          <label className="text">You submit a quote for the job. If your quote is accepted, you will be sent a work order from the property management agency.</label>
        </div>
        <div className="how-it-works-item">
          <label className="number">3</label>
          <label className="text">Once the job is complete, you must submit an invoice using our system for payment.</label>
        </div>
        <div className="how-it-works-item">
          <label className="number">4</label>
          <label className="text">When you have recieved payment MaintenanceApp will process a service fee totaling 15% of the total invoices you have submitted in the previouse month. Please note MaintenanceApp shares 33% of this service fee with the agency. So everybody wins :)</label>
        </div>
      </div>
    )
  },

  checkOffAgree: function() {
    const {isAgree} = this.state;
    this.setState({
      errors: '',
      isAgree: !isAgree
    });
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error ? error : ''}</p>;
  },

  submit(e) {
    e.preventDefault();
    const {isAgree} = this.state;
    const self = this;

    const params = {
      terms_and_conditions: isAgree,
      trady_id: this.props.trady_id,
      trady_company_id: this.props.trady_company_id,
      maintenance_request_id: this.props.maintenance_request_id,
      token: this.props.token,
    }

    $.ajax({
      type: 'POST',
      url: this.props.submit_url || '/tradie_term_agreements',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return self.setState({errors: res.errors});
        }
      },
      error: function(errors) {
      }
    })

    return false;
  },

  render() {
    const {isAgree} = this.state;

    return (
      <form id="terms-and-conditions" onSubmit={this.submit}>
        {this.generateHowItWorks()}
        <div className="how-it-works-note text-center">
          We believe that by using our system you will greatly increase your business revenue and take your business to the next level.
        </div>
        {this.termsAndConditionsText()}
        <div className="agree-wrapper">
          <label className="agree_checkbox">
            Agree To Terms and Conditions
            <input
              type="checkbox"
              id="terms_and_conditions"
              ref={elem => this.terms_and_conditions = elem}
              onChange={this.checkOffAgree}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        {this.renderError(this.state.errors)}
        <div className="TAC-buttons">
          <button type="submit" className="btn button-submit">
            Next
          </button>
        </div>
      </form>
    )
  }
})

