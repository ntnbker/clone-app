var AgencyPayment = React.createClass({
  getInitialState: function () {
    return {
      card: null,
      errors: {},
    };
  },

  stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    const self = this;
    const params = {
      stripeToken: token.id,
      name: this.name.value,
      agency_id: this.props.agency_id
    }

    $.ajax({
      type: 'POST',
      url: '/agency_payment_registrations',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return self.setState({ errors: res.errors });
        }
      },
      error: function(err) {
        return self.setState({errors: err});
      }
    })
  },

  componentDidMount() {
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    if ($(window).width() <= 380) {
      style.base.fontSize = '12px';
    }

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    this.setState({ card });
  },

  removeError: function({ target: { id } }) {
      this.setState({ errors: {...this.state.errors, [id]: ''} });
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  submit(e) {
    e.preventDefault();

    const {card} = this.state;
    const self = this;

    stripe.createToken(card)
    .then(function(result) {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        self.stripeTokenHandler(result.token);
      }
    });

    return false;
  },

  render() {
    return (
      <form id="payment-form" onSubmit={this.submit}>
        <div className="plan">
          <div className="plan-title">
            <p className="plan-name">Business Plan</p>
            <p className="plan-price">$49.99/month</p>
          </div>
          <div className="plan-description">
            <p className="plan-name">Features</p>
            <div className="plan-note">
              <p className="row">
                - Unlimited maintenance request logging
              </p>
              <p className="row">
                - Unlimited agents
              </p>
              <p className="row">
                - Access to rebate program
              </p>
            </div>
          </div>
        </div>
        <div className="your-name">
          <input type="text"
            className="name"
            placeholder="Name as it appears on the card"
            ref={elem => this.name = elem}
          />
        </div>
        <div class="form-row">
          <div id="card-element">
          </div>
          <div id="card-errors" role="alert"></div>
        </div>
        <div className="buttons text-center">
          <button>Submit</button>
        </div>
      </form>
    )
  }
})

