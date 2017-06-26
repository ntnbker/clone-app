var BtnAcceptAppointment = React.createClass({
	render: function(){
		return (
			<button
				type="button"
				data-dismiss="modal"
				className="btn-success"
				onClick={this.props.clickAccept}
			>
				Accept
			</button>
		);
	}
});

var BtnDeclineAppointment = React.createClass({
	render: function(){
		return (
			<button 
				type="button" 
				className="btn-decline" 
				onClick={this.props.clickDecline}
			>
				Decline
			</button>
		);
	}
});

var BtnViewAppointment = React.createClass({
	render: function(){
		return (
			<button
				type="button"
				data-dismiss="modal"
				className="btn-view-detail"
				onClick={this.props.clickView}
			>
				View Deails
			</button>
		);
	}
});

var ModalAppointment = React.createClass({
	render: function() {
		const {appointment, current_role} = this.props;
		var title = "";
		if(appointment.appointment_type == "Work Order Appointment") {
			title = "Appointment Request";
		}else if(appointment.appointment_type == "Quote Appointment"){
			title = "Appointment Request For Quote"
		}
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button 
								type="button" 
								className="close"
								data-dismiss="modal" 
								aria-label="Close" 
								onClick={this.props.close}
							>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title text-center">{title}</h4>
						</div>
						<div className="modal-body modal-appointment">
							<CommentAppointment comments={appointment.comments} />
							<p className="">
								<span>Status: </span>
								<span>{appointment.status}</span>
							</p>
							<p className="">
								<span>Date: </span>
								<span>{ moment(appointment.created_at).format('dddd LL') }</span>
							</p>
							<p className="">
								<span>Time: </span>
								<span>{ moment(appointment.created_at).format('LT') }</span>
							</p>
						</div>
						<div className="modal-footer button-appointment-mobile">
						{
							(appointment.status == "Active" && appointment.current_user_role != current_role.role) &&
								<BtnDeclineAppointment clickDecline={() => {this.props.declineAppointment(appointment)}} />
						}
						{
							(appointment.status == "Active" && appointment.current_user_role != current_role.role) &&
								<BtnAcceptAppointment clickAccept={() => {this.props.acceptAppointment(appointment)}} />
						}
						</div>
					</div>
				</div>
			</div>
		);
	}
});