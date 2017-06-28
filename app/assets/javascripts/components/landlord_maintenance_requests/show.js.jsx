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
		if($('#actions-full').length > 0) {
			this.setState({showAction: false});
			$('#actions-full').css({'height': 0, 'border-width': 0});
		}
		if($('#contacts-full').length > 0) {
			this.setState({showContact: false});
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
					<LandlordActionMobile 
						landlord={this.props.landlord} 
						close={this.close} 
						requestQuote={this.props.requestQuote}
						maintenance_request={this.props.maintenance_request} 
						onModalWith={(modal) => this.props.onModalWith(modal)} 
					/> 
					<LandlordContactMobile
						agent={this.props.agent}
						landlord={this.props.landlord} 
						close={this.close} 
						current_user={this.props.current_user} 
						onModalWith={(modal) => this.props.onModalWith(modal)} 
						maintenance_request={this.props.maintenance_request} 
					/> 
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
			isDecline: false,
			appointment: null,
			appointmentUpdate: null,
			quotes: this.props.quotes,
			tradies: this.props.tradies,
			landlord: this.props.landlord,
			appointments: this.props.appointments,
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

			case 'createAppointment': {
				this.onModalWith(key);
				break;
			}

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

	addAppointment: function(params) {
		const self = this;
		const {tenants, current_role, landlord, authenticity_token, tenant} = this.props;
		const maintenance_request_id = this.state.maintenance_request.id;
		const {appointments, isDecline, appointmentUpdate} = this.state;

		var fd = new FormData();
		fd.append('appointment[status]', 'Active');
		fd.append('appointment[date]', params.date);
		fd.append('appointment[time]', params.time);
		fd.append('appointment[appointment_type]', params.appointment_type);
		fd.append('appointment[maintenance_request_id]', maintenance_request_id);
		fd.append('appointment[tenant_id]', tenant ? tenant.id : '');
		fd.append('appointment[landlord_id]', landlord ? landlord.id : '');
		fd.append('appointment[current_user_role]', current_role ? current_role.role : '');
		fd.append('appointment[comments_attributes][0][body]', params.body);
		fd.append('appointment[comments_attributes][0][tenant_id]', tenant ? tenant.id : '');
		fd.append('appointment[comments_attributes][0][landlord_id]', landlord ? landlord.id : '');

		$.ajax({
			type: 'POST',
			url: '/landlord_appointments',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: fd,
			success: function(res){
				if(!!isDecline) {
					self.declineAppointment(appointmentUpdate);
				}
				appointments.unshift(res.appointment_and_comments);
				self.setState({
					appointments: appointments
				});

				self.setState({notification: {
					bgClass: "bg-success",
					title: "Create Appoinment",
					content: "Create Appointment was successfully",
				}});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Create Appoinment",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
		
	},

	updateAppointment: function(appointment) {
		const {appointments} = this.state;
		let data = appointments.map((item, key) => {
			item.status = item.id == appointment.id ? appointment.status : item.status;
			return item;
		});
		this.setState({
			appointments: data
		});
	},

	acceptAppointment: function(appointment) {
		const self = this;
		const {authenticity_token, current_role, landlord} = this.props;
		var params = {
			appointment_id: appointment.id,
			current_user_role: current_role ? current_role.role : '',
			maintenance_request_id: this.state.maintenance_request.id,
		};
		$.ajax({
			type: 'POST',
			url: '/accept_landlord_appointment',
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
		this.onModalWith('createAppointment');
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
			url: '/decline_landlord_appointment',
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
				self.updateAppointment(res.appointment);
				self.setState({
					isDecline: false
				});
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
							title="Message Agent"
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

				case 'viewAppointment': {
					return (
						<ModalAppointment
							close={this.isClose}
							appointment={this.state.appointment}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							current_role={this.props.signed_in_landlord.user.current_role}
							declineAppointment={(value) => this.declineAppointment(value)}
						/>
					);
				}

				case 'createAppointment': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							title="Create Appoinment"
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
		const {appointments} = this.state;
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
							agent={this.props.agent}
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
						<AppointmentRequest 
							title="Landlord Appointments"
							appointments={appointments}
							current_role={this.props.signed_in_landlord.user.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.decline(value)}
						/>
					</div>
					<AppointmentRequestMobile 
						appointments={appointments}
						title="Landlord Appointments"
						current_role={this.props.signed_in_landlord.user.current_role}
						viewItem={(key, item) => this.viewItem(key, item)}
						acceptAppointment={(value) => this.acceptAppointment(value)}
						declineAppointment={(value) => this.decline(value)}
					/>
				</div>
				<LandlordSideBarMobile
					agent={this.props.agent}
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
