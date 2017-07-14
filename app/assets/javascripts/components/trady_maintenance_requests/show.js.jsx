var TradySideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showAction: false,
			showContact: false
		};
	},

	show: function(key) {
		if(key == 'action') {
			this.setState({showAction: true});
			this.setState({showContact: false});
			if($('#actions-full').length > 0) {
				$('#actions-full').css({'height': 350, 'border-width': 1});
			}
		}else {
			this.setState({showAction: false});
			this.setState({showContact: true});
			if($('#contacts-full').length > 0) {
				$('#contacts-full').css({'height': this.props.tenants.length * 50 + 200, 'border-width': 1});
			}
		}
	},

	close: function() {
		if(!!this.state.showAction) {
			this.setState({showAction: false});
		}
		if(!!this.state.showContact) {
			this.setState({showContact: false});
		}
		if($('#actions-full').length > 0) {
			$('#actions-full').css({'height': 0, 'border-width': 0});
		}
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
						<TradyActionMobile
							close={this.close} 
							trady={this.props.trady}
							landlord={this.props.landlord} 
							invoices={this.props.invoices}
							assigned_trady={this.props.assigned_trady} 
							signed_in_trady={this.props.signed_in_trady} 
							invoice_pdf_files={this.props.invoice_pdf_files}
							maintenance_request={this.props.maintenance_request}
							onModalWith={(modal) => this.props.onModalWith(modal)} 
						/> 
					}
					{ 
						<TradyContactMobile 
							close={this.close} 
							agent={this.props.agent}
							tenants={this.props.tenants}
							landlord={this.props.landlord} 
							current_user={this.props.current_user}
							assigned_trady={this.props.assigned_trady}
							maintenance_request={this.props.maintenance_request} 
							onModalWith={(modal) => this.props.onModalWith(modal)} 
						/> 
					}
				</div>
			</div>
		);
	}
});

var ModalConfirmAddInvoice = React.createClass({
	jobCompleted: function() {
		const {maintenance_request} = this.props;
		const maintenance_trady_id = maintenance_request.trady_id;

		let params = {
			maintenance_request_id: maintenance_request.id
		};

		this.props.jobCompleted(params);
		window.location = window.location.origin + "/invoice_options?maintenance_request_id=" + maintenance_request.id + "&trady_id=" + maintenance_trady_id + "&quote_id=";
	},

	createInvoice: function() {
		const {maintenance_request} = this.props;
		const maintenance_trady_id = maintenance_request.trady_id;
		this.props.close();
		window.location = window.location.origin + "/invoice_options?maintenance_request_id=" + maintenance_request.id + "&trady_id=" + maintenance_trady_id + "&quote_id=";
	},

	render: function() {
		const maintenance_request = this.props.maintenance_request;
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
							<h4 className="modal-title text-center">Job Complete</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">
								Has the job Been completed for "{maintenance_request.maintenance_heading}"
							</p>
						</div>
						<div className="modal-footer">
							<button 
								data-dismiss="modal"
							 	onClick={this.jobCompleted}
								className="btn btn-default success" 
							>Yes</button>
							<button 
								type="button" 
								onClick={this.createInvoice}
								className="btn btn-primary cancel" 
							>No</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ModalMarkJobAsCompleted = React.createClass({
	jobCompleted: function() {
		let params = {
			maintenance_request_id: this.props.maintenance_request.id
		};

		this.props.jobCompleted(params);
	},

	createInvoice: function() {
		const maintenance_request = this.props.maintenance_request;
		const trady_id = !!this.props.signed_in_trady ? this.props.signed_in_trady.id : "";
		const maintenance_trady_id = maintenance_request.trady_id;
		this.props.close();
		window.location = window.location.origin + "/invoice_options?maintenance_request_id=" + maintenance_request.id + "&trady_id=" + trady_id + "&quote_id=";
	},

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
							<h4 className="modal-title text-center">Mark Job As Complete</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">
								There are no invoices for this maintenance request would you like to create an invoice and mark job as completed ?
							</p>
						</div>
						<div className="modal-footer">
							<button 
								data-dismiss="modal"
							 	onClick={this.createInvoice}
								className="btn btn-default success" 
							>Yes</button>
							<button 
								type="button" 
								onClick={this.createInvoice}
								className="btn btn-primary cancel" 
							>No</button>
						</div>
					</div>
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

var TradyMaintenanceRequest = React.createClass({
	getInitialState: function() {
		const {quotes, tradies, landlord, invoices, appointments, invoice_pdf_files, quote_appointments, maintenance_request, tenants_conversation, landlords_conversation, trady_agent_conversation} = this.props;
		const comments = [],
					quoteComments = [];
		appointments.map((appointment, key) => {
			if(appointment.comments.length > 0) {
				comments.unshift(appointment.comments[0]);
			}
		});
		quote_appointments.map((appointment, key) => {
			if(appointment.comments.length > 0) {
				quoteComments.unshift(appointment.comments[0]);
			}
		});
		return {
			modal: "",
			quote: null,
			invoice: null,
			isModal: false,
			quotes: quotes,
			isCancel: false,
			tradies: tradies,
			isDecline: false,
			appointment: null,
			comments: comments,
			landlord: landlord,
			invoices: invoices,
			invoice_pdf_file: null,
			appointmentUpdate: null,
			appointments: appointments,
			quoteComments: quoteComments,
			invoice_pdf_files: invoice_pdf_files,
			quote_appointments: quote_appointments,
			maintenance_request: maintenance_request,
			tenants_conversation: tenants_conversation,
			landlords_conversation: landlords_conversation,
			trady_agent_conversation: trady_agent_conversation,
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
		}else {
			let data = quote_appointments.map((item, key) => {
				item.status = item.id == appointment.id ? appointment.status : item.status;
				return item;
			});
			this.setState({
				quote_appointments: data
			});
		}
	},

	sendMessageQuote: function(params) {
		const self = this;
		params.message.role = this.props.current_role.role;
		$.ajax({
			type: 'POST',
			url: '/quote_messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				let quote = self.state.quote
				quote.conversation = quote.conversation ? quote.conversation : {};
				const messages = !!quote.conversation && quote.conversation.messages ? quote.conversation.messages : [];
				messages.push(res);
				quote.conversation.messages = messages;
				self.setState({
					quote: quote
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Trady",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	jobCompleted: function(params){
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/job_completed',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({notification: {
					bgClass: "bg-success",
					title: "Job Completed",
					content: "Job Complete was successfully!",
				}});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Job Completed",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
	},

	addAppointment: function(params) {
		const self = this;
		const {tenants, current_role, signed_in_trady, landlord, authenticity_token} = this.props;
		const maintenance_request_id = this.state.maintenance_request.id;
		const {appointments, quote_appointments, isDecline, appointmentUpdate, comments, quoteComments, isCancel} = this.state;

		var fd = new FormData();
		fd.append('appointment[status]', 'Active');
		fd.append('appointment[date]', params.date);
		fd.append('appointment[time]', params.time);
		fd.append('appointment[appointment_type]', params.appointment_type);
		fd.append('appointment[maintenance_request_id]', maintenance_request_id);
		fd.append('appointment[tenant_id]', tenants.length > 0 ? tenants[0].id : '');
		fd.append('appointment[trady_id]', signed_in_trady ? signed_in_trady.id : '');
		fd.append('appointment[current_user_role]', current_role ? current_role.role : '');
		fd.append('appointment[comments_attributes][0][body]', params.body);
		fd.append('appointment[comments_attributes][0][tenant_id]', tenants.length > 0 ? tenants[0].id : '');
		fd.append('appointment[comments_attributes][0][trady_id]', signed_in_trady ? signed_in_trady.id : '');

		$.ajax({
			type: 'POST',
			url: '/appointments',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: fd,
			success: function(res){
				let title = "";
				let content = "";
				if(!!isDecline) {
					title = notifyAppointment.decline.title;
					content = notifyAppointment.decline.content;
					self.declineAppointment(appointmentUpdate);
				} else if(!!isCancel) {
					title = notifyAppointment.cancel.title;
					content = notifyAppointment.cancel.content;
					self.cancelAppointment(appointmentUpdate);
				} else {
					title = notifyAppointment.normal.title;
					content = notifyAppointment.normal.content;
				}

				if(params.appointment_type == 'Work Order Appointment') {
					appointments.unshift(res.appointment_and_comments);
					comments.push(res.appointment_and_comments.comments[0]);
					self.setState({
						comments: comments,
						appointments: appointments
					});
				}else {
					quote_appointments.unshift(res.appointment_and_comments);
					quoteComments.push(res.appointment_and_comments.comments);
					self.setState({
						quoteComments: quoteComments,
						quote_appointments: quote_appointments
					});			
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
					title: params.appointment_type == 'Work Order Appointment' ? "Create Appoinment" : "Create Appoinment For Quote",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
		
	},

	viewItem: function(key, item) {
		switch(key) {
			case 'viewQuote':
			case 'viewQuoteMessage': {
				this.setState({
					quote: item
				});

				this.onModalWith(key);
				break;
			}

			case 'viewInvoice': {
				this.setState({
					invoice: item
				});

				this.onModalWith(key);
				break;
			}

			case 'viewPdfInvoice': {
				this.setState({
					invoice_pdf_file: item
				});

				this.onModalWith(key);
				break;
			}

			case 'viewConfirm':
			case 'viewMarkJob':
			case 'createAppointment':
			case 'createAppointmentForQuote': {
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

	acceptAppointment: function(appointment) {
		const self = this;
		const {authenticity_token, current_role} = this.props;
		var params = {
			appointment_id: appointment.id,
			current_user_role: current_role ? current_role.role : '',
			maintenance_request_id: this.state.maintenance_request.id,
			appointment_type: appointment.appointment_type == 'Work Order Appointment' ? 'work_order_appointment' : 'quote_appointment',
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
			url: '/decline_appointment',
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
			url: '/cancel_appointment',
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
					title: "Decline Appoinment",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendMessageAgent: function(params) {
		const {authenticity_token, maintenance_request, current_role} = this.props;
		const self = this;
		params.message.maintenance_request_id = maintenance_request.id;
		params.message.role = current_role ? current_role.role : '',
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: params,
			success: function(res){
				const trady_agent_conversation = !!self.state.trady_agent_conversation ? self.state.trady_agent_conversation : [];
				trady_agent_conversation.push(res);
				self.setState({
					trady_agent_conversation: trady_agent_conversation
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Agent",
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
				case 'notification':
					return (
						<ModalNotification 
							close={this.isClose} 
							bgClass={this.state.notification.bgClass}
							title={this.state.notification.title} 
							content={this.state.notification.content}
						/>
					);

				case 'viewQuote': {
					return (
						<ModalViewQuote 
							close={this.isClose}
							quote={this.state.quote}
							keyLandlord="trady" 
							landlord={this.props.landlord}
							quotes={this.state.quotes}
							agency={this.props.agency}
							property={this.props.property}
							onModalWith={this.onModalWith} 
							current_user={this.props.current_user} 
							viewQuote={(quote) => this.viewQuote(quote)} 
						/>
					);
				}

				case 'viewQuoteMessage': {
					return (
						<ModalViewQuoteMessage
							close={this.isClose}
							quote={this.state.quote}
							current_user={this.props.current_user}
							sendMessageQuote={this.sendMessageQuote} 
						/>
					)
				}

				case 'confirmCancelAppointment': {
					const {appointmentUpdate} = this.state;
					let key = '';
					switch(appointmentUpdate.appointment_type) {
						case 'Work Order Appointment': 
							key = 'createAppointment';
							break;

						case 'Quote Appointment': 
							key = 'createAppointmentForQuote';
							break;

						default: 
							break;
					}
					return (
						<ModalConfirmAppointment
							close={this.isClose}
							title="Cancel Appointment"
							btnContent="Create and Cancel"
							openModal={() => this.onModalWith(key)}
							content="Are you sure you want to cancel appointment. To cancel the appointment you must submit a new appointment time."
						/>
					);
				}

				case 'confirmDeclineAppointment': {
					const {appointmentUpdate} = this.state;
					let key = '';
					switch(appointmentUpdate.appointment_type) {
						case 'Work Order Appointment': 
							key = 'createAppointment';
							break;

						case 'Quote Appointment': 
							key = 'createAppointmentForQuote';
							break;

						default: 
							break;
					}
					return (
						<ModalConfirmAppointment
							close={this.isClose}
							title="Decline Appointment"
							btnContent="Create and Decline"
							openModal={() => this.onModalWith(key)}
							content="Are you sure you want to declie appointment. To decline the appointment you must submit a new appointment time."
						/>
					);
				}

				case 'sendMessageAgent': {
					return (
						<ModalSendMessageAgent 
							close={this.isClose} 
							current_user={this.props.current_user} 
							sendMessageAgent={this.sendMessageAgent}
							trady_agent_conversation={this.state.trady_agent_conversation}
						/>
					);
				}

				case 'viewInvoice': {
					return (
							<ModalViewInvoice
								close={this.isClose}
								agency={this.props.agency}
							 	invoice={this.state.invoice} 
					 			landlord={this.state.landlord}
							 	invoices={this.state.invoices}
								property={this.props.property}
							/>
					);
				}

				case 'viewPdfInvoice': {
					return (
							<ModalViewPDFInvoice
								close={this.isClose}
								agency={this.props.agency}
							 	invoice_pdf_file={this.state.invoice_pdf_file} 
							 	invoice_pdf_files={this.state.invoice_pdf_files}
								property={this.props.property}
							/>
					);
				}

				case 'viewConfirm': {
					return (
						<ModalConfirmAddInvoice 
							close={this.isClose}
							jobCompleted={this.jobCompleted}
							signed_in_trady={this.props.signed_in_trady}
							trady={this.props.current_user_show_quote_message}
							maintenance_request={this.props.maintenance_request}
						/>
					);
				}

				case 'viewMarkJob': {
					return (
						<ModalMarkJobAsCompleted
							close={this.isClose}
							signed_in_trady={this.props.signed_in_trady}
							trady={this.props.current_user_show_quote_message}
							maintenance_request={this.props.maintenance_request}
						/>
					);
				}

				case 'createAppointment': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							title="Create Appointment"
							type="Work Order Appointment"
							comments={this.state.comments}
							addAppointment={(params) => this.addAppointment(params)}
						/>
					);
				}

				case 'createAppointmentForQuote': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							type="Quote Appointment"
							comments={this.state.quoteComments}
							title="Create Appointment For Quote"
							addAppointment={(params) => this.addAppointment(params)}
						/>
					);
				}

				case 'viewAppointment': {
					const {comments, quoteComments, appointment} = this.state;
					let commentShow = [];
					switch(appointment.appointment_type) {
						case 'Work Order Appointment': 
							commentShow = [...comments];
							break;

						case 'Quote Appointment': 
							commentShow = [...quoteComments];
							break;

						default: 
							break;
					}
					return (
						<ModalAppointment
							close={this.isClose}
							comments={commentShow}
							appointment={this.state.appointment}
							current_role={this.props.current_role}
							cancelAppointment={(value) => this.cancel(value)}
							declineAppointment={(value) => this.decline(value)}
							acceptAppointment={(value) => this.acceptAppointment(value)}
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

	openQuoteMesssage: function(quote_id) {
		const {quotes} = this.state;
		let quote = '';
		quotes.map((item, key) => {
			if(item.id == quote_id) {
				quote = item;
				return;
			}
		});

		if(quote) {
			this.viewItem('viewQuoteMessage', quote);
		}
	},

	openAppointment: function(appointment_id) {
		let appointment = '';
		const {appointments, quote_appointments} = this.state;
		const data = [...appointments, ...quote_appointments];
		data.map((item, key) => {
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
		const href = window.location.href;
		const self = this;
		window.onload = function () {
			const json = self.getUrlVars(href);
			if(href.indexOf('email_quote_id') >= 0) {
				self.autoScroll('quotes');
			}else if(href.indexOf('send_maintenance_request_invoice') >= 0) {
				self.autoScroll('invoices');

			}else if(href.indexOf('appointment_id') >= 0) {
				self.openAppointment(json.appointment_id);
			}else {
				switch(json.message) {
					case 'open_agent_message': 
							self.onModalWith('sendMessageAgent');
						break;

					case 'open_quote_message':
						self.openQuoteMesssage(json.quote_message_id);
						break;

					default:
						break;
				}
			}
		}
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
		const {appointments, quote_appointments} = this.state;
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
									keyLandlord="trady"
									quotes={this.state.quotes} 
									landlord={this.state.landlord} 
									onModalWith={this.onModalWith} 
									current_user={this.props.current_user} 
									viewQuote={(key, item) => this.viewItem(key, item)} 
									current_user_show_quote_message={this.props.current_user_show_quote_message}
								/>
						}
						{	this.props.invoices.length > 0 &&
						 		<Invoices 
							 		invoices={this.state.invoices} 
							 		viewInvoice={(key, item) => this.viewItem(key, item)} 
						 		/>
					 	}
						{	this.props.invoice_pdf_files.length > 0 &&
							<PDFInvoices 
								invoice_pdf_files={this.state.invoice_pdf_files} 
								viewPDFInvoice={(key, item) => this.viewItem(key, item)} 
							/>
						}
					</div>
					<div className="sidebar">
						<TradyContact 
							agent={this.props.agent}
							tenants={this.props.tenants}
							landlord={this.state.landlord} 
							current_user={this.props.current_user}
							assigned_trady={this.props.assigned_trady}
							onModalWith={(modal) => this.onModalWith(modal)} 
							maintenance_request={this.state.maintenance_request} 
						/>
						<TradyAction
							trady={this.props.trady}
							landlord={this.state.landlord} 
							invoices={this.props.invoices}
							assigned_trady={this.props.assigned_trady}
							signed_in_trady={this.props.signed_in_trady} 
							onModalWith={(modal) => this.onModalWith(modal)}
							invoice_pdf_files={this.props.invoice_pdf_files}
							maintenance_request={this.state.maintenance_request}
						/>
						{
							appointments.length > 0 &&
								<AppointmentRequest 
									appointments={appointments}
									title="Work Order Appointments"
									cancelAppointment={(value) => this.cancel(value)}
									current_role={this.props.trady.user.current_role}
									viewItem={(key, item) => this.viewItem(key, item)}
									acceptAppointment={(value) => this.acceptAppointment(value)}
									declineAppointment={(value) => this.decline(value)}
								/>
						}
						{
							quote_appointments.length > 0 &&
								<AppointmentRequest 
									title="Appointments For Quotes"
									appointments={quote_appointments}
									cancelAppointment={(value) => this.cancel(value)}
									current_role={this.props.trady.user.current_role}
									viewItem={(key, item) => this.viewItem(key, item)}
									acceptAppointment={(value) => this.acceptAppointment(value)}
									declineAppointment={(value) => this.decline(value)}
								/>
						}
					</div>
					{
						appointments.length > 0 &&
							<AppointmentRequestMobile 
								appointments={appointments}
								title="Work Order Appointments"
								cancelAppointment={(value) => this.cancel(value)}
								current_role={this.props.trady.user.current_role}
								viewItem={(key, item) => this.viewItem(key, item)}
								acceptAppointment={(value) => this.acceptAppointment(value)}
								declineAppointment={(value) => this.decline(value)}
							/>
					}
					{
						quote_appointments.length > 0 &&
							<AppointmentRequestMobile 
								title="Appointments For Quotes"
								appointments={quote_appointments}
								cancelAppointment={(value) => this.cancel(value)}
								current_role={this.props.trady.user.current_role}
								viewItem={(key, item) => this.viewItem(key, item)}
								acceptAppointment={(value) => this.acceptAppointment(value)}
								declineAppointment={(value) => this.decline(value)}
							/>
					}
				</div>
				<TradySideBarMobile 
					trady={this.props.trady}
					agent={this.props.agent}
					tenants={this.props.tenants}
					landlord={this.state.landlord} 
					invoices={this.props.invoices}
					current_user={this.props.current_user} 
					assigned_trady={this.props.assigned_trady}
					signed_in_trady={this.props.signed_in_trady} 
					invoice_pdf_files={this.props.invoice_pdf_files}
					onModalWith={(modal) => this.onModalWith(modal)} 
					viewModal={(key, item) => this.viewItem(key, item)} 
					maintenance_request={this.state.maintenance_request}
				/>
				{ this.renderModal() }
			</div>
		);
	}
});