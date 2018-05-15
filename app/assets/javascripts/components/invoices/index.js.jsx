var CreateInvoiceForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = [
	    'invoice-option', 'trady-company', 'make-invoice', 'submit-invoice', 'success'
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
        {this.labelTitle(1, <p>Invoice<br />Option</p>, level > 0)}
        {this.labelTitle(2, <p>Trady<br />Company<br />Infomation</p>, level > 1)}
        {this.labelTitle(3, <p>Create/Upload<br />Invoice</p>, level > 2)}
        {this.labelTitle(4, <p>Submit<br />Invoice</p>, level > 3)}
      </div>
    )
  },

  generateTitle() {
    const {step} = this.state;

    switch (step) {
      case 'invoice-option':
        return <h5 className="step-title text-center">Invoice Option</h5>
      case 'trady-company':
        return <h5 className="step-title text-center">Trady Company Information</h5>
      case 'make-invoice':
        return <h5 className="step-title text-center">Create/Upload Invoice</h5>
      case 'submit-invoice':
        return <h5 className="step-title text-center">Submit Invoice</h5>
      case 'success':
        return <h5 className="step-title text-center">Success</h5>
    }
  },

  generateForm() {
    const {step} = this.state;
		const {is_edit: isEdit, is_upload: isUpload } = this.props;
    switch (step) {
      case 'invoice-option':
        return <InvoiceOption {...this.props} />;
      case 'trady-company':
      	return isEdit
      		? <EditTradyCompany {...this.props} />
      		: <AddTradycompany {...this.props} />;
      case 'make-invoice':
        return isUpload
        ? <AddInvoicePDF {...this.props} />
        : <InvoiceFields {...this.props} />
      case 'submit-invoice':
        return isUpload
        ? <SubmitInvoicePDF {...this.props} />
        : <InvoiceSubmit {...this.props} />;
      case 'success':
        return <InvoiceSentSuccess {...this.props} />;
    }
  },

  componentWillUnmount() {
    $('body > div.layout').css('background-color', '#F4F8FB');
  },

  render() {
    return (
      <div id="registration" className="agency-registration">
        {this.generateStepTitle()}
        {this.generateTitle()}
        {this.generateForm()}
      </div>
    )
  }

})

var Invoices = React.createClass({
	getInitialState: function() {
		return {
		};
	},

	getPictureImage(invoices) {
		if (!invoices || invoices.length === 0)
			return [];

		const pictures = (invoices || []).map((invoice) => {
			const trady 											= invoice.trady || {};
			const id 													= trady.id || '';
			const trady_company 							= trady.trady_company || {};
			const trady_profile_image 				= trady.trady_profile_image || {};
			const trady_company_profile_image = trady_company.trady_company_profile_image || {};

			return trady_company_profile_image && trady_company_profile_image.image_url
					|| trady_profile_image && trady_profile_image.image_url;
		});

		return pictures;
	},

	render: function() {
		const self = this;
    const { current_role, invoices } = this.props;
    const role = current_role && current_role.role;
    const pictures = this.getPictureImage(invoices);

		const notPaid = invoices.filter((i) => !i.paid).length !== 0;

		return (
			<div className="quotes invoices m-t-xl box-shadow">
      <h5 className="mr-title">
        Invoice
      </h5>
      <div className="list-quote">
      {
        invoices.map(function(invoice, index) {
          const { trady = {}, paid = false, active } = invoice;

          return (
            <div className="item-quote row item-quote-request" key={index}>
              <div className="user seven columns trady-info-group">
                <div className="trady-info">
                  <span className="icon-user">
                    <AvatarImage imageUri={pictures[index]} />
                  </span>
                  <div className="info">
                    <div className="name">
                      <span className="key">Name: </span>
                      <span className="value">{trady.name}</span>
                    </div>
                    { trady.trady_company &&
                      <div className="business-name">
                        <span className="key">Business Name: </span>
                        <span className="value">{trady.trady_company.trading_name}</span>
                      </div>
                    }
                    <div className="company-name">
                      <span className="key">Company Name: </span>
                      <span className="value">{trady.company_name}</span>
                    </div>
                    <div className="invoice-status">
                      <span className="key">Invoice Status: </span>
                      {
                        paid == false
                          ? active !== false
                            ? <button className={'button-default status Declined'}>Outstanding Payment</button>
                            : <button className={'button-default status Declined'}>Do Not Pay</button>
                          : <button className={'button-default status Approved'}>Payment Scheduled</button>
                      }
                    </div>
                  </div>
                </div>
                <div className="contact-button">
                  <div className="view-invoice">
                    <button
                      type="button"
                      className="btn btn-view"
                      onClick={(key, item) => self.props.viewInvoice('viewInvoice', invoice)}
                    >
                        View Invoice
                    </button>
                  </div>
                  {
                    ['Agent', 'AgencyAdmin'].indexOf(role) !== -1 && !paid && active !== false &&
                      <div className="payment-scheduled">
                        <button type="button" className="btn payment-scheduled" onClick={(item) => self.props.markAsPaid(invoice)}>
                          Payment Scheduled
                        </button>
                      </div>  
                  }
                  { role === 'Trady' && !paid && active !== false &&
                    <div className="payment-scheduled">
                      <button type="button" className="btn payment-scheduled" onClick={(item) => self.props.paymentReminder({})}>
                        Remind Agent of Payment
                      </button>
                    </div>
                  }
                  {
                    paid == false && active !== false &&
                      <div className="void-invoice">
                        <button type="button" className="btn btn-decline" onClick={(item) => self.props.viewInvoice('voidInvoice', invoice)}>
                          Void Invoice
                        </button>
                      </div>
                  }
                </div>
              </div>
            </div>
          );
        })
      }
      </div>
    </div>
		);
	}
});

var ModalVoidInvoice = React.createClass({
  getInitialState() {
    return {};
  },

  voidInvoice() {
    const { invoice, current_user } = this.props;
    const self = this;

    const params = {
      trady_id: invoice.trady_id,
      invoice_id: invoice.id,
      maintenance_request_id: invoice.maintenance_request_id,
      message: this.message && this.message.value,
    }

    this.props.voidInvoice(params, (error) => {
      if (error) {
        self.setState({ error });
      }
    })
  },

  renderError: function() {
    const {error} = this.state;
    return <p id="errorbox" className="error">{error || ''}</p>;
  },

  render() {
    const { invoice, text } = this.props;
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
              <h4 className="modal-title text-center">Void Invoice</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">{text}</p>
              <textarea
                type="text"
                className="none-resize"
                placeholder="Please tell us the reason:"
                onChange={() => this.setState({error: ''})}
                ref={(elem) => this.message = elem}
              />
              {this.renderError()}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary cancel"
                onClick={this.voidInvoice}
                data-dismiss="modal"
              >Void Invoice</button>
              <button
                type="button"
                className="btn btn-default success"
                onClick={this.props.close}
              >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
})
