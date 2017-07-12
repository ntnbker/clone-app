var Invoices = React.createClass({
	render: function() {
		const invoices = this.props.invoices;
		const self = this;
		return (
			<div className="quotes invoices m-t-xl" id="invoices">
				<p>
					Invoice ({invoices.length})
				</p>
				<div className="list-quote">
				{
					invoices.map(function(invoice, index) {
						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<img src="/assets/user1.png" />
									<div className="info">
										<div className="name">
											<span>{invoice.trady.name}</span>
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
									<p>
										<button type="button" className="btn btn-default btn-view" onClick={(key, item) => self.props.viewInvoice('viewInvoice', invoice)}>
											View Invoice
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