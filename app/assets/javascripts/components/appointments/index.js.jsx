const notifyAppointment = {
	cancel: {
		title: "Create and Cancel Appointment",
		content: "You have cancelled the old suggested appointment. Thank you for creating a new appointment, an email has been sent with the new appointment details. You will be notified if they accept the appointment time."
	},
	decline: {
		title: "Create and Decline Appointment",
		content: "You have declined the old suggested appointment. Thank you for creating a new appointment, an email has been sent with the new appointment details. You will be notified if they accept the appointment time."
	},
	normal: {
		title: "Create Appointment",
		content: "Thank you for creating an appointment, an email has been sent with the appointment details. You will be notified if they accept the new appointment time."
	}
}

var InfoAppointment = React.createClass({
	getInitialState: function() {
		return {
			arrRole: ['AgencyAdmin', 'Agent']
		};
	},

	btnView: function() {
		const {appointment, current_role} = this.props;
		if(this.state.arrRole.includes(current_role.role)) {
			return <BtnViewAppointment clickView={this.props.clickView}/>
		}else if(appointment.status != 'Declined') {
			return <BtnViewAppointment clickView={this.props.clickView}/>
		}else {
			return null;
		}
	},

	btnAccept: function() {
		const {appointment, current_role} = this.props;
		if(this.state.arrRole.includes(current_role.role)) {
			return null;
		} else if(appointment.status == "Active" && appointment.current_user_role != current_role.role) {
			return <BtnAcceptAppointment clickAccept={this.props.clickAccept}/>
		}else {
			return null;
		}
	},

	btnDecline: function() {
		const {appointment, current_role} = this.props;
		if(this.state.arrRole.includes(current_role.role)) {
			return null;
		} else if(appointment.status == "Active" && appointment.current_user_role != current_role.role) {
			return <BtnDeclineAppointment clickDecline={this.props.clickDecline}/>
		}else {
			return null;
		}
	},

	btnCancel: function() {
		const {appointment, current_role} = this.props;
		if(appointment.status == "Accepted" && !this.state.arrRole.includes(current_role.role)) {
			return <BtnCancelAppointment clickCancel={this.props.clickCancel} />
		}

		return null;
	},

	render: function() {
		const {appointment, current_role} = this.props;
		var date = new Date(Date.parse(appointment.time)).toUTCString();
		var arrDate = date.split(" ");
		var hour = arrDate[4] ? arrDate[4] : "00:00";
		var arrHour = hour.split(':');
		var h =  parseInt(arrHour[0]);
		var m = arrHour[1];
    var time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');
		return (
			<li className="li-appointment">
				<div className="status">
					<span>Status: </span>
					<span className={"bt-status " + appointment.status}>{appointment.status}</span>
				</div>
				<div className="date-time">
					<p className="date">
						<span>Date: </span>
						<span>{ moment(appointment.date).format('dddd LL') }</span>
					</p>
					<p className="time">
						<span>Time: </span>
						<span>{ time }</span>
					</p>
				</div>
				<div className="button-appointment btn-appointment-mobile">
					{this.btnView()}
					{this.btnAccept()}
					{this.btnDecline()}
					{this.btnCancel()}
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
								clickCancel={() => this.props.cancelAppointment(appointment)}
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
							cancelAppointment={(value) => this.props.cancelAppointment(value)}
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
								cancelAppointment={(value) => this.props.cancelAppointment(value)}
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
