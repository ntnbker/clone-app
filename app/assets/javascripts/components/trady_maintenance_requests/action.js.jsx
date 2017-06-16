var CreactOrUploadQuote = React.createClass({
	render: function() {
		return (
			<li className="active">
				<a href={this.props.link}>
					<i className="fa fa-file-text" aria-hidden="true" />
					Create or Upload Quote
				</a>
			</li>
		);
	}
});

var CreateOrUploadInvoice = React.createClass({
	render: function() {
		return (
			<li>
				<a onClick={(modal) => this.props.onModalWith('viewConfirm')}>
					<i className="fa fa-send" aria-hidden="true" />
					Create or Upload Invoice
				</a>
			</li>
		);
	}
});

var MarkJobAsCompleted = React.createClass({
	render: function() {
		return (
			<li>
				<a onClick={(modal) => this.props.onModalWith('viewMarkJob')}>
					<i className="fa fa-send" aria-hidden="true" />
					Mark Job As Completed
				</a>
			</li>
		);
	}
});

var CreateAppointment = React.createClass({
	render: function() {
		const props = this.props;
		return (
			<li>
				<a href={"/appointments/new?maintenance_request_id=" + props.maintenance_request.id + "&trady_id=" + props.trady.id}>
					<i className="fa fa-plus" aria-hidden="true" />
					Create Appointment
				</a>
			</li>
		);
	}
});

var ContentTradyAction = React.createClass({
	render: function() {
		const maintenance_request = this.props.maintenance_request;
		// const trady_id = !!this.props.signed_in_trady ? this.props.signed_in_trady.id : "";
    const trady_id = this.props.signed_in_trady.id ;
		const maintenance_trady_id = maintenance_request.trady_id;
		const link = "/quote_options?maintenance_request_id=" + maintenance_request.id + "&trady_id=" + trady_id;
		if(!!this.props.assigned_trady && !!this.props.signed_in_trady && this.props.signed_in_trady.id == this.props.assigned_trady.id) {
			return (
				<ul>
					<CreactOrUploadQuote link={link} />
					<CreateOrUploadInvoice onModalWith={(modal) => this.props.onModalWith(modal)} />
					<MarkJobAsCompleted onModalWith={(modal) => this.props.onModalWith(modal)} />
					<CreateAppointment trady={this.props.trady} maintenance_request={maintenance_request} />
				</ul>
			);
		}else if(!!this.props.assigned_trady && !!this.props.signed_in_trady && this.props.signed_in_trady.id != this.props.assigned_trady.id) {
			return (
				<ul>
					<CreateAppointment trady={this.props.trady} maintenance_request={maintenance_request} />
				</ul>
			);
		}else {
			return(
				<ul>
					<CreactOrUploadQuote link={link} />
					{ !!this.props.assigned_trady &&
							<CreateOrUploadInvoice onModalWith={(modal) => this.props.onModalWith(modal)} />
					}
					<MarkJobAsCompleted onModalWith={(modal) => this.props.onModalWith(modal)} />
					<CreateAppointment trady={this.props.trady} maintenance_request={maintenance_request} />
				</ul>
			);
		}
	}
});

var TradyAction = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};  
	},

	showAction: function(e) {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item">
				<div className="header action">
					<a>Actions:</a>
					<i 
						aria-hidden="true" 
						onClick={this.showAction} 
						className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} 
					/>
				</div>
				<div className="content">
					{ this.state.show &&
						 	<ContentTradyAction
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
				</div>
			</div>
		);
	}
});

var TradyActionMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full" id="actions-full">
				<div className="item">
					<div className="header action">
						<a>Actions:</a>
						<i 
							aria-hidden="true" 
							className="fa fa-close" 
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						<ContentTradyAction
							trady={this.props.trady}
							landlord={this.props.landlord} 
							landlord={this.props.landlord} 
							invoices={this.props.invoices}
					 		assigned_trady={this.props.assigned_trady}
							invoice_pdf_files={this.props.invoice_pdf_files}
					 		maintenance_request={this.props.maintenance_request}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/>
					</div>
				</div>
			</div>
		);
	}
});