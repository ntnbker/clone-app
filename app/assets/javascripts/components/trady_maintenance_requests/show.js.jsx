var TradySideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showAction: false,
			showContact: false
		};
	},

	show: function(key) {
		if(key == 'action') {
			this.setState({showAction: !this.state.showAction});
		}else {
			this.setState({showContact: !this.state.showContact});
		}
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
				{ !!this.state.showAction && <TradyActionMobile close={(key) => this.show('action')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
				{ !!this.state.showContact && <TradyContactMobile close={(key) => this.show('contact')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} current_user={this.props.current_user} maintenance_request={this.props.maintenance_request} /> }
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

	viewItem: function(key, item) {
		switch(key) {
			case 'viewQuote': {
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
						{ this.props.quotes.length > 0 ?
								<Quotes 
									keyLandlord="trady"
									quotes={this.state.quotes} 
									landlord={this.state.landlord} 
									onModalWith={this.onModalWith} 
									current_user={this.props.current_user} 
									viewQuote={(key, item) => this.viewItem(key, item)} 
								/>
								: null
						}
						{	this.props.invoices.length > 0 ?
						 		<Invoices 
							 		invoices={this.state.invoices} 
							 		viewInvoice={(key, item) => this.viewItem(key, item)} 
						 		/>
						 		:
						 		null
					 	}
						{	this.props.invoice_pdf_files.length > 0 ?
							<PDFInvoices 
								invoice_pdf_files={this.state.invoice_pdf_files} 
								viewPDFInvoice={(key, item) => this.viewItem(key, item)} 
							/>
							:
							null
						}
					</div>
					<div className="sidebar">
						<TradyContact landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} maintenance_request={this.state.maintenance_request} />
						<TradyAction landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} />
					</div>
				</div>
				<TradySideBarMobile onModalWith={(modal) => this.onModalWith(modal)} landlord={this.state.landlord} current_user={this.props.current_user} maintenance_request={this.state.maintenance_request} />
				{ this.renderModal() }
			</div>
		);
	}
});
