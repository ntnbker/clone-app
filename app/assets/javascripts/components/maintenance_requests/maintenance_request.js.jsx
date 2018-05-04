// Use it for close sidebar in MR show page on mobile
var DONT_CLOSE_WHEN_CLICK_ME_LIST = ['input-search', 'fa-angle-right', 'general-action-title'];

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
				var sliderDetail = $('#slider-detail')
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
			width: !this.props.fullWidth
							? this.state.stlen * this.state.stwidth
							: '100%',
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
									style={{width: temp.props.fullWidth ? '100%': subWidth}}
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

var FixCSS = React.createClass({
	getInitialState() {
    return {};
	},

  componentDidMount() {
		const self = this;
		$('.layout').addClass('new-ui');
		self.resizeSidebar();

		$(window).resize(() => {
			self.resizeSidebar();	
		})
	},
	
	resizeSidebar() {
		if ($(window).width() < 1024) {
			$('.sidebar').css({height: $(window).height()});
			// $('.sidebar > .box-shadow').css({height: $(window).height()});
		} else {
			let menuHeight = 65;
			let footerHeight = 58;
			$('.sidebar').css({height: $(window).height() - menuHeight - footerHeight - 30});
		}
		if ($('.sidebar').height() < $('.sidebar > .box-shadow').height()) {
			$('.sidebar').css({'overflow-y': 'scroll'});
		}
		else {
			$('.sidebar').css({'overflow-y': ''});
		}
	},

  componentWillUnmount() {
		$('.layout').removeClass('new-ui');
		$('.sidebar').css({height: ''});
  },
  
  render() {
    return <div className="display-none" />
  }
});

var UpdateStatusModal = React.createClass({
	getInitialState() {
		const {standBy, actionRequired, awaitingAction} = this.filterHideField(this.props);

		return {
			standBy,
			actionRequired,
			awaitingAction
		};
	},

	filterHideField(props) {
		const {existLandlord, existQuoteRequest, existTradyAssigned} = this.props;

		const actionRequired = [
      {
        title: "New Maintenance Request",
        value: "Initiate Maintenance Request",
      },
      {
      	title: "Send Work Order",
      	value: "Send Work Order",
      },
      {
        title: "Awaiting Tradie's Quote",
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
      	title: "Cancelled Work Order",
      	value: "Cancelled Work Order",
      },
      // {
      //   title: "Pending Payment",
      //   value: "Pending Payment",
      // }
    ];

    const awaitingAction = [
      existLandlord && {
        title: "Awaiting Owner Initiation",
        value: "Awaiting Owner Initiation",
      },
      existLandlord && {
        title: "Awaiting Owner Instruction",
        value: "Awaiting Owner Instruction",
      },
      // {
      //   title: "Awaiting Tradie Initiation",
      //   value: "Awaiting Tradie Initiation",
      // },
			existQuoteRequest && {
        title: "Awaiting Tradie`s Quote",
        value: "Awaiting Quote",
      },
      existQuoteRequest && {
        title: "Awaiting Quote Approval",
        value: "Quote Received Awaiting Approval",
      },
      existTradyAssigned && {
        title: "Quote Approved Tradie To Organise Appointment",
        value: "Quote Approved Tradie To Organise Appointment",
      },
      existTradyAssigned && {
        title: "Tradie To Confirm Appointment",
        value: "Tradie To Confirm Appointment",
      },
      {
        title: "Tenant To Confirm Appointment",
        value: "Tenant To Confirm Appointment",
      },
      existLandlord && {
        title: "Landlord To Confirm Appointment",
        value: "Landlord To Confirm Appointment",
      },
      existTradyAssigned && {
        title: "Maintenance Scheduled - Awaiting Invoice",
        value: "Maintenance Scheduled - Awaiting Invoice",
      },
      existLandlord && {
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
    		value: "Jobs Completed",
    	}
    ];

    return {
			standBy: standBy.filter(v => !!v),
			actionRequired: actionRequired.filter(v => !!v),
			awaitingAction: awaitingAction.filter(v => !!v),
    }
	},

	componentWillReceiveProps(props) {
		const {standBy, actionRequired, awaitingAction} = this.filterHideField(props);

		this.setState({
			standBy,
			actionRequired,
			awaitingAction,
		})
	},

	render() {
		const {standBy, actionRequired, awaitingAction} = this.state;

		return <div className="modal-custom fade update-status-modal">
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
						<h4 className="modal-title text-center">Update Status</h4>
					</div>
					<div className="modal-body">
						<div className="dropdown-assign">
							<p>Stand By</p>
							<DropDownStatus viewItem={(key, item) => this.props.viewItem(key, item)} data={standBy}/>
						</div>
						<div className="dropdown-assign">
							<p className="awaiting">Action Required</p>
							<DropDownStatus viewItem={(key, item) => this.props.viewItem(key, item)} data={actionRequired}/>
						</div>
						<div className="dropdown-assign">
							<p className="awaiting">Awaiting Action</p>
							<DropDownStatus viewItem={(key, item) => this.props.viewItem(key, item)} data={awaitingAction}/>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
});

var AssignModal = React.createClass({
	getInitialState() {
		return {};
	},

	render() {
		const {all_agency_admins, all_agents} = this.props;

		return <div className="modal-custom fade update-status-modal">
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
						<h4 className="modal-title text-center">Assign To</h4>
					</div>
					<div className="modal-body">
						<div className="dropdown-assign">
							<p>Agency Administrators</p>
							<Assigns assigns={all_agency_admins} viewItem={(key, item) => this.props.viewItem(key, item)} />
						</div>
						<div className="dropdown-assign">
							<p className="agent">Agents</p>
							<Assigns assigns={all_agents} viewItem={(key, item) => this.props.viewItem(key, item)} />
						</div>
					</div>
				</div>
			</div>
		</div>;
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
		return {
			isShow: false,
			isShowStatus: false,
		};
	},

	show: function(key) {
		switch(key) {
			case 'assign':
				if (this.state.isBlurAssign) return;
				return this.setState({ isShow: !this.state.isShow, isShowStatus: false }, () => {
					if (this.state.isShow) this.dropdown_assign.focus();
				});
			case 'status':
				if (this.state.isBlurStatus) return;
				return this.setState({ isShowStatus: !this.state.isShowStatus, isShow: false }, () => {
					if (this.state.isShowStatus) this.dropdown_status.focus();
				});
		}
	},

	close: function(key) {
		const self = this;
		switch(key) {
			case 'assign':
				this.setState({
					isShow: false,
					isBlurAssign: true,
				}, () => {
					setTimeout(() => {
						self.setState({ isBlurAssign: false });
					}, 100);
				});
				break;

			case 'status':
				this.setState({
					isShowStatus: false,
					isBlurStatus: true,
				}, () => {
					setTimeout(() => {
						self.setState({ isBlurStatus: false });
					}, 100);
				});
				break;
		}
	},

	render: function() {
		const all_agents = this.props.all_agents;
		const all_agency_admins = this.props.all_agency_admins;
		return (
			<div className="button-header-mr box-shadow">
				<button type="button" className="edit-detail" onClick={(key) => this.props.viewItem('approveJob')}>
					<span>
						Approval Note
					</span>
				</button>
				{/* <button type="button" className="edit-detail" onClick={(key) => this.props.viewItem('splitMR')}>
					<span>
						Split
					</span>
				</button>
				<button type="button" className="edit-detail" onClick={(key) => this.props.viewItem('duplicateMR')}>
					<span>
						Duplicate
					</span>
				</button> */}
				{/* <div id="update-status">
					<button type="button" className="update-status" onClick={(key) => this.show('status')}>
						Update status
					</button>
					<div
						className="dropdown-status"
						style={{display: this.state.isShowStatus ? 'block' : 'none'}}
						ref={elem => this.dropdown_status = elem}
						tabIndex="2"
						onBlur={() => this.close('status')}
					>
					</div>
				</div> */}
				{/* <button type="button" className="edit-detail" onClick={(key) => this.props.viewItem('editMaintenanceRequest')}>
					<i className="fa fa-pencil" aria-hidden="true" />
					<span>
						Edit Details
					</span>
				</button>
				<div className="assign">
					<button type="button"
						className="assign-to"
						id="assign-to"
						ref={elem => this.assignBtn = elem}
						onClick={key => this.show('assign')}
					>
						<i className="icon-user" aria-hidden="true" />
						<span>
							Assign to
						</span>
						<i className="fa fa-angle-down" aria-hidden="true" />
					</button>
					<div
						className="dropdown-assign"
						id="dropdown-assign"
						style={{display: this.state.isShow ? 'block' : 'none'}}
						ref={(elem) => this.dropdown_assign = elem}
						tabIndex="0"
						onBlur={() => this.close('assign')}
					>
						<div>
							<p>Agency Administrators</p>
							<Assigns assigns={all_agency_admins} viewItem={(key, item) => this.props.viewItem(key, item)} />
						</div>
						<div>
							<p className="agent">Agents</p>
							<Assigns assigns={all_agents} viewItem={(key, item) => this.props.viewItem(key, item)} />
						</div>
					</div>
				</div> */}
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
		const maintenance 								= this.props.maintenance_request;
		const { status, strike_approval } = this.props;
		const props = this.props;
		const d = new Date();
		const n = d.getTimezoneOffset();
		const date = new Date(maintenance.created_at);
		let created_at = moment(date).add(-n/60).fromNow();

		return (
			<div className="item-maintenance-request">
				{
					false && props.show_assign &&
						<ButtonHeaderMR
							all_agents={props.all_agents}
							all_agency_admins={props.all_agency_admins}
							existLandlord={props.existLandlord}
							existQuoteRequest={props.existQuoteRequest}
							existTradyAssigned={props.existTradyAssigned}
							viewItem={(key, item) => this.props.viewItem(key, item)}
						/>
				}
				<MaintenaceRequestDetail {...this.props} />
				<TenantContactButton {...this.props} />
			</div>
		);
	}
});

var ModalEditMR = React.createClass({
	getInitialState() {
		return {
			serviceError: '',
			descriptionError: '',
			isSuccess: false,
			position: this.props.position,
		};
	},

	componentWillReceiveProps(nextProps) {
		const {
			serviceError = '', descriptionError = '', isSuccess, position
		} = this.filterErrors(nextProps);

		this.setState({
			isSuccess,
			serviceError,
			descriptionError,
			position,
		});
	},

	filterErrors({ position, errorsForm: { errors = {}, success = [] } }) {
		const { x } = this.props;
		const detectedErrors = (errors && errors[x] || {}).errors || {};

		const description    = this.description.value;
		const serviceType    = this.serviceType.value;

		const isSuccess = !!success.filter(mr => mr.maintenance_description === description && mr.service_type === serviceType).length;

		return {
			position,
			isSuccess: 				 this.state.isSuccess || isSuccess,
			serviceError: 		!this.serviceType.value && detectedErrors.service_type || '',
			descriptionError: !this.description.value && detectedErrors.maintenance_description || '',
		}
	},

	removeError: function({ target: { id } }) {
		this.setState({ [`${id}Error`]: '' })
	},

	renderError: function(error) {
		return <p id="errorbox" className="error">{error ? error : ''}</p>;
	},

	renderServiceType(services) {
		if (!!this.props.trady) return null;
		const { serviceError, isSuccess, position } = this.state;
		const { x }          												= this.props;

		return (
			<div className="row m-t-lg">
				<label>Service Type:</label>
				<select
					id="service"
					disabled={isSuccess && 'disabled' || false}
					ref={e => this.serviceType = e}
					className={"form-control input-custom " + (serviceError ? 'has-error' : '')}
					name={`maintenance_requests[${position}][service_type]`}
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

	render() {
		const { serviceError, descriptionError, isSuccess, position }	= this.state;
		const params 								        								= this.props.params || {};
		const { x = 0, removeField }          							= this.props;

		const { maintenance_request = {}, services = {} } = params;

		return (
			<div className={"modal-body split-maintenance-request edit-maintenance-request " + (isSuccess ? 'mr-success' : '')}>
				<input
				  type="hidden"
					disabled={isSuccess && 'disabled' || false}
				  value={maintenance_request.id}
				  name={`maintenance_requests[${position}][maintenance_request_id]`}
				/>
				<input
					type="hidden"
					value={x}
					name={`indexes[${position}]`}
				/>
				{ isSuccess
					? <div className="alert alert-success">
							This maintenance request has been saved.
						</div>
					: ''
				}
				{
					descriptionError || serviceError
					? <div className="alert alert-danger">
							Sorry there seems to be a problem. One form below is invalid, please fix and resubmit.
						</div>
					: ''
				}
				{this.renderServiceType(services)}
				<div className="row">
					<label>Maintenance Request Description:</label>
					<textarea
						disabled={isSuccess && 'disabled' || false}
						placeholder="Enter Description"
						name={`maintenance_requests[${position}][maintenance_description]`}
						ref={e => this.description = e}
						defaultValue={maintenance_request.maintenance_description}
						id="description"
						onChange={this.removeError}
						className={"u-full-width " + (descriptionError && "has-error")}
					/>
				</div>
				{this.renderError(descriptionError)}

	      { !false && !isSuccess
	      ? <button
		      	type="button"
		      	className="button-remove button-primary red"
		      	onClick={() => removeField(x)}
		      >
		      	Remove
		      </button>
		    : ''
		    }
			</div>

		)
	}
})

var ModalSplitMR = React.createClass({

	getInitialState: function() {
		return {
			result: {},
		};
	},

	onSubmit(e) {
		e.preventDefault();

		const self = this;
		const { splitSubmit } = this.props;

		var FD = new FormData(document.getElementById('splitMRForm'));

		splitSubmit(FD, function({ errors, success }) {
			if (errors) {
				//defined in header.js.jsx
				const indexRegex = /indexes%5B(\d+)%5D=(\d+)/i;
				const indexes = $('#splitMRForm').serialize()
													.split('&')
													.filter(v => indexRegex.test(v))
													.reduce((r, v) => ({
														...r,
														[v.replace(indexRegex, '$1')]: v.replace(indexRegex, '$2')
													}), {});

				const convertedErrors = errors.reduce((result, obj) => {
					const fieldId = indexes[obj.id];
					return {
						...result,
						[fieldId]: obj
					};
				}, {});
				self.setState({ result: { errors: convertedErrors, success } });
			}
		});
	},

	render() {
		const { result }				   						 = this.state;
		const {maintenance_request, services } = this.props;

		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="splitMRForm" onSubmit={this.onSubmit}>
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
							<ShowMessage position="splitMR" />
							<div className="alert alert-info">
								The split feature can be used to split up a maintenance request that a tenant has submitted with multiple types of services required. To ensure each type of tradie receives the correct job type.
							</div>
							<label className="modal-title information">Service Type: {maintenance_request.service_type}</label>
							<label className="modal-title information">Description: {maintenance_request.maintenance_description}</label>
							<div className="scroll-height">
								<FieldList
									SampleField={ModalEditMR}
									flag="splitMR"
									params={{ services, maintenance_request }}
									errors={result}
								/>
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
});

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

var MaintenaceRequestDetail = React.createClass({
	getInitialState() {
		return {};
	},

	render() {
		const {
			show_assign, status, maintenance_request, hide_note, strike_approval
		} = this.props;

		return (
			<div className="mr-detail box-shadow">
				<h5 className="mr-title">Maintenance Request Details</h5>
				<MaintenanceRequestInformation {...this.props} />
				<div className="content">
					<div className="description">
						<h5 className="m-b-n mr-title">Job Description:</h5>
						<p className="job-description">{maintenance_request.maintenance_description}</p>
					</div>
					{ !hide_note && maintenance_request.preapproved_note
						? <div className="vailability pre-approved-note">
								<p className="header small-weight">Approval Note: </p>
								<p className="description job-description">
                  <span className={'approval-note ' + (strike_approval ? 'strike' : '')}>
                    {maintenance_request.preapproved_note}
                  </span>
                  {strike_approval && "As per quote approved"}
                </p>
							</div>
						: ''
					}
				</div>
				<div className="mr-photo">
					<Carousel gallery={this.props.gallery} />
				</div>
				<div className="add-photo contact-button">
					<div className="add-photo-button">
						<button
							type="button"
							className=""
							onClick={() => this.props.onModalWith('addPhoto')}
						>
							Add Photo
						</button>
					</div>
				</div>
			</div>
		)
	}
})

var MaintenanceRequestInformation = React.createClass({
	render() {
		const {maintenance_request, status, property, show_assign} = this.props;

		const n = new Date().getTimezoneOffset();
		const date = new Date(maintenance_request.created_at);
		let created_at = moment(date).add(-n/60).fromNow();

		return (
			<div className="mr-information">
				{
					show_assign &&
					<div className="mr-information">
						<span className="key">Status: </span>
						<span className="data status">{status && status.agent_status}</span>
					</div>
				}
				<div className="mr-information">
					<span className="key">Address: </span>
					<span className="data address">
						<i className="fa fa-map-marker" aria-hidden="true" />
						{property.property_address}
					</span>
				</div>
				<div className="mr-information">
					<span className="key">Submitted: </span>
					<span className="data time">
						{created_at}
					</span>
				</div>
				<div className="mr-information">
					<span className="key">Service Required: </span>
					<span className="data service">
						{maintenance_request.service_type}
					</span>
				</div>
			</div>
		)
	}
})

var TenantContactButton = React.createClass({
	render() {
		const {tenants = [], maintenance_request, landlord, isShowLandlord} = this.props;
		return (
			<div className="box-shadow">
				{isShowLandlord && 
					<div className="landlord-information">
						<h5 className="mr-title">Landlord Details</h5>
						{ !landlord 
							? <div className="no-landlord-text">
									No landlord available for this property
								</div>
							:	<div className="landlord-detail">
									<div className="landlord-name">
										<span className="key">Name: </span>
										<span className="value">{landlord.name}</span>
									</div>
									<div className="phone">
										<span className="key">Phone Number: </span>
										<span className="value">{landlord.mobile}</span>
									</div>
								</div>
						}
						{ !!landlord 
							? <div className="landlord-contact-button contact-button">
									<div className="phone">
										<button
											type="button"
											className="call-landlord"
											onClick={() => this.callLandlord.click()}
										>
											<a
												className="display-none"
												href={"tel:" + landlord.mobile}
												ref={e => this.callLandlord = e}
											/>
											<i className="fa fa-phone" aria-hidden="true" />
											Landlord - {landlord.name}
										</button>
									</div>
									<div className="message">
										<button 
											type="button" 
											className="message-landlord" onClick={() => this.props.onModalWith('sendMessageLandlord')}
										>
											<i className="fa fa-commenting" aria-hidden="true" />
											Landlord - {landlord.name}
										</button>
									</div>
								</div>
							: <div className="landlord-contact-button contact-button">
									<div className="add-landlord">
										<button 
											type="button"
											onClick={() => this.props.onModalWith('addLandlord')}
										>
											<i className="fa fa-plus" aria-hidden="true" />
											Add Landlord
										</button>
									</div>
								</div>
						}
					</div>
				}
				<div className="tenant-information">
					<h5 className="mr-title">Tenant Details</h5>
					<div className="vailability">
						<p className="header small-weight">Tenant Availability and Access Instructions: </p>
						<p className="job-description">{maintenance_request.availability_and_access}</p>
					</div>
					{tenants.map(tenant => (
						<div className="tenant-detail">
							<div className="phone-desktop">
								<div className="phone">
									<span className="key">Phone Number: </span>
									<span className="value">{tenant.mobile}</span>
								</div>
							</div>
							<div className="contact-button">
								<div className="phone">
									<button
										type="button"
										className="call-tenant"
										onClick={() => this[`tenantPhone${tenant.id}`].click()}
									>
										<a
											href={`tel:${tenant.mobile}`}
											ref={e => this[`tenantPhone${tenant.id}`] = e}
											className="display-none"
										/>
										<i className="fa fa-phone" aria-hidden="true" />
										Tenant - {tenant.name}
									</button>
								</div>
								<div className="message">
									<button className="message-landlord" onClick={() => this.props.onModalWith('sendMessageTenant')}>
										<i className="fa fa-commenting" aria-hidden="true" />
										Tenant - {tenant.name}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}
})
