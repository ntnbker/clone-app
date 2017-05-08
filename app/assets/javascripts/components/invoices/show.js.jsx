var DetailInvoice = React.createClass({
	render: function() {
		const invoice_items = this.props.invoice_items;
		let subTotal = 0;
		let gst = 0;
		if(!!invoice_items) {
			return (
				<table  className="table">
				<thead>
					<tr>
						<th>
							Description
						</th>
						<th>
							Pricing
						</th>
						<th>
							Rate
						</th>
						<th>
							Hours
						</th>
						<th>
							Total
						</th>
					</tr>
					</thead>
					<tbody>
					{
						invoice_items.map(function(item, key) {
							subTotal+= item.amount * item.hours;
							gst += !!item.gst_amount ? item.gst_amount : 0;
							return (
								<tr key={key}>
									<td>{item.item_description}</td>
									<td>{item.pricing_type}</td>
									<td>{item.amount}</td>
									<td>{!!item.hours ? item.hours : 0}</td>
									<td>${item.hours * item.amount}</td>
								</tr>
							);
						})
					}
					<tr>
						<td colSpan="4" className="text-right">
							Subtotal:
						</td>
						<td>
							${subTotal}
						</td>
					</tr>
					<tr>
						<td colSpan="4" className="text-right">
							GST:
						</td>
						<td>
							${gst}
						</td>
					</tr>
					<tr>
						<td colSpan="4" className="text-right">
							Total:
						</td>
						<td>
							${subTotal + gst}
						</td>
					</tr>
					</tbody>
				</table>
			);
		}else {
			<table>
				<tr>
					<th>
						Description
					</th>
					<th>
						Pricing
					</th>
					<th>
						Hours
					</th>
					<th>
						Amount
					</th>
				</tr>
				<tr>
					<td colSpan="4" className="text-center">
						Data is empty.
					</td>
				</tr>
			</table>
		}
	}
});

var ModalViewInvoice = React.createClass({
	getInitialState: function() {
		return {
			index: null,
			invoice: this.props.invoice,
			invoices: this.props.invoices,
		};	
	},

	switchSlider: function(key, index) {
		let position = 0;
		let invoice = "";
		if(key == "prev") {
			position = index - 1 < 0 ? this.state.invoices.length - 1 : index-1;
		}else {
			position = index + 1 > this.state.invoices.length - 1 ? 0 : index+1;
		}

		invoice = this.state.invoices[position];
		this.setState({
			index: position,
			invoice: invoice
		});
	},

	componentWillMount: function() {
		this.filterQuote(this.state.invoices);
	},

	componentWillReceiveProps: function(nextProps) {
		this.filterQuote(nextProps.invoices);
		this.setState({
			invoices: nextProps.invoices
		});
	},

	filterQuote: function(invoices) {
		for(var i = 0; i < invoices.length; i++) {
			var item = invoices[i];
			if(item.id == this.state.invoice.id) {
				this.setState({
					index: i+1,
					invoice: item
				});
				break;
			}
		}
	},

	render: function() {
		const self = this.props;
		const invoice = this.state.invoice;
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
							<h4 className="modal-title text-center">Invoice</h4>
						</div>
						<div className="slider-quote">
							<div className="modal-body">
								<div className="show-quote" onTouchEnd={(key, index) => this.switchSlider('prev', this.state.index)}>
									<div className="info-quote">
										<div className="info-trady">
											<p>{invoice.trady.name}</p>
											<p className="">{!!invoice.trady.trady_company && invoice.trady.trady_company.address}</p>
											<p className="">{!!invoice.trady.trady_company && invoice.trady.trady_company.email}</p>
											<p className="">Abn: {!!invoice.trady.trady_company && invoice.trady.trady_company.abn}</p>
										</div>
										<div className="info-agency">
											<p>{self.agency.company_name}</p>
											<p>{self.agency.address}</p>
										</div>
									</div>
									<div className="detail-quote">
										<div className="info-maintenance">
											<p>Invoice #{invoice.id}</p>
											<p>For: {self.property.property_address}</p>
											<p>Created: { moment(invoice.created_at).format("DD-MM-YYYY") }</p>
										</div>
										<div className="detail-quote">
											{!!invoice.invoice_items && <DetailInvoice invoice_items={invoice.invoice_items} />}
										</div>
									</div>
								</div>
								<div className="button-slider">
									<button className="btn-prev" onClick={(key, index) => this.switchSlider('prev', this.state.index)}>
										<i className="fa fa-angle-left" />
									</button>
									<button className="btn-next" onClick={(key, index) => this.switchSlider('next', this.state.index)}>
										<i className="fa fa-angle-right" />
									</button>
								</div>
							</div>
						</div>
						<p className="due">
							DUE: <span>{ moment(invoice.due_date).format('DD/MM/YYYY')}</span>
						</p>
						<p className="print">
							<button className="btn btn-default btn-print">
								Print
							</button>
						</p>
					</div>
				</div>
			</div>
		);
	}
});