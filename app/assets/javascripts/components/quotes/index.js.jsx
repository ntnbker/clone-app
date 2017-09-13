var ButtonForwardLandlord = React.createClass({
	getInitialState: function() {
		return {
			isSend: this.props.quote.forwarded_to_landlord
		};
	},

	sendEmail: function() {
		if(!!this.props.landlord){
			const params = {
				quote_id: this.props.quote.id,
				maintenance_request_id: this.props.quote.maintenance_request_id,
			};

			this.props.sendEmailLandlord(params, this.props.quote);
			this.setState({
				isSend: true
			});
		}else {
			this.props.onModalWith("addLandlordSendEmail");
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			isSend: nextProps.quote.forwarded_to_landlord
		});
	},

	render: function() {
		const style = {
			opacity: this.state.isSend ? 0.5 : 1
		};
		return (
			<button
				type="button"
				style={style}
				onClick={!this.state.isSend && this.sendEmail}
				className="btn btn-default"
			>
				{!!this.state.isSend ? 'Send to Landlord' : 'Forward to LandLord'}
			</button>
		);
	}
});

var ButtonAccept = React.createClass({
	updateStatus: function() {
		const params = {
			status: "Approved",
			quote_id: this.props.quote.id,
			maintenance_request_id: this.props.quote.maintenance_request_id,
		};

		this.props.updateStatusQuote(params);
	},

	render: function() {
		return (
			<button
			type="button"
			className="btn btn-accept"
			onClick={this.updateStatus}
			>
				Accept
			</button>
		);
	}
});

var ButtonDecline = React.createClass({
	updateStatus: function() {
		const params = {
			status: "Declined",
			quote_id: this.props.quote.id,
			maintenance_request_id: this.props.quote.maintenance_request_id,
		};

		this.props.updateStatusQuote(params);
	},

	render: function() {
		return (
			<button
			type="button"
			className="btn btn-decline"
			onClick={this.updateStatus}
			>
				Decline
			</button>
		);
	}
});

var ButtonRestore = React.createClass({
	updateStatus: function() {
		const params = {
			status: "Restore",
			quote_id: this.props.quote.id,
			maintenance_request_id: this.props.quote.maintenance_request_id,
		};
		this.props.updateStatusQuote(params);
	},

	render: function() {
		return (
			<button type="button" className="btn btn-default" onClick={this.updateStatus}>
				Restore
			</button>
		);
	}
});

var ButtonCancle = React.createClass({
	render: function() {
		return (
			<button
				type="button"
				className="btn btn-cancel"
				onClick={(key, item) => this.props.viewQuote('viewConfirmQuote', this.props.quote)}
			>
				Cancel
			</button>
		);
	}
});

var ButtonView = React.createClass({
	render: function() {
		return (
			<button
				type="button"
				className="btn btn-default"
				onClick={(key, item) => this.props.viewQuote('viewQuote', this.props.quote)}
			>
				View
			</button>
		);
	}
});

var ButtonRequestAnotherQuote = React.createClass({
	sendEmail: function() {
			const params = {
				maintenance_request_id: this.props.quote.maintenance_request_id,
			};

			this.props.sendEmailLandlord(params);
	},

	render: function() {
		return (
			<button type="button" className="btn btn-default" onClick={this.sendEmail}>
				Request Another Quote
			</button>
		);
	}
});

var ButtonQuoteMessage = React.createClass({
	render: function() {
		return (
			<button type="button" className="btn btn-message" onClick={(key, item) => this.props.viewQuoteMessage('viewQuoteMessage', this.props.quote)}>
				Message
			</button>
		);
	}
});

var ButtonPrint = React.createClass({
	render: function() {
		return (
			<button className="btn btn-default btn-print" onClick={this.props.printQuote}>
				Print
			</button>
		);
	}
});

var ActionQuote = React.createClass({
	getInitialState() {
		return {
			quote: this.props.quote
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			quote: nextProps.quote
		});
	},
	render: function(){
		const {quote} = this.state;
		const self = this.props;
		if(!!self.keyLandlord && self.keyLandlord == "landlord") {
			return (
				<div className="actions-quote">
					{ quote.status == "Active" &&
							<ButtonAccept
								quote={quote}
								updateStatusQuote={self.updateStatusQuote}
							/>
					}
					{ quote.status == "Active" &&
							<ButtonDecline
								quote={quote}
								updateStatusQuote={self.updateStatusQuote}
							/>
					}
					{ quote.status == "Active" &&
							<ButtonRequestAnotherQuote
								quote={quote}
								sendEmailLandlord={self.sendEmailLandlord}
							/>
					}
					{ !self.quotes &&
							<ButtonView
								quote={self.quote}
								viewQuote={(key, item) => self.viewQuote(key, item)}
							/>
					}
					{
						!!this.props.isModal &&
							<ButtonPrint
								printQuote={this.props.printQuote}
							/>
					}
				</div>
			);
		}else if(self.keyLandlord == "trady") {
			return (
				<div className="actions-quote">
					{ (!!self.current_user_show_quote_message && quote.status != "Declined") &&
							<ButtonQuoteMessage
								quote={quote}
								viewQuoteMessage={(key, item) => self.viewQuote(key, item)}
							/>
					}
					{ !self.quotes &&
							<ButtonView
								viewQuote={(key, item) => self.viewQuote(key, item)}
								quote={self.quote}
							/>
					}
					{
						!!this.props.isModal &&
							<ButtonPrint
								printQuote={this.props.printQuote}
							/>
					}
				</div>
			);
		}else {
			return (
				<div className="actions-quote">
					{ (!!self.current_user_show_quote_message && quote.status != "Declined") &&
							<ButtonQuoteMessage
								quote={quote}
								viewQuoteMessage={(key, item) => self.viewQuote(key, item)}
							/>
					}
					{ quote.status == "Active" &&
							<ButtonForwardLandlord
								quote={quote}
								landlord={self.landlord}
								onModalWith={self.onModalWith}
								sendEmailLandlord={self.sendEmailLandlord}
							/>
					}
					{ quote.status == "Active" &&
							<ButtonAccept
								quote={quote}
								updateStatusQuote={self.updateStatusQuote}
							/>
					}
					{ quote.status == "Active" &&
							<ButtonDecline
								quote={quote}
								updateStatusQuote={self.updateStatusQuote}
							/>
					}
					{ (quote.status != "Cancelled" && quote.status != "Active" && quote.status != "Approved") &&
							<ButtonRestore
								quote={quote}
								updateStatusQuote={self.updateStatusQuote}
							/>
					}
					{ !self.quotes &&
							<ButtonView
								quote={self.quote}
								viewQuote={(key, item) => self.viewQuote(key, item)}
							/>
					}
					{
						!!this.props.isModal &&
							<ButtonPrint
								printQuote={this.props.printQuote}
							/>
					}
				</div>
			);
		}
	}
});

var Quotes = React.createClass({
	getInitialState: function() {
		return {
			quotes: this.props.quotes
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			quotes: nextProps.quotes
		});
	},

	render: function() {
		const {quotes} = this.state;
		const self = this.props;

		return (
			<div className="quotes m-t-lg" id="quotes">
				<p>
					Quotes ({quotes.length})
				</p>
				<div className="list-quote">
				{
					quotes.map(function(quote, index) {
						const status = quote.status;
						const showStatus = ['Approved', 'Declined'].indexOf(status) !== -1;

						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<span className="icon-user">
										<i className="fa fa-user" />
									</span>
									<div className="info">
										<div className="name">
											<span>{quote.trady.name}</span>
											{showStatus && <button className={'button-default ' + status}><span>{status}</span></button>}
										</div>
										<p className="description">
											{quote.trady && quote.trady.name} <br />
											{(quote.trady && quote.trady.trady_company) && quote.trady.trady_company.trading_name}
										</p>
									</div>
								</div>
								{ !!self.current_user &&
										<ActionQuote
											quote={quote}
											key={quote.id}
											landlord={self.landlord}
											keyLandlord={self.keyLandlord}
											onModalWith={self.onModalWith}
											updateStatusQuote={self.updateStatusQuote}
											sendEmailLandlord={self.sendEmailLandlord}
											viewQuote={(key, item) => self.viewQuote(key, item)}
											current_user_show_quote_message={self.current_user_show_quote_message}
										/>
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

var QuotesInInvoice = React.createClass({
	getInitialState() {
		return {
			convert: {}
		};
	},

	setConvert(id) {
		this.setState((pre) => ({ convert: { ...pre.convert, [id]: true }}));
	},

	removeConvert(id) {
		this.setState((pre) => ({ convert: { ...pre.convert, [id]: false }}));
	},

	render: function() {
		const { convert = {} } = this.state;
		const { quotes, trady } = this.props;
		const self = this;

		return (
			<div className="quotes m-t-lg m-b-lg" id="quotes">
				<p>
					Quotes ({quotes.length})
				</p>
				<div className="list-quote">
				{
					quotes.map(function(quote, index) {
						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<span className="icon-user">
										<i className="fa fa-user" />
									</span>
									<div className="info">
										<div className="name">
											<span>{quote.trady.name}</span>
											<button className={'button-default ' + quote.status}>
												<span>{quote.status}</span>
											</button>
										</div>
										<p className="description">
											{quote.trady && quote.trady.name} <br />
											{(quote.trady && quote.trady.trady_company) && quote.trady.trady_company.trading_name}
										</p>
									</div>
								</div>
								<div className="actions five columns">
									<p className="price">Amount: {quote.amount}AUD</p>
								</div>
								<div className="actions-quote">
									<button
										type="button"
										className="btn btn-decline"
										disabled={!!convert[quote.id]}
										onClick={() => {
											self.setConvert(quote.id);
											self.props.onConvertToInvoice(quote);
										}}
									>
										Convert Into Invoice
									</button>
									<ButtonView
										quote={quote}
										viewQuote={(key, item) => self.viewQuote(key, item)}
									/>
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

var DetailQuote = React.createClass({
	render: function() {
		const {quote} = this.props;
		let subTotal = 0;
		let gst = 0;
		if(!!quote) {
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
						<th className="text-right">
							Rate
						</th>
						<th className="text-right">
							Amount
						</th>
					</tr>
					</thead>
					<tbody>
					{
						quote.quote_items.map(function(item, key) {
							if(item.pricing_type == "Fixed Cost") {
								subTotal += item.amount;
							}else {
								subTotal += (item.amount*item.hours);
							}
							return (
								<tr key={key}>
									<td>{item.item_description}</td>
									<td>{item.pricing_type}</td>
									<td className="text-right">{ item.pricing_type == "Hourly" && "$" + item.amount.toFixed(2) }</td>
									<td className="text-right">{ item.pricing_type == "Fixed Cost" && "$" + item.amount.toFixed(2) }</td>
								</tr>
							);
						})
					}
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

var ModalViewQuote = React.createClass({
	getInitialState: function() {
		var quote = this.props.quote;
		var quotes = this.props.quotes;

		return {
			index: null,
			quote: quote,
			quotes: quotes,
		};
	},

	switchSlider: function(key, index) {
		let position = 0;
		let quote = "";
		if(key == "prev") {
			position = index - 1 < 0 ? this.state.quotes.length - 1 : index-1;
		}else {
			position = index + 1 > this.state.quotes.length - 1 ? 0 : index+1;
		}

		quote = this.state.quotes[position];
		this.setState({
			index: position,
			quote: quote
		});
	},

	componentWillMount: function() {
		this.filterQuote(this.state.quotes);
	},

	componentWillReceiveProps: function(nextProps) {
		this.filterQuote(nextProps.quotes);
		this.setState({
			quotes: nextProps.quotes
		});
	},

	filterQuote: function(quotes) {
		for(var i = 0; i < quotes.length; i++) {
			var item = quotes[i];
			if(item.id == this.state.quote.id) {
				this.setState({
					index: i+1,
					quote: item
				});
				break;
			}
		}
	},

	printQuote: function() {
		var contents = $('#print-quote').html();
		var style = ".info-quote {display: flex; flex-direction: row; justify-content: space-between;}" +
								".info-trady {flex: 1; margin-bottom: 15px; overflow: hidden;}" +
								".info-trady p {margin-bottom: 0px;}" +
								".info-agency {flex: 1;}" +
								".slider-quote { border-top: 1px solid #e5e5e5 !important;}" +
								".info-agency p {text-align: right; overflow: hidden; margin-bottom: 0px;}" +
								".detail-quote .info-maintenance {margin-top: 10px;}" +
								".detail-quote .info-maintenance p {text-align: center; margin-bottom: 0;}" +
								".detail-quote {margin-top: 15px;}" +
								".detail-quote .table {width: 100%;}" +
								".detail-quote .table tr th {color: #b3b3b3 !important; padding-left: 0; font-size: 13px; text-transform: uppercase;}" +
								".detail-quote .table tr td {padding-left: 0; padding: 10px 3px; border-bottom: 1px solid #E1E1E1 !important;}" +
								"#print-quote { color: #404040;}" +
								".modal-dialog { width: 700px !important;}" +
								".modal-header {background-color: #fff !important; border-bottom: 1px solid #e5e5e5 !important; display: flex;}" +
								".modal-header .logo img { width: 80px;}" +
								".modal-header .info-trady {margin-left: 15px;}" +
								".modal-header .info-trady p {margin-bottom: 0px;font-size: 12px;}" +
								".modal-header .info-trady p span:last-child {padding-left: 5px;}" +
								".modal-header .close {border: 1px solid #ccc !important;border-radius: 50% !important;position: absolute; top: 5px;right: 5px;}" +
								".modal-header .close span {color: #ccc !important;}" +
								".info-quote { font-size: 13px; clear: both; overflow: hidde}" +
								".info-quote .bill-to { font-size: 16px;}" +
								".info-quote .info-agency p { text-align: left !important;}" +
								".info-quote .info-agency p span:first-child { width: 120px; display: inline-block; text-align: right;}" +
								".footer { font-size: 12px; border-top: 1px solid #ccc; padding-top: 15px; width: 100%; display: inline-block;}" +
								".footer i { font-size: 36px;}" +
								".footer p { margin-bottom: 5px;}" +
								".footer .bank { margin-left: 5%; width: 45%; float: left;}" +
								".footer .bank span:first-child { width: 110px; display: inline-block;}" +
								".footer .contact { margin-left: 5%; width: 45%; float: left;}" +
								".border-none { border: none !important;}" +
								".color-grey { color: #b3b3b3 !important;}" +
								".font-bold { font-weight: bold !important;}" +
								".m-t-md { margin-top: 10px;}" +
								".p-t-n { padding-top: 0 !important;}" +
								".p-b-n { padding-bottom: 0 !important;}" +
								".print {display: none;}" +
								".close {display: none;}" +
								"@media print {"+
									".detail-quote .table {width: 100%;}" +
									".detail-quote .table tr th {color: #b3b3b3 !important; padding-left: 0; font-size: 13px; text-transform: uppercase;}" +
									".detail-quote .table tr td {padding-left: 0; padding: 10px 3px; border-bottom: 1px solid #E1E1E1 !important;}" +
								"}";

		var frame = $('#printframe')[0].contentWindow.document.open("text/html", "replace");
		var htmlContent = "<html>" +
											"<head>" +
											"<title> Quote </title>" +
											'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />' +
											'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />' +
											'<style type="text/css">' +
											style +
											"</style>";
		frame.open();
		frame.write(htmlContent);
		frame.write("</head><body>");
		frame.write(contents);
		frame.write("</body></html>");
		frame.close();

		// print just the modal div
		setTimeout(function() {
			$('#printframe')[0].contentWindow.print();
			$('#printframe')[0].contentWindow.close();
			$('.button-slider').toggle('show');
		}, 1000);
	},

	render: function() {
		const self = this.props;
		const quote = this.state.quote;
		const {property} = this.props;
		let total = 0;

		return (
			<div className="modal-custom modal-quote fade">
				<div className="modal-dialog">
					<div className="modal-content quote-height" id="print-quote">
						<div className="modal-header">
							<div className="logo">
								<img src="/assets/logo.png" />
							</div>
							<div className="info-trady">
								<p>
									<span>
										{quote.trady.company_name}
									</span>
								</p>
								<p>
									<span>
										{quote.trady.trady_company.abn}
									</span>
								</p>
								<p>
									<span>
										{quote.trady.trady_company.address}
									</span>
								</p>
								<p>
									<span>
										{quote.trady.trady_company.mobile_number}
									</span>
								</p>
								<p>
									<span>
										{quote.trady.trady_company.email}
									</span>
								</p>
							</div>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
								onClick={this.props.close}
							>
								<span className="close" aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="slider-quote">
							<div className="modal-body">
								<div className="show-quote" >
									<div className="info-quote">
										<div className="info-trady">
											<div>
												<p className="color-grey bill-to">Bill To</p>
												<p>{self.landlord && self.landlord.name}</p>
												<p>{self.agency && 'C/-' + self.agency.company_name}</p>
												<p>{self.agency && self.agency.address}</p>
											</div>
										</div>
										<div className="info-agency">
											<p>
												<span className="font-bold">Quote Reference: </span>
												<span> {quote.trady_quote_reference != "" ? quote.trady_quote_reference : property.property_address}</span>
											</p>
											<p>
												<span className="font-bold">Quote Date: </span>
												<span> { moment(quote.created_at).format("LL") }</span>
											</p>
										</div>
									</div>
									<div className="detail-quote">
										{!!quote.quote_items && <DetailQuote quote={quote} />}
									</div>
								</div>
							</div>
							<div className="modal-footer-quote print">
								{ !!self.current_user &&
									<ActionQuote
										quote={quote}
										isModal="true"
										className="print"
										landlord={self.landlord}
										quotes={this.state.quotes}
										printQuote={this.printQuote}
										onModalWith={self.onModalWith}
										keyLandlord={this.props.keyLandlord}
										updateStatusQuote={self.updateStatusQuote}
										sendEmailLandlord={self.sendEmailLandlord}
									/>
								}
							</div>
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

var ModalViewQuoteMessage = React.createClass({
	getInitialState: function() {
		return {
			errorMessage: false
		};
	},

	onSubmit: function(e) {
		e.preventDefault();

		if(!this.message.value) {
			this.setState({errorMessage: true});
			return
		}

		const params = {
			message: {
				body: this.message.value,
				conversation_type: 'Quote',
				quote_id: this.props.quote.id,
			}
		}

		this.props.sendMessageQuote(params);
		this.message.value = "";
	},

	render: function() {
		const current_user = this.props.current_user;
		var quote = this.props.quote;
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<form role="form">
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
								<h4 className="modal-title text-center">Message Quote</h4>
							</div>
							<div className="modal-body">
								{<ContentMessage current_user={current_user} messages={quote.conversation && quote.conversation.messages ? quote.conversation.messages : null} />}
							</div>
							<div className="modal-footer">
								<div>
									<textarea
										placeholder="Message"
										readOnly={!current_user}
										ref={(rel) => this.message = rel}
										className={'textarea-message ' + (!current_user && 'readonly ') + (!!this.state.errorMessage && 'has-error')}
									/>
								</div>
								<button
									type="submit"
									onClick={this.onSubmit}
									disabled={!current_user}
									className="btn btn-default success"
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});

var ModalConfirmQuote = React.createClass({
	updateStatus: function() {
		const {quote} = this.props;
		const params = {
			status: "Cancel",
			quote_id: quote.id,
			maintenance_request_id: quote.maintenance_request_id,
		};

		this.props.updateStatusQuote(params);
	},

	render: function() {
		const {title, content} = this.props;
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
							<h4 className="modal-title text-center">{title}</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">{content}</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-default success"
								onClick={this.updateStatus}
								data-dismiss="modal"
							>Yes</button>
							<button
								type="button"
								className="btn btn-primary cancel"
								onClick={this.props.close}
							>No</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});