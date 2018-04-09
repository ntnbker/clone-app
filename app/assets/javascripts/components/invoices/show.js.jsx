var DetailInvoice = React.createClass({
	render: function() {
		const {invoice, invoice: {trady}, role, notVoid} = this.props;
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
					{!notVoid &&
						<div className="text-center position-ab above">
							<div className="reason-header">INVOICE VOID DO NOT PAY</div>
							<div className="reason-title">This is the reason the invoice has been void:</div>
							<div className="reason-content">{invoice.void_reason}</div>
						</div>
					}
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
									<td className="invoice-rate">{ item.pricing_type == "Fixed Cost" ? 'N/A' : !!item.amount ? `$ ${item.amount}` : 'N/A' }</td>
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
						<td className="border-none p-b-n">
							$ {(subTotal - invoice.gst_amount).toFixed(2)}
						</td>
					</tr>
					<tr>
						<td colSpan="3" className="border-none p-t-n"></td>
						<td className="text-right font-bold p-t-n">
							GST 10%:
						</td>
						<td className="p-t-n">
							$ {invoice.gst_amount.toFixed(2)}
						</td>
					</tr>
					<tr className="position-rl">
						<td colSpan="3" className="border-none"></td>
						<td className="text-right font-bold border-none">
							Amount Due: (AUD)
						</td>
						<td className="font-bold border-none">
							$ {subTotal.toFixed(2)}
						</td>
					</tr>
					{
						role === 'Trady' && trady && trady.jfmo_participant &&
						<tr>
							<td colSpan="3" className="border-none"></td>
							<td className="text-right font-bold border-none">
								Service Fee: (AUD)
							</td>
							<td className="font-bold border-none">
								$ {invoice.service_fee}
							</td>
						</tr>
					}
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

		const image_url = trady_company_profile_image && trady_company_profile_image.image_url;

		return image_url;
	},

	capitalizeText(text) {
		return !text
			? ''
			: text.trim().replace(/((^\w)|((\.|\,|\s)\w))/g, newWord => newWord.length === 1
				? newWord.toUpperCase()
				: (newWord[0] + newWord[1].toUpperCase())
			)
	},

	formatABN(text) {
		return text.match(/.{1,3}/g).join(' ');
	},

	formatMobile(text) {
		return text.replace(/(.{2})(.{4})(.{4})(.*)/, '$1 $2 $3 $4').trim();
	},

	formatPhone(text) {
		return text.replace(/(.{4})(.{3})(.{3})(.*)/, '$1 $2 $3 $4').trim();
	},

	formatBSB(text) {
		return this.formatABN(text);
	},

	formatACC(text) {
		return this.formatABN(text);
	},

	printInvoice: function() {
		window.print();
	},

	render: function() {
		const self = this.props;
		const {invoice} = this.state;
		let total = 0;

		const subTotal = !invoice.invoice_items
											? 0
											: invoice.invoice_items.reduce((total, item) => {
												if(item.pricing_type == "Fixed Cost") {
													total += item.amount;
												}else {
													total += (item.amount*item.hours);
												}
												return total;
											}, 0);

		const image_url = this.getImage(invoice.trady);

		const notVoid = invoice.paid == false && invoice.active !== false;

		return (
			<div className="modal-custom modal-quote fade">
				<div className="modal-dialog">
					<div className="modal-content"  id="print-invoice">
						<div className="modal-header invoice">
							<div className="logo">
                <span className="icon-user">
                  { !!image_url && <AvatarImage
	                  	id="logo"
	                  	imageUri={image_url}
	                  	defaultImage="/empty.png"
	                  />
	                }
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
											? `ABN ${this.formatABN(invoice.trady.trady_company.abn)}`
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
											? `mobile: ${this.formatMobile(invoice.trady.trady_company.mobile_number)}`
											: ''
										}
									</span>
								</p>
								<p>
									<span>
										{
											invoice.trady.trady_company.landline
											? `landline: ${this.formatPhone(invoice.trady.trady_company.landline)}`
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
									<div className="info-quote">
										<div className="info-trady">
											<div>
												<p className="font-bold bill-to">Bill To</p>
												<p>{self.landlord && this.capitalizeText(self.landlord.name)}</p>
												<p>
													<span className="font-bold">C/- </span>
													{self.agency && this.capitalizeText(self.agency.business_name)}
												</p>
												<p>{self.agency && this.capitalizeText(self.agency.address)}</p>
											</div>
										</div>
										<div className="info-agency">
											<p>
												<span className="font-bold">Invoice no: </span>
												<span> {invoice.invoice_number}</span>
											</p>
											<p>
												<span className="font-bold">Issue date: </span>
												<span> { moment(invoice.created_at).format("LL") }</span>
											</p>
											<p>
												<span className="font-bold">Due date: </span>
												<span> { moment(invoice.due_date).format("LL") }</span>
											</p>
										</div>
									</div>
									<div className="detail-quote position-rl">
										{!!invoice.invoice_items && <DetailInvoice notVoid={notVoid} role={self.role} invoice={invoice} />}
									</div>
									<p className="font-bold">
										Service Address: {this.capitalizeText(self.property.property_address)}
									</p>
								</div>
							</div>
						</div>
						<div className="modal-footer border-top">
							<div className="footer">
								<div className="bank">
									<div>
										<i className="fa fa-bank" />
										<p className="font-bold">Bank Deposit</p>
									</div>
									<p>
										<span className="font-bold">Account Name: </span>
										<span>{this.capitalizeText(invoice.trady.trady_company.account_name)}</span>
									</p>
									<p>
										<span className="font-bold">BSB no. </span>
										<span>{this.formatBSB(invoice.trady.trady_company.bsb_number)}</span>
									</p>
									<p>
										<span className="font-bold">ACC no. </span>
										<span>{this.formatACC(invoice.trady.trady_company.bank_account_number)}</span>
									</p>
									{ !!invoice.invoice_items &&
										<p>
											<span className="font-bold">Invoice Amount: </span>
											<span> { subTotal.toFixed(2) }</span>
										</p>
									}
								</div>
								<div className="contact">
									<div>
										<i className="fa fa-envelope-o" />
										<p className="font-bold">Mail</p>
									</div>
									<p>
										<span className="font-bold">Make your cheque payable to: </span>
										<span>{this.capitalizeText(invoice.trady.trady_company.account_name)}</span>
									</p>
									<p>
										<span className="font-bold">Detach this section and mail with your cheque to: </span>
										<span>{this.capitalizeText(invoice.trady.trady_company.address)}</span>
									</p>
									{ !!invoice.invoice_items &&
										<p>
											<span className="font-bold">Invoice no: </span>
											<span> {invoice.invoice_number}</span>
										</p>
									}
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
