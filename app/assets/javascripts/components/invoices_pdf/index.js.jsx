var PDFInvoices = React.createClass({
	render: function() {
		const {invoice_pdf_files} = this.props;
		const {trady} = this.props;
		const self = this;
		return (
			<div className="quotes invoices m-t-xl">
				<p>
					PDF Invoice ({invoice_pdf_files.length})
				</p>
				<div className="list-quote">
				{
					invoice_pdf_files.map(function(invoice, index) {
						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<img src="/assets/user1.png" />
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
										<button type="button" className="btn btn-default btn-view" onClick={(key, item) => self.props.viewPDFInvoice('viewPdfInvoice', invoice)}>
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
