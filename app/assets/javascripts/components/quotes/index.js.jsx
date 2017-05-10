var ButtonForwardLandlord = React.createClass({
	sendEmail: function() {
		if(!!this.props.landlord){
			const params = { 
				quote_id: this.props.quote.id,
				maintenance_request_id: this.props.quote.maintenance_request_id,
			};

			this.props.sendEmailLandlord(params);
		}else {
			this.props.onModalWith("addLandlord");
		}
	},

	render: function() {
		return (
			<button 
				type="button" 
				className="btn btn-default"
				onClick={this.sendEmail}
			>
				Forward to LandLord
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
	updateStatus: function() {
		const params = {
			status: "Cancel",
			quote_id: this.props.quote.id,
			maintenance_request_id: this.props.quote.maintenance_request_id,
		};

		this.props.updateStatusQuote(params);
	},

	render: function() {
		return (
			<button 
				type="button"
				className="btn btn-cancel" 
				onClick={this.updateStatus}
			>
				Cancel
			</button>
		);
	}
});

var ButtonView = React.createClass({
	render: function() {
		return (
			<button type="button" className="btn btn-default" onClick={(key, item) => this.props.viewQuote('viewQuote', this.props.quote)}>
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

var ActionQuote = React.createClass({
	render: function(){
		const quote = this.props.quote;
		const self = this.props;
		if(!!self.keyLandlord && self.keyLandlord == "landlord") {
			return (
				<div className="actions-quote">
					{ quote.status == "Active" && <ButtonAccept updateStatusQuote={self.updateStatusQuote} quote={quote} /> }
					{ quote.status == "Active" && <ButtonRequestAnotherQuote sendEmailLandlord={self.sendEmailLandlord} quote={quote} /> }
					{ !self.quotes && <ButtonView viewQuote={(key, item) => self.viewQuote(key, item)} quote={self.quote}/> }
				</div>
			);
		}else {
			return (
				<div className="actions-quote">
					{ quote.status == "Active" && <ButtonForwardLandlord sendEmailLandlord={self.sendEmailLandlord} quote={quote} onModalWith={self.onModalWith} landlord={self.landlord} /> }
					{ quote.status == "Active" && <ButtonAccept updateStatusQuote={self.updateStatusQuote} quote={quote} /> }
					{ quote.status == "Active" && <ButtonDecline updateStatusQuote={self.updateStatusQuote} quote={quote} /> }
					{ (quote.status != "Cancelled" && quote.status != "Active" && quote.status != "Approved") ? <ButtonRestore updateStatusQuote={self.updateStatusQuote} quote={quote} /> : null }
					{ !self.quotes && <ButtonView viewQuote={(key, item) => self.viewQuote(key, item)} quote={self.quote}/> }
					{ quote.status == "Approved" && <ButtonCancle updateStatusQuote={self.updateStatusQuote} quote={quote} />}
				</div>
			);
		}
	}
});

var Quotes = React.createClass({
	render: function() {
		const quotes = this.props.quotes;
		const self = this.props;
		return (
			<div className="quotes">
				<p>
					Quotes ({quotes.length})
				</p>
				<div className="list-quote">
				{
					quotes.map(function(quote, index) {
						return (
							<div className="item-quote row" key={index}>
								<div className="user seven columns">
									<img src="/assets/user1.png" />
									<div className="info">
										<div className="name">
											<span>{quote.trady.name}</span>
											<button className={'button-default ' + quote.status}>
												<span>{quote.status}</span>
											</button>
										</div>
										<p className="description">
											{quote.trady && quote.trady.name} <br />
											{(quote.trady && quote.trady.trady_company) ? quote.trady.trady_company.trading_name : null}
										</p>
									</div>
								</div>
								<div className="actions five columns">
									<p className="price">Amount: {quote.amount}AUD</p>
								</div>
								{ !!self.current_user && <ActionQuote keyLandlord={self.keyLandlord} viewQuote={(key, item) => self.viewQuote(key, item)} quote={quote} updateStatusQuote={self.updateStatusQuote} sendEmailLandlord={self.sendEmailLandlord} landlord={self.landlord} onModalWith={self.onModalWith}/> }
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
		const quote_items = this.props.quote_items;
		let subTotal = 0;
		let gst = 0;
		if(!!quote_items) {
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
						quote_items.map(function(item, key) {
							subTotal+= item.amount;
							gst += !!item.gst_amount ? item.gst_amount : 0;
							return (
								<tr key={key}>
									<td>{item.item_description}</td>
									<td>{item.pricing_type}</td>
									<td>${item.amount}</td>
									<td>{!!item.hours ? item.hours : 'N/A'}</td>
									<td>${item.amount}</td>
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

	render: function() {
		const self = this.props;
		const quote = this.state.quote;
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
							<h4 className="modal-title text-center">Quote</h4>
						</div>
						<div className="slider-quote">
							<div className="modal-body">
								<div className="show-quote" onTouchEnd={(key, index) => this.switchSlider('prev', this.state.index)}>
									<div className="info-quote">
										<div className="info-trady">
											<p>{quote.trady.name}</p>
											<p className="">{!!quote.trady.trady_company && quote.trady.trady_company.address}</p>
											<p className="">{!!quote.trady.trady_company && quote.trady.trady_company.email}</p>
											<p className="">Abn: {!!quote.trady.trady_company && quote.trady.trady_company.abn}</p>
										</div>
										<div className="info-agency">
											<p>{self.agency ? self.agency.company_name: null}</p>
											<p>{self.agency ? self.agency.address : null}</p>
										</div>
									</div>
									<div className="detail-quote">
										<div className="info-maintenance">
											<p>Quote #{quote.id}</p>
											<p>For: {self.property.property_address}</p>
											<p>Created: { moment(quote.created_at).format("DD-MM-YYYY") }</p>
										</div>
										<div className="detail-quote">
											{!!quote.quote_items && <DetailQuote quote_items={quote.quote_items} />}
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
							<div className="modal-footer-quote">
								{ !!self.current_user && <ActionQuote keyLandlord={this.props.keyLandlord} quotes={this.state.quotes} quote={quote} updateStatusQuote={self.updateStatusQuote} sendEmailLandlord={self.sendEmailLandlord} onModalWith={self.onModalWith} landlord={self.landlord} /> }
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
});