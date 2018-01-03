var DetailInvoice = React.createClass({
	render: function() {
		const {invoice} = this.props;
		let subTotal = 0;
		let gst = 0;
		if(!!invoice) {
			return (
				<table className="table">
				<thead>
					<tr>
						<th className="invoice-description">
							Description
						</th>
						<th className="invoice-price">
							Pricing
						</th>
						<th className="invoice-hour">
							Hours
						</th>
						<th className="invoice-rate">
							Rate
						</th>
						<th className="invoice-amount">
							Amount
						</th>
					</tr>
					</thead>
					<tbody>
					{
						invoice.invoice_items.map(function(item, key) {
							if(item.pricing_type == "Fixed Cost") {
								subTotal += item.amount;
							}else {
								subTotal += (item.amount*item.hours);
							}
							return (
								<tr key={key}>
									<td className="invoice-description">{item.item_description}</td>
									<td className="invoice-price">{item.pricing_type}</td>
									<td className="invoice-hour">{item.pricing_type === 'Fixed Cost' ? 'N/A' : item.hours.toFixed(2)}</td>
									<td className="invoice-rate">{ item.pricing_type == "Fixed Cost" ? 'N/A' : !!item.amount ? `$${item.amount}` : 'N/A' }</td>
									<td className="invoice-amount">${ item.pricing_type == "Fixed Cost" ? item.amount.toFixed(2) : (item.amount * item.hours).toFixed(2) }</td>
								</tr>
							);
						})
					}
					<tr>
						<td colSpan="3" className="border-none p-b-n"></td>
						<td className="text-right border-none font-bold p-b-n">
							Subtotal:
						</td>
						<td className="border-none text-right p-b-n">
							${(subTotal - invoice.gst_amount).toFixed(2)}
						</td>
					</tr>
					<tr>
						<td colSpan="3" className="border-none p-t-n"></td>
						<td className="text-right p-t-n">
							GST 10%:
						</td>
						<td className="text-right p-t-n">
							${invoice.gst_amount.toFixed(2)}
						</td>
					</tr>
					<tr>
						<td colSpan="3" className="border-none"></td>
						<td className="text-right font-bold border-none">
							Amount Due (AUD):
						</td>
						<td className="text-right font-bold border-none">
							${subTotal.toFixed(2)}
						</td>
					</tr>
					</tbody>
				</table>
			);
		}
	}
});

var ModalViewInvoice = React.createClass({
	getInitialState: function() {
		return {
			invoice: this.props.invoice,
		};
	},

	getImage: function(trady) {
		if (!trady) return '';

		const { trady_company: {trady_company_profile_image}, trady_profile_image } = trady;

		const image_url = trady_company_profile_image && trady_company_profile_image.image_url || trady_profile_image && trady_profile_image.image_url;

		return image_url;
	},

	capitalizeText(text) {
		return text
			? text.split('\s+').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
			: '';
	},

	printInvoice: function() {
		window.print();
	},

	render: function() {
		const self = this.props;
		const {invoice} = this.state;
		let total = 0;

		const image_url = this.getImage(invoice.trady);

		return (
			<div className="modal-custom modal-quote fade">
				<div className="modal-dialog">
					<div className="modal-content"  id="print-invoice">
						<div className="modal-header">
							<div className="logo">
                <span className="icon-user">
                  <AvatarImage
                  	id="logo"
                  	imageUri={image_url}
                  	defaultImage="/grey_rect.png"
                  />
                </span>
							</div>
							<div className="info-trady">
								<p>
									<span>
										{this.capitalizeText(invoice.trady.company_name)}
									</span>
								</p>
								<p>
									<span>
										{
											invoice.trady.trady_company.abn
											? `ABN: ${invoice.trady.trady_company.abn}`
											: ''
										}
									</span>
								</p>
								<p>
									<span>
										{this.capitalizeText(invoice.trady.trady_company.address)}
									</span>
								</p>
								<p>
									<span>
										{
											invoice.trady.trady_company.mobile_number
											? `mobile: ${invoice.trady.trady_company.mobile_number}`
											: ''
										}
									</span>
								</p>
								<p>
									<span>
										{
											invoice.trady.trady_company.email
											? `email: ${invoice.trady.trady_company.email}`
											: ''
										}
									</span>
								</p>
							</div>
							<button
								type="button"
								className="close dontprint"
								data-dismiss="modal"
								aria-label="Close"
								onClick={this.props.close}
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="slider-quote">
							<div className="modal-body">
								<div className="show-quote">
									<p className="text-center font-bold">
										Maintenance For: {self.property.property_address}
									</p>
									<div className="info-quote">
										<div className="info-trady">
											<div>
												<p className="font-bold bill-to">Bill To</p>
												<p>
													<span className="font-bold">C/- </span>
													{self.agency && this.capitalizeText(self.agency.business_name)}
												</p>
												<p>{self.agency && this.capitalizeText(self.agency.address)}</p>
											</div>
										</div>
										<div className="info-agency">
											<p>
												<span className="font-bold">Invoice Number: </span>
												<span> {invoice.invoice_number}</span>
											</p>
											<p>
												<span className="font-bold">Invoice Created: </span>
												<span> { moment(invoice.created_at).format("LL") }</span>
											</p>
											<p>
												<span className="font-bold">Invoice Due By: </span>
												<span> { moment(invoice.due_date).format("LL") }</span>
											</p>
										</div>
									</div>
									<div className="detail-quote">
										<div className="detail-quote">
											{!!invoice.invoice_items && <DetailInvoice invoice={invoice} />}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<div className="footer">
								<div className="bank">
									<div>
										<i className="fa fa-bank" />
										<p className="font-bold">Bank Deposit</p>
									</div>
									<p>
										<span className="font-bold">BSB: </span>
										<span>{invoice.trady.trady_company.bsb_number}</span>
									</p>
									<p>
										<span className="font-bold">Account Number: </span>
										<span>{invoice.trady.trady_company.bank_account_number}</span>
									</p>
									<p>
										<span className="font-bold">Account Name: </span>
										<span>{invoice.trady.trady_company.account_name}</span>
									</p>
								</div>
								<div className="contact">
									<div>
										<i className="fa fa-envelope-o" />
										<p className="font-bold">Mail</p>
									</div>
									<p>
										<span className="font-bold">Make your cheque payable to: </span>
										<span>{invoice.trady.trady_company.account_name}</span>
									</p>
									<p>
										<span className="font-bold">Detach this section and mail with your cheque to: </span>
										<span>{invoice.trady.trady_company.address}</span>
									</p>
								</div>
							</div>
						</div>
            <div className="modal-body dontprint">
              <ButtonPrint printQuote={this.printInvoice} />
            </div>
					</div>
				</div>
				<div id="modal-print">
					<iframe id="printframe" />
				</div>
			</div>
		);
	}
});
