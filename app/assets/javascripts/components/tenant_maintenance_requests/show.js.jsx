var TenantSideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showContact: false
		};
	},

	show: function(key) {
		this.setState({showContact: !this.state.showContact});
	},

	render: function() {
		return (
			<div>
				<div className="sidebar-mobile tenant-content">
					<div className="fixed">       
						<button className="contact button-default" onClick={this.show}>Contact</button>
					</div>
				</div>
				{ !!this.state.showContact && <TenantContactMobile close={this.show} onModalWith={(modal) => this.props.onModalWith(modal)} /> }
			</div>
		);
	}
});

var TenantMaintenanceRequest = React.createClass({
	getInitialState: function() {
		return {
			modal: "",
			isModal: false,
			landlord: this.props.landlord,
			maintenance_request: this.props.maintenance_request,
			tenants_conversation: this.props.tenants_conversation,
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

	sendAgentMessage: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				const tenants_conversation = !!self.state.tenants_conversation ? self.state.tenants_conversation : [];
				tenants_conversation.push(res);

				self.setState({
					tenants_conversation: tenants_conversation,
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
				case 'sendAgentMessage': {
					return (
						<ModalSendMessageTenant 
							close={this.isClose}
							current_user = {this.props.current_user}
							sendMessageTenant = {this.sendAgentMessage}
							tenants_conversation = {this.state.tenants_conversation}  
							maintenance_request_id={this.state.maintenance_request.id}
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
					</div>
					<div className="sidebar">
						<TenantContact onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} />
					</div>
				</div>
				<TenantSideBarMobile onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} />
				{ this.renderModal() }
			</div>
		);
	}
});
