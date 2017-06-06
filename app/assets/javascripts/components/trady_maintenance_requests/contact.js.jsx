var ContentTradyContact = React.createClass({
	renderCallAgent: function() {
		const maintenance_request = this.props.maintenance_request;
		if(!!maintenance_request.agent) {
			return (
				<li>
					<a href={"tel:" + maintenance_request.agent.mobile_phone}>
						<i className="fa fa-phone" aria-hidden="true" />
						Call Agent: {maintenance_request.agent.mobile_phone}
					</a>
				</li>
			);
		}else if(!!maintenance_request.agency_admin) {
			return (
				<li>
					<a href={"tel:" + maintenance_request.agency_admin.mobile_phone}>
						<i className="fa fa-phone" aria-hidden="true" />
						Call Agent: {maintenance_request.agency_admin.mobile_phone}
					</a>
				</li>
			);
		}

		return null;
	},

	render: function() {
		return (
			<ul>
				{this.renderCallAgent()}
			</ul>
		);
	}
});

var TradyContact = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	showContact: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item">
				<div className="header contact">
					<a>Contact:</a>
					<i
						aria-hidden="true" 
						onClick={this.showContact} 
						className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} 
					/>
				</div>
				<div className="content">
					{ this.state.show && <ContentTradyContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} maintenance_request={this.props.maintenance_request} /> }
				</div>
			</div>
		);
	}
});

var TradyContactMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full contact-full">
				<div className="item">
					<div className="header contact">
						<a>Contact:</a>
						<i
							aria-hidden="true" 
							className="fa fa-close" 
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						{ <ContentTradyContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} maintenance_request={this.props.maintenance_request} /> }
					</div>
				</div>
			</div>
		);
	}
});