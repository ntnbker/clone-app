var ContentTenantDetail = React.createClass({
	render: function() {
		const selt = this;
		return (
			<ul>
				<li>
					<a onClick={() => selt.props.onModalWith('addPhoto')}>
						<i className="fa fa-commenting" aria-hidden="true" />
						Add Photo
					</a>
				</li>
			</ul>
		);
	}
});

var TenantDetail = React.createClass({
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
			<div className="item" data-intro="This is edit details" data-position="left">
				<div className="header action general-action-title">
					<a>Maintenance Request</a>
					<i
						aria-hidden="true" 
						onClick={this.showContact} 
						className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} 
					/>
				</div>
				<div className="content">
					{ this.state.show && <ContentTenantDetail onModalWith={(modal) => this.props.onModalWith(modal)} /> }
				</div>
			</div>
		);
	}
});

var TenantDetailMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full" id="actions-full">
				<div className="item">
					<div className="header action">
						<a>Edit Details:</a>
						<i 
							aria-hidden="true" 
							className="fa fa-close" 
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						<ContentTenantDetail 
							onModalWith={(modal) => this.props.onModalWith(modal)} 
						/>
					</div>
				</div>
			</div>
		);
	}
});