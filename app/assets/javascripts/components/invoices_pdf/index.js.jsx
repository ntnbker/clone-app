var PDFInvoices = React.createClass({
	render: function() {
		const {invoice_pdf_files, current_role} = this.props;
		const self = this;
		const role = current_role.role;

		return (
			<div className="quotes invoices m-t-xl">
				<p>
					PDF Invoice ({invoice_pdf_files.length})
				</p>
				<div className="list-quote">
				{
					invoice_pdf_files.map(function(invoice, index) {
						const { trady = {}, paid = false } = invoice;
						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<span className="icon-user">
										<i className="fa fa-user" />
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
									<p style={{ marginRight: 15 }}>
										{
											(['Agent', 'AgencyAdmin'].indexOf(role) !== -1 && !paid) &&
												<button type="button" className="btn btn-mark-as-paid" onClick={(item) => self.props.markAsPaid(invoice)}>
													Mark As Paid
												</button>
										}
										<button
											style={{ marginLeft: 10 }}
											type="button" className="btn btn-default btn-view"
											onClick={(key, item) => self.props.viewPDFInvoice('viewPdfInvoice', invoice.pdf_url)}>
												View
											</button>
									</p>
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
