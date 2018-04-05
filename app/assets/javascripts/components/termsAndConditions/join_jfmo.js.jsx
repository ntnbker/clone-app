var JoinJFMOTermsAndConditions = React.createClass({
  getInitialState: function () {
    return {
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

  submit(e) {
    e.preventDefault();
    const {isAgree} = this.state;
    const self = this;

    const params = {
      terms_and_conditions: isAgree,
      trady_id: this.props.trady_id
    }

    $.ajax({
      type: 'POST',
      url: '/join_just_find_me_one',
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
      <form id="terms-and-conditions" className="join-jfmo" onSubmit={this.submit}>
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
            Submit
          </button>
        </div>
      </form>
    )
  }
})

