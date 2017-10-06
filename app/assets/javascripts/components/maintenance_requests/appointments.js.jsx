var Appointment = React.createClass({
	render: function() {
		const appointment = this.props.appointment;
		return (
			<li>
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
				<div>
					<button className="btn-view" onClick={(key, item) => this.props.viewItem('viewAppointment', appointment)}>
						View Details
					</button>
				</div>
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
							<Appointment 
								key={key} 
								appointment={appointment}
								viewItem={(key, item) => this.props.viewItem(key, item)}
							/>
						);
					})
				}
			</ul>
		);
	}
});

var ModalViewAppointment = React.createClass({
	render: function() {
		const appointment = this.props.appointment;
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button 
								type="button" 
								className="close"
								aria-label="Close" 
								data-dismiss="modal" 
								onClick={this.props.close}
							>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title text-center">Appointment</h4>
						</div>
						<div className="modal-body">
							<div className="modal-appointment">
								<div className="info">
									<p className="status">
										<span>Status:</span>
										<span> { appointment.status }</span>
									</p>
									<p className="date">
										<span>Date:</span>
										<span> { moment(appointment.created_at).format('dddd LL') }</span>
									</p>
									<p className="time">
										<span>Time:</span>
										<span> { moment(appointment.created_at).format('LT') }</span>
									</p>
								</div>
								<p>Comments</p>
								<div className="comments">
									{
										appointment.comments.map((comment, key) => {
											return (
												<div key={key} className="comment">
													<p className="content">
														{ comment.body }
													</p>
													<p className="date-time">
														{ moment(comment.created_at).format('LLL') }
													</p>
												</div>
											);
										})
									}
								</div>
							</div>	
						</div>
					</div>
				</div>
			</div>
		);
	}
});