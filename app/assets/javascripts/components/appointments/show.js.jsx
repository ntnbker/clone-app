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
	getInitialState: function() {
		return {
			arrRole: ['AgencyAdmin', 'Agent']
		};
	},

	btnAccept: function() {
		const {appointment, current_role} = this.props;
		if(this.state.arrRole.includes(current_role.role)) {
			return null;
		} else if(appointment.status == "Active" && appointment.current_user_role != current_role.role) {
			return <BtnAcceptAppointment clickAccept={() => this.props.acceptAppointment(appointment)}/>
		}else {
			return null;
		}
	},

	btnDecline: function() {
		const {appointment, current_role} = this.props;
		if(this.state.arrRole.includes(current_role.role)) {
			return null;
		} else if(appointment.status == "Active" && appointment.current_user_role != current_role.role) {
			return <BtnDeclineAppointment clickDecline={() => this.props.declineAppointment(appointment)}/>
		}else {
			return null;
		}
	},

	render: function() {
		const {appointment, current_role, comments} = this.props;
		var title = "";
		switch(appointment.appointment_type) {
			case 'Work Order Appointment': 
				title = "Appointment Request";
				break;

			case 'Quote Appointment': 
				title = "Appointment Request For Quote"
				break;

			case 'Landlord Appointment': 
				title = 'Landlord Appointment';
				break;

			default:
				break;
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
							<CommentAppointment comments={comments} />
							<p className="">
								<span>Status: </span>
								<span>{appointment.status}</span>
							</p>
							<p className="">
								<span>Date: </span>
								<span>{ moment(appointment.date).format('dddd LL') }</span>
							</p>
							<p className="">
								<span>Time: </span>
								<span>{ moment(appointment.time).format('LT') }</span>
							</p>
						</div>
						<div className="modal-footer button-appointment-mobile">
						{this.btnDecline()}
						{this.btnAccept()}
						</div>
					</div>
				</div>
			</div>
		);
	}
});