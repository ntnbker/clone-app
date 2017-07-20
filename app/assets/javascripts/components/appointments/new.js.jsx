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
		month = parseInt(now.getMonth()) + 1;
		month = month.toString().length == 1 ? '0' + month : month;
		var currentDate = new Date(now.getFullYear() + '-' + month + '-' + now.getDate());
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
      date.push(
        <option key={i} value={i} disabled={currentDate.valueOf() == stateDate.valueOf() ? i < hours ? true : false : false}>
          { value }
        </option>
      );
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
		const comments = this.props.comments ? this.props.comments : [];
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
			date: null,
		};	
	},

	submit: function(e) {
		e.preventDefault();
		const time = $('#hour').val() + ':' + $('#minute').val();
		var params = {
			time: time,
			date: this.date.value,
			body: this.comment.value,
			appointment_type: this.props.type,
		};
		this.props.addAppointment(params);
	},

	changeDate: function(e){
		this.setState({
			date: e.target.value
		});
	},

	componentDidMount: function() {
		var now = new Date();
		month = (parseInt(now.getMonth()) + 1);
		month = month.toString().length == 1 ? '0' + month : month;
		date = now.getFullYear() + '-' + month + '-' + now.getDate();
		document.getElementById('date').setAttribute("min", date);
	},

	render: function() {
		var appointment = this.props.appointment ? this.props.appointment : {};
		const now = new Date();
		const date = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear();
		const time = now.getHours() + ':' + now.getMinutes();
		const {title, comments} = this.props;
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
											required
											placeholder="Comment" 
											className="text-center"
											ref={ref => this.comment = ref} 
										/>
									</div>
									<div className="form-group date-time">
										<div className="date">
											<label>Date</label>
											<input 
												required
												id="date"
												type="date"
												defaultValue={date}
												ref={ref => this.date = ref}
												onChange={this.changeDate}
											/>
										</div>
										<div className="time">
											<label>Time</label>
											<SelectTime date={this.state.date} onChange={this.checkValidate} />
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