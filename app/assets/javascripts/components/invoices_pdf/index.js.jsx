var PDFInvoices = React.createClass({
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
		const { current_role, invoice_pdf_files: invoices } = this.props;
		const pictures = this.getPictureImage(invoices);
		const self = this;
		const role = current_role && current_role.role;
		const notPaid = invoices.filter((i) => !i.paid).length !== 0;

		return (
			<div className="quotes invoices m-t-xl box-shadow">
				<p>
					PDF Invoice
				</p>
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
												<span>Invoice Status: </span>
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
												onClick={(key, item) => self.props.viewPDFInvoice('viewPdfInvoice', invoice)}
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
											invoice.paid == false && invoice.active !== false &&
												<div className="void-invoice">
													<button type="button" className="btn btn-decline" onClick={(item) => self.props.viewPDFInvoice('voidInvoice', invoice)}>
														Void Invoice
													</button>
												</div>
										}
									</div>
								</div>
							{
								/* {<div className="user seven columns">
								<span className="index quote index-invoice">{index + 1}</span>
								<span className="icon-user">
									<AvatarImage imageUri={pictures[index]} />
								</span>
								<div className="info">
									<div className="name">
										<span>{trady.name}</span>

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
										invoice.paid == false && invoice.active !== false &&
											<button type="button" className="btn btn-decline" onClick={(item) => self.props.viewPDFInvoice('voidInvoice', invoice)}>
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
								</div>} */
							}
							</div>
						);
					})
				}
				</div>
			</div>
		);
	}
});
