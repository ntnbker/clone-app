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
					<a onClick={this.show}>Tenant & Landlord Appointments</a>
				</div>
				{ (this.state.show && this.props.appointments.length) ?
						<ContentAppointment 
							appointments={this.props.appointments}
							viewItem={(key, item) => this.props.viewItem(key, item)}
						/>
						: null
				}
			</div>
		);
	}
});

var TenantLandlordAppointmentMobile = React.createClass({
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
			<div className="activity-mobile">
				<div className="item">
					<div className="header action">
						<a>Tenant & Landlord Appointments</a>
						<i 
							aria-hidden="true" 
							onClick={this.show} 
							className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} 
						/>
					</div>
					{ (this.props.appointments.length && !!this.state.show) ?
							<ContentAppointment 
								appointments={this.props.appointments}
								viewItem={(key, item) => this.props.viewItem(key, item)}
							/>
							: null
					}
				</div>
			</div>
		);
	}
});
