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
		const {quotes, tradies, landlord, appointments, maintenance_request, tenants_conversation, landlords_conversation} = this.props;
		const comments = [];
		appointments.map((appointment, key) => {
			if(appointment.comments.length > 0) {
				comments.unshift(appointment.comments[0]);
			}
		});
		return {
			modal: "",
			quote: null,
			isModal: false,
			quotes: quotes,
			isCancel: false,
			isDecline: false,
			tradies: tradies,
			appointment: null,
			landlord: landlord,
			comments: comments,
			appointmentUpdate: null,
			appointments: appointments,
			maintenance_request: maintenance_request,
			tenants_conversation: tenants_conversation,
			landlords_conversation: landlords_conversation,
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
		params.message.role = this.props.current_role.role;
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
		params.message.role = current_role.role;
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
		const {appointments, isDecline, appointmentUpdate, comments, isCancel} = this.state;

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
				if(!!isCancel) {
					self.cancelAppointment(appointmentUpdate);
				}
				appointments.unshift(res.appointment_and_comments);
				comments.push(res.appointment_and_comments.comments[0]);
				self.setState({
					comments: comments,
					appointments: appointments,
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
		this.onModalWith('confirmDeclineAppointment');
		this.setState({
			isDecline: true,
			appointmentUpdate: appointment,
		});
	},

	declineAppointment: function(appointment) {
		const self = this;
		const {authenticity_token, current_role} = this.props;
		const params = {
			appointment_id: appointment.id,
			maintenance_request_id: this.state.maintenance_request.id,
			current_user_role: current_role ? current_role.role : '',
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

	cancel: function(appointment) {
		this.onModalWith('confirmCancelAppointment');
		this.setState({
			isCancel: true,
			appointmentUpdate: appointment,
		});
	},

	cancelAppointment: function(appointment) {
		const self = this;
		const {authenticity_token, current_role} = this.props;
		var params = {
			appointment_id: appointment.id,
			current_user_role: current_role ? current_role.role : '',
		};
		$.ajax({
			type: 'POST',
			url: '/cancel_landlord_appointment',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: params,
			success: function(res){
				self.updateAppointment(res.appointment);
				self.setState({
					isCancel: false
				});
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Cancel Appoinment",
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
							comments={this.state.comments}
							appointment={this.state.appointment}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							current_role={this.props.signed_in_landlord.user.current_role}
							declineAppointment={(value) => this.decline(value)}
						/>
					);
				}

				case 'confirmCancelAppointment': {
					return (
						<ModalConfirmAppointment
							close={this.isClose}
							title="Cancel Appointment"
							btnContent="Create and Cancel"
							openModal={() => this.onModalWith('createAppointment')}
							content="Are you sure you want to cancel appointment. To cancel the appointment you must submit a new appointment time."
						/>
					);
				}

				case 'confirmDeclineAppointment': {
					return (
						<ModalConfirmAppointment
							close={this.isClose}
							title="Decline Appointment"
							btnContent="Create and Decline"
							openModal={() => this.onModalWith('createAppointment')}
							content="Are you sure you want to declie appointment. To decline the appointment you must submit a new appointment time."
						/>
					);
				}

				case 'createAppointment': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							title="Create Appoinment"
							type="Landlord Appointment"
							comments={this.state.comments}
							addAppointment={(params) => this.addAppointment(params)}
						/>
					);
				}
					
				default:
					return null;
			}
		}
	},

	autoScroll: function(key) {
		var offset = $('#' + key).offset();
		$('body').animate({
			scrollTop: offset.top
		}, 500);
		
	},

	componentDidMount: function() {
		const href = window.location.href;
		const self = this;
		window.onload = function () {
			if(href.indexOf('email_quote_id') >= 0) {
				self.autoScroll('quotes');
			}else if(href.indexOf('send_maintenance_request_invoice') >= 0) {
				self.autoScroll('invoices');
			}else if(href.indexOf('open_message') >= 0) {
				self.onModalWith('sendMessageLandlord');
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
						{
							appointments.length > 0 &&
								<AppointmentRequest 
									title="Landlord Appointments"
									appointments={appointments}
									cancelAppointment={(value) => this.cancel(value)}
									viewItem={(key, item) => this.viewItem(key, item)}
									declineAppointment={(value) => this.decline(value)}
									acceptAppointment={(value) => this.acceptAppointment(value)}
									current_role={this.props.signed_in_landlord.user.current_role}
								/>
						}
						<ActivityMobile logs={this.props.logs} />
					</div>
					{
						appointments.length > 0 &&
							<AppointmentRequestMobile 
								appointments={appointments}
								title="Landlord Appointments"
								cancelAppointment={(value) => this.cancel(value)}
								viewItem={(key, item) => this.viewItem(key, item)}
								declineAppointment={(value) => this.decline(value)}
								acceptAppointment={(value) => this.acceptAppointment(value)}
								current_role={this.props.signed_in_landlord.user.current_role}
							/>
					}
					<ActivityMobile logs={this.props.logs} />
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
