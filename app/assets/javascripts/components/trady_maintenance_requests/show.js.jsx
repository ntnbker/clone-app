var TradySideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showAction: false,
			showContact: false
		};
	},

	show: function(key) {
		const height = $( window ).height();
		if(key == 'action') {
			this.setState({showAction: !this.state.showAction});
			this.setState({showContact: false});
			$('#actions-full').css('height', this.state.showAction ? 0 : height);
		}else {
			this.setState({showAction: false});
			this.setState({showContact: !this.state.showContact});
			$('#contacts-full').css('height', this.state.showContact ? 0 : height);
		}

	},

	componentDidMount: function() {
		$(document).bind("resize", function() {
			const height = $(window).height();
			if($('#actions-full')) {
				$('#actions-full').css('height', height);
			}

			if($('#contacts-full')) {
	    	$('#contacts-full').css('height', height);
			}
		})
	},

	render: function() {
		return (
			<div>
				<div className="sidebar-mobile">
					<div className="fixed">       
						<button className="contact button-default" onClick={(key) => this.show('contact')}>Contact</button>
						<button className="actions button-default" onClick={(key) => this.show('action')}>Actions</button>
					</div>
				</div>
				{ !!this.state.showAction && 
					<TradyActionMobile 
						landlord={this.props.landlord} 
						invoices={this.props.invoices}
						close={(key) => this.show('action')} 
						assigned_trady={this.props.assigned_trady} 
						signed_in_trady={this.props.signed_in_trady} 
						invoice_pdf_files={this.props.invoice_pdf_files}
						maintenance_request={this.props.maintenance_request}
						onModalWith={(modal) => this.props.onModalWith(modal)} 
					/> 
				}
				{ 
					<TradyContactMobile 
					close={(key) => this.show('contact')} 
					onModalWith={(modal) => this.props.onModalWith(modal)} 
					landlord={this.props.landlord} 
					current_user={this.props.current_user} 
					maintenance_request={this.props.maintenance_request} /> 
				}
			</div>
		);
	}
});

var ModalConfirmAddInvoice = React.createClass({
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
		return {
			modal: "",
			quote: null,
			invoice: null,
			isModal: false,
			invoice_pdf_file: null,
			quotes: this.props.quotes,
			tradies: this.props.tradies,
			landlord: this.props.landlord,
			invoices: this.props.invoices,
			invoice_pdf_files: this.props.invoice_pdf_files,
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

	sendMessageQuote: function(params) {
		const self = this;
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

			case 'viewConfirm': {
				this.onModalWith(key);
				break;
			}

			case 'viewMarkJob': {
				this.onModalWith(key);
				break;
			}

			default: {
				break;
			}
		}
		
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

				case 'viewInvoice': {
					return (
							<ModalViewInvoice
								close={this.isClose}
								agency={this.props.agency}
							 	invoice={this.state.invoice} 
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
							landlord={this.state.landlord} 
							current_user={this.props.current_user} 
							onModalWith={(modal) => this.onModalWith(modal)} 
							maintenance_request={this.state.maintenance_request} 
						/>
						<TradyAction 
							landlord={this.state.landlord} 
							invoices={this.props.invoices}
							assigned_trady={this.props.assigned_trady}
							signed_in_trady={this.props.signed_in_trady} 
							onModalWith={(modal) => this.onModalWith(modal)}
							invoice_pdf_files={this.props.invoice_pdf_files}
							maintenance_request={this.state.maintenance_request}
						/>
						<Activity logs={this.props.logs} />
					</div>
					<ActivityMobile logs={this.props.logs} />
				</div>
				<TradySideBarMobile 
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
