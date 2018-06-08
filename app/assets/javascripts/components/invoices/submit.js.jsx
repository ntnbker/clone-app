var ModalAddPayment = React.createClass({
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
    }

    this.props.submit(params, (errors) => {
      // Do something
      this.setState({errors});
    });
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
      style.base.fontSize = '13px';
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
    let defaultPaymentNotes = [
      'Please note that you will not be charged now. MaintenanceApp only processes our service fee 30 days after the due date of the invoice you have created.',
      'Out of the 15% service fee MaintenanceApp charges, 5% goes to the agency that you did the job for. This will encourage them to use you again rather than tradies outside of our platform.'
    ]
    const {paymentNotes} = this.props;

    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">
                MaintenanceApp Payment Setup
              </h4>
            </div>
            <div className="modal-body">
              <div className="description-data">
                {(paymentNotes || defaultPaymentNotes).map((note) => (
                  <p className="row">{note}</p>
                ))}
              </div>
              <div className="your-name">
                <input type="text"
                  className="name"
                  placeholder="Name as it appears on the card"
                  ref={elem => this.name = elem}
                />
              </div>
              <form id="payment-form" onSubmit={this.submit}>
                <div class="form-row">
                  <label for="card-element" className="text-center card-title">
                  </label>
                  <div id="card-element">
                  </div>
                  <div id="card-errors" role="alert"></div>
                </div>
                <div className="buttons text-center">
                  <button>Submit Payment Information</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var InvoiceSubmit = React.createClass({
  getInitialState() {
    this.getInvoices(this.props);
    return {
      invoices: [],
      trady: this.props.trady || {},
      customer: this.props.customer,
    }
  },

  getInvoices(props) {
    const {authenticity_token} = props;
    let path = '/invoices.json?' + location.href.replace(/.*\/invoices\?/, '');
    const self = this;

    $.ajax({
      type: 'GET',
      url: path,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
      },
      success: function(res){
        if (res) {
          return self.setState({invoices: res.ledger.invoices});
        }
      },
      error: function(error) {
        return self.setState({errors});
      }
    })
  },

  isClose: function() {
    if(this.state.isModal == true) {
      this.setState({
        isModal: false,
        modal: "",
      });
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    var div = document.getElementsByClassName('modal-backdrop in')[0];
    if(div){
      div.parentNode.removeChild(div);
    }
  },

  openModal(modal) {
    this.setState({
      isModal: true,
      modal,
    })
  },

  renderModal: function() {
    if (this.state.isModal) {
      var body = document.getElementsByTagName('body')[0];
      body.className += " modal-open";
      var div = document.getElementsByClassName('modal-backdrop in');

      if(div.length === 0) {
        div = document.createElement('div')
        div.className  = "modal-backdrop in";
        body.appendChild(div);
      }

      switch (this.state.modal) {
        case 'payment':
          return (
            <ModalAddPayment
              close={this.isClose}
              submit={this.submitPayment}
            />
          )

        case 'message':
          return (
            <ModalNotification
              close={this.isClose}
              bgClass={this.state.notification.bgClass}
              title={this.state.notification.title}
              content={this.state.notification.content}
            />
          )

        default:
        return '';
      }
    }
  },

  submitPayment(params, callback) {
    const self = this;
    params.trady_id               = this.props.trady_id;
    params.trady_company_id       = this.props.trady_company_id;
    params.maintenance_request_id = this.props.maintenance_request_id;

    $.ajax({
      type: 'POST',
      url: '/trady_payment_registrations',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return callback(res.errors);
        }
        self.setState({
          isModal: true,
          modal: 'message',
          customer: res.customer,
          notification: {
            title: "Credit or debit card",
            content: res.message,
            bgClass: "bg-success",
          }
        })
      },
      error: function(err) {
        self.setState({
          isModal: true,
          modal: 'message',
          notification: {
            title: "Credit or debit card",
            content: err.responseText,
            bgClass: "bg-error",
          }
        })
      }
    })
  },

  submitInvoice() {
    const {customer, trady} = this.state;
    if (customer && !customer.customer_id && trady.jfmo_participant) {
      return this.openModal('payment');
    }

    const self = this;
    const params = {
      trady_id: this.props.trady_id,
      maintenance_request_id: this.props.maintenance_request_id,
      ledger_id: this.props.ledger.id,
    }

    $.ajax({
      type: 'POST',
      url: '/send_invoice',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return callback(res.errors);
        }
      },
      error: function(err) {
        self.setState({
          isModal: true,
          modal: 'message',
          notification: {
            title: "Submit Invoice",
            content: err.responseText,
            bgClass: "bg-error",
          }
        })
      }
    })
  },

  render() {
    const {trady_company, ledger, landlord, agency, edit_invoice_path, trady} = this.props;
    const {invoices} = this.state;

    return (
      <div id="submit-invoice" className="container invoice-form well">
        <div className="send-email-quote">
          <div className="heading">
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
            </div>
          </div>
          <hr/>
          {invoices.map((invoice) => (
            <div className="invoices-data">
              <div className="date-quote">
                <p>
                  <span className="font-bold ">
                    Trady Invoice Reference:
                  </span>
                  <span>
                    {invoice.trady_invoice_reference || 'N/A'}
                  </span>
                </p>
                <p>
                  <span className="font-bold">
                    Invoice Date:
                  </span>
                  <span>
                    {moment(invoice.created_at).format('lll')}
                  </span>
                </p>
                <p>
                  <span className="font-bold">
                    Payment Date:
                  </span>
                  <span>
                    {moment(invoice.due_date).format('lll')}
                  </span>
                </p>
              </div>
              <div className="quote-items">
                <div className="title">
                  Description
                 </div>
                <div className="title">
                  Pricing
                 </div>
                <div className="title">
                  Hours
                 </div>
                <div className="title text-right">
                  Rate
                </div>
                <div className="title text-right">
                  Amount
                </div>
              </div>
              <div className="quote-item-data">
                {invoice.invoice_items.map((invoiceItem) => (
                  <div className="invoice-item">
                    <div>
                      {invoiceItem.item_description}
                    </div>
                    <div>
                      {invoiceItem.pricing_type}
                    </div>
                    <div>
                      {invoiceItem.pricing_type == 'Fixed Cost'
                        ? "N/A"
                        : invoiceItem.pricing_type == 'Hourly'
                          ? invoiceItem.hours
                          : ''
                      }
                    </div>
                    <div className="text-right">
                      {invoiceItem.amount}
                    </div>
                    <div className="text-right">
                      {invoiceItem.pricing_type == 'Fixed Cost'
                        ? `$ ${invoiceItem.amount}`
                        : invoiceItem.pricing_type == 'Hourly'
                          ? `$ ${invoiceItem.amount * invoiceItem.hours}`
                          : ''
                      }
                    </div>
                  </div>
                ))}
                {
                  invoice.tax == true &&
                  (
                    <div className="invoice-tax">
                      <div className="border-none p-b-n flex-5">

                      </div>
                      <div className="border-none text-right font-bold p-b-n flex-2">
                       Subtotal:
                       </div>
                      <div className="border-none text-right p-b-n font-bold flex-1">
                        {`$ ${(invoice.amount - invoice.gst_amount).toFixed(2)}`}
                      </div>
                    </div>
                  )
                }
                {
                  invoice.tax == true &&
                  (
                    <div className="invoice-tax">
                      <div className="p-t-n flex-5">

                      </div>
                      <div className="text-right p-t-n flex-2">
                        GST 10:
                      </div>
                      <div className="text-right p-t-n">
                        {`$ ${invoice.gst_amount.toFixed(2)}`}
                      </div>
                    </div>
                  )
                }
                {
                  invoice.tax == false &&
                  (
                    <div className="invoice-tax">
                      <div className="border-none p-b-n flex-5">

                      </div>
                      <div className="border-none text-right font-bold p-b-n flex-2">
                        Subtotal:
                      </div>
                      <div className="border-none text-right p-b-n">
                        {`$ ${invoice.amount.toFixed(2)}`}
                      </div>
                    </div>
                  )
                }
                {
                  invoice.tax == false &&
                  (
                    <div className="invoice-tax">
                      <div className="p-t-n flex-5">

                      </div>
                      <div className="text-right p-t-n flex-2">
                        GST 10:
                      </div>
                      <div className="text-right p-t-n">
                        $ 0.00
                      </div>
                    </div>
                  )
                }
                <div className="amount-due">
                  <div className="border-none flex-5">

                  </div>
                  <div className="border-none text-right font-bold flex-2">
                    Amount Due (AUD):
                  </div>
                  <div className="border-none text-right font-bold flex-1">
                    {`$ ${invoice.amount.toFixed(2)}`}
                  </div>
                </div>
                { trady && trady.jfmo_participant &&
                  <div className="amount-due">
                    <div className="border-none flex-5">

                    </div>
                    <div className="border-none text-right font-bold flex-2">
                      Service Fee (AUD):
                    </div>
                    <div className="border-none text-right font-bold flex-1">
                      {`$ ${invoice.service_fee}`}
                    </div>
                  </div>
                }
              </div>
            </div>
          ))}
        </div>
        { trady && trady.jfmo_participant &&
          <div className="alert alert-message">
            Please Note: Every invoice submitted will have an associated service fee. If a mistake has been made on an invoice and it was submitted please void that invoice and submit a new invoice to avoid double service fee payment.
          </div>
        }
        <div className="qf-button text-center">
          <button
            className="button-back button-primary"
            type="button"
            onClick={() => this.backButton.click()}
          >
            <a
              href={edit_invoice_path}
              style={{ display: 'none'}}
              ref={elem => this.backButton = elem}
            />
            Back
          </button>
          <button
            className="button-submit button-primary green"
            type="button"
            onClick={this.submitInvoice}
          >
            Submit
          </button>
        </div>

        { this.renderModal() }
      </div>
    )
  }
})
