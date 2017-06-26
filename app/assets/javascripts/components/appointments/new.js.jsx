var SelectTime = React.createClass({
	getInitialState: function() {
			return null;
	},

	makeHour: function() {
    var date=[];
    date.push(<option key="-1" value="">--</option>);
    var value = "";
    for (var i=0; i<24; i++) {
      if(i == 0) {
        value = "12 AM";
      } else if(i <= 11) {
        value = i < 10 ? "0" + i : i;
        value += " AM";
      } else if(i == 12) {
        value = i + " PM";
      } else if(i >= 13) {
        value = (i - 12) < 10 ? "0" + (i - 12) : (i - 12);
        value += " PM";
      }
      date.push(
        <option key={i} value={i}>
          { value }
        </option>
      );
    }
    return date;
  },

  makeMinute: function() {
    const data = [0, 15, 30, 45];
    var date=[];
    date.push(<option key="-1" value="">--</option>);
    data.map((item, key) => {
      date.push(<option key={key} value={item}>{item == 0 ? item + "0" : item}</option>);
    });
    
    return date;
  },

	render: function() {
		const errorTime = this.props.errorTime;
		return (
			<div>
				<select
					required
					id="hour"
					name="hour"
					ref={ref => this.hour = ref}
					onChange={this.props.onChange}
					className={"select-hour"}
				>
					{this.makeHour()}
				</select>
				<select
					id="minute"
					name="minute"
					onChange={this.props.onChange}
					ref={ref => this.minute = ref}
					className={"select-hour"}
				>
					{this.makeMinute()}
				</select>
			</div>
		);
	}
});

var CommentAppointment = React.createClass({
	render: function() {
		const comments = this.props.comments ? this.props.comments : [];
		return (
			<div className="comments">
				{
					comments.map((comment, key) => 
						<div key={comment.id} className="comment">
							<p className="content">
								{comment.body}
							</p>
							<p className="detail">
								<span className="date-time">
									{moment(comment.created_at).format('lll')}
								</span>
							</p>
						</div>
					)
				}
			</div>
		);
	}
});

var ModalAddAppointment = React.createClass({
	submit: function(e) {
		e.preventDefault();
		const time = $('#hour').val() + ':' + $('#minute').val();
		var params = {
			date: this.date.value,
			time: time,
			body: this.comment.value,
		};
		this.props.addAppointment(params);
	},

	render: function() {
		var appointment = this.props.appointment ? this.props.appointment : {};
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<form onSubmit={this.submit}>
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
								<h4 className="modal-title text-center">Create Appointment</h4>
							</div>
							<div className="modal-body modal-appointment">
								<CommentAppointment comments={appointment.comments} />
								<div className="new_appointment"> 
									<div className="form-group">
										<textarea ref={ref => this.comment = ref} placeholder="Comment" className="text-center"/>
									</div>
									<div className="form-group date-time">
										<div className="date">
											<label>Date</label>
											<input 
												required 
												id="date"
												type="date"
												onChange={this.checkValidate}
												ref={ref => this.date = ref}
											/>
										</div>
										<div className="time">
											<label>Time</label>
											<SelectTime 
												onChange={this.checkValidate}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="submit"
									data-dismiss="modal"
									className="btn btn-default success"
								>
									Submit Comment and Appointment Time
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});