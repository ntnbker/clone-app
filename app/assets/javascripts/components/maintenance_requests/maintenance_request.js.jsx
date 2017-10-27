var Carousel = React.createClass({
	getInitialState: function() {
		const gallery = this.props.gallery.length > 0 ? this.props.gallery : [];
		return {
			stx: 0,
			stpos: 0,
			stwidth: 0,
			indexSlider: 0,
			gallery: gallery,
			stlen: gallery.length,
		};
	},

	sliderRun: function(stpos) {
		var stx = stpos * -this.state.stwidth;
		this.setState({
			stx: stx,
			stpos: stpos,
		});
	},

	sliderPrev: function() {
		var stpos = this.state.stpos - 1;
		if(stpos < 0) {
			stpos = this.state.stlen - 1;
		}
		this.sliderRun(stpos);
	},

	sliderNext: function() {
		var stpos = this.state.stpos + 1;
		if(stpos >= this.state.stlen) {
			stpos = 0;
		}
		this.sliderRun(stpos);
	},

	setWidth: function(width) {
		if(width) {
			this.setState({
				stwidth: width
			});
		}
	},

	componentDidMount: function() {
		const self = this;
		var sliderDetail = $('#slider-detail')
		if(sliderDetail.length > 0) {
			this.setWidth(sliderDetail.width())

			$( window ).resize(function() {
				self.setWidth(sliderDetail.width());
			});

			sliderDetail.on("touchstart", function(event){
				var xClick = event.originalEvent.touches[0].pageX;
				$(this).one("touchmove", function(event){
					var xMove = event.originalEvent.touches[0].pageX;
					if(Math.ceil(xClick - xMove) > 5 ){
						self.sliderNext();
					}
					else if( Math.ceil(xClick - xMove) < -5 ){
						self.sliderPrev();
					}
				});
				sliderDetail.on("touchend", function(){
					$(this).off("touchmove");
				});
			});
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			gallery: nextProps.gallery,
			stlen: nextProps.gallery.length > 0 ? nextProps.gallery.length : 0
		});
	},

	render: function() {
		var styles = {
			left: this.state.stx,
			width: this.state.stlen * this.state.stwidth,
		};
		const temp = this;
		var subWidth = 100/(this.state.stlen ? this.state.stlen : 1) + '%';
		return (
			<div className="slider-custom" id="slider-detail">
				<div className="swiper-container swiper-container-horizontal">
					<div className="swiper-wrapper slider" style={styles} id="mySlider">
					{
						this.state.gallery.map(function(img, index) {
							return (
								<img
									key={index}
									src={img}
									style={{width: subWidth}}
									className="swiper-slide slide-image"
								/>
							);
						})
					}
					</div>
				</div>
				<div className="swiper-pagination">
				{
					this.state.gallery.length > 1 ?
						this.state.gallery.map(function(img, index) {
							return (
								<span
									key={index}
									className={"swiper-pagination-bullet " + (temp.state.stpos == index && "swiper-pagination-bullet-active")}
									onClick={(stops) => temp.sliderRun(index)}
								>

								</span>
							);
						})
						: null
				}
				</div>
				{
					this.state.gallery.length > 1 && <div className="btn-slider btn-next" onClick={this.sliderNext}><i className="fa fa-angle-right"></i></div>
				}
				{
					this.state.gallery.length > 1 && <div className="btn-slider btn-prev" onClick={this.sliderPrev}><i className="fa fa-angle-left"></i></div>
				}

			</div>
		);
	}
});

var Assigns = React.createClass({
	render: function() {
		const assigns = this.props.assigns;
		return (
			<ul>
				{
					assigns.map((item, key) => {
						if(item.name || item.first_name){
							return (
								<li key={item.id}>
									<a onClick={(key, data) => this.props.viewItem('confirmAssign', item.email)}>
										{ item.name ? item.name : item.first_name + " " + item.last_name }
									</a>
								</li>
							);
						}

					})
				}
			</ul>
		);
	}
});

var DropDownStatus = React.createClass({
	viewItem: function(status) {
		this.props.viewItem('confirmUpdateStatus', status);
	},

	render: function() {
		return (
			<ul>
				{
					this.props.data.map((item, key) => {
						return (
							<li key={key} onClick={(status) => this.viewItem(item)}>
								{item.title}
							</li>
						);
					})
				}
			</ul>
		);
	}
});

var ButtonHeaderMR = React.createClass({
	getInitialState: function() {
		const actionRequests = [
      {
        title: "Maintenance Request",
        value: "Initiate Maintenance Request",
      },
      {
        title: "Awaiting Tradie`s Quote",
        value: "Awaiting Quote",
      },
      {
        title: "Quote Requested",
        value: "Quote Requested",
      },
      {
        title: "Quote Received",
        value: "Quote Received",
      },
      {
        title: "New Invoice",
        value: "New Invoice",
      },
      {
        title: "Pending Payment",
        value: "Pending Payment",
      }
    ];

    const awaitingAction = [
      {
        title: "Awaiting Owner Initiation",
        value: "Awaiting Owner Initiation",
      },
      {
        title: "Awaiting Owner Instruction",
        value: "Awaiting Owner Instruction",
      },
      {
        title: "Awaiting Tradie Initiation",
        value: "Awaiting Tradie Initiation",
      },
      {
        title: "Awaiting Quote Approval",
        value: "Quote Received Awaiting Approval",
      },
      {
        title: "Quote Approved Tradie To Organise Appointment",
        value: "Quote Approved Tradie To Organise Appointment",
      },
      {
        title: "Tradie To Confirm Appointment",
        value: "Tradie To Confirm Appointment",
      },
      {
        title: "Tenant To Confirm Appointment",
        value: "Tenant To Confirm Appointment",
      },
      {
        title: "Landlord To Confirm Appointment",
        value: "Landlord To Confirm Appointment",
      },
      {
        title: "Maintenance Scheduled - Awaiting Invoice",
        value: "Maintenance Scheduled - Awaiting Invoice",
      },
      {
        title: "Maintenance Scheduled With Landlord",
        value: "Maintenance Scheduled With Landlord",
      }
    ];

    const standBy = [
    	{
    		title: "Defer",
    		value: "Defer",
    	},
    	{
    		title: "Archive",
    		value: "Archive",
    	}
    ];

		return {
			isShow: false,
			standBy: standBy,
			isShowStatus: false,
			actionRequests: actionRequests,
			awaitingAction: awaitingAction,
		};
	},

	show: function(key) {
		switch(key) {
			case 'assign':
				return this.setState({ isShow: !this.state.isShow, isShowStatus: false });
			case 'status':
				return this.setState({ isShowStatus: !this.state.isShowStatus, isShow: false });
		}
	},

	close: function(key) {
		switch(key) {
			case 'assign':
				this.setState({
					isShow: false
				});
				break;

			case 'status':
				this.setState({
					isShowStatus: false
				});
				break;
		}
	},

	componentDidMount: function() {

	},

	render: function() {
		const all_agents = this.props.all_agents;
		const all_agency_admins = this.props.all_agency_admins;
		const {standBy, actionRequests, awaitingAction} = this.state;
		return (
			<div className="actions">
				<button className="button-primary edit-detail" onClick={(key) => this.props.viewItem('splitMR')}>
					<span>
						Split
					</span>
				</button>
				<button className="button-primary edit-detail" onClick={(key) => this.props.viewItem('duplicateMR')}>
					<span>
						Duplicate
					</span>
				</button>
				<div id="update-status">
					<button className="button-primary update-status" onClick={(key) => this.show('status')}>
						Update status
					</button>
					<div className="dropdown-status" style={{display: this.state.isShowStatus ? 'block' : 'none'}}>
						<div>
							<p>Stand By</p>
							<DropDownStatus viewItem={(key, item) => this.props.viewItem(key, item)} data={standBy}/>
						</div>
						<div>
							<p className="awaiting">Action Request</p>
							<DropDownStatus viewItem={(key, item) => this.props.viewItem(key, item)} data={actionRequests}/>
						</div>
						<div>
							<p className="awaiting">Awaiting Action</p>
							<DropDownStatus viewItem={(key, item) => this.props.viewItem(key, item)} data={awaitingAction}/>
						</div>
					</div>
				</div>
				<button className="button-primary edit-detail" onClick={(key) => this.props.viewItem('editMaintenanceRequest')}>
					<i className="fa fa-pencil" aria-hidden="true" />
					<span>
						Edit Details
					</span>
				</button>
				<div className="assign">
					<button className="button-primary assign-to" id="assign-to" onClick={(key) => this.show('assign')}>
						<i className="icon-user" aria-hidden="true" />
						<span>
							Assign to
						</span>
						<i className="fa fa-angle-down" aria-hidden="true" />
					</button>
					<div className="dropdown-assign" style={{display: this.state.isShow ? 'block' : 'none'}}>
						<div>
							<p>Agency Administrators</p>
							<Assigns assigns={all_agency_admins} viewItem={(key, item) => this.props.viewItem(key, item)} />
						</div>
						<div>
							<p className="agent">Agents</p>
							<Assigns assigns={all_agents} viewItem={(key, item) => this.props.viewItem(key, item)} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ModalConfirmMR = React.createClass({
	handleConfirm: function() {
		this.props.confirm();
	},

	render: function() {
		const {title, content} = this.props;
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
								onClick={this.handleConfirm}
								data-dismiss="modal"
							>Yes</button>
							<button
								type="button"
								className="btn btn-primary cancel"
								onClick={this.props.close}
							>No</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ItemMaintenanceRequest = React.createClass({
	render: function() {
		const maintenance = this.props.maintenance_request;
		const {status} = this.props;
		const props = this.props;
		const d = new Date();
		const n = d.getTimezoneOffset();
		const date = new Date(maintenance.created_at);
		let created_at = moment(date + (-n/60)).fromNow();
		return (
			<div className="post">
				<div className="info">
					<div className="info-title">
						{
							props.show_assign &&
								<div className="title">
									<button className="button-primary" type="">{status && status.agent_status}</button>
								</div>
						}
						<div className="author">
							<i className="fa fa-map-marker" aria-hidden="true" />
							<span className="address">
								{this.props.property.property_address}.
							</span>
							<a className="time">
								{created_at}
							</a>
							<a>|</a>
							<a className="name-author">{maintenance.service_type}</a>
						</div>
					</div>
					{
						props.show_assign &&
							<ButtonHeaderMR
								all_agents={props.all_agents}
								all_agency_admins={props.all_agency_admins}
								viewItem={(key, item) => this.props.viewItem(key, item)}
							/>
					}
				</div>
				<div className="content">
					<div className="description">
						<p className="m-b-n">Job Description:</p>
						<p>{maintenance.maintenance_description}</p>
					</div>
					<div className="vailability">
							<p className="header">Tenant Availability and Access Instructions: </p>
							<p className="description">{maintenance.availability_and_access}</p>
					</div>
					<Carousel gallery={this.props.gallery} />
				</div>
			</div>
		);
	}
});

var ModalSplitMR = React.createClass({

	getInitialState: function() {
		return {
			titleError: false,
			serviceError: false,
			descriptionError: false,
		};
	},

	removeError: function({ target: { id } }) {
		this.setState({ [`${id}Error`]: '' })
	},

	renderError: function(error) {
		return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
	},

	renderServiceType(maintenance_request, services) {
		if (!!this.props.trady) return null;
		const { serviceError } = this.state;

		return (
			<div className="row m-t-lg">
				<label>Service Type:</label>
				<select
					id="service"
					ref={e => this.serviceType = e}
					className={"form-control input-custom " + (serviceError ? 'border_on_error' : '')}
					name="maintenance_request[service_type]"
					defaultValue={maintenance_request.service_type}
					onChange={this.removeError}
				>
					<option value="">Service Type</option>
					{
						services.map(function(service, index) {
							return (
								<option
									key={index+1}
									value={service.service}
								>
									{service.service}
								</option>
							);
						})
					}
				</select>
				{this.renderError(serviceError)}
			</div>
		);
	},

	renderMR: function() {
		return (
			<div className="modal-body edit-maintenance-request">
				{this.renderServiceType(maintenance_request, services)}
				<div className="row">
					<label>Maintenance Request Description:</label>
					<textarea
						placeholder="Enter Description"
						name="maintenance_request[maintenance_description]"
						ref={e => this.description = e}
						id="description"
						onChange={this.removeError}
						defaultValue={maintenance_request.maintenance_description}
						className={"u-full-width " + (descriptionError && "has-error")}
					/>
				</div>
				{this.renderError(descriptionError)}
			</div>
		)
	},

	onSubmit(e) {
		e.preventDefault();
		const { splitSubmit } = this.props;

		splitSubmit({}, function(errors) {
			if (errors) {
				this.setState({ errors });
			}
		})
	},

	render() {

		const { descriptionError, titleError, serviceError } = this.state;
		const {maintenance_request, services} = this.props;

		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.onSubmit}>
							<input
							  type="hidden"
							  value={maintenance_request.id}
							  name="maintenance_request[maintenance_request_id]"
							  id="maintenance_request_maintenance_request_id"
							/>
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
								<h4 className="modal-title text-center">Split Maintenance Request</h4>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									onClick={this.props.close}
									className="btn btn-primary cancel"
								>Cancel</button>
								<button
									type="submit"
									className="btn btn-default success"
									disabled={titleError || descriptionError || serviceError}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
})

var ModalConfirmUpdateStatus = React.createClass({
	render: function() {
		const {content, title} = this.props;
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
								data-dismiss="modal"
								onClick={this.props.click}
								className="btn btn-default success"
							>Yes</button>
							<button
								type="button"
								className="btn btn-primary cancel"
								onClick={this.props.close}
							>No</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
