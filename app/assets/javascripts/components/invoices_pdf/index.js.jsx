var PDFInvoices = React.createClass({
	getInitialState: function() {
		return {
			invoices: this.props.invoice_pdf_files,
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
		const { current_role } 			 = this.props;
		const { invoices, pictures } = this.state;
		const self = this;
		const role = current_role.role;
		const notPaid = invoices.filter((i) => !i.paid).length !== 0;

		return (
			<div className="quotes invoices m-t-xl">
				<p>
					<span className="index index-invoice">{invoices.length}</span>PDF Invoice
				</p>
				{
					(role == 'Trady' && notPaid) &&
					<p>
						<button type="button" className="btn btn-mark-as-paid" onClick={(item) => self.props.paymentReminder({})}>
							Remind Agent of Payment
						</button>
					</p>
				}
				<div className="list-quote">
				{
					invoices.map(function(invoice, index) {
						const { trady = {}, paid = false } = invoice;
						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<span className="index quote index-invoice">{index + 1}</span>
									<span className="icon-user">
										<AvatarImage imageUri={pictures[index]} />
									</span>
									<div className="info">
										<div className="name">
											<span>{trady.name}</span>
											{!!paid && <button className="button-default Approved"><span>Paid</span></button>}
											{!paid && <button className="button-default Declined"><span>Outstanding Payment</span></button>}
										</div>
										<p className="description">
											{trady.company_name}<br />
											{trady.trady_company ? trady.trady_company.trading_name : ""}
										</p>
									</div>
								</div>
								<div className="actions five columns content">
									<p>
										Total: <span>{invoice.total_invoice_amount}</span>
									</p>
								</div>
								<div className="actions-quote">
                  {
                    invoice.paid == false &&
                      <button type="button" className="btn btn-mark-as-paid" onClick={(item) => self.props.viewInvoice('voidInvoice', invoice)}>
                        Void Invoice
                      </button>
                  }
									{
										(['Agent', 'AgencyAdmin'].indexOf(role) !== -1 && !paid) &&
											<button type="button" className="btn btn-mark-as-paid" onClick={(item) => self.props.markAsPaid(invoice)}>
												Payment Scheduled
											</button>
									}
									<button
										type="button"
										className="btn btn-view"
										onClick={(key, item) => self.props.viewPDFInvoice('viewPdfInvoice', invoice)}
									>
											View
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
