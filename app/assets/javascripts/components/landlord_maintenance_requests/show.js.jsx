const EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');

var LandlordSideBarMobile = React.createClass({
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
				{ !!this.state.showAction && <LandlordActionMobile close={(key) => this.show('action')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
				{ !!this.state.showContact && <LandlordContactMobile close={(key) => this.show('contact')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} current_user={this.props.current_user} maintenance_request={this.props.maintenance_request} /> }
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

var LandlordMaintenanceRequest = React.createClass({
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

	viewItem: function(key, item) {
		switch(key) {
			case 'viewQuote': {
				this.setState({
					quote: item
				});

				this.onModalWith(key);
				break;
			}
			
			default: {
				break;
			}
		}
		
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
			url: '/request_quote',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({notification: {
					title: "Request Another Quote",
					content: "Send email is successfully.",
					bgClass: "bg-success",
				}});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Request Another Quote",
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
				case 'notification':
					return (
						<ModalNotification 
							close={this.isClose} 
							bgClass={this.state.notification.bgClass}
							title={this.state.notification.title} 
							content={this.state.notification.content}
						/>
					);

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

				case 'viewQuote': {
					return (
						<ModalViewQuote 
							close={this.isClose}
							quote={this.state.quote}
							keyLandlord={"landlord"} 
							quotes={this.state.quotes}
							agency={this.props.agency}
							property={this.props.property}
							landlord={this.state.landlord}
							onModalWith={this.onModalWith} 
							current_user={this.props.current_user} 
							updateStatusQuote={this.updateStatusQuote} 
							viewQuote={(quote) => this.viewQuote(quote)} 
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
					
				default:
					return null;
			}
		}
	},

	render: function() {
		return (
			<div className="summary-container-index" id="summary-container-index">
				<div className="main-summary">
					<div className="section">
						<ItemMaintenanceRequest 
							gallery={this.props.gallery} 
							property={this.props.property} 
							maintenance_request={this.state.maintenance_request}
						/>
						{ this.props.quotes.length > 0 ?
								<Quotes 
									keyLandlord="landlord"
									quotes={this.state.quotes} 
									landlord={this.state.landlord} 
									onModalWith={this.onModalWith} 
									current_user={this.props.current_user} 
									updateStatusQuote={this.updateStatusQuote} 
									sendEmailLandlord={this.sendEmailLandlord} 
									viewQuote={(key, item) => this.viewItem(key, item)} 
								/>
								: null
						}
					</div>
					<div className="sidebar">
						<LandlordContact landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} maintenance_request={this.state.maintenance_request} />
						<LandlordAction landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} />
					</div>
				</div>
				<LandlordSideBarMobile onModalWith={(modal) => this.onModalWith(modal)} landlord={this.state.landlord} current_user={this.props.current_user} maintenance_request={this.state.maintenance_request} />
				{ this.renderModal() }
			</div>
		);
	}
});
