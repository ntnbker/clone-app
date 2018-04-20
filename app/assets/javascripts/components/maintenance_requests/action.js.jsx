var ContentAction = React.createClass({
	render: function() {
		const hasLandlord = !!this.props.landlord;
		const hasTenant = this.props.hasTenant;
		const isNotAssigned = !this.props.assigned_trady;

		return (
			<ul>
				<li>
					<a onClick={() => this.props.onModalWith(hasLandlord ? 'confirm' : 'addAskLandlord')}>
						<i className="fa fa-user" />
						Ask Landlord for instructions
					</a>
				</li>
				<li className="">
					<a onClick={() => this.props.onModalWith('requestQuote')}>
						<i className="fa fa-file-text" aria-hidden="true" />
						Request quote
					</a>
				</li>
				{
					isNotAssigned &&
					<li>
						<a onClick={() => this.props.onModalWith('sendWorkOrder')}>
							<i className="fa fa-send" aria-hidden="true" />
							Send work order
						</a>
					</li>
				}
				{
					hasLandlord ?
						<li>
							<a onClick={() => this.props.onModalWith('addLandlord')}>
								<i aria-hidden="true" className="fa fa-user-plus" />
								Change Landlord
							</a>
						</li>
						:
						<li>
							<a onClick={() => this.props.onModalWith('addLandlord')}>
								<i aria-hidden="true" className="fa fa-user-plus" />
								Add Landlord
							</a>
						</li>
				}
				{
					hasLandlord &&
						<li>
							<a onClick={() => this.props.onModalWith('editLandlord')}>
								<i aria-hidden="true" className="fa fa-pencil" />
								Edit landlord details
							</a>
						</li>
				}
				<li>
					<a
						onClick={() => {
							this.props.viewItem(hasTenant ? 'showTenants' : 'addTenant');
						}}
					>
						<i aria-hidden="true" className="fa fa-user-plus" />
						Add/Edit/Remove Tenant
					</a>
				</li>
			</ul>
		);
	}
});

var Action = React.createClass({
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
			<div className="item" data-intro="Select 'Action' to action the maintenance request." data-position="left">
				<div className="header action general-action-title">
					<a>Maintenance Request Actions</a>
					<i
						aria-hidden="true"
						onClick={this.showAction}
						className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")}
					/>
				</div>
				<div className="content" id="actions-content">
					{ this.state.show &&
							<ContentAction
								landlord={this.props.landlord}
								hasTenant={this.props.hasTenant}
								assigned_trady={this.props.assigned_trady}
								viewItem={this.props.viewItem}
								onModalWith={(modal) => this.props.onModalWith(modal)}
							/>
					}
				</div>
			</div>
		);
	}
});

var ActionMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full" id="actions-full">
				<div className="item">
					<div className="header action" id="action" >
						<a>Actions:</a>
						<i
							aria-hidden="true"
							className="fa fa-close"
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						<ContentAction
							landlord={this.props.landlord}
							viewItem={this.props.viewItem}
							hasTenant={this.props.hasTenant}
							assigned_trady={this.props.assigned_trady}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/>
					</div>
				</div>
			</div>
		);
	}
});
