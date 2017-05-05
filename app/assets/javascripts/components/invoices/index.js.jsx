var Invoice = React.createClass({
	render: function() {
		const invoices = this.props.invoices;
		return (
			<div className="quotes m-t-xl">
				<p>
					Invoice ({invoices.length})
				</p>
				<div className="list-quote">
				{
					invoices.map(function(invoice, index) {
						return (
							<div className="item-quote row">
								<div className="user seven columns">
									<img src="/assets/user1.png" />
									<div className="info">
										<div className="name">
											<span>{invoice.trady.name}</span>
											<button className={'button-default ' + invoice.status}>{invoice.status}</button>
										</div>
										<p className="description">
											{invoice.trady.company_name}
										</p>
									</div>
								</div>
								<div className="actions five columns">
									<button className="close button-default">
										<i className="icon-close" aria-hidden="true" />
									</button>
									<button className="reload button-default">
										<i className="icon-reload" aria-hidden="true" />
									</button>
									<button className="money button-default">{invoice.amount}AUD</button>
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