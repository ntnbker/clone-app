var TenantSideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showContact: false
		};
	},

	show: function() {
		this.setState({showContact: true});
		if($('#contacts-full').length > 0) {
			$('#contacts-full').css({'height': 150, 'border-width': 1});
		}
	},

	close: function() {
		this.setState({showContact: false});
		if($('#contacts-full').length > 0) {
			$('#contacts-full').css({'height': 0, 'border-width': 0});
		}
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
							onClick={this.show}
						>
							Contact
						</button>
					</div>
				</div>
				<div className="action-mobile">
					{ 
						<TenantContactMobile 
							close={this.close} 
							onModalWith={(modal) => this.props.onModalWith(modal)} 
						/> 
					}
				</div>
			</div>
		);
	}
});

var TenantMaintenanceRequest = React.createClass({
	getInitialState: function() {
		return {
			modal: "",
			isModal: false,
			appointment: null,
			landlord: this.props.landlord,
			appointments: this.props.appointments,
			quote_appointments: this.props.quote_appointments,
			maintenance_request: this.props.maintenance_request,
			tenants_conversation: this.props.tenants_conversation,
			landlord_appointments: this.props.landlord_appointments,
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
			case 'viewAppointment': {
				this.setState({
					appointment: item
				});

				this.onModalWith(key);
				break;
			}

			default: {
				break;
			}
		}
		
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

	updateAppointment: function(appointment) {
		const {appointments, quote_appointments} = this.state;
		if(appointment.appointment_type == "Work Order Appointment") {
			let data = appointments.map((item, key) => {
				item.status = item.id == appointment.id ? appointment.status : item.status;
				return item;
			});
			this.setState({
				appointments: data
			});
		}else if(appointment.appointment_type == "Quote Appointment"){
			let data = quote_appointments.map((item, key) => {
				item.status = item.id == appointment.id ? appointment.status : item.status;
				return item;
			});
			this.setState({
				quote_appointments: data
			});
		}
	},

	acceptAppointment: function(appointment) {
		const self = this;
		const {authenticity_token, tenant} = this.props;
		var params = {
			appointment_id: appointment.id,
			current_user_role: tenant.user.current_role ? tenant.user.current_role : '',
			maintenance_request_id: this.state.maintenance_request.id,
		};
		$.ajax({
			type: 'POST',
			url: '/accept_appointment',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: params,
			success: function(res){
				self.updateAppointment(res.appointment);
				self.setState({notification: {
					bgClass: "bg-success",
					title: "Accept Appoinment",
					content: res.note,
				}});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Accept Appoinment",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
	},

	declineAppointment: function(appointment) {
		const self = this;
		const {authenticity_token} = this.props;
		const params = {
			appointment_id: appointment.id,
			maintenance_request_id: this.state.maintenance_request.id,
		};
		$.ajax({
			type: 'POST',
			url: '/decline_appointment',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: params,
			success: function(res){
				self.updateAppointment(res.appointment);
				self.setState({notification: {
					bgClass: "bg-success",
					title: "Decline Appoinment",
					content: res.note,
				}});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Decline Appoinment",
					content: err.responseText,
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
				case 'notification': {
					return (
						<ModalNotification 
							close={this.isClose} 
							bgClass={this.state.notification.bgClass}
							title={this.state.notification.title} 
							content={this.state.notification.content}
						/>
					);
				}

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

				case 'viewAppointment': {
					return (
						<ModalAppointment
							close={this.isClose}
							appointment={this.state.appointment}
							current_role={this.props.tenant.user.current_role}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.declineAppointment(value)}
						/>
					);
				}
					
				default:
					return null;
			}
		}
	},

	render: function() {
		const {appointments, quote_appointments, landlord_appointments} = this.state;
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
						<AppointmentRequest 
							appointments={appointments}
							title="Work Order Appointments"
							current_role={this.props.tenant.user.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.declineAppointment(value)}
						/>
						<AppointmentRequest 
							title="Appointments For Quotes"
							appointments={quote_appointments}
							current_role={this.props.tenant.user.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.declineAppointment(value)}
						/>
						<AppointmentRequest 
							title="Landlord Appointments"
							appointments={landlord_appointments}
							current_role={this.props.tenant.user.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.declineAppointment(value)}
						/>
					</div>
					<AppointmentRequestMobile 
						appointments={appointments}
						title="Work Order Appointments"
						current_role={this.props.tenant.user.current_role}
						viewItem={(key, item) => this.viewItem(key, item)}
						acceptAppointment={(value) => this.acceptAppointment(value)}
						declineAppointment={(value) => this.declineAppointment(value)}
					/>
					<AppointmentRequestMobile 
						title="Appointments For Quotes"
						appointments={quote_appointments}
						current_role={this.props.tenant.user.current_role}
						viewItem={(key, item) => this.viewItem(key, item)}
						acceptAppointment={(value) => this.acceptAppointment(value)}
						declineAppointment={(value) => this.declineAppointment(value)}
					/>
					<AppointmentRequestMobile 
						title="Landlord Appointments"
						appointments={landlord_appointments}
						current_role={this.props.tenant.user.current_role}
						viewItem={(key, item) => this.viewItem(key, item)}
						acceptAppointment={(value) => this.acceptAppointment(value)}
						declineAppointment={(value) => this.declineAppointment(value)}
					/>
				</div>
				<TenantSideBarMobile onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} />
				{ this.renderModal() }
			</div>
		);
	}
});
