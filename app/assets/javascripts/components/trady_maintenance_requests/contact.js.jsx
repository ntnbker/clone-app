var ContentTradyContact = React.createClass({
	renderTenant: function() {
		const tenants = this.props.tenants.length > 0 ? this.props.tenants : [];
		if(tenants.length > 0) {
			return (
				tenants.map((tenant, key) => {
					return (
						<li key={tenant.id}>
							<a href={"tel:" + tenant.mobile}>
								<i className="fa fa-phone" aria-hidden="true" />
								Tenant - {tenant.name}: {tenant.mobile}
							</a>
						</li>
					);
				})
			);
		}

		return null;
	},

	renderAgent: function() {
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

	renderMessageAgent: function() {
		const {assigned_trady} = this.props;
		if(!!assigned_trady) {
			return (
				<li>
					<a onClick={() => this.props.onModalWith('sendMessageAgent')}>
						<i className="fa fa-commenting" aria-hidden="true" />
						Message Agent
					</a>
				</li>
			);
		}
	},

	render: function() {
		return (
			<ul>
				{this.renderTenant()}
				{this.renderAgent()}
				{this.renderMessageAgent()}
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
					{ this.state.show && 
							<ContentTradyContact 
								agent={this.props.agent}
								tenants={this.props.tenants}
								landlord={this.props.landlord}
								assigned_trady={this.props.assigned_trady}
								maintenance_request={this.props.maintenance_request}
								onModalWith={(modal) => this.props.onModalWith(modal)} 
							/> 
					}
				</div>
			</div>
		);
	}
});

var TradyContactMobile = React.createClass({
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
						{ 
							<ContentTradyContact
								agent={this.props.agent}
								tenants={this.props.tenants}
								landlord={this.props.landlord}
								assigned_trady={this.props.assigned_trady}
								maintenance_request={this.props.maintenance_request} 
								onModalWith={(modal) => this.props.onModalWith(modal)} 
							/> 
						}
					</div>
				</div>
			</div>
		);
	}
});