var ContentContact = React.createClass({
	render: function() {
		const self = this;
		const {landlord, tenants, assigned_trady} = this.props;
		var tenantMobile = [];
		if(tenants) {
			tenantMobile = tenants.map((tenant, key) => {
				return (
					<li key={tenant.id}>
						<a href={"tel:" + tenant.mobile}>
							<i className="fa fa-phone" aria-hidden="true" />
							Tenant - {tenant.name}: {tenant.mobile}
						</a>
					</li>
				);
			});
		}

		if(!!landlord) {
			return (
				<ul>
					{tenantMobile}
					<li>
						<a href={"tel:" + landlord.mobile}>
							<i className="fa fa-phone" aria-hidden="true" />
							Landlord - {landlord.name}: {landlord.mobile}
						</a>
					</li>
					{
						assigned_trady && assigned_trady.mobile &&
						<li>
							<a href={`tel:${assigned_trady.mobile}`}>
								<i className="fa fa-phone" aria-hidden="true" />
								Trady - {assigned_trady.name}: {assigned_trady.mobile}
							</a>
						</li>
					}
					<li>
						<a onClick={() => self.props.onModalWith('sendMessageLandlord')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message LandLord
						</a>
					</li>
					<li>
						<a onClick={() => self.props.onModalWith('sendMessageTenant')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message Tenants
						</a>
					</li>
					{
						assigned_trady &&
						<li>
							<a onClick={() => self.props.onModalWith('sendMessageTrady')}>
								<i className="fa fa-commenting" aria-hidden="true" />
								Message Trady
							</a>
						</li>
					}
				</ul>
			);
		}else {
			return (
				<ul>
					{tenantMobile}
					{
						assigned_trady && assigned_trady.mobile &&
						<li>
							<a href={`tel:${assigned_trady.mobile}`}>
								<i className="fa fa-phone" aria-hidden="true" />
								Trady - {assigned_trady.name}: {assigned_trady.mobile}
							</a>
						</li>
					}
					<li>
						<a onClick={() => self.props.onModalWith('sendMessageTenant')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message Tenants
						</a>
					</li>
					{
						assigned_trady &&
						<li>
							<a onClick={() => self.props.onModalWith('sendMessageTrady')}>
								<i className="fa fa-commenting" aria-hidden="true" />
								Message Trady
							</a>
						</li>
					}
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
			<div className="item" data-intro="Select 'Contact' to call or message." data-position="left">
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
							<ContentContact
								tenants={this.props.tenants}
								landlord={this.props.landlord}
								assigned_trady={this.props.assigned_trady}
								onModalWith={(modal) => this.props.onModalWith(modal)}
							/>
					}
				</div>
			</div>
		);
	}
});

var ContactMobile = React.createClass({
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
						<ContentContact
							tenants={this.props.tenants}
							landlord={this.props.landlord}
							assigned_trady={this.props.assigned_trady}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/>
					</div>
				</div>
			</div>
		);
	}
});
