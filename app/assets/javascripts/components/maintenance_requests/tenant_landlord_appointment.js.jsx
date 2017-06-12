var TenantLandlordAppointment = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	show: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item">
				<div className="header action">
					<a>Tenant & Landlord Appointments:</a>
					<i className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} aria-hidden="true" onClick={this.show}></i>
				</div>
				<div>
					{ (this.state.show && this.props.appointments.length) ?
							<ContentAppointment appointments={this.props.appointments} />
							: null
					}
				</div>
			</div>
		);
	}
});

var TenantLandlordAppointmentMobile = React.createClass({
	render: function() {
		return (
			<div className="activity-mobile">
				<div className="item">
					<div className="header action">
						<a>Tenant & Landlord Appointments:</a>
						<i className="fa fa-angle-down" aria-hidden="true"></i>
					</div>
					<div className="content text-center activity-content">
					{ this.props.appointments.length ?
							<ContentAppointment appointments={this.props.appointments} />
							: null
					}
					</div>
				</div>
			</div>
		);
	}
});
