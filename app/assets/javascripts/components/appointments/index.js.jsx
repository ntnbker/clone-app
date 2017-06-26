var InfoAppointment = React.createClass({
	render: function() {
		const {appointment, current_role} = this.props;
		return (
			<li className="li-appointment">
				<div className="status">
					<span>Status: </span>
					<span>{appointment.status}</span>
				</div>
				<div className="date-time">
					<p className="date">
						<span>Date: </span>
						<span>{ moment(appointment.created_at).format('dddd LL') }</span>
					</p>
					<p className="time">
						<span>Time: </span>
						<span>{ moment(appointment.created_at).format('LT') }</span>
					</p>
				</div>
				<div className="button-appointment btn-appointment-mobile">
					{
						appointment.status != 'Declined' &&
							<BtnViewAppointment clickView={this.props.clickView}/>
					}
					{
						(appointment.status == "Active" && appointment.current_user_role != current_role.role) &&
							<BtnAcceptAppointment clickAccept={this.props.clickAccept}/>
					}
					{
						(appointment.status == "Active" && appointment.current_user_role != current_role.role) &&
							<BtnDeclineAppointment clickDecline={this.props.clickDecline}/>
					}
				</div>
			</li>
		);
	}
});

var ListAppointment = React.createClass({
	render: function() {
		const {appointments} = this.props;
		return (
			<ul className="content-appointment">
				{
					appointments.map((appointment, key) => {
						return (
							<InfoAppointment 
								key={key} 
								appointment={appointment}
								current_role={this.props.current_role}
								clickAccept={() => {this.props.acceptAppointment(appointment)}}
								clickDecline={() => {this.props.declineAppointment(appointment)}}
								clickView={() => {this.props.viewItem('viewAppointment', appointment)}}
							/>
						);
					})
				}
			</ul>
		);
	}
});

var AppointmentRequest = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	show: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		const {appointments, title} = this.props;
		return (
			<div className="item">
				<div className="header action">
					<a>{title}</a>
					<i 
							aria-hidden="true" 
							onClick={this.show} 
							className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} 
						/>
				</div>
				{ (this.state.show && this.props.appointments.length) ?
						<ListAppointment 
							appointments={appointments}
							current_role={this.props.current_role}
							viewItem={(key, item) => this.props.viewItem(key, item)}
							acceptAppointment={(value) => this.props.acceptAppointment(value)}
							declineAppointment={(value) => this.props.declineAppointment(value)}
						/>
						: null
				}
			</div>
		);
	}
});

var AppointmentRequestMobile = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	show: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		const {appointments, title} = this.props;
		return (
			<div className="activity-mobile">
				<div className="item">
					<div className="header action">
						<a>{title}</a>
						<i 
							aria-hidden="true" 
							onClick={this.show} 
							className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} 
						/>
					</div>
					{ (appointments.length && !!this.state.show) ?
							<ListAppointment 
								appointments={appointments}
								current_role={this.props.current_role}
								viewItem={(key, item) => this.props.viewItem(key, item)}
								acceptAppointment={(value) => this.props.acceptAppointment(value)}
								declineAppointment={(value) => this.props.declineAppointment(value)}
							/>
							: null
					}
				</div>
			</div>
		);
	}
});
