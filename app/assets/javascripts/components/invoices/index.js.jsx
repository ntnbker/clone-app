var CreateInvoiceForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = ['invoice-option', 'trady-company', 'make-invoice', 'submit-invoice'];

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
        {this.labelTitle(1, <p>Choose<br />Option</p>, level > 0)}
        {this.labelTitle(2, <p>Trady<br />Company</p>, level > 1)}
        {this.labelTitle(4, <p>Make<br />Invoice</p>, level > 2)}
        {this.labelTitle(3, <p>Submit<br />Invoice</p>, level > 3)}
      </div>
    )
  },

  generateTitle() {
    const {step} = this.state;

    switch (step) {
      case 'invoice-option':
        return <h5 className="step-title text-center">Choose Option</h5>
      case 'trady-company':
        return <h5 className="step-title text-center">Trady Company</h5>
      case 'make-invoice':
        return <h5 className="step-title text-center">Make Invoice</h5>
      case 'submit-invoice':
        return <h5 className="step-title text-center">Submit Invoice</h5>
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
			invoices: this.props.invoices,
			pictures: [],
		};
	},

	componentWillMount() {
		this.getPictureImage(this.state.invoices);
	},

	getPictureImage(invoices) {
		if (!invoices || invoices.length === 0)
			return this.setState({ pictures: []});

		const pictures = (invoices || []).map((invoice) => {
			const trady 											= invoice.trady || {};
			const id 													= trady.id || '';
			const trady_company 							= trady.trady_company || {};
			const trady_profile_image 				= trady.trady_profile_image || {};
			const trady_company_profile_image = trady_company.trady_company_profile_image || {};

			return trady_company_profile_image && trady_company_profile_image.image_url
					|| trady_profile_image && trady_profile_image.image_url;
		});

		this.setState({ pictures });
	},

	render: function() {
		const self = this;
		const { current_role }			 = this.props;
		const { invoices, pictures } = this.state;

		const notPaid = invoices.filter((i) => !i.paid).length !== 0;

		return (
			<div className="quotes invoices m-t-xl" id="invoices">
				<p>
					<span className="index index-invoice">{invoices.length}</span>Invoice
					{
						(current_role.role === 'Trady' && notPaid) &&
						<button type="button" className="btn btn-mark-as-paid" onClick={(item) => self.props.paymentReminder({})}>
											Remind Agent of Payment
						</button>
					}
				</p>
				<div className="list-quote">
				{
					invoices.map(function(invoice, index) {
						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<span className="index quote index-invoice">{index + 1}</span>
									<span className="icon-user">
										<AvatarImage imageUri={pictures[index]} />
									</span>
									<div className="info">
										<div className="name">
											<span>{invoice.trady.name}</span>
											{
												invoice.paid == false ?
													<button className={'button-default status Declined'}>
														<span>Outstanding Payment</span>
													</button>
													:
													<button className={'button-default status Approved'}>
														<span>Paid</span>
													</button>
											}
										</div>
										<p className="description">
											{invoice.trady && invoice.trady.company_name}<br />
											{(invoice.trady && invoice.trady.trady_company) ? invoice.trady.trady_company.trading_name : null}
										</p>
									</div>
								</div>
								<div className="actions five columns content">
									<p>
										Total: <span>${invoice.amount}</span>
									</p>
									<p>
										DUE: <span>{ moment(invoice.due_date).format('LL')}</span>
									</p>
								</div>
								<div className="actions-quote">
									{
										(current_role.role == 'Agent' || current_role.role == "AgencyAdmin" && invoice.paid == false) &&
											<button type="button" className="btn btn-mark-as-paid" onClick={(item) => self.props.markAsPaid(invoice)}>
												Payment Scheduled
											</button>
									}
									<button type="button" className="btn btn-view" onClick={(key, item) => self.props.viewInvoice('viewInvoice', invoice)}>
										View Invoice
									</button>
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
