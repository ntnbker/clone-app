var ContentLandlordContact = React.createClass({
	renderCallAgent: function() {
		const agent = this.props.agent;
		if(!!agent) {
			return (
				<li>
					<a href={"tel:" + agent.mobile_phone}>
						<i className="fa fa-phone" aria-hidden="true" />
						Agent - {agent.first_name}: {agent.mobile_phone}
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
			show: true
		};
	},

	showContact: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item" data-intro="This is Contact" data-position="left">
				<div className="header contact">
					<a>Contact:</a>
					<i
						aria-hidden="true" 
						onClick={this.showContact} 
						className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} 
					/>
				</div>
				<div className="content">
					{ this.state.show && 
							<ContentLandlordContact
								agent={this.props.agent}
								landlord={this.props.landlord}
								maintenance_request={this.props.maintenance_request}
								onModalWith={(modal) => this.props.onModalWith(modal)}
							/> 
					}
				</div>
			</div>
		);
	}
});

var LandlordContactMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full contact-full" id="contacts-full">
				<div className="item">
					<div className="header action">
						<a>Contact:</a>
						<i
							aria-hidden="true" 
							className="fa fa-close" 
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						<ContentLandlordContact
							agent={this.props.agent}
							landlord={this.props.landlord}
							maintenance_request={this.props.maintenance_request}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/> 
					</div>
				</div>
			</div>
		);
	}
});