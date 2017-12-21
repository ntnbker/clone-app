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
						<th>
							Description
						</th>
						<th>
							Pricing
						</th>
						<th>
							Hours
						</th>
						<th className="text-right rate">
							Rate
						</th>
						<th className="text-right amount">
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
									<td>{item.item_description}</td>
									<td>{item.pricing_type}</td>
									<td>${item.amount.toFixed(2)}</td>
									<td className="text-right rate">{ item.pricing_type == "Fixed Cost" ? 'N/A' : !!item.hours ? item.hours : 'N/A' }</td>
									<td className="text-right amount">${ item.pricing_type == "Fixed Cost" ? item.amount.toFixed(2) : (item.amount * item.hours).toFixed(2) }</td>
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

	getImage: function(trady) {
		if (!trady) return '';

		const { trady_company: {trady_company_profile_image}, trady_profile_image } = trady;

		const image_url = trady_company_profile_image && trady_company_profile_image.image_url || trady_profile_image && trady_profile_image.image_url;

		return image_url;
	},

	printInvoice: function() {
		window.print();
		// $('.button-slider').toggle('hide');
		// var contents = $('#print-invoice').html();
		// var style = ".info-quote {display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; flex-direction: row; justify-content: space-between;}" +
		// 						".info-trady {flex: 1; margin-bottom: 15px; overflow: hidden;}" +
		// 						".info-trady p {margin-bottom: 0px;}" +
		// 						".info-agency {flex: 1;}" +
		// 						".info-agency p {text-align: right; overflow: hidden; margin-bottom: 0px;}" +
		// 						".detail-quote .info-maintenance {margin-top: 10px;}" +
		// 						".detail-quote .info-maintenance p {text-align: center; margin-bottom: 0;}" +
		// 						".detail-quote {margin-top: 15px;}" +
		// 						".detail-quote .table {width: 100%;}" +
		// 						".detail-quote .table tr th {color: #b3b3b3; padding-left: 0; font-size: 13px; text-transform: uppercase;}" +
		// 						".detail-quote .table tr td {padding-left: 0; padding: 10px 3px; border-bottom: 1px solid #E1E1E1;}"+
		// 						"#print-invoice { color: #404040;}" +
		// 						".modal-dialog { width: 700px !important;}" +
		// 						".modal-header {background-color: #fff !important;display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex;}" +
		// 						".modal-header .logo img { width: 80px;}" +
		// 						".modal-header .info-trady {margin-left: 15px;}" +
		// 						".modal-header .info-trady p {margin-bottom: 0px;font-size: 12px;}" +
		// 						".modal-header .info-trady p span:last-child {padding-left: 5px;}" +
		// 						".modal-header .close {border: 1px solid #ccc !important;border-radius: 50% !important;position: absolute; top: 5px;right: 5px;}" +
		// 						".modal-header .close span {color: #ccc !important;}" +
		// 						".info-quote { font-size: 13px; clear: both; overflow: hidde}" +
		// 						".info-quote .bill-to { font-size: 16px;}" +
		// 						".info-quote .info-agency p { text-align: left !important;}" +
		// 						".info-quote .info-agency p span:first-child { width: 120px; display: inline-block; text-align: right;}" +
		// 						".footer { font-size: 12px; border-top: 1px solid #ccc; padding-top: 15px; width: 100%; display: inline-block;}" +
		// 						".footer i { font-size: 36px;}" +
		// 						".footer p { margin-bottom: 5px;}" +
		// 						".footer .bank { margin-left: 5%; width: 45%; float: left;}" +
		// 						".footer .bank span:first-child { width: 110px; display: inline-block;}" +
		// 						".footer .contact { margin-left: 5%; width: 45%; float: left;}" +
		// 						".border-none { border: none !important;}" +
		// 						".color-grey { color: #b3b3b3;}" +
		// 						".font-bold { font-weight: bold;}" +
		// 						".m-t-md { margin-top: 10px;}" +
		// 						".p-t-n { padding-top: 0 !important;}" +
		// 						".p-b-n { padding-bottom: 0 !important;}" +
		// 						".print {display: none;}" +
		// 						".close {display: none;}";

		// var frame = $('#printframe')[0].contentWindow.document.open("text/html", "replace");
		// var htmlContent = "<html>" +
		// 									"<head>" +
		// 									"<title> Invoice </title>" +
		// 									'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />' +
		// 									'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />' +
		// 									'<style type="text/css" media="print,screen">' +
		// 									style +
		// 									"</style>";
		// frame.open();
		// frame.write(htmlContent);
		// frame.write("</head><body>");
		// frame.write(contents);
		// frame.write("</body></html>");
		// frame.close();

  //   // print just the modal div
  //   setTimeout(function() {
  //   	$('#printframe')[0].contentWindow.print();
  //     $('#printframe')[0].contentWindow.close();
  //   	$('.button-slider').toggle('show');
  //   }, 1000);
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
                  <AvatarImage id="logo" imageUri={image_url} />
                </span>
							</div>
							<div className="info-trady">
								<p>
									<span>
										{invoice.trady.company_name}
									</span>
								</p>
								<p>
									<span>
										{invoice.trady.trady_company.abn}
									</span>
								</p>
								<p>
									<span>
										{invoice.trady.trady_company.address}
									</span>
								</p>
								<p>
									<span>
										{invoice.trady.trady_company.mobile_number}
									</span>
								</p>
								<p>
									<span>
										{invoice.trady.trady_company.email}
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
								<div className="show-quote" onTouchEnd={(key, index) => this.switchSlider('prev', this.state.index)}>
									<div className="info-quote">
										<div className="info-trady">
											<div>
												<p className="color-grey bill-to">Bill To</p>
												<p>{self.landlord && self.landlord.name}</p>
												<p>{self.agency && self.agency.company_name}</p>
												<p>{self.agency && self.agency.address}</p>
											</div>
										</div>
										<div className="info-agency">
											<p>
												<span className="font-bold">Invoice Number: </span>
												<span> {invoice.invoice_number}</span>
											</p>
											<p>
												<span className="font-bold">Invoice Date: </span>
												<span> { moment(invoice.created_at).format("LL") }</span>
											</p>
											<p>
												<span className="font-bold">Payment Date: </span>
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
						<div className="footer">
							<div className="bank">
								<div>
									<i className="fa fa-bank" />
									<p className="font-bold">Bank Deposit</p>
								</div>
								<p>
									<span className="font-bold">BSB:</span>
									<span>{invoice.trady.trady_company.bsb_number}</span>
								</p>
								<p>
									<span className="font-bold">Account Number:</span>
									<span>{invoice.trady.trady_company.bank_account_number}</span>
								</p>
								<p>
									<span className="font-bold">Account Name:</span>
									<span>{invoice.trady.trady_company.account_name}</span>
								</p>
							</div>
							<div className="contact">
								<div>
									<i className="fa fa-envelope-o" />
									<p className="font-bold">Mail</p>
								</div>
								<p className="font-bold">
									Make your cheque payable to:
								</p>
								<p>
									{invoice.trady.trady_company.account_name}
								</p>
								<p className="font-bold">
									Detach this section and mail with your cheque to:
								</p>
								<p>
									{invoice.trady.trady_company.address}
								</p>
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
