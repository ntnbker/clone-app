var SelectTime = React.createClass({
	getInitialState: function() {
			return {
				date: this.props.date
			};
	},

	makeHour: function() {
		var now = new Date();
		hours = parseInt(now.getHours());
		minutes = parseInt(now.getMinutes());
		dt = parseInt(now.getDate());
		dt = dt.toString().length == 1 ? '0' + dt : dt;
		month = parseInt(now.getMonth()) + 1;
		month = month.toString().length == 1 ? '0' + month : month;
		var currentDate = new Date(now.getFullYear() + '-' + month + '-' + dt);
		var stateDate = new Date(this.state.date);
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

      if(stateDate.valueOf() == currentDate.valueOf() && i < hours){
      	date.push(
	        <option key={i} value={i}>
						{ value }
	 				</option>
				);
      } else {
      	date.push(
    			<option key={i} value={i}>
	        	{ value }
	 				</option>
				);
      }
    }

    return date;
	},

  makeMinute: function() {
    const data = [0, 15, 30, 45];
    var date=[];
    var now = new Date();
		minutes = parseInt(now.getMinutes());
    date.push(<option key="-1" value="">--</option>);
    data.map((item, key) => {
      date.push(<option key={key} value={item}>{item == 0 ? item + "0" : item}</option>);
    });

    return date;
  },

  componentWillReceiveProps: function(nextProps) {
  	this.setState({
  		date: nextProps.date
  	});
  },

	render: function() {
		const errorTime = this.props.errorTime;
		return (
			<div>
				<select
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
	autoScroll: function() {
		$('#message').animate({
  		scrollTop: $('#message').get(0).scrollHeight
  	}, 200);
	},

	componentDidMount: function() {
		this.autoScroll();
	},

	componentDidUpdate: function() {
		this.autoScroll();
	},

	render: function() {
		const comments = this.props.comments || [];
		return (
			<div className="comments" id="message">
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
	getInitialState: function() {
		return {
			date: new Date(),
			errorDate   : '',
			errorTime   : '',
			errorComment: '',
		};
	},

	submit: function(e) {
		e.preventDefault();
		const time = $('#hour').val() + ':' + $('#minute').val();
		const self = this;
		var params = {
			time: time,
			date: this.date.value,
			body: this.comment.value,
			appointment_type: this.props.type,
		};
		this.props.addAppointment(params, function(err) {
			if (err) {
				self.setState({
					errorDate: err['date'],
					errorTime: err['time'],
					errorComment: err['comments.body'],
				});
			}
		});
	},

	changeDate: function(e) {
		this.setState({
			date: e.target.value,
			errorDate: '',
		});
	},

	changeTime: function(e) {
		this.setState({
			errorTime: '',
		})
	},

	changeComment: function(e) {
		this.setState({
			errorComment: '',
		})
	},

	renderError: function(error) {
	  return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
	},

	componentDidMount: function() {
		$('#date-appointment').datepicker({ dateFormat: "yy-mm-dd", minDate: new Date() });
	},

	render: function() {
		var appointment = this.props.appointment ? this.props.appointment : {};
		const now = new Date();
		const date = new Date().toISOString().substring(0, 10);
		const time = now.getHours() + ':' + now.getMinutes();
		const {title, comments} = this.props;
		const { errorTime, errorDate, errorComment } = this.state;

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
								<h4 className="modal-title text-center">{title}</h4>
							</div>
							<div className="modal-body modal-appointment">
								<div className="new_appointment">
									<CommentAppointment comments={comments} />
									<div className="form-group">
										<textarea
											placeholder="Comment"
											className={"text-center" + (errorComment ? ' border_on_error' : '')}
											onChange={this.changeComment}
											ref={ref => this.comment = ref}
										/>
									</div>
									{this.renderError(errorComment)}
									<div className="form-group date-time">
										<div className="date">
											<label>Date</label>
											<input
												id="date-appointment"
												type="date"
												defaultValue={date}
												className={"datepicker" + (errorDate ? ' border_on_error' : '')}
												ref={ref => this.date = ref}
												onChange={this.changeDate}
											/>
											{this.renderError(errorDate)}
										</div>
										<div className="time">
											<label>Time</label>
											<SelectTime
												date={this.state.date}
												onChange={this.changeTime}
												className={(errorDate ? 'border_on_error' : '')}
											/>
											{this.renderError(errorTime)}
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
									Create Appointment
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});

var ModalConfirmAppointment = React.createClass({
	render: function() {
		const {title, content, btnContent} = this.props;
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
						<div className="modal-body">
							<p className="text-center">{content}</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-default success"
								onClick={this.props.openModal}
								data-dismiss="modal"
							>{btnContent}</button>
							<button
								type="button"
								className="btn btn-default cancel"
								onClick={this.props.close}
								data-dismiss="modal"
							>Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
