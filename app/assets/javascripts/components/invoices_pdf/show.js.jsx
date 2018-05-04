var ModalViewPDFInvoice = React.createClass({
	getInitialState: function() {
		return {
			index: null,
			invoice: this.props.invoice_pdf_file
		};
	},

	printInvoice: function() {
		window.print();
	},

	render: function() {
		const self = this.props;
		const {invoice} = this.state;
		const {pdf_url, trady} = invoice;
		const {role} = this.props;

		const isPdf = /store\/\w+\.pdf/.test(pdf_url);
    const isShowVoidModal = invoice.paid === false && invoice.active === false;
    const isShowVoidButton = invoice.paid === false && invoice.active !== false;
		let total = 0;
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
							<h4 className="modal-title text-center">PDF VIEWER</h4>
						</div>
						<div className="slider-quote">
							<div className="modal-body">
								<div className="show-quote" onTouchEnd={(key, index) => this.switchSlider('prev', this.state.index)}>
									<div className="info-quote">
										<div className="info-trady">
											<p>{trady.name}</p>
											<p className="">{!!trady.trady_company && trady.trady_company.address}</p>
											<p className="">{!!trady.trady_company && trady.trady_company.email}</p>
											<p className="">Abn: {!!trady.trady_company && trady.trady_company.abn}</p>
										</div>
										<div className="info-agency">
											<p>{self.agency.company_name}</p>
											<p>{self.agency.address}</p>
										</div>
									</div>
									<div className="detail-quote position-rl">
                    {isShowVoidModal &&
                      <div className="text-center position-ab reason-void">
                        <div className="reason-header">INVOICE VOID DO NOT PAY</div>
                        <div className="reason-title">Reason for voiding:</div>
                        <div className="reason-content">{invoice.void_reason}</div>
                      </div>
                    }
										{!!pdf_url &&
											<object
												width="100%"
												height={isPdf ? '350px' : "100%"}
												data={pdf_url}
											>
												<iframe
													width="100%"
													height={isPdf ? '350px' : "100%"}
													src={`https://docs.google.com/gview?url=${pdf_url.replace(/.pdf\?.*/g, '')}.pdf&embedded=true`}
													className="scroll-custom" />
											</object>
										}
									</div>
									<div className="text-center">
										Invoice Total: {invoice.total_invoice_amount || 0}
									</div>
					        <div className="text-center">
					          Invoice Due On: {invoice.due_date}
					        </div>
					        { role === 'Trady' && trady.jfmo_participant && trady.customer &&
                    <div className="text-center">
                      Service Fee: {invoice.service_fee}
                    </div>
                  }
								</div>
							</div>
						</div>
            	<div className="modal-body dontprint">
                {
                  isShowVoidButton &&
                    <button type="button" className="btn btn-decline" onClick={(item) => self.viewInvoice('voidInvoice', invoice)}>
                      Void Invoice
                    </button>
                }
                { !isPdf && <ButtonPrint printQuote={this.printInvoice} /> }
              </div>
          </div>
				</div>
			</div>
		);
	}
});

var SubmitInvoicePDF = React.createClass({
	getInitialState() {
		const {customer, trady} = this.props;

		return {
			customer, trady
		}
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

  submitInvoicePdf(e) {
    const {customer, trady} = this.state;
    const {send_pdf_invoice_path} = this.props;
    if (customer && !customer.customer_id && trady.jfmo_participant) {
      return this.openModal('payment');
    }

    const self = this;

    $.ajax({
      type: 'POST',
      url: send_pdf_invoice_path,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
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
            title: "Submit Invoice PDF",
            content: err.responseText,
            bgClass: "bg-error",
          }
        })
      }
    })
  },

	render() {
		const {pdf_url, pdf, edit_uploaded_invoice_path, pdf_path} = this.props;
    const {trady, customer} = this.state;

		const isPdf = /store\/\w+\.pdf/.test(pdf_url);

		return (
			<div className="container well invoice-form" id="submit-invoice">
			  <div id="Iframe-Master-CC-and-Rs" className="set-margin set-padding set-border set-box-shadow center-block-horiz">
			    <div
			    	className="responsive-wrapper responsive-wrapper-wxh-572x612"
			    >
			      <object
							width="100%"
							height={isPdf ? '500px' : "100%"}
							data={pdf_url}
						>
							<iframe
								width="100%"
								height={isPdf ? '500px' : "100%"}
								src={pdf_path}
								className="scroll-custom"
							/>
						</object>
			    </div>
	      </div>
			  <div className="text-center m-b-lg">
			    Invoice Total: {pdf.total_invoice_amount}
			  </div>
        <div className="text-center m-b-lg">
          Invoice Due On : {pdf.due_date}
        </div>
			  { trady.jfmo_participant && !!customer &&
          <div className="text-center m-b-lg">
            Service Fee: {pdf.service_fee}
          </div>
        }
        <div className="alert alert-message">
          Please Note: Every invoice submitted will have an associated service fee. If a mistake has been made on an invoice and it was submitted please void that invoice and submit a new invoice to avoid double service fee payment.
        </div>
			  <div className="text-center m-b-lg qf-button">
		      <button
		      	type="button"
			      className="button-back"
						onClick={() => location.href = edit_uploaded_invoice_path}
			    >
			      Back
		      </button>
			    <button
			    	type="button"
			    	className="button-type button-submit green right"
			    	onClick={this.submitInvoicePdf}
			    >
			      Submit
			    </button>
			  </div>
			  { this.renderModal() }
		  </div>
		)
	}
})
