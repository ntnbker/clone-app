var TenantSideBarMobile = React.createClass({
	getInitialState: function() {
		return {
			showDetail: false,
			showContact: false,
		};
	},

	show: function(key) {
		const height = $( window ).height();
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

	componentWillUnmount() {
		$(document).unbind('click.sidebar');
		$(document).unbind('touchstart.sidebar');
	},

	render: function() {
		return (
			<div className="dontprint">
				<div className="sidebar-mobile">
					<div className="fixed">
						{/* <button
							data-intro="Select 'Contact' to call or message." data-position="top"
							className={"contact button-default " + (!!this.state.showContact && 'active')}
							onClick={(key) => this.show('contact')}
						>
							CONTACT MENU
						</button>
						<button
							data-intro="Edit maintenance request." data-position="top"
							className={"actions button-default " + (!!this.state.showDetail && 'active')}
							onClick={(key) => this.show('detail')}
						>
							EDIT MENU
						</button> */}
						<button
							data-intro="Select 'Action' to action the maintenance request." data-position="top"
							className={"button-default show-sidebar-menu " + (this.state.showGeneral && 'active')}
							onClick={(key) => this.show('general-action')}
						>
							MENU
						</button>
						<div className="background" />
					</div>
				</div>
				<div className="action-mobile">
					<TenantContactMobile
						close={this.close}
						onModalWith={(modal) => this.props.onModalWith(modal)}
					/>
				</div>
				<TenantDetailMobile
						close={this.close}
						onModalWith={(modal) => this.props.onModalWith(modal)}
					/>
			</div>
		);
	}
});

var TenantMaintenanceRequest = React.createClass({
	getInitialState: function() {
		const {landlord, appointments, quote_appointments, maintenance_request, tenants_conversation, landlord_appointments} = this.props;
		const comments = [],
					quoteComments = [],
					landlordComments = [];
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
		landlord_appointments.map((appointment, key) => {
			if(appointment.comments.length > 0) {
				landlordComments.unshift(appointment.comments[0]);
			}
		});
		return {
			modal: "",
			isModal: false,
			isCancel: false,
			isDecline: false,
			appointment: null,
			landlord: landlord,
			comments: comments,
			appointmentUpdate: null,
			appointments: appointments,
			gallery: this.props.gallery,
			quoteComments: quoteComments,
			landlordComments: landlordComments,
			quote_appointments: quote_appointments,
			maintenance_request: maintenance_request,
			tenants_conversation: tenants_conversation,
			landlord_appointments: landlord_appointments,
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
				isModal: false,
				modal: ""
			});
		}

		var body = document.getElementsByTagName('body')[0];
		body.classList.remove("modal-open");
		var div = document.getElementsByClassName('modal-backdrop in')[0];
		if(div) {
			div.parentNode.removeChild(div);
		}
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

			case 'addPhoto':
			case 'editAvailability':
			case 'createAppointment':
			case 'createAppointmentForQuote':
			case 'createLandlordAppointment': {
				this.onModalWith(key);
				break;
			}

			case 'deletePhoto': {
				this.setState({
					photo: item
				})

				this.onModalWith(key);
				break;
			}
			default: {
				break;
			}
		}

	},

	editAvailability: function(params, callback) {
		const self = this;
		const { authenticity_token, maintenance_request } = this.props;

		params.maintenance_request_id = maintenance_request.id;

		$.ajax({
			type: 'POST',
			url: '/update_availability_access',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: {
				availability_access: params
			},
			success: function(res){
				if (res.errors) {
					return callback(res.errors);
				}
				maintenance_request.availability_and_access = res.availability_and_access;

				self.setState({
					maintenance_request,
					notification: {
						bgClass: "bg-success",
						title: "Edit Availability",
						content: 'Thank you, the availability and access has been updated',
					}
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					bgClass: "bg-error",
					title: "Edit Availability",
					content: err.responseText,
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendAgentMessage: function(params, callback) {
		const self = this;
		const {maintenance_request} = this.state;
		params.message.role = 'Tenant';
		params.message.conversation_type = 'Tenant';
		params.message.maintenance_request_id = maintenance_request.id;
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				if (res && res.errors) {
					return callback(res.errors);
				}
				const tenants_conversation = !!self.state.tenants_conversation ? self.state.tenants_conversation : [];
				tenants_conversation.push(res);

				self.setState({
					tenants_conversation: tenants_conversation,
				});
				callback();
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

	addAppointment: function(params, callback) {
		const self = this;
		const {tenant, current_role, signed_in_trady, landlord, authenticity_token} = this.props;
		const maintenance_request_id = this.state.maintenance_request.id;
		const {appointments, quote_appointments, landlord_appointments, appointmentUpdate, isDecline, comments, quoteComments, landlordComments, isCancel} = this.state;
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
				if (res.errors) {
					return callback(res.errors);
				}
				let title = '';
				let	content = '';
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
				switch(params.appointment_type) {
					case 'Work Order Appointment':
						appointments.unshift(res.appointment_and_comments);
						comments.push(res.appointment_and_comments.comments[0]);
						self.setState({
							comments: comments,
							appointments: appointments,
						});
						break;

					case 'Quote Appointment':
						quote_appointments.unshift(res.appointment_and_comments);
						quoteComments.push(res.appointment_and_comments.comments[0]);
						self.setState({
							quoteComments: quoteComments,
							quote_appointments: quote_appointments
						});
						break;

					case 'Landlord Appointment':
						landlord_appointments.unshift(res.appointment_and_comments);
						landlordComments.push(res.appointment_and_comments.comments[0]);
						self.setState({
							landlordComments: landlordComments,
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
			appointment_type: appointment.appointment_type == 'Work Order Appointment' ? 'work_order_appointment' : 'quote_appointment',
		};

		if(appointment.appointment_type == 'Work Order Appointment'){
			params.appointment_type = "work_order_appointment";
		}else if(appointment.appointment_type == 'Quote Appointment') {
			params.appointment_type = 'quote_appointment'
		}

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
		this.onModalWith('confirmDeclineAppointment');
		this.setState({
			isDecline: true,
			appointmentUpdate: appointment,
		});
	},

	declineAppointment: function(appointment) {
		const self = this;
		const {authenticity_token, tenant} = this.props;
		const params = {
			appointment_id: appointment.id,
			maintenance_request_id: this.state.maintenance_request.id,
			current_user_role: tenant.user.current_role ? tenant.user.current_role.role : '',
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

	cancel: function(appointment) {
		let key = '';
		this.onModalWith('confirmCancelAppointment');
		this.setState({
			isCancel: true,
			appointmentUpdate: appointment,
		});
	},

	cancelAppointment: function(appointment) {
		const self = this;
		const {authenticity_token, tenant} = this.props;
		var params = {
			appointment_id: appointment.id,
			current_user_role: tenant.user.current_role ? tenant.user.current_role.role : '',
		};
		$.ajax({
			type: 'POST',
			url: appointment.appointment_type == 'Landlord Appointment' ? '/cancel_landlord_appointment' : '/cancel_appointment',
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
          const {notification} = this.state;
					const {reopenModal} = notification;
          return (
            <ModalNotification
              close={reopenModal ? this.viewItem.bind(this, reopenModal) : this.isClose}
              bgClass={this.state.notification.bgClass}
              title={this.state.notification.title}
              content={this.state.notification.content}
            />
          );


				case 'sendAgentMessage': {
					return (
						<ModalSendMessageAgent
							close={this.isClose}
							current_user={this.props.current_user}
							sendMessageAgent={this.sendAgentMessage}
							trady_agent_conversation={this.state.tenants_conversation}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);
				}

				case 'viewAppointment': {
					const {comments, quoteComments, landlordComments, appointment} = this.state;
					let commentShow = [];
					switch(appointment.appointment_type) {
						case 'Work Order Appointment':
							commentShow = [...comments];
							break;

						case 'Quote Appointment':
							commentShow = [...quoteComments];
							break;

						case 'Landlord Appointment':
							commentShow = [...landlordComments];
							break;

						default:
							break;
					}
					return (
						<ModalAppointment
							close={this.isClose}
							comments={commentShow}
							appointment={this.state.appointment}
							cancelAppointment={(value) => this.cancel(value)}
							current_role={this.props.tenant.user.current_role}
							acceptAppointment={(value) => this.acceptAppointment(value)}
							declineAppointment={(value) => this.decline(value)}
						/>
					);
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

						case 'Landlord Appointment':
							key = 'createLandlordAppointment';
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

						case 'Landlord Appointment':
							key = 'createLandlordAppointment';
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

				case 'createLandlordAppointment': {
					return (
						<ModalAddAppointment
							close={this.isClose}
							type="Landlord Appointment"
							title="Create Landlord Appointment"
							comments={this.state.landlordComments}
							addAppointment={this.addAppointment}
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
							viewItem={this.viewItem}
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

				case 'editAvailability':
					return (
						<ModalEditAvailability
							close={this.isClose}
							editAvailability={this.editAvailability}
							maintenance_request={this.state.maintenance_request}
						/>
					)
					
				case 'deletePhoto':
				return (
					<ModalDeletePhoto
						close={this.closeDeletePhoto}
						photoData={this.state.photo}
						authenticity_token={this.props.authenticity_token}
					/>
				)
				default:
					return null;
			}
		}
	},

	closeDeletePhoto(err, res) {
		if (err === undefined) {
			return this.onModalWith('addPhoto');
		}
		if (err) {
			this.setState({notification: {
				title: "Delete Photo",
				content: err.responseText,
				bgClass: "bg-error",
			}});
			return this.onModalWith('notification');
		}
		if (res) {
			const {gallery, photo} = this.state;
			this.setState({
				notification: {
					title: "Delete",
					content: res.message,
					bgClass: "bg-success",
					reopenModal: 'addPhoto',
				},
				gallery: gallery.filter(({id}) => id !== photo.id)
			});
			return this.onModalWith('notification');
		}
		this.isClose();
	},

	openAppointment: function(appointment_id) {
		let appointment = '';
		const {appointments, quote_appointments, landlord_appointments} = this.state;
		const data = [...appointments, ...quote_appointments, ...landlord_appointments];
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
		if(href.indexOf('open_agent_message') >= 0) {
			self.onModalWith('sendAgentMessage');
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


	notifyAddPhoto: function(gallery) {
		this.setState({
			gallery: gallery
		});
		this.onModalWith('confirmAddPhoto');
	},

	render: function() {
		const {appointments, quote_appointments, landlord_appointments} = this.state;
		return (
			<div className="summary-container-index new-ui-maintenance-request main-container" id="summary-container-index">
				<FixCSS />
				<div className="main-summary dontprint main-content">	
					<div className="sidebar">
						<div className="box-shadow flexbox flex-column">
							{
								/*
								<TenantContact
									current_user={this.props.current_user}
									onModalWith={(modal) => this.onModalWith(modal)}
								/>*/
							}
							<GeneralAction
								{...this.props}
							/>
							<TenantDetail
								current_user={this.props.current_user}
								onModalWith={(modal) => this.onModalWith(modal)}
							/>
							{
								(quote_appointments && quote_appointments.length > 0) &&
									<AppointmentRequest
										title="Appointments For Quotes"
										appointments={quote_appointments}
										cancelAppointment={(value) => this.cancel(value)}
										current_role={this.props.tenant.user.current_role}
										viewItem={(key, item) => this.viewItem(key, item)}
										acceptAppointment={(value) => this.acceptAppointment(value)}
										declineAppointment={(value) => this.decline(value)}
									/>
							}
						</div>
					</div>
					<div className="section">
						<ItemMaintenanceRequest
							gallery={this.state.gallery}
							property={this.props.property}
							agent={this.props.agent || this.props.agency_admin}
							current_role={this.props.current_role}
							viewItem={(key, item) => this.viewItem(key, item)}
							onModalWith={this.onModalWith}
							maintenance_request={this.state.maintenance_request}
							edit_availability={true}
						/>
					</div>
				</div>
				<TenantSideBarMobile
					current_user={this.props.current_user}
					onModalWith={(modal) => this.onModalWith(modal)}
				/>
				{ this.renderModal() }
			</div>
		);
	}
});
