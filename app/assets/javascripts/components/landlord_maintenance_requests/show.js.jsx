var LandlordSideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showAction: false,
			showContact: false
		};
	},

	show: function(key) {
		const height = $( window ).height();
		if(key == 'action') {
			this.setState({showAction: true});
			this.setState({showContact: false});
			$('#actions-full').css({'height': 250, 'border-width': 1});
		}else {
			this.setState({showAction: false});
			this.setState({showContact: true});
			$('#contacts-full').css({'height': 250, 'border-width': 1});
		}
	},

	close: function() {
		this.setState({showAction: false});
		this.setState({showContact: false});
		$('#actions-full').css({'height': 0, 'border-width': 0});
		$('#contacts-full').css({'height': 0, 'border-width': 0});
	},

	componentDidMount: function() {
		const self = this;
		$(document).bind("click", function() {
			self.close();
		})
	},

	render: function() {
		return (
			<div>
				<div className="sidebar-mobile">
					<div className="fixed">       
						<button 
							className={"contact button-default " + (!!this.state.showContact && 'active')}
							onClick={(key) => this.show('contact')}
						>
							Contact
						</button>
						<button 
							className={"actions button-default " + (!!this.state.showAction && 'active')}
							onClick={(key) => this.show('action')}
						>
							Actions
						</button>
					</div>
				</div>
				<div className="action-mobile">
					{
						<LandlordActionMobile 
							landlord={this.props.landlord} 
							close={this.close} 
							requestQuote={this.props.requestQuote}
							maintenance_request={this.props.maintenance_request} 
							onModalWith={(modal) => this.props.onModalWith(modal)} 
						/> 
					}
					{
						<LandlordContactMobile 
							landlord={this.props.landlord} 
							close={this.close} 
							current_user={this.props.current_user} 
							onModalWith={(modal) => this.props.onModalWith(modal)} 
							maintenance_request={this.props.maintenance_request} 
						/> 
					}
				</div>
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

	requestQuote: function() {
		const self = this;
		var params = {
			maintenance_request_id: this.props.maintenance_request.id
		};
		$.ajax({
			type: 'POST',
			url: '/request_quote',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					tradies: res,
					notification: {
						title: "Request Quote",
						content: "the request quote has sent successfully",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Request Quote",
					content: "The request quote is error",
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
						{ this.props.quotes.length > 0 &&
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
						}
					</div>
					<div className="sidebar">
						<LandlordContact 
							landlord={this.state.landlord} 
							onModalWith={(modal) => this.onModalWith(modal)} 
							current_user={this.props.current_user} 
							maintenance_request={this.state.maintenance_request} 
						/>
						<LandlordAction 
							landlord={this.state.landlord} 
							requestQuote={this.requestQuote}
							onModalWith={(modal) => this.onModalWith(modal)} 
							maintenance_request={this.state.maintenance_request} 
						/>
					</div>
				</div>
				<LandlordSideBarMobile 
					landlord={this.state.landlord} 
					requestQuote={this.requestQuote} 
					current_user={this.props.current_user} 
					onModalWith={(modal) => this.onModalWith(modal)} 
					maintenance_request={this.state.maintenance_request}
				/>
				{ this.renderModal() }
			</div>
		);
	}
});
