const EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');

var Carousel = React.createClass({
	getInitialState: function() {
		return {
			indexSlider: 0
		};
	},

	switchSlider: function(index) {
		if(index != this.state.indexSlider){
			this.setState({indexSlider: index});
		}
	},

	render: function() {
		var temp = this;
		return (
			<div className="slider-custom">
				<div className="swiper-container swiper-container-horizontal">
					<div className="swiper-wrapper slider">
						<img
							key={this.state.indexSlider} 
							src={this.props.gallery[this.state.indexSlider].url} 
							className="swiper-slide slide-image img-1 active"
						/>
					</div>
				</div>
				<div className="swiper-pagination swiper-pagination-custom swiper-pagination-clickable swiper-pagination-bullets">
				{
					this.props.gallery.map(function(img, index) {
						return (
							<span
								key={index}
								className={'swiper-pagination-bullet ' + ( index === temp.state.indexSlider && 'swiper-pagination-bullet-active')}
								onClick={() => temp.switchSlider(index)}
							></span>
						);
					})
				}
				</div>
			</div>
		);
	}
});

var Post = React.createClass({
	render: function() {
		const maintenance = this.props.maintenance_request;
		return (
			<div className="post">
				<div className="info">
					<div className="info-title">
						<div className="title">
							<span>
								{maintenance.maintenance_heading}
							</span>
							<button className="button-primary" type="">Active</button>
						</div>
						<div className="author">
							<i className="fa fa-map-marker" aria-hidden="true" />
							<span className="address">
								{this.props.property.property_address}.
							</span>
							<a className="time">
								{moment(maintenance.created_at).startOf('day').fromNow()}
							</a>
							<a>|</a>
							<a className="name-author">{maintenance.service_type}</a>
						</div>
					</div>
					<div className="actions">
						<button className="button-primary update-status">
							Update status
						</button>
						<button className="button-primary edit-detail">
							<i className="fa fa-pencil" aria-hidden="true" />
							<span>
								Edit Details
							</span>
						</button>
						<button className="button-primary assign-to">
							<i className="icon-user" aria-hidden="true" />
							<span>
								Assign to
							</span>
							<i className="fa fa-angle-down" aria-hidden="true" />
						</button>
					</div>
				</div>
				<div className="content">
					<Carousel gallery={this.props.gallery} />
					<div className="description">
						<p>{maintenance.maintenance_description}</p>
					</div>
					<div className="date-time">
						<button>
							<span className="vailability">Availability: </span>
							<span className="time">{maintenance.availability}</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
});

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
			<button type="button" className="btn btn-default" onClick={(quote) => this.props.viewQuote(this.props.quote)}>
				View
			</button>
		);
	}
});

var ActionQuote = React.createClass({
	render: function(){
		const quote = this.props.quote;
		const self = this.props;
		return (
			<div className="actions-quote">
				{ quote.status == "Active" && <ButtonForwardLandlord sendEmailLandlord={self.sendEmailLandlord} quote={quote} onModalWith={self.onModalWith} landlord={self.landlord} /> }
				{ quote.status == "Active" && <ButtonAccept updateStatusQuote={self.updateStatusQuote} quote={quote} /> }
				{ quote.status == "Active" && <ButtonDecline updateStatusQuote={self.updateStatusQuote} quote={quote} /> }
				{ (quote.status != "Cancelled" && quote.status != "Active" && quote.status != "Approved") ? <ButtonRestore updateStatusQuote={self.updateStatusQuote} quote={quote} /> : null }
				{ !self.quotes && <ButtonView viewQuote={(quote) => self.viewQuote(quote)} quote={self.quote}/> }
				{ quote.status == "Approved" && <ButtonCancle updateStatusQuote={self.updateStatusQuote} quote={quote} />}
			</div>
		);
	}
});

var Quote = React.createClass({
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
											{quote.trady.company_name}
										</p>
									</div>
								</div>
								<div className="actions five columns">
									<p className="price">Amount: {quote.amount}AUD</p>
								</div>
								{ !!self.current_user && <ActionQuote viewQuote={(item) => self.viewQuote(item)} quote={quote} updateStatusQuote={self.updateStatusQuote} sendEmailLandlord={self.sendEmailLandlord} landlord={self.landlord} onModalWith={self.onModalWith}/> }
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
											<p>{self.agency.company_name}</p>
											<p>{self.agency.address}</p>
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
								{ !!self.current_user && <ActionQuote quotes={this.state.quotes} quote={quote} updateStatusQuote={self.updateStatusQuote} sendEmailLandlord={self.sendEmailLandlord} onModalWith={self.onModalWith} landlord={self.landlord} /> }
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
});

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

var ContentContact = React.createClass({
	render: function() {
		const selt = this;
		const landlord = this.props.landlord;
		if(!!landlord) {
			return (
				<ul>
					<li>
						<a>
							<i className="fa fa-phone" aria-hidden="true" />
							Landlord: {landlord.mobile}
						</a>
					</li>
					<li>
						<a onClick={() => selt.props.onModalWith('sendMessageLandlord')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message LandLord
						</a>
					</li>
					<li>
						<a onClick={() => selt.props.onModalWith('sendMessageTenant')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message Tenants
						</a>
					</li>
				</ul>
			);
		}else {
			return (
				<ul>
					<li>
						<a onClick={() => selt.props.onModalWith('sendMessageTenant')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message Tenants
						</a>
					</li>
				</ul>
			);
		}
	}
});

var Contact = React.createClass({
	getInitialState: function() {
		return {
			show: false
		};
	},

	showContact: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item">
				<div className="header contact">
					<a>Contact:</a>
					<i
						aria-hidden="true" 
						onClick={this.showContact} 
						className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} 
					/>
				</div>
				<div className="content">
					{ this.state.show && <ContentContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
				</div>
			</div>
		);
	}
});

var ContactMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full contact-full">
				<div className="item">
					<div className="header contact">
						<a>Contact:</a>
						<i
							aria-hidden="true" 
							className="fa fa-close" 
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						{ <ContentContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
					</div>
				</div>
			</div>
		);
	}
});

var ContentAction = React.createClass({
	render: function() {
		return (
			<ul>
				<li>
					<a onClick={() => this.props.onModalWith(!!this.props.landlord ? 'confirm' : 'addAskLandlord')}>
						<i className="fa fa-user" />
						Ask Landlord
					</a>
				</li>
				<li className="active">
					<a onClick={() => this.props.onModalWith('requestQuote')}>
						<i className="fa fa-file-text" aria-hidden="true" />
						Request quote
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('sendWorkOrder')}>
						<i className="icon-send" aria-hidden="true" />
						Send work order
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('addLandlord')}>
						<i aria-hidden="true" className="fa fa-user-plus" />
						Add Landlord
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('editLandlord')}>
						<i aria-hidden="true" className="fa fa-pencil" />
						Edit Landlord
					</a>
				</li>
			</ul>
		);
	}
});

var Action = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};  
	},

	showAction: function(e) {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item">
				<div className="header action">
					<a>Actions:</a>
					<i 
						aria-hidden="true" 
						onClick={this.showAction} 
						className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} 
					/>
				</div>
				<div className="content" id="actions-content">
					{ this.state.show && <ContentAction onModalWith={(modal) => this.props.onModalWith(modal)}  landlord={this.props.landlord} /> }
				</div>
			</div>
		);
	}
});

var Activity = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	showActivity: function() {
		this.setState({show: !this.state.show});
	},

	content: function() {
		return (
			<div>
				<ul>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
								Request by 
								<strong>Dereck Carlson</strong>
							</span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
								Request by 
								<strong>Dereck Carlson</strong>
							</span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
								Request by 
								<strong>Dereck Carlson</strong>
							</span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
							Request by <strong>Dereck Carlson</strong></span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
				</ul>
				<button className="view-more button-default">
					View more
				</button>
			</div>
		);
	},

	render: function() {
		return (
			<div className="item">
				<div className="header action">
					<a >Activity log:</a>
					<i className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} aria-hidden="true" onClick={this.showActivity}></i>
				</div>
				<div className="content text-center" id="activity-content">
					{ this.state.show && this.content() }
				</div>
			</div>
		);
	}
});

var ModalConfirm = React.createClass({
	render: function() {
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
							<h4 className="modal-title text-center">Confirm Landlord</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">Is {this.props.landlord.name} the correct landlord for {this.props.property.property_address}</p>
						</div>
						<div className="modal-footer">
							<button 
								type="button" 
								className="btn btn-default success" 
								onClick={() => this.props.onModalWith('editAskLandlord')} 
								data-dismiss="modal"
							>Yes</button>
							<button 
								type="button" 
								className="btn btn-primary cancel" 
								onClick={() => this.props.onModalWith('addAskLandlord')}
							>No</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ModalAddAskLandlord = React.createClass({
	getInitialState: function() {
		return {
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
				}        
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;
		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		} 

		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.addAskLandlord(params);
		}
		return;
	},

	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
							<div className="modal-header">
								<button 
									type="button" 
									className="close"
									aria-label="Close" 
									data-dismiss="modal" 
									onClick={this.props.close}
								>
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title text-center">Forward Maintenance request</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<div>
											<label>Name <strong>*</strong>:</label>
											<input 
												id="name" 
												type="text" 
												name="landlord[name]" 
												placeholder="Enter Name"
												ref={e => this.name = e}
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input className={"u-full-width " + (this.state.errorMobile && "has-error")} id="mobile" ref={e => this.mobile = e} name="landlord[mobile]" type="number" onChange={this.checkValidate} placeholder="Enter Mobile"/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input className={"u-full-width " + (this.state.errorEmail && "has-error")} id="email" ref={e => this.email = e} name="landlord[email]" type="text" onChange={this.checkValidate} placeholder="Enter Email"/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ModalEditAskLandlord = React.createClass({
	getInitialState: function() {
		return {
			isEdit: false,
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	isEdit: function() {
		this.setState({isEdit: !this.state.isEdit});
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
				}        
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}
		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}
		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		}
		
		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					id: this.props.landlord.id,
					maintenance_request_id: this.props.maintenance_request_id,
				}
			}
			this.props.editAskLandlord(params); 
		}

		return
	},

	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form id="editForm" onSubmit={this.submit}>
							<div className="modal-header">
								<button 
									type="button" 
									className="close"
									aria-label="Close" 
									data-dismiss="modal" 
									onClick={this.props.close}
								>
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title text-center">Forward Maintenance request</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<a className="btn-edit" onClick={this.isEdit}>Edit</a>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<label>Name <strong>*</strong>:</label>
											<input 
												type="text" 
												onChange={this.checkValidate} 
												readOnly={!this.state.isEdit} 
												id="name" ref={e => this.name = e} 
												defaultValue={this.props.landlord.name} 
												className={(this.state.errorName && "has-error") + (!this.state.isEdit && " readonly")}
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<label>Mobile <strong>*</strong>:</label>
											<input 
												id="mobile" 
												type="number" 
												ref={e => this.mobile = e} 
												onChange={this.checkValidate} 
												readOnly={!this.state.isEdit} 
												defaultValue={this.props.landlord.mobile} 
												className={(this.state.errorMobile && "has-error") + (!this.state.isEdit && " readonly")}
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<label>Email <strong>*</strong>:</label>
											<input 
												id="email"
												type="text"
												ref={e => this.email = e}
												onChange={this.checkValidate}
												readOnly={!this.state.isEdit}
												defaultValue={this.props.landlord.email} 
												className={(this.state.errorEmail && "has-error") + (!this.state.isEdit && " readonly")}
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ActivityMobile = React.createClass({
	render: function() {
		return (
			<div className="activity-mobile">
				<div className="item">
					<div className="header action">
						<a >Activity log:</a>
						<i className="fa fa-angle-down" aria-hidden="true"></i>
					</div>
					<div className="content text-center">
						<ul>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
						</ul>
						<div className="text-center">
							<button className="view-more button-default">
								View more
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ActionMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full" id="actions-full">
				<div className="item">
					<div className="header action">
						<a>Actions:</a>
						<i 
							aria-hidden="true" 
							className="fa fa-close" 
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						<ContentAction onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} />
					</div>
				</div>
			</div>
		);
	}
});

var SideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showAction: false,
			showContact: false
		};
	},

	show: function(key) {
		if(key == 'action') {
			this.setState({showAction: !this.state.showAction});
		}else {
			this.setState({showContact: !this.state.showContact});
		}
	},

	render: function() {
		return (
			<div>
				<div className="sidebar-mobile">
					<div className="fixed">       
						<button className="contact button-default" onClick={(key) => this.show('contact')}>Contact</button>
						<button className="actions button-default" onClick={(key) => this.show('action')}>Actions</button>
					</div>
				</div>
				{ !!this.state.showAction && <ActionMobile close={(key) => this.show('action')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
				{ !!this.state.showContact && <ContactMobile close={(key) => this.show('contact')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} current_user={this.props.current_user} /> }
			</div>
		);
	}
});

var ModalNotification = React.createClass({
	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className={'modal-header ' + (this.props.bgClass && this.props.bgClass)}>
							<button 
								type="button" 
								className="close"
								aria-label="Close" 
								data-dismiss="modal" 
								onClick={this.props.close}
							>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title text-center">{ this.props.title }</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">{ this.props.content }</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ModalAddLandlord = React.createClass({
	getInitialState: function() {
		return {
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
				}        
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		} 

		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.addLandlord(params);
		}

		return
	},


	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
							<div className="modal-header">
								<button 
									type="button" 
									className="close"
									aria-label="Close" 
									data-dismiss="modal" 
									onClick={this.props.close}
								>
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title text-center">Add Landlord</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<div>
											<label>Name <strong>*</strong>:</label>
											<input 
												id="name" 
												type="text" 
												name="landlord[name]" 
												placeholder="Enter Name"
												ref={e => this.name = e}
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input 
												id="mobile" 
												type="number" 
												name="landlord[mobile]" 
												placeholder="Enter Mobile"
												ref={e => this.mobile = e} 
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorMobile && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input 
												id="email" 
												type="text" 
												name="landlord[email]" 
												placeholder="Enter Email"
												ref={e => this.email = e} 
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorEmail && "has-error")} 
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ModalEditLandlord = React.createClass({
	getInitialState: function() {
		return {
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
				}        
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		} 

		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					id: this.props.landlord.id,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.editLandlord(params);
		}
	},


	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
							<div className="modal-header">
								<button 
									type="button" 
									className="close"
									aria-label="Close" 
									data-dismiss="modal" 
									onClick={this.props.close}
								>
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title text-center">Edit Landlord</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<div>
											<label>Name <strong>*</strong>:</label>
											<input 
												id="name" 
												type="text" 
												name="landlord[name]" 
												placeholder="Enter Name"
												ref={e => this.name = e}
												onChange={this.checkValidate}
												defaultValue={this.props.landlord.name} 
												className={"u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input 
												id="mobile"
												type="number" 
												name="landlord[mobile]" 
												placeholder="Enter Mobile"
												ref={e => this.mobile = e} 
												onChange={this.checkValidate} 
												defaultValue={this.props.landlord.mobile} 
												className={"u-full-width " + (this.state.errorMobile && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input 
												id="email" 
												type="text" 
												name="landlord[email]" 
												placeholder="Enter Email"
												ref={e => this.email = e} 
												onChange={this.checkValidate} 
												defaultValue={this.props.landlord.email} 
												className={"u-full-width " + (this.state.errorEmail && "has-error")} 
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ContentMessage = React.createClass({
	getInitialState: function() {
		var messages = this.props.messages;
		return {
			messages: messages
		};	
	},

	autoScroll: function() {
		$('#message').animate({
  		scrollTop: $('#message').get(0).scrollHeight
  	}, 200);
	},

	componentDidMount: function() {
		this.autoScroll();
	},

	componentDidUpdate: function() {
		this.autoScroll();
	},

	render: function() {
		if(!!this.props.messages) {
			var current_user = this.props.current_user
			return (
				<ul className="message scroll-custom" id="message">
					{
						this.props.messages.map(function(item, key) {
							return (
								<li key={key} className={'item-message ' + (current_user && item.user_id == current_user.id && 'current-message')}>
									<span>
										{item.body}
									</span>
								</li>
							);
						})
					}
				</ul>
			);
		}else {
			return <p className="text-center" id="message">Message is empty!</p>
		}
		
	}
});

var ModalSendMessageLandlord = React.createClass({
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
				conversation_type: 'Landlord',
				maintenance_request_id: this.props.maintenance_request_id,
			},
			authenticity_token: this.props.authToken,
		}

		this.props.sendMessageLandlord(params);
		this.message.value = "";
	},

	render: function() {
		var landlords_conversation = this.props.landlords_conversation
		var current_user = this.props.current_user
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
								<h4 className="modal-title text-center">Message Landlord</h4>
							</div>
							<div className="modal-body">
								{<ContentMessage current_user={current_user} messages={landlords_conversation} />}
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

var ModalSendMessageTenant = React.createClass({
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
			authenticity_token: this.props.authToken,
			message: {
				body: this.message.value,
				conversation_type: 'Tenant',
				maintenance_request_id: this.props.maintenance_request_id,
			},
		}

		this.props.sendMessageTenant(params);
		this.message.value = "";
	},

	render: function() {
		var tenants_conversation = this.props.tenants_conversation
		var current_user = this.props.current_user
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
								<h4 className="modal-title text-center">Message Tenants</h4>
							</div>
							<div className="modal-body">
								{<ContentMessage current_user={current_user} messages={tenants_conversation} />}
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

var ModalRequestModal = React.createClass({
	getInitialState: function() {
		return {
			isAdd: false,
			errorName: false,
			errorEmail: false,
			errorMobile: false,
			errorCompany: false,
			maintenance_request: this.props.maintenance_request,
			trady: {
				name: null,
				email: null,
				mobile: null,
				company_name: null,
			},
		};	
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "company": {
					if(e.target.value == "") {
						this.setState({errorCompany: true});
					}else {
						this.setState({errorCompany: false});
					}
					this.state.trady.company_name = e.target.value;
					this.forceUpdate();
				break;
			}

			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
					this.state.trady.name = e.target.value;
					this.forceUpdate();
				break;
			}

			case "mobile": {
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
				}        
				this.state.trady.mobile = e.target.value;
					this.forceUpdate();
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				this.state.trady.email = e.target.value;
					this.forceUpdate();
				break;
			}
		}
	},

	componentWillMount: function() {
		this.selectTrady(this.state.maintenance_request.trady_id);
	},

	selectTrady: function(id) {
		const self = this.props;
		if(!!id){
			for(var i = 0; i < self.tradies.length; i++) {
				const item = self.tradies[i];
				if(item.id == id) {
					this.setState({
						trady: item,
						isAdd: false,
					});

					return;
				}
			}
		}

		this.setState({
			isAdd: true,
			trady: {
				name: null,
				email: null,
				mobile: null,
				company_name: null,
			}
		});
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.company.value == "") {
			this.setState({errorCompany: true});
			flag = true;
		}

		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		} 

		if(!flag) {
			var params = {
				trady: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					company_name: this.company.value,
					maintenance_request_id: this.props.maintenance_request.id,
					trady_id: !!this.state.trady.id ? this.state.trady.id : "",
					skill_required: this.props.maintenance_request.service_type,
					trady_request: this.props.keyTitle == "request-quote" ? "Quote" : "Work Order",
				},
			};
			this.props.requestQuote(params);
		}

		return
	},

	render: function() {
		const self = this;
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
							<div className="modal-header">
								<button 
									type="button" 
									className="close"
									aria-label="Close" 
									data-dismiss="modal" 
									onClick={this.props.close}
								>
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title text-center">{ this.props.keyTitle == "request-quote" ? "Request Quote" : "Send Work Order" }</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<label className="label-custom">Select Trady:</label>
										<select 
											id="trady" 
											className="form-control"
											ref={e => this.trady_id = e}
											onChange={() => this.selectTrady(this.trady_id.value)} 
										>
											<option value="" selected={!self.props.maintenance_request.trady_id && "selected"}>Select or Add New Tradie</option>
											{
												this.props.tradies.map(function(trady, index) {
													return (
														<option 
															key={index+1} 
															value={trady.id} 
															selected={self.props.maintenance_request.trady_id == trady.id && "selected"}
														>
															{trady.name}
														</option>
													);
												})
											}
										</select>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Company Name<strong>*</strong>:</label>
											<input
												type="text" 
												id="company" 
												ref={e => this.company = e}
												onChange={this.checkValidate} 
												placeholder="Enter Company Name"
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.company_name ? this.state.trady.company_name : ""}
												className={"input-custom u-full-width " + (this.state.errorCompany && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Name <strong>*</strong>:</label>
											<input
												id="name" 
												type="text" 
												ref={e => this.name = e}
												placeholder="Enter Name"
												onChange={this.checkValidate}
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.name ? this.state.trady.name : ""}
												className={"input-custom u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Email <strong>*</strong>:</label>
											<input
												id="email" 
												type="text" 
												placeholder="Enter Email"
												ref={e => this.email = e} 
												onChange={this.checkValidate}
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.email ? this.state.trady.email : ""} 
												className={"input-custom u-full-width " + (this.state.errorEmail && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Mobile <strong>*</strong>:</label>
											<input 
												id="mobile" 
												type="number" 
												placeholder="Enter Mobile"
												ref={e => this.mobile = e} 
												onChange={this.checkValidate}
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.mobile ? this.state.trady.mobile : ""} 
												className={"input-custom u-full-width " + (this.state.errorMobile && "has-error")} 
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var Summary = React.createClass({
	getInitialState: function() {
		return {
			modal: "",
			quote: null,
			isModal: false,
			quotes: this.props.quotes,
			tradies: this.props.tradies,
			landlord: this.props.landlord,
			maintenance_request: this.props.maintenance_request,
			tenants_conversation: this.props.tenants_conversation,
			landlords_conversation: this.props.landlords_conversation,
			notification: {
				title: "",
				content: "",
				bgClass: "",
			},
		};
	},

	isClose: function() {
		this.setState({isModal: false});
		this.setState({modal: ""});
		var body = document.getElementsByTagName('body')[0];
		body.classList.remove("modal-open");
		var div = document.getElementsByClassName('modal-backdrop in')[0];
		div.parentNode.removeChild(div);
	},

	onModalWith: function(modal) {
		this.setState({
			modal: modal,
			isModal: true, 
		});
	},

	viewQuote: function(quote) {
		this.setState({
			quote: quote
		});

		this.onModalWith('viewQuote');
	},

	addAskLandlord: function(params){
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/create-and-notify-landlord',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						title: "Forward Maintenance request",
						content: "Your Landlord has been created successfully!",
						bgClass: "bg-success",
					}
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Forward Maintenance request",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});  
	},

	editAskLandlord: function(params) {
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/update-and-notify-landlord',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						title: "Forward Maintenance request",
						content: "Your Landlord has been updated successfully!",
						bgClass: "bg-success",
					},
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Forward Maintenance request",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		}); 
	},

	addLandlord: function(params) {
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/landlords',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						title: "Add Lanlord",
						content: "Your Landlord has been added successfully!",
						bgClass: "bg-success",
					},
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Add Lanlord",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	editLandlord: function(params) {
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/update-landlord',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						title: "Edit Lanlord",
						content: "Your Landlord has been updated successfully!",
						bgClass: "bg-success",
					},
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Edit Lanlord",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendMessageLandlord: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				const landlords_conversation = !!self.state.landlords_conversation ? self.state.landlords_conversation : [];
				landlords_conversation.push(res);

				self.setState({
					landlords_conversation: landlords_conversation,
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Landlord",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendMessageTenant: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				const tenants_conversation = !!self.state.tenants_conversation ? self.state.tenants_conversation : [];
				tenants_conversation.push(res);
				self.setState({
					tenants_conversation: tenants_conversation
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Tenants",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	updateStatusQuote: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/quote_status',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					quotes: res
				});
			},
			error: function(err) {
				
			}
		});
	},

	sendEmailLandlord: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/forward_quote',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({notification: {
					title: "Forward Landlord",
					content: "The email about quote information was sent for Landlord.",
					bgClass: "bg-success",
				}});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Forward Landlord",
					content: "Send emaid is error!",
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	requestQuote: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/tradies',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				if(params.trady.trady_request == "Work Order") {
					self.state.maintenance_request.trady_id = !!params.trady.trady_id ? params.trady.trady_id : res[res.length-1].id;
					self.forceUpdate();
				} 
				self.setState({
					tradies: res,
					notification: {
						title: params.trady.trady_request == "Quote" ? "Request Quote" : "Send Work Order",
						content: params.trady.trady_request == "Quote" ? "the request quote has sent successfully" : "the work order has sent successfully",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: params.trady.trady_request == "Quote" ? "Request Quote" : "Send Work Order",
					content: params.trady.trady_request == "Quote" ? "The request quote is error" : "The work order is error" ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},
	
	renderModal: function() {
		if(this.state.isModal) {
			var body = document.getElementsByTagName('body')[0];
			body.className += " modal-open";
			var div = document.getElementsByClassName('modal-backdrop in');

			if(div.length === 0) {
				div = document.createElement('div')
				div.className  = "modal-backdrop in";
				body.appendChild(div);
			}

			switch(this.state.modal) {
				case 'confirm':
					return (
						<ModalConfirm 
							close={this.isClose} 
							landlord={this.state.landlord}
							property={this.props.property}
							onModalWith={(modal) => this.onModalWith(modal)}
						/>
					);

				case 'addAskLandlord':
					return (
						<ModalAddAskLandlord
							close={this.isClose}
							addAskLandlord={this.addAskLandlord}
							authToken={this.props.authenticity_token}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);

				case 'editAskLandlord': 
					return (
						<ModalEditAskLandlord
							close={this.isClose}
							landlord={this.state.landlord}
							editAskLandlord={this.editAskLandlord}
							authToken={this.props.authenticity_token}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);

				case 'notification':
					return (
						<ModalNotification 
							close={this.isClose} 
							bgClass={this.state.notification.bgClass}
							title={this.state.notification.title} 
							content={this.state.notification.content}
						/>
					);

				case 'addLandlord':
					return (
						<ModalAddLandlord 
							close={this.isClose}
							addLandlord={this.addLandlord}
							authToken={this.props.authenticity_token}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);

				case 'editLandlord':{
					if(!!this.state.landlord) {
						return (
							<ModalEditLandlord 
								close={this.isClose}
								landlord={this.state.landlord}
								editLandlord={this.editLandlord}
								authToken={this.props.authenticity_token}
								maintenance_request_id={this.state.maintenance_request.id}
							/>
						);
					}else {
						this.setState({notification: {
							title: "Edit Lanlord",
							content: "Landlord is empty!",
							bgClass: "bg-error",
						}});
						return (
							<ModalNotification 
								close={this.isClose} 
								title={this.state.notification.title} 
								content={this.state.notification.content}
							/>
						);
					}
				}

				case 'sendMessageLandlord': {
					return (
						<ModalSendMessageLandlord 
							close={this.isClose} 
							current_user={this.props.current_user} 
							authToken={this.props.authenticity_token}
							sendMessageLandlord={this.sendMessageLandlord}
							landlords_conversation={this.state.landlords_conversation} 
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);
				}

				case 'sendMessageTenant': {
					return (
						<ModalSendMessageTenant 
							close={this.isClose} 
							current_user={this.props.current_user} 
							authToken={this.props.authenticity_token}
							sendMessageTenant={this.sendMessageTenant}
							tenants_conversation={this.state.tenants_conversation}
							maintenance_request_id={this.state.maintenance_request.id} 
						/>
					);
				}

				case 'viewQuote': {
					return (
						<ModalViewQuote 
							close={this.isClose}
							quote={this.state.quote} 
							quotes={this.state.quotes}
							agency={this.props.agency}
							property={this.props.property}
							landlord={this.state.landlord}
							onModalWith={this.onModalWith} 
							viewQuote={(quote) => this.viewQuote(quote)} 
							updateStatusQuote={this.updateStatusQuote} 
							sendEmailLandlord={this.sendEmailLandlord} current_user={this.props.current_user} 
						/>
					);
				}

				case 'requestQuote': {
					return (
						<ModalRequestModal
							close={this.isClose} 
							keyTitle="request-quote"
							tradies={this.state.tradies}
							requestQuote={this.requestQuote}
							maintenance_request={this.state.maintenance_request}
						/>
					);
				}

				case 'sendWorkOrder': {
					return (
						<ModalRequestModal
							close={this.isClose} 
							keyTitle="sen-work-order"
							tradies={this.state.tradies}
							requestQuote={this.requestQuote}
							maintenance_request={this.state.maintenance_request}
						/>
					);
				}
					
				default:
					return null;
			}
		}
	},

	summary(e) {
		return ( 
			<div className="summary-container-index" id="summary-container-index">
				<div className="main-summary">
					<div className="section">
						<Post 
							gallery={this.props.gallery} 
							property={this.props.property} 
							maintenance_request={this.state.maintenance_request}
						/>
						{this.props.quotes.length > 0 && <Quote viewQuote={(quote) => this.viewQuote(quote)} onModalWith={this.onModalWith} quotes={this.state.quotes} updateStatusQuote={this.updateStatusQuote} sendEmailLandlord={this.sendEmailLandlord} current_user={this.props.current_user} landlord={this.state.landlord} />}
						{this.props.invoices.length > 0 && <Invoice invoices={this.props.invoices} />}
					</div>
					<div className="sidebar">
						<Contact landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} />
						<Action landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} />
						<Activity />
					</div>
					<ActivityMobile />
				</div>
				<SideBarMobile onModalWith={(modal) => this.onModalWith(modal)} landlord={this.state.landlord} current_user={this.props.current_user} />
				{ this.renderModal() }
			</div>
		);
	},

	render: function() {
		return (
			<div>
				{ this.summary() }
			</div>
		);
	}
});
