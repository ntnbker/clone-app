var ContentContact = React.createClass({
	render: function() {
		const selt = this;
		const landlord = this.props.landlord;
		if(!!landlord) {
			return (
				<ul>
					<li>
						<a href={"tel:" + landlord.mobile}>
							<i className="fa fa-phone" aria-hidden="true" />
							Landlord: {landlord.mobile}
						</a>
					</li>
					<li>
						<a onClick={() => selt.props.onModalWith('sendMessageLandlord')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message LandLord
						</a>
					</li>
					<li>
						<a onClick={() => selt.props.onModalWith('sendMessageTenant')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message Tenants
						</a>
					</li>
				</ul>
			);
		}else {
			return (
				<ul>
					<li>
						<a onClick={() => selt.props.onModalWith('sendMessageTenant')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message Tenants
						</a>
					</li>
				</ul>
			);
		}
	}
});

var Contact = React.createClass({
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
					{ this.state.show && <ContentContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
				</div>
			</div>
		);
	}
});

var ContactMobile = React.createClass({
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
						{ <ContentContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
					</div>
				</div>
			</div>
		);
	}
});