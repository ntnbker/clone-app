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
			$('#actions-full').css({'height': 270, 'border-width': 1});
		}else {
			this.setState({showAction: false});
			this.setState({showContact: true});
			$('#contacts-full').css({'height': 270, 'border-width': 1});
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
		$(document).click(function() {
			self.close();
		})
	},

	render: function() {
		return (
			<div className="dontprint">
				<div className="sidebar-mobile">
					<div className="fixed">
						<button
							data-intro="Select 'Contact' to call or message." data-position="top"
							className={"contact button-default " + (!!this.state.showContact && 'active')}
							onClick={(key) => this.show('contact')}
						>
							CONTACT MENU
						</button>
						<button
							data-intro="Select 'Action' to action the maintenance request." data-position="top"
							className={"actions button-default " + (!!this.state.showAction && 'active')}
							onClick={(key) => this.show('action')}
						>
							ACTIONS MENU
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
		const {
			tradies, landlord, appointments, maintenance_request, tenants_conversation, landlords_conversation, quote_requests
		} = this.props;
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
			isCancel: false,
			isDecline: false,
			tradies: tradies,
			appointment: null,
			landlord: landlord,
			comments: comments,
			appointmentUpdate: null,
			appointments: appointments,
			quote_requests: quote_requests,
			maintenance_request: maintenance_request,
			tenants_conversation: tenants_conversation,
			landlords_conversation: landlords_conversation,
			instruction: this.props.instruction ? this.props.instruction : {},
			notification: {
				title: "",
				content: "",
				bgClass: "",
			},
		};
	},

	isClose: function() {
		if(this.state.isModal == true) {
			this.setState({
				modal: "",
				isModal: false
			});
		}
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

			case 'defere':
			case 'approveJob':
			case 'createAppointment': {
				this.onModalWith(key);
				break;
			}

			case 'viewPhoto': {
				this.setState({
					quote_images: item,
				});

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

	sendMessageLandlord: function(params, callback) {
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
				if (res.errors) {
					return callback(res.errors)
				}
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
			url: '/picks_quote',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					quote_requests: res
				});
			},
			error: function(err) {

			}
		});
	},

	sendEmailLandlord: function(params) {
		const self = this;
		const {current_role} = this.props;
		params.role = current_role.role;
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
					content: "You have successfully sent an email to the agent requesting another quote for the maintenance request. Thank you for your time.",
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
						title: "Quote Request Sent",
						content: "You have succesfully requested a quote. An email has been sent to the agent. Thank you for your time and input.",
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

	addAppointment: function(params, callback) {
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
				if (res.errors) {
					return callback(res.errors);
				}
				let title = '';
				let content = '';

				if(!!isDecline) {
					title = notifyAppointment.decline.title;
					content = notifyAppointment.decline.content;
					self.declineAppointment(appointmentUpdate);
				}else if(!!isCancel) {
					title = notifyAppointment.cancel.title;
					content = notifyAppointment.cancel.content;
					self.cancelAppointment(appointmentUpdate);
				}else {
					title = notifyAppointment.normal.title;
					content = notifyAppointment.normal.content;
				}
				appointments.unshift(res.appointment_and_comments);
				comments.push(res.appointment_and_comments.comments[0]);
				self.setState({
					comments: comments,
					appointments: appointments,
				});

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

	approveJob: function(params, callback) {
		const self = this;
		const { authenticity_token, maintenance_request } = this.props;

		params.maintenance_request_id = maintenance_request.id;

		$.ajax({
			type: 'POST',
			url: '/pre_approved',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: params,
			success: function(res){
				if (res.errors) {
					return callback(res.errors);
				}
				maintenance_request.preapproved_note = res.preapproved_note;

				self.setState({
					maintenance_request,
					notification: {
						bgClass: "bg-success",
						title: "Approve Jobs",
						content: 'Approved',
					}
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Approve Jobs",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
	},

	confirmDefere: function() {
		const self = this;
		var params = {
			maintenance_request_id: this.props.maintenance_request.id
		};
		$.ajax({
			type: 'POST',
			url: '/defer_maintenance',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					notification: {
						title: "Defer",
						content: "You have now deferred the maintenance for your property. An email has been sent to the agent to let them know. Thank you for your time.",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Defer",
					content: "An error has occured with deferring the maintenance_request. Please try again or let an agent know.",
					bgClass: "bg-error",
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

	chooseQuoteRequest: function(quote_request) {
		this.setState({ quote_request });
	},

	createAppointmentFixMyself(callback) {
		const {maintenance_request, authenticity_token} = this.props;
		const self = this;

		$.ajax({
			type: 'POST',
			url: '/landlord_repair',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: {
				maintenance_request_id: maintenance_request.id
			},
			success: function(res){
				if (res.errors) {
					self.setState({notification: {
						bgClass: "bg-error",
						title: "Create Appointment",
						content: res.errors,
					}});
				}
				else {
					self.setState({
						maintenance_request,
						notification: {
							bgClass: "bg-success",
							title: "Create Appointment",
							content: res.message,
						}
					});
				}

				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Create Appointment",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		})
	},

	markIssueResolved(callback) {
		const {maintenance_request, authenticity_token} = this.props;
		const self = this;

		$.ajax({
			type: 'POST',
			url: '/landlord_resolved_issue',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: {
				maintenance_request_id: maintenance_request.id
			},
			success: function(res){
				if (res.errors) {
					self.setState({notification: {
						bgClass: "bg-error",
						title: "Mark As Issue Resolved",
						content: res.errors,
					}});
				}
				else {
					self.setState({
						maintenance_request,
						notification: {
							bgClass: "bg-success",
							title: "Mark As Issue Resolved",
							content: res.message,
						}
					});
				}

				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Mark As Issue Resolved",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		})
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
							keyLandlord="landlord"
							quotes={this.state.quote_requests}
							agency={this.props.agency}
							property={this.props.property}
							landlord={this.state.landlord}
							onModalWith={this.onModalWith}
							current_user={this.props.current_user}
							updateStatusQuote={this.updateStatusQuote}
							sendEmailLandlord={this.sendEmailLandlord}
							viewQuote={this.viewItem}
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
							content={["Are you sure you want to cancel the appointment. To cancel the appointment you ", <strong className="text-capitalize">must</strong>, " submit a new appointment time."]}
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
							content={["Are you sure you want to decline the appointment. To decline the appointment you ", <strong className="text-capitalize">must</strong> ," submit a new appointment time."]}
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
							addAppointment={this.addAppointment}
						/>
					);
				}

				case 'createAppointmentFixMyself': {
					return (
						<ModalConfirmAnyThing
							close={this.isClose}
							title="Create Appoinment"
							content="Are you sure you want to fix it yourself?"
							confirm={this.createAppointmentFixMyself}
						/>
					);
				}

				case 'viewModalInstruction':
					return (
						<ModalInstruction
							authenticity_token={this.props.authenticity_token}
							updateInsruction={this.updateInsruction}
						/>
					);

				case 'viewPhoto':
					return (
						<ModalViewPhoto
							title="Quote Photo"
							keyLandlord="landlord"
							close={this.isClose}
							quote={this.state.quote_request}
							quotes={this.state.quote_requests}
							agency={this.props.agency}
							property={this.props.property}
							landlord={this.state.landlord}
							onModalWith={this.onModalWith}
							gallery={this.state.quote_images}
							updateStatusQuote={this.updateStatusQuote}
							viewQuote={this.viewItem}
							sendEmailLandlord={this.sendEmailLandlord}
							current_user={this.props.current_user}
						/>
					)

				case 'approveJob':
					return (
						<ModalApproveJob
							content="Pre-Approved Amount"
							close={this.isClose}
							confirmText="Send"
							approveJob={this.approveJob}
							maintenance_request={this.state.maintenance_request}
						/>
					)

				case 'defere':
					return (
						<ModalConfirmDefere
							title="Defere"
							content="Are you sure you want to defer the maintenance on your property?"
							close={this.isClose}
							confirm={this.confirmDefere}
						/>
					);

				case 'markIssueResolved': {
					return (
						<ModalConfirmAnyThing
							close={this.isClose}
							title="Mark As Issue Resolved"
							content="Are you sure you want to mark this maintenance request issue as resolved?"
							confirm={this.markIssueResolved}
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

	openAppointment: function(appointment_id) {
		let appointment = '';
		const {appointments} = this.state;
		appointments.map((item, key) => {
			if(item.id == appointment_id) {
				appointment = item;
				return;
			}
		});

		if(appointment) {
			this.viewItem('viewAppointment', appointment);
		}
	},

	componentDidMount: function() {
		const self = this;
		const {instruction} = this.state;
		const body = $('body');
		if(!instruction.read_instruction) {
			body.chardinJs('start');
			this.onModalWith('viewModalInstruction');
			$(document).click(function(e) {
				var showInstruction = $('.show-instruction');
				if(showInstruction.length > 0) {
					if(e.target.className != 'show-instruction') {
						body.chardinJs('stop');
						self.isClose();
						self.viewModalMessage();
					}
				}
			});
		}else {
			this.viewModalMessage();
		}
	},

	viewModalMessage: function() {
		const href = window.location.href;
		const self = this;

		const json = self.getUrlVars(href);
		if(href.indexOf('email_quote_id') >= 0) {
			self.autoScroll('quotes');
		}else if(href.indexOf('send_maintenance_request_invoice') >= 0) {
			self.autoScroll('invoices');
		}else if(href.indexOf('open_message') >= 0) {
			self.onModalWith('sendMessageLandlord');
		}else if(href.indexOf('appointment_id') >= 0) {
			self.openAppointment(json.appointment_id);
		}
	},

	updateInsruction: function(data) {
		this.setState({
			instruction: data
		});
		this.isClose();
		$('body').chardinJs('stop');
		this.viewModalMessage();
	},

	getUrlVars: function(url) {
		var hash;
		var json = {};
		var hashes = url.slice(url.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			json[hash[0]] = hash[1];
		}
		return json;
	},

	render: function() {
		const {appointments, quote_requests} = this.state;

		const hasApproved = quote_requests.some(quote_request => quote_request.quotes.some(quote => quote.status === 'Approved'));

		return (
			<div className="summary-container-index" id="summary-container-index">
				<div className="main-summary dontprint">
					<div className="section">
						<ItemMaintenanceRequest
							gallery={this.props.gallery}
							property={this.props.property}
							maintenance_request={this.state.maintenance_request}
							strike_approval={hasApproved}
						/>
						{
							quote_requests && quote_requests.length > 0
							? <QuoteRequests
									keyLandlord="landlord"
									quote_requests={quote_requests}
									onModalWith={this.onModalWith}
									landlord={this.state.landlord}
									current_user={this.props.current_user}
									updateStatusQuote={this.updateStatusQuote}
									sendEmailLandlord={this.sendEmailLandlord}
									uploadImage={this.uploadImage}
									chooseQuoteRequest={this.chooseQuoteRequest}
									viewQuote={this.viewItem}
								/>
							: ''
						}
						{ false && (quote_requests && quote_requests.length > 0) &&
								<Quotes
									keyLandlord="landlord"
									quotes={this.state.quote_requests}
									landlord={this.state.landlord}
									onModalWith={this.onModalWith}
									current_user={this.props.current_user}
									updateStatusQuote={this.updateStatusQuote}
									sendEmailLandlord={this.sendEmailLandlord}
									viewQuote={this.viewItem}
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
							(appointments && appointments.length > 0) &&
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
						(appointments && appointments.length > 0) &&
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
