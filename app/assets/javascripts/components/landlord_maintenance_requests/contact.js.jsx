var ContentLandlordContact = React.createClass({
	renderCallAgent: function() {
		if(!!this.props.maintenance_request.agent) {
			return (
				<li>
					<a>
						<i className="fa fa-phone" aria-hidden="true" />
						Call Agent: {this.props.maintenance_request.agent.mobile_phone}
					</a>
				</li>
			);
		}else if(!!this.props.maintenance_request.agency_admin) {
			return (
				<li>
					<a>
						<i className="fa fa-phone" aria-hidden="true" />
						Call Agent: {this.props.maintenance_request.agency_admin.mobile_phone}
					</a>
				</li>
			);
		}

		return null;
	},

	renderSendMessage: function() {
		if(!!this.props.landlord) {
			return (
				<li>
					<a onClick={() => this.props.onModalWith('sendMessageLandlord')}>
						<i className="fa fa-commenting" aria-hidden="true" />
						Send Agent Message
					</a>
				</li>
			);
		}
	},

	render: function() {
		return (
			<ul>
				{this.renderCallAgent()}
				{this.renderSendMessage()}
			</ul>
		);
	}
});

var LandlordContact = React.createClass({
	getInitialState: function() {
		return {
			show: false
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
					{ this.state.show && <ContentLandlordContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} maintenance_request={this.props.maintenance_request} /> }
				</div>
			</div>
		);
	}
});

var LandlordContactMobile = React.createClass({
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
						{ <ContentLandlordContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} maintenance_request={this.props.maintenance_request} /> }
					</div>
				</div>
			</div>
		);
	}
});