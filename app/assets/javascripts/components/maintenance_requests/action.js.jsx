var ContentAction = React.createClass({
	render: function() {
		return (
			<ul>
				{(this.props.listActions || []).map(({isShow, icon, text, onClick}) => !!isShow &&
					<li>
						<a
							onClick={onClick}
						>
							<i aria-hidden="true" className={icon || "fa fa-user-plus"} />
							{text}
						</a>
					</li>
				)}
			</ul>
		);
	}
});

var ActionComponent = React.createClass({
	getInitialState: function() {
		return {
			show: true,
		}
	},

	showAction: function(e) {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item" data-intro="Select 'Action' to action the maintenance request." data-position="left">
				<div className="header action general-action-title">
					{this.props.text}
					<i
						aria-hidden="true"
						onClick={this.showAction}
						className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")}
					/>
				</div>
				<div className="content" id="actions-content">
					{ this.state.show &&
							<ContentAction
								listActions={this.props.listActions}
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
							show_assign={this.props.show_assign}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/>
					</div>
				</div>
			</div>
		);
	}
})

var Action = React.createClass({
	getInitialState: function() {
		const hasLandlord = !!this.props.landlord;
		const hasTenant = this.props.hasTenant;
		const isNotAssigned = !this.props.assigned_trady;
		
		return {
			listActions: [{
				icon: 'fa fa-sticky-note',
				text: 'Approval Note',
				onClick: () => this.props.onModalWith('approveJob'),
				isShow: this.props.show_assign,
			// }, {
			// 	icon: 'fa fa-plus-square-o',
			// 	text: 'Assign To',
			// 	onClick: () => this.props.onModalWith('assignTo'),
			// 	isShow: this.props.show_assign,
			// }, {
			// 	icon: 'fa fa-pencil-square-o',
			// 	text: 'Edit Maintenance Request',
			// 	onClick: () => this.props.onModalWith('editMaintenanceRequest'),
			// 	isShow: this.props.show_assign,
			// }, {
			// 	icon: 'fa fa-bars',
			// 	text: 'Update Status',
			// 	onClick: () => this.props.onModalWith('updateMRStatus'),
			// 	isShow: this.props.show_assign,
			// }, {
			// 	icon: 'fa fa-files-o',
			// 	text: 'Duplicate Maintenance Request',
			// 	onClick: () => this.props.onModalWith('duplicateMR'),
			// 	isShow: this.props.show_assign,
			// }, {
			// 	icon: 'fa fa-files-o',
			// 	text: 'Split Maintenance Request',
			// 	onClick: () => this.props.onModalWith('splitMR'),
			// 	isShow: this.props.show_assign,
			}, {
				icon: 'fa fa-user',
				text: 'Ask Landlord For Instructions',
				onClick: () => this.props.onModalWith(hasLandlord ? 'confirm' : 'addAskLandlord'),
				isShow: true,
			}, {
				icon: 'fa fa-file-text',
				text: 'Request Quote',
				onClick: () => this.props.onModalWith('requestQuote'),
				isShow: true,
			}, {
				icon: 'fa fa-send',
				text: 'Send Work Order',
				onClick: () => this.props.onModalWith('sendWorkOrder'),
				isShow: isNotAssigned,
			}, ]
		};
	},

	render: function() {
		return <ActionComponent text="Maintenance Request" listActions={this.state.listActions} />
	}
});

var AgentLandlordAction = React.createClass({
	getInitialState: function() {
		const hasLandlord = !!this.props.landlord;

		return {
			listActions: [{
				icon: 'fa fa-user',
				text: 'Ask Landlord For Instructions',
				onClick: () => this.props.onModalWith(hasLandlord ? 'confirm' : 'addAskLandlord'),
				isShow: true,
			}, {
				icon: 'fa fa-user-plus',
				text: hasLandlord ? 'Change Landlord' : 'Add Landlord',
				onClick: () => this.props.onModalWith('addLandlord'),
				isShow: true,
			}, {
				icon: 'fa fa-pencil',
				text: 'Edit Landlord Details',
				onClick: () => this.props.onModalWith('editLandlord'),
				isShow: hasLandlord,
			}]
		};
	},

	render: function() {
		return <ActionComponent text="Landlord" listActions={this.state.listActions} />
	}
});

var AgentTradyAction = React.createClass({
	getInitialState: function() {
		const isNotAssigned = !this.props.assigned_trady;

		return {
			listActions: [{
				icon: 'fa fa-file-text',
				text: 'Request Quote',
				onClick: () => this.props.onModalWith('requestQuote'),
				isShow: true,
			}, {
				icon: 'fa fa-send',
				text: 'Send Work Order',
				onClick: () => this.props.onModalWith('sendWorkOrder'),
				isShow: isNotAssigned,
			}, ]
		};
	},

	render: function() {
		return <ActionComponent text="Trady" listActions={this.state.listActions} />
	}
});

var AgentTenantAction = React.createClass({
	getInitialState: function() {
		const hasTenant = this.props.hasTenant;

		return {
			listActions: [{
				icon: 'fa fa-user-plus',
				text: 'Add/Edit/Remove Tenant',
				onClick: () => this.props.onModalWith(hasTenant ? 'showTenants' : 'addTenant'),
				isShow: true,
			}]
		};
	},

	render: function() {
		return <ActionComponent text="Landlord" listActions={this.state.listActions} />
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
							show_assign={this.props.show_assign}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/>
					</div>
				</div>
			</div>
		);
	}
});
