var Appointment = React.createClass({
	render: function() {
		const appointment = this.props.appointment;
		return (
			<li>
				<p className="date-time">
					<p className="date">
						<span>Date: </span>
						<span>{ moment(appointment.created_at).format('dddd LL') }</span>
					</p>
					<p className="time">
						<span>Time: </span>
						<span>{ moment(appointment.created_at).format('LT') }</span>
					</p>
				</p>
				<button className="btn-view">
					View Details
				</button>
			</li>
		);
	}
});

var ContentAppointment = React.createClass({
	render: function() {
		const appointments = this.props.appointments;
		return (
			<ul className="content-appointment">
				{
					appointments.map((appointment, key) => {
						return (
							<Appointment key={key} appointment={appointment} />
						);
					})
				}
			</ul>
		);
	}
});

var ModalAppointment = React.createClass({
	render: function() {
		return null;
	}
});