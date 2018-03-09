var AgencyTermsAndConditions = React.createClass({
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

  onBack() {
    location.href = this.props.edit_agency_admin;
  },

  submit(e) {
    e.preventDefault();
    const {isAgree} = this.state;
    const self = this;

    const params = {
      terms_and_conditions: isAgree,
      agency_id: this.props.agency_id,
    }

    $.ajax({
      type: 'POST',
      url: '/agency_term_agreements',
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
        {this.termsAndConditionsText()}
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
        {this.renderError(this.state.errors)}
        <div className="TAC-buttons">
          { false &&
            <button type="button" className="btn button-back" onClick={this.onBack}>
              Back
            </button>
          }
          <button type="submit" className="btn button-submit">
            Submit
          </button>
        </div>
      </form>
    )
  }
})

