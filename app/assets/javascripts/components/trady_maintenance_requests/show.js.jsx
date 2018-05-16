var TradySideBarMobile = React.createClass({
	getInitialState: function() {
		return {
			showAction: false,
			isShowCreateButton: !this.props.trady || this.props.trady.id === this.props.signed_in_trady.id,
			isAssignedTrady: this.props.trady && this.props.trady.id === this.props.signed_in_trady.id
		};
	},

	show: function(key) {
		if (key == 'general-action') {
			this.setState({showGeneral: true});
			return $('.sidebar').addClass('visible');
		}
	},

	close: function() {
		if (!!this.state.showGeneral) {
			this.setState({showGeneral: false});
		}
		$('.sidebar').removeClass('visible');
	},

	checkClose(e) {
		const self = this;
		const {className} = e.target;
		dontCloseMe = !!DONT_CLOSE_WHEN_CLICK_ME_LIST.filter(element => className.includes(element))[0];

		if (!dontCloseMe && self.state.showGeneral) {
			e.target.click && e.target.click();
			setTimeout(() => self.close(), 0);
		}
	},

	componentDidMount: function() {
		const self = this;
		$(document).on('click.sidebar', this.checkClose);
		$(document).on('touchstart.sidebar', this.checkClose);
	},

	createClick() {
		const {onModalWith, signed_in_trady: {id}, maintenance_request_id} = this.props;
		const {isAssignedTrady} = this.state;

		let linkCreateQuote = `/quote_options?maintenance_request_id=${maintenance_request_id}&trady_id=${id}`;

		if (!isAssignedTrady) {
			location.href = linkCreateQuote;
		}
		else {
			onModalWith('ShowTradyActions');
		}
	},

	componentWillUnmount() {
		$(document).unbind('click.sidebar');
		$(document).unbind('touchstart.sidebar');
	},

	render: function() {
		const { isAssignedTrady, isShowCreateButton } = this.state;

		return (
			<div className="dontprint">
				<div className={"sidebar-mobile " + (isShowCreateButton && 'trady-menu-button')}>
					<div className="fixed">
						{/* <button
							className={"actions trady-actions button-default " + (!!this.state.showAction && 'active')}
							onClick={(key) => this.show('action')}
						>
							<span className="display-block">CREATE QUOTE</span>
							<span className="display-block">OR</span>
							<span className="display-block">
								{isAssignedTrady ? "CREATE INVOICE" : "CONTACT AGENT"}
							</span>
						</button> */}
						<button
							type="button"
							data-intro="Select 'Action' to action the maintenance request." data-position="top"
							className={"button-default show-sidebar-menu menu-button " + (this.state.showGeneral && 'active')}
							onClick={(key) => this.show('general-action')}
						>
							MENU
						</button>
						{isShowCreateButton && 
							<button
								type="button"
								data-intro="Select 'Action' to action the maintenance request." data-position="top"
								className="button-default show-sidebar-menu create-quote"
								onClick={this.createClick}
							>
								SEND QUOTE{ isAssignedTrady ? " / INVOICE" : ""}
							</button>
						}
						<div className="background" />
					</div>
				</div>
				<div className="action-mobile">
					{ false && 
						<TradyActionMobile
							close={this.close}
							trady={this.props.trady}
							agent={this.props.agent}
							tenants={this.props.tenants}
							landlord={this.props.landlord}
							invoices={this.props.invoices}
							current_user={this.props.current_user}
							assigned_trady={this.props.assigned_trady}
							signed_in_trady={this.props.signed_in_trady}
							invoice_pdf_files={this.props.invoice_pdf_files}
							needShowCreateQuote={this.props.needShowCreateQuote}
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
	componentWillMount: function() {
		this.createInvoice();
	},

	jobCompleted: function() {
		const {maintenance_request} = this.props;
		const maintenance_trady_id = maintenance_request.trady_id;

		let params = {
			maintenance_request_id: maintenance_request.id
		};

		this.props.jobCompleted(params);
		window.location.replace("/invoice_options?maintenance_request_id=" + maintenance_request.id + "&trady_id=" + maintenance_trady_id);
	},

	createInvoice: function() {
		const {maintenance_request} = this.props;
		const maintenance_trady_id = maintenance_request.trady_id;
		this.props.close();
		window.location.replace("/invoice_options?maintenance_request_id=" + maintenance_request.id + "&trady_id=" + maintenance_trady_id);
	},

	render: function() {
		const maintenance_request = this.props.maintenance_request;
		return null;

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
		const {quote_requests, tradies, landlord, invoices, appointments, pdf_files, quote_appointments, maintenance_request, tenants_conversation, landlords_conversation, trady_agent_conversation} = this.props;
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
			modal   								: "",
			isModal   							: false,
			isCancel   							: false,
			isDecline   						: false,
			quote   								: null,
			invoice   							: null,
			appointment   					: null,
			invoice_pdf_file  			: null,
			appointmentUpdate  			: null,
			message  								: '',
			tradies   							: tradies,
			comments   							: comments,
			landlord   							: landlord,
			invoices   							: invoices,
			invoice_pdf_files  			: pdf_files,
			appointments  					: appointments,
			quoteComments  					: quoteComments,
			quote_appointments  		: quote_appointments,
			gallery  								: this.props.gallery,
			maintenance_request  		: maintenance_request,
			tenants_conversation  	: tenants_conversation,
			landlords_conversation  : landlords_conversation,
			trady_agent_conversation: trady_agent_conversation,
			stop_reminder  	 	 		: this.props.stop_reminder,
			quote_requests  				: this.props.quote_requests,
			trady  									: this.props.assigned_trady,
			instruction 						: this.props.instruction ? this.props.instruction : {},
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
				isModal: false,
				modal: ""
			});
		}

		var body = document.getElementsByTagName('body')[0];
		body.classList.remove("modal-open");
		var div = document.getElementsByClassName('modal-backdrop in')[0];
		if(div){

			div.parentNode.removeChild(div);
		}
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

	sendMessageQuote: function(params, callback) {
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
				if (res.errors) {
					return callback(res.errors);
				}
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

	sendMessageQuoteRequest: function(params, callback) {
		const self = this;
		params.message.role = this.props.current_role.role;
		$.ajax({
			type: 'POST',
			url: '/quote_request_messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				if (res.errors) {
					return callback(res.errors);
				}
				let quote_request = self.state.quote_request
				quote_request.conversation = quote_request.conversation ? quote_request.conversation : {};
				const messages = !!quote_request.conversation && quote_request.conversation.messages ? quote_request.conversation.messages : [];
				messages.push(res);
				quote_request.conversation.messages = messages;
				self.setState({
					quote_request: quote_request
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

	addAppointment: function(params, callback) {
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
				if (res.errors) {
					return callback(res.errors);
				}
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
					quoteComments.push(res.appointment_and_comments.comments[0]);
					self.setState({
						quoteComments: quoteComments,
						quote_appointments: quote_appointments
					});
				}

				self.setState({
					notification: {
						title: title,
						content: content,
						bgClass: "bg-success",
					}
				});
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

			case 'viewPhoto': {
				this.setState({
					quote_images: item,
				});

				this.onModalWith(key);
				break;
			}

			case 'viewQuoteRequestMessage':
			case 'confirmStopQuoteReminder': {
				this.setState({
					quote_request: item,
				});

				this.onModalWith(key);
				break;
			}

			case 'voidInvoice':
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
			case 'confirmInvoiceAlreadyMade':
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

			case 'viewTrady': {
				this.setState({
					trady: item
				});
				this.onModalWith(key);
				break;
			}

			case 'wantNewInvoice': {
				this.setState({
					message: item
				})
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

	sendMessageAgent: function(params, callback) {
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
				if (res.errors) {
					return callback(res.errors);
				}
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

	paymentReminder: function(invoice) {
		const self = this;
		const {maintenance_request} = this.state;
		const params = {
			invoice_id: invoice.id,
			maintenance_request_id: maintenance_request.id,
		};

		$.ajax({
			type: 'POST',
			url: '/payment_reminder',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					notification: {
						title: "Remind Agent of Payment",
						content: "A payment reminder has been sent to the agent. Thank you.",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Remind Agent of Payment",
					content: "Remind Agent of Payment" ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	voidInvoice: function(params, callback) {
		const self = this;
		const {current_user} = this.props;
		const {invoice, invoices, invoice_pdf_files} = this.state;
		const isPdf = !!invoice.pdf_url;

		$.ajax({
			type: 'POST',
			url: isPdf ? '/void_uploaded_invoice' : '/void_invoice',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res) {
				if (res && res.errors) {
					return callback(res.errors);
				}

				if (isPdf) {
					self.setState({
						invoice_pdf_files: invoice_pdf_files.map(inv => inv.id === res.uploaded_invoice.id
							? Object.assign({}, inv, res.uploaded_invoice)
							: inv
						),
					})
				}

				else {
					self.setState({
						invoices: invoices.map(inv => inv.id === res.invoice.id
							? Object.assign({}, inv, res.invoice)
							: inv
						),
					})
				}
				const message = (res && res.message || 'You have void this invoice.') + ' Do you want to create another invoice?';
				self.viewItem('wantNewInvoice', message);
			},
			error: function(err) {
				self.setState({notification: {
					title: "Void Invoice",
					content: "An error occured voiding this invoice." ,
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
							quotes={this.state.quote_requests}
							agency={this.props.agency}
							property={this.props.property}
							onModalWith={this.onModalWith}
							current_user={this.props.current_user}
							viewQuote={this.viewItem}
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

				case 'viewQuoteRequestMessage': {
					return (
						<ModalViewQuoteRequestMessage
							close={this.isClose}
							quote_request={this.state.quote_request}
							current_user={this.props.current_user}
							isTrady={true}
							sendMessageQuoteRequest={this.sendMessageQuoteRequest}
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
							content={["Are you sure you want to cancel the appointment. To cancel the appointment you ", <strong className="text-capitalize">must</strong>, " submit a new appointment time."]}
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
							content={["Are you sure you want to decline the appointment. To decline the appointment you ", <strong className="text-capitalize">must</strong> ," submit a new appointment time."]}
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
								viewInvoice={this.viewItem}
								role={this.props.current_role ? this.props.current_role.role : ''}
							/>
					);
				}

				case 'viewPdfInvoice': {
					return (
							<ModalViewPDFInvoice
								close={this.isClose}
								agency={this.props.agency}
								property={this.props.property}
								trady={this.props.assigned_trady}
								viewInvoice={this.viewItem}
							 	invoice_pdf_file={this.state.invoice_pdf_file}
								role={this.props.current_user_role}
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
							addAppointment={this.addAppointment}
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
							addAppointment={this.addAppointment}
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

				case 'viewModalInstruction':
					return (
						<ModalInstruction
							authenticity_token={this.props.authenticity_token}
							updateInsruction={this.updateInsruction}
						/>
					);

				case 'addPhoto':
					return (
						<ModalAddPhoto
							close={this.isClose}
							gallery={this.state.gallery}
							notifyAddPhoto={this.notifyAddPhoto}
							authenticity_token={this.props.authenticity_token}
							maintenance_request={this.state.maintenance_request}
						/>
					);

				case 'editDescription':
					return (
						<ModalEditDescription
							close={this.isClose}
						/>
					);

				case 'confirmAddPhoto':
					return (
						<ModalConfirmAddPhoto
							close={this.isClose}
							onModalWith={(modal) => this.onModalWith(modal)}
						/>
					);


				case 'viewTrady':
					const hasApproved = this.state.quote_requests.some(quote_request => quote_request.quotes.some(quote => quote.status === 'Approved'));

					return (
						<ModalViewTrady
							close={this.isClose}
							trady={this.state.trady}
							maintenance_request={this.state.maintenance_request}
							agency={this.props.agency}
							agency_admin={this.props.agency_admin}
							agent={this.props.agent}
							tenants={this.props.tenants}
							property={this.props.property}
							hasApproved={hasApproved}
						/>
					);

				case 'confirmStopQuoteReminder':
					return (
						<ModalConfirmAnyThing
							close={this.isClose}
							confirm={this.stopQuoteReminder}
							title="Stop Quote Request Reminder"
							content="Are you sure you have already submitted a quote?"
						/>
					);

				case 'viewPhoto':
					return (
						<ModalViewPhoto
							title="Quote Photo"
							close={this.isClose}
							keyLandlord="trady"
							agency={this.props.agency}
							landlord={this.props.landlord}
							property={this.props.property}
							onModalWith={this.onModalWith}
							quote={this.state.quote_request}
							gallery={this.state.quote_images}
							quotes={this.state.quote_requests}
							current_user={this.props.current_user}
							viewQuote={this.viewItem}
						/>
					)

				case 'confirmAppointmentAlreadyMade':
					return (
						<ModalConfirmAnyThing
							close={this.isClose}
							confirm={this.stopAppointmentReminder}
							title="Stop Appointment Reminder"
							content="Are you sure you have already made an appointment with the tenant AND you want to stop the appointment reminder?"
						/>
					);

				case 'confirmInvoiceAlreadyMade':
					return (
						<ModalConfirmAnyThing
							close={this.isClose}
							confirm={this.stopInvoiceReminder}
							title="Stop Invoice Reminder"
							content="Are you sure you have already made an invoice AND you want to stop the invoice reminder?"
						/>
					);

				case 'voidInvoice':
					return (
						<ModalVoidInvoice
							voidInvoice={this.voidInvoice}
							invoice={this.state.invoice}
							close={this.isClose}
							text={"Are you sure want to void this invoice? Voiding this invoice will mark the invocie with a DO NOT PAY status for agent. An email will also be sent to the agent informing them it has been void. Do you want to create a new invoice?"}
						/>
					)

					case 'wantNewInvoice':
						return (
							<ModalConfirmAnyThing
								close={this.isClose}
								confirm={() => this.onModalWith('viewConfirm')}
								title="Void Invoice"
								content={this.state.message || "You have void this invoice. Do you want to create a new invoice?"} />
						);

					case 'ShowTradyActions':
						return (
							<ShowTradyActions
								close={this.isClose}
								title="Trady Actions"
								maintenance_request_id={this.props.maintenance_request.id}
								trady_id={this.props.signed_in_trady.id}
							/>
						);
					
				default:
					return null;
			}
		}
	},

	chooseQuoteRequest: function(quote_request) {
		this.setState({ quote_request });
	},

	autoScroll: function(key) {
		var offset = $('#' + key).offset();
		$('body').animate({
			scrollTop: offset.top
		}, 500);
	},

	quoteAlreadySent: function() {
		const self = this;
		const { quote_request } 		= this.state;
		const { current_user_role } = this.props;

		const params = {
			trady_id: quote_request.trady_id,
			quote_request_id: quote_request.id,
			maintenance_request_id: quote_request.maintenance_request_id,
			role: 'Trady',
		};

		$.ajax({
			type: 'POST',
			url: '/quote_sent',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					quote_requests: res.quote_requests,
					notification: {
						title: "Quote Already Sent",
						content: "Thank you for marking quote as 'Already Sent'. To keep the work flow automated please upload a photo of the quote. This would greatly help out you and the agent keep MaintenanceApp organized. Thank you for your time.",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Quote Already Sent",
					content: "Quote Already Sent didn't confirm." ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	stopQuoteReminder: function() {
		const self = this;
		const { maintenance_request, signed_in_trady } = this.props;
		const { quote_request } = this.state;

		const params = {
			trady_id: signed_in_trady.id,
			maintenance_request_id: maintenance_request.id,
			quote_request_id: quote_request.id,
			role: 'Trady'
		};

		$.ajax({
			type: 'POST',
			url: '/stop_quote_reminder',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					quote_requests: res.quote_requests,
					notification: {
						title: "Stop Quote Reminder",
						content: "Thank you!",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Stop Quote Reminder",
					content: "Something wrong" ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	appointmentAlreadyMade: function() {
		const self = this;
		const { maintenance_request } = this.state;

		const params = {
			maintenance_request_id: maintenance_request.id,
		};

		$.ajax({
			type: 'POST',
			url: '/appointment_already_made',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					notification: {
						title: "Appointment Already Made",
						content: res.note,
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Appointment Already Made",
					content: "Appointment Already Made didn't confirm." ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	stopAppointmentReminder: function() {
		const self = this;
		const { maintenance_request } = this.state;

		const params = {
			maintenance_request_id: maintenance_request.id,
		};

		$.ajax({
			type: 'POST',
			url: '/stop_appointment_reminder',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					notification: {
						title: "Stop Appointment Reminder",
						content: res.message,
						bgClass: "bg-success",
					},
					stop_appointment: true,
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Stop Appointment Reminder",
					content: "Stop Appointment Reminder didn't confirm." ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	stopInvoiceReminder: function() {
		const self = this;
		const { maintenance_request } = this.state;

		const params = {
			maintenance_request_id: maintenance_request.id,
		};

		$.ajax({
			type: 'POST',
			url: '/stop_invoice_reminder',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					notification: {
						title: "Appointment Reminder stopped",
						content: res.message,
						bgClass: "bg-success",
					},
					stop_invoice: true,
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Stop Appointment Reminder",
					content: "Stop Appointment Reminder didn't confirm." ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	uploadImage: function(images, callback) {
		if (images.length == 0) {
		  return;
		}

		const { quote_request } 		= this.state;
		const { current_user_role } = this.props;

		const image = images[0];

		const data = {
			picture: {
				image: JSON.stringify(image),
				quote_request_id 			: quote_request.id,
				trady_id 							: quote_request.trady_id,
				maintenance_request_id: quote_request.maintenance_request_id,
				role 									: 'Trady',
			},
		}

		const self = this;
		$.ajax({
		  type: 'POST',
		  url: '/quote_image',
		  beforeSend: function (xhr) {
		    xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
		  },
		  data: data,
		  success: function (res) {
        if (res.error || res.errors) {
					const error = {
						image: [((res.error || res.errors).image || [])[0].replace(/\w+ /, '')]
					};
					return callback(error);
        }
		  	callback(null, 'You Has Successfully Upload');
        if (res && res.quote_requests) {
        	self.setState({ quote_requests: res.quote_requests });
        }
		  },
		  error: function (err) {

		  }
		});
	},

	openQuoteMesssage: function(quote_id) {
		const {quote_requests} = this.state;
		let quote = '';
		quote_requests.map((item, key) => {
			if(item.id == quote_id) {
				quote = item;
				return;
			}
		});

		if(quote) {
			this.viewItem('viewQuoteMessage', quote);
		}
	},

	openQuoteRequestMesssage: function(quote_request_id) {
		const { quote_requests } = this.state;

		const quote_request = quote_requests.filter(item => item.id == quote_request_id)[0];

		if(quote_request) {
			this.viewItem('viewQuoteRequestMessage', quote_request);
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
		const self = this;
		const {instruction} = this.state;
		const body = $('body');

		if(!instruction.read_instruction) {
			body.chardinJs('toggle');

			this.onModalWith('viewModalInstruction');

			$(window).click(function(e) {
				var showInstruction = $('.show-instruction');
				if(showInstruction.length > 0) {
					if(e.target.className != 'show-instruction') {
						self.isClose();
						self.viewModalMessage();
						body.chardinJs('stop');
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

				case 'open_quote_request_message':
					self.openQuoteRequestMesssage(json.quote_request_message_id);
					break;

				default:
					break;
			}
		}

		const {stop_reminder, stop_quote_reminder_id} = this.props;
		switch (stop_reminder) {
			case 'quote':
				self.viewItem('confirmStopQuoteReminder', {id: stop_quote_reminder_id});
				break;
			case 'appointment':
				self.onModalWith('confirmAppointmentAlreadyMade');
				break;
			case 'invoice':
				self.onModalWith('confirmInvoiceAlreadyMade');
				break;
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

	notifyAddPhoto: function(gallery) {
		this.setState({
			gallery: gallery
		});
		this.onModalWith('confirmAddPhoto');
	},

	render: function() {
		const {
			appointments, quote_appointments, invoices, invoice_pdf_files, trady, quote_requests, stop_invoice, stop_appointment
		} = this.state;

		const hasApproved = quote_requests.some(quote_request => quote_request.quotes.some(quote => quote.status === 'Approved'));
		const needShowInfo = (!trady || trady.id === this.props.signed_in_trady.id);

		return (
			<div className="summary-container-index new-ui-maintenance-request" id="summary-container-index">
				<FixCSS />
				<div className="main-summary dontprint">
					<div className="sidebar">
						<div className="box-shadow flexbox flex-column">
							{
								/*

									<TradyContact
										agent={this.props.agent}
										tenants={this.props.tenants}
										landlord={this.state.landlord}
										current_user={this.props.current_user}
										assigned_trady={this.props.assigned_trady}
										onModalWith={(modal) => this.onModalWith(modal)}
										maintenance_request={this.state.maintenance_request}
									/>*/
							}
							<GeneralAction
								{...this.props}
							/>
							{
								!!this.props.assigned_trady && !!this.props.signed_in_trady && this.props.signed_in_trady.id != this.props.assigned_trady.id ?
									null
									:
									<div>
										<TradyAction
											trady={this.props.trady}
											landlord={this.state.landlord}
											invoices={this.props.invoices}
											assigned_trady={this.props.assigned_trady}
											signed_in_trady={this.props.signed_in_trady}
											needShowCreateQuote={!!quote_requests.length}
											onModalWith={(modal) => this.onModalWith(modal)}
											invoice_pdf_files={this.props.invoice_pdf_files}
											maintenance_request={this.state.maintenance_request}
										/>
									</div>
							}
						</div>
					</div>
					<div className="section">
						{
							!needShowInfo &&
								<div className="box-shadow">
									<div className="show-waring">
										We are sorry to inform you that this job has been awarded to another company. We will contact you about future jobs, thank you for your time.
									</div>
								</div>
						}
						<ItemMaintenanceRequest
							isTrady={true}
							gallery={needShowInfo && this.state.gallery}
							property={this.props.property}
							tenants={needShowInfo ? this.props.tenants : []}
							viewItem={(key, item) => this.viewItem(key, item)}
							onModalWith={this.onModalWith}
							maintenance_request={this.state.maintenance_request}
							hide_note={!trady || trady.user_id !== this.props.current_user.id}
							strike_approval={hasApproved}hasApproved
						/>
						{	needShowInfo && (invoices && invoices.length > 0) &&
						 		<Invoices
							 		invoices={invoices}
							 		current_role={this.props.current_role}
							 		viewInvoice={(key, item) => this.viewItem(key, item)}
							 		paymentReminder={(item) => this.paymentReminder(item)}
						 		/>
					 	}
						{	needShowInfo && (invoice_pdf_files && invoice_pdf_files.length > 0) &&
							<PDFInvoices
								trady={this.props.assigned_trady}
								invoice_pdf_files={invoice_pdf_files}
						 		current_role={this.props.current_role}
						 		paymentReminder={(item) => this.paymentReminder(item)}
								viewPDFInvoice={(key, item) => this.viewItem(key, item)}
							/>
						}
						{
							// trady && trady.id === this.props.signed_in_trady.id && this.props.current_role &&
							// 	<AssignTrady
							// 		trady={trady}
							// 		current_role={this.props.current_role.role}
							// 		onModalWith={(modal) => this.onModalWith(modal)}
							// 		stop_invoice={stop_invoice}
							// 		stop_appointment={stop_appointment}
							// 		showAppointmentAlreadyMade={true}
							// 		viewTrady={(key, item) => this.viewItem(key, item)}
							// 	/>
						}
						{ needShowInfo && quote_requests && quote_requests.length > 0 &&
								<QuoteRequests
									keyLandlord="trady"
									landlord={this.state.landlord}
									quote_requests={quote_requests}
									assignedTrady={trady}
									agent={this.props.agent || this.props.agency_admin}
									onModalWith={this.onModalWith}
									uploadImage={this.uploadImage}
									current_user={this.props.current_user}
									current_role={this.props.current_role}
									chooseQuoteRequest={this.chooseQuoteRequest}
									viewQuote={this.viewItem}
									current_user_show_quote_message={this.props.current_user_show_quote_message}
								/>
						}
						{ false && (quote_requests && quote_requests.length > 0) &&
								<Quotes
									keyLandlord="trady"
									quotes={quote_requests}
									landlord={this.state.landlord}
									onModalWith={this.onModalWith}
									current_user={this.props.current_user}
									viewQuote={this.viewItem}
									current_user_show_quote_message={this.props.current_user_show_quote_message}
								/>
						}
					</div>
				</div>
				{
						<TradySideBarMobile
							trady={this.state.trady}
							agent={this.props.agent}
							tenants={this.props.tenants}
							landlord={this.state.landlord}
							invoices={this.props.invoices}
							quote_requests={this.props.quote_requests}
							current_user={this.props.current_user}
							signed_in_trady={this.props.signed_in_trady}
							needShowCreateQuote={!!quote_requests.length}
							invoice_pdf_files={this.props.invoice_pdf_files}
							onModalWith={this.onModalWith}
							viewModal={(key, item) => this.viewItem(key, item)}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
				}
				{ this.renderModal() }
			</div>
		);
	}
});
