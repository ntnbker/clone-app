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
			isDecline: false,
			appointment: null,
			appointmentUpdate: null,
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

			case 'createAppointment':
			case 'createAppointmentForQuote':
			case 'createLandlordAppointment': {
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

	addAppointment: function(params) {
		const self = this;
		const {tenant, current_role, signed_in_trady, landlord, authenticity_token} = this.props;
		const maintenance_request_id = this.state.maintenance_request.id;
		const {appointments, quote_appointments, landlord_appointments, appointmentUpdate, isDecline} = this.state;

		var fd = new FormData();
		fd.append('appointment[status]', 'Active');
		fd.append('appointment[date]', params.date);
		fd.append('appointment[time]', params.time);
		fd.append('appointment[appointment_type]', params.appointment_type);
		fd.append('appointment[maintenance_request_id]', maintenance_request_id);
		fd.append('appointment[tenant_id]', tenant ? tenant.id : '');
		fd.append('appointment[current_user_role]', current_role ? current_role.role : '');
		fd.append('appointment[comments_attributes][0][body]', params.body);
		fd.append('appointment[comments_attributes][0][tenant_id]', tenant > 0 ? tenant.id : '');

		if(params.appointment_type == "Landlord Appointment") {
			fd.append('appointment[landlord_id]', appointmentUpdate ? appointmentUpdate.landlord_id : '');
			fd.append('appointment[comments_attributes][0][landlord_id]', appointmentUpdate ? appointmentUpdate.landlord_id : '');
		}else {
			fd.append('appointment[trady_id]', appointmentUpdate ? appointmentUpdate.trady_id : '');
			fd.append('appointment[comments_attributes][0][trady_id]', appointmentUpdate ? appointmentUpdate.trady_id : '');
		}

		$.ajax({
			type: 'POST',
			url: params.appointment_type == "Landlord Appointment" ? '/landlord_appointments' : '/appointments',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: fd,
			success: function(res){
				let title = '';
				let	content = '';
				if(!!isDecline) {
					self.declineAppointment(appointmentUpdate);
				}
				switch(params.appointment_type) {
					case 'Work Order Appointment':
						title = "Create Appoinment";
						content = "Create Appointment was successfully";
						appointments.push(res.appointment_and_comments);
						self.setState({
							appointments: appointments
						});
						break;

					case 'Quote Appointment':
						title = "Create Appoinment For Quote";
						content = "Create Appointment For Quote was successfully";
						quote_appointments.push(res.appointment_and_comments);
						self.setState({
							quote_appointments: quote_appointments
						});
						break;

					case 'Landlord Appointment':
						title = "Create Landlord Appoinment";
						content = "Create Landlord Appointment was successfully";
						landlord_appointments.push(res.appointment_and_comments);
						self.setState({
							landlord_appointments: landlord_appointments
						});
						break;

					default:
						break;	
				}

				self.setState({notification: {
					title: title,
					content: content,
					bgClass: "bg-success",
				}});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Error",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
		
	},

	updateAppointment: function(appointment) {
		const {appointments, quote_appointments, landlord_appointments} = this.state;
		let data = []
		switch(appointment.appointment_type) {
			case 'Work Order Appointment':
				data = appointments.map((item, key) => {
					item.status = item.id == appointment.id ? appointment.status : item.status;
					return item;
				});
				this.setState({
					appointments: data
				});
				break;

			case 'Quote Appointment': 
				data = quote_appointments.map((item, key) => {
					item.status = item.id == appointment.id ? appointment.status : item.status;
					return item;
				});
				this.setState({
					quote_appointments: data
				});
				break;

			case 'Landlord Appointment': 
				data = landlord_appointments.map((item, key) => {
					item.status = item.id == appointment.id ? appointment.status : item.status;
					return item;
				});
				this.setState({
					landlord_appointments: data
				});
				break;

			default: 
				break;
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
			url: appointment.appointment_type == 'Landlord Appointment' ? '/accept_landlord_appointment' : '/accept_appointment',
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

	decline: function(appointment) {
		let key = '';
		switch(appointment.appointment_type) {
			case 'Work Order Appointment':
				key = 'createAppointment';
				break;

			case 'Quote Appointment':
				key = 'createAppointmentForQuote';
				break;

			case 'Landlord Appointment': 
				key = 'createLandlordAppointment'
				break;

			default:
				break;
		}
		this.onModalWith(key);
		this.setState({
			isDecline: true,
			appointmentUpdate: appointment,
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
			url: appointment.appointment_type == 'Landlord Appointment' ? '/decline_landlord_appointment' : '/decline_appointment',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: params,
			success: function(res){
				self.updateAppointment(res.appointment);
				self.setState({
					isDecline: false
				});
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

				case 'createAppointment': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							title="Create Appointment"
							type="Work Order Appointment"
							addAppointment={(params) => this.addAppointment(params)}
						/>
					);
				}

				case 'createAppointmentForQuote': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							title="Create Appointment For Quote"
							type="Quote Appointment"
							addAppointment={(params) => this.addAppointment(params)}
						/>
					);
				}

				case 'createLandlordAppointment': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							title="Create Landlord Appointment"
							type="Landlord Appointment"
							addAppointment={(params) => this.addAppointment(params)}
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
						<TenantContact 
							current_user={this.props.current_user} 
							onModalWith={(modal) => this.onModalWith(modal)} 
						/>
						<AppointmentRequest 
							appointments={appointments}
							title="Work Order Appointments"
							current_role={this.props.tenant.user.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.decline(value)}
						/>
						<AppointmentRequest 
							title="Appointments For Quotes"
							appointments={quote_appointments}
							current_role={this.props.tenant.user.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.decline(value)}
						/>
						<AppointmentRequest 
							title="Landlord Appointments"
							appointments={landlord_appointments}
							current_role={this.props.tenant.user.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.decline(value)}
						/>
					</div>
					<AppointmentRequestMobile 
						appointments={appointments}
						title="Work Order Appointments"
						current_role={this.props.tenant.user.current_role}
						viewItem={(key, item) => this.viewItem(key, item)}
						acceptAppointment={(value) => this.acceptAppointment(value)}
						declineAppointment={(value) => this.decline(value)}
					/>
					<AppointmentRequestMobile 
						title="Appointments For Quotes"
						appointments={quote_appointments}
						current_role={this.props.tenant.user.current_role}
						viewItem={(key, item) => this.viewItem(key, item)}
						acceptAppointment={(value) => this.acceptAppointment(value)}
						declineAppointment={(value) => this.decline(value)}
					/>
					<AppointmentRequestMobile 
						title="Landlord Appointments"
						appointments={landlord_appointments}
						current_role={this.props.tenant.user.current_role}
						viewItem={(key, item) => this.viewItem(key, item)}
						acceptAppointment={(value) => this.acceptAppointment(value)}
						declineAppointment={(value) => this.decline(value)}
					/>
				</div>
				<TenantSideBarMobile onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} />
				{ this.renderModal() }
			</div>
		);
	}
});
