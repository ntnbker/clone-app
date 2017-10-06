var ContentTenantContact = React.createClass({
	render: function() {
		const selt = this;
		return (
			<ul>
				<li>
					<a onClick={() => selt.props.onModalWith('sendAgentMessage')}>
						<i className="fa fa-commenting" aria-hidden="true" />
						Send Agent Message
					</a>
				</li>
			</ul>
		);
	}
});

var TenantContact = React.createClass({
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
			<div className="item"  data-intro="This is Contact" data-position="left">
				<div className="header action">
					<a>Contact:</a>
					<i
						aria-hidden="true" 
						onClick={this.showContact} 
						className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} 
					/>
				</div>
				<div className="content">
					{ this.state.show && <ContentTenantContact onModalWith={(modal) => this.props.onModalWith(modal)} /> }
				</div>
			</div>
		);
	}
});

var TenantContactMobile = React.createClass({
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
						{ <ContentTenantContact onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
					</div>
				</div>
			</div>
		);
	}
});