var Payment = React.createClass({
  getInitialState: function () {
    return {
      card: null,
    };
  },

  stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    const self = this;
    const params = {
      stripeToken: token.id
    }

    $.ajax({
      type: 'POST',
      url: '/charges',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
      },
      error: function(err) {
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

  submit(e) {
    e.preventDefault();
    debugger
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
        <div class="form-row">
          <label for="card-element">
            Credit or debit card
          </label>
          <div id="card-element">
          </div>
          <div id="card-errors" role="alert"></div>
        </div>

        <button>Submit Payment</button>
      </form>
    )
  }
})
