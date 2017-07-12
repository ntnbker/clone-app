var ContentContact = React.createClass({
	render: function() {
		const selt = this;
		const {landlord, tenants, assigned_trady} = this.props;
		var tenantMobile = [];
		if(tenants) {
			tenantMobile = tenants.map((tenant, key) => {
				return (
					<li key={tenant.id}>
						<a href={"tel:" + tenant.mobile}>
							<i className="fa fa-phone" aria-hidden="true" />
							Tenant {key + 1}: {tenant.mobile}
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
					{
						assigned_trady && 
						<li>
							<a onClick={() => selt.props.onModalWith('sendMessageTrady')}>
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
					<li>
						<a onClick={() => selt.props.onModalWith('sendMessageTenant')}>
							<i className="fa fa-commenting" aria-hidden="true" />
							Message Tenants
						</a>
					</li>
					{
						assigned_trady && 
						<li>
							<a onClick={() => selt.props.onModalWith('sendMessageTrady')}>
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
