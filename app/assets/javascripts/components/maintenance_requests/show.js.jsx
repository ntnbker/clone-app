	var ModalConfirm = React.createClass({
	render: function() {
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
							<h4 className="modal-title text-center">Confirm Landlord Details</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">{ 'Our records show that "' + this.props.landlord.name + '" is the landlord for "' + this.props.property.property_address + '". Please confirm if this is correct.'}</p>
						</div>
						<div className="modal-footer">
							<button 
								type="button" 
								className="btn btn-default success" 
								onClick={() => this.props.onModalWith('editAskLandlord')} 
								data-dismiss="modal"
							>Yes</button>
							<button 
								type="button" 
								className="btn btn-primary cancel" 
								onClick={() => this.props.onModalWith('addAskLandlord')}
							>No</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ModalAddAskLandlord = React.createClass({
	getInitialState: function() {
		return {
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				let value = e.target.value
				if(value == "") {
					this.setState({errorMobile: true});
				}else {
					if( 10 <= value.length && value.length <= 11) {
						this.setState({errorMobile: false});
					}else {
						if(value.length > 11) {
							value = value.substring(0, 11);
							e.target.value = value;
						}else if(value.length < 10) {
							this.setState({errorMobile: true});
						}
					}
				}
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;
		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		} 

		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.addAskLandlord(params);
		}
		return;
	},

	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
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
								<h4 className="modal-title text-center">Ask landlord for instructions</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<div>
											<input 
												id="name" 
												type="text" 
												name="landlord[name]" 
												placeholder="Landlord Name"
												ref={e => this.name = e}
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<input 
												type="number" 
												minLength="10"
												maxLength="11"
												name="landlord[mobile]" 
												placeholder="Landlord Mobile"
												onChange={this.checkValidate} 
												id="mobile" ref={e => this.mobile = e}
												className={"u-full-width " + (this.state.errorMobile && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<input 
												type="email" 
												autoCorrect="off"
												autoComplete="off"
												autoCapitalize="off"
												name="landlord[email]" 
												placeholder="Landlord Email"
												onChange={this.checkValidate} 
												id="email" ref={e => this.email = e}
												className={"u-full-width " + (this.state.errorEmail && "has-error")} 
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ModalEditAskLandlord = React.createClass({
	getInitialState: function() {
		return {
			isEdit: false,
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	isEdit: function() {
		this.setState({isEdit: !this.state.isEdit});
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				let value = e.target.value
				if(value == "") {
					this.setState({errorMobile: true});
				}else {
					if( 10 <= value.length && value.length <= 11) {
						this.setState({errorMobile: false});
					}else {
						if(value.length > 11) {
							value = value.substring(0, 11);
							e.target.value = value;
						}else if(value.length < 10) {
							this.setState({errorMobile: true});
						}
					}
				}
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}
		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}
		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		}
		
		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					id: this.props.landlord.id,
					maintenance_request_id: this.props.maintenance_request_id,
				}
			}
			this.props.editAskLandlord(params); 
		}

		return
	},

	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form id="editForm" onSubmit={this.submit}>
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
								<h4 className="modal-title text-center">Ask landlord for instructions</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<a className="btn-edit" onClick={this.isEdit}>Edit Landlord Details</a>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<input 
												type="text" 
												placeholder="Landlord Nane"
												onChange={this.checkValidate} 
												readOnly={!this.state.isEdit} 
												id="name" ref={e => this.name = e}
												defaultValue={this.props.landlord.name} 
												className={(this.state.errorName && "has-error") + (!this.state.isEdit && " readonly")}
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<input 
												id="mobile" 
												type="number" 
												minLength="10"
												maxLength="11"
												ref={e => this.mobile = e} 
												placeholder="Landlord Mobile"
												onChange={this.checkValidate} 
												readOnly={!this.state.isEdit}
												defaultValue={this.props.landlord.mobile} 
												className={(this.state.errorMobile && "has-error") + (!this.state.isEdit && " readonly")}
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<input 
												id="email"
												type="text"
												autoCapitalize="off"
												autoCorrect="off"
												autoComplete="off"
												ref={e => this.email = e}
												placeholder="Landlord Email"
												onChange={this.checkValidate}
												readOnly={!this.state.isEdit}
												defaultValue={this.props.landlord.email} 
												className={(this.state.errorEmail && "has-error") + (!this.state.isEdit && " readonly")}
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var SideBarMobile = React.createClass({
	getInitialState: function() {
		return {      
			showAction: false,
			showContact: false
		};
	},

	show: function(key) {
		const height = $( window ).height();
		if(key == 'action') {
			this.setState({showAction: true});
			this.setState({showContact: false});
			if($('#actions-full')) {
				$('#actions-full').css({'height': 350, 'border-width': 1});
			}
		}else {
			this.setState({showAction: false});
			this.setState({showContact: true});
			if($('#contacts-full')) {
				$('#contacts-full').css({'height': 350, 'border-width': 1});
			}
		}
	},

	close: function() {
		if(!!this.state.showAction) {
			this.setState({showAction: false});
		}
		if(!!this.state.showContact) {
			this.setState({showContact: false});
		}
		if($('#actions-full')) {
			$('#actions-full').css({'height': 0, 'border-width': 0});
		}
		if($('#contacts-full')) {
			$('#contacts-full').css({'height': 0, 'border-width': 0});
		}
	},

	componentDidMount: function() {
		const self = this;
		$(document).bind("click", function() {
			self.close();
		})
	},

	render: function() {
		return (
			<div>
				<div className="sidebar-mobile">
					<div className="fixed">       
						<button 
							id="contact" data-intro="Select 'Contact' to call or message." data-position="top"
							className={"contact button-default " + (!!this.state.showContact && 'active')}
							onClick={(key) => this.show('contact')}
						>
							Contact
						</button>
						<button 
							data-intro="Select 'Action' to action the maintenance request." data-position="top"
							className={"actions button-default " + (!!this.state.showAction && 'active')}
							onClick={(key) => this.show('action')}
						>
							Actions
						</button>
					</div>
				</div>
				<div className="action-mobile">
					<ActionMobile 
						close={this.close}
						landlord={this.props.landlord}
						onModalWith={(modal) => this.props.onModalWith(modal)}
					/> 
					<ContactMobile 
						close={this.close}
						tenants={this.props.tenants}
						landlord={this.props.landlord}
						current_user={this.props.current_user}
						assigned_trady={this.props.assigned_trady}
						onModalWith={(modal) => this.props.onModalWith(modal)}
					/> 
				</div>
			</div>
		);
	}
});

var ModalAddLandlord = React.createClass({
	getInitialState: function() {
		return {
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				let value = e.target.value
				if(value == "") {
					this.setState({errorMobile: true});
				}else {
					if( 10 <= value.length && value.length <= 11) {
						this.setState({errorMobile: false});
					}else {
						if(value.length > 11) {
							value = value.substring(0, 11);
							e.target.value = value;
						}else if(value.length < 10) {
							this.setState({errorMobile: true});
						}
					}
				}      
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		} 

		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.addLandlord(params);
		}

		return
	},

	render: function() {
		const {note} = this.props;
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
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
								<h4 className="modal-title text-center">Add Landlord</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<span className="note-landlord">
											{note}
										</span>
									</div>
									<div className="row">
										<div>
											<label>Name <strong>*</strong>:</label>
											<input 
												id="name" 
												type="text" 
												name="landlord[name]" 
												placeholder="Enter Name"
												ref={e => this.name = e}
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input 
												id="mobile" 
												type="number"
												minLength="10"
												maxLength="11"
												name="landlord[mobile]" 
												placeholder="Enter Mobile"
												ref={e => this.mobile = e} 
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorMobile && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input 
												id="email" 
												type="email"
												autoCapitalize="off"
												autoCorrect="off"
												autoComplete="off"
												name="landlord[email]" 
												placeholder="Enter Email"
												ref={e => this.email = e} 
												onChange={this.checkValidate} 
												className={"u-full-width " + (this.state.errorEmail && "has-error")} 
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ModalEditLandlord = React.createClass({
	getInitialState: function() {
		return {
			errorName: false,
			errorEmail: false,
			errorMobile: false,
		};
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
				break;
			}

			case "mobile": {
				let value = e.target.value
				if(value == "") {
					this.setState({errorMobile: true});
				}else {
					if( 10 <= value.length && value.length <= 11) {
						this.setState({errorMobile: false});
					}else {
						if(value.length > 11) {
							value = value.substring(0, 11);
							e.target.value = value;
						}else if(value.length < 10) {
							this.setState({errorMobile: true});
						}
					}
				}
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.name.value == "") {
			this.setState({errorName: true});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({errorMobile: true});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({errorEmail: true});
			flag = true;
		} 

		if(!flag) {
			var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					id: this.props.landlord.id,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.editLandlord(params);
		}
	},

	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
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
								<h4 className="modal-title text-center">Edit Landlord</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<div>
											<label>Name <strong>*</strong>:</label>
											<input 
												id="name" 
												type="text" 
												name="landlord[name]" 
												placeholder="Enter Name"
												ref={e => this.name = e}
												onChange={this.checkValidate}
												defaultValue={this.props.landlord.name} 
												className={"u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input 
												id="mobile"
												type="number"
												minLength="10"
												maxLength="11"
												name="landlord[mobile]" 
												placeholder="Enter Mobile"
												ref={e => this.mobile = e} 
												onChange={this.checkValidate} 
												defaultValue={this.props.landlord.mobile} 
												className={"u-full-width " + (this.state.errorMobile && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input 
												id="email" 
												type="email"
												autoCapitalize="off"
												autoCorrect="off"
												autoComplete="off"
												name="landlord[email]" 
												placeholder="Enter Email"
												ref={e => this.email = e} 
												onChange={this.checkValidate} 
												defaultValue={this.props.landlord.email} 
												className={"u-full-width " + (this.state.errorEmail && "has-error")} 
											/>
										</div>
									</div>
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>Cancel</button>
								<button type="submit" className="btn btn-default success">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ModalRequestModal = React.createClass({
	getInitialState: function() {
		return {
			isAdd: false,
			isTrady: null,
			isDisable: false,
			errorName: false,
			errorEmail: false,
			errorMobile: false,
			errorCompany: false,
			maintenance_request: this.props.maintenance_request,
			trady: {
				id: null,
				name: null,
				email: null,
				mobile: null,
				company_name: null,
			},
		};	
	},

	checkValidate: function(e) {
		var key = e.target.id;

		switch(key) {
			case "company": {
					if(e.target.value == "") {
						this.setState({
							isDisable: true,
							errorCompany: true
						});
					}else {
						this.setState({
							isDisable: false,
							errorCompany: false
						});
					}
					this.state.trady.company_name = e.target.value;
					this.forceUpdate();
				break;
			}

			case "name": {
					if(e.target.value == "") {
						this.setState({
							isDisable: true,
							errorName: true
						});
					}else {
						this.setState({
							isDisable: false,
							errorName: false
						});
					}
					this.state.trady.name = e.target.value;
					this.forceUpdate();
				break;
			}

			case "mobile": {
				let value = e.target.value;
				if(value == "") {
					this.setState({
						isDisable: true,
						errorMobile: true
					});
				}else {
					if( 10 <= value.length && value.length <= 11) {
						this.setState({
							isDisable: false,
							errorMobile: false
						});
					}else {
						if(value.length > 11) {
							value = value.substring(0, 11);
							e.target.value = value;
						}else if(value.length < 10) {
							this.setState({
								isDisable: true,
								errorMobile: true
							});
						}
					}
				}
				this.state.trady.mobile = value;		
				this.forceUpdate();
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({
						isDisable: true,
						errorEmail: true
					});
				}else {
					this.setState({
						isDisable: false,
						errorEmail: false
					});
				}
				this.state.trady.email = e.target.value;
				this.forceUpdate();
				break;
			}
		}
	},

	componentWillMount: function() {
		//this.selectTrady(this.state.maintenance_request.trady_id);
	},

	checkLength: function(e) {
		var value = e.target.value;
		if(value.length > 11) {
			this.setState({
				isDisable: true,
				errorMobile: true,
			});
		}else {
			this.setState({
				isDisable: false,
				errorMobile: false
			});
		}
	},

	selectTrady: function(id) {
		const self = this.props;
		if(!!id){
			for(var i = 0; i < self.tradies.length; i++) {
				const item = self.tradies[i];
				if(item.id == id) {
					this.setState({
						trady: item,
						isAdd: false,
						isDisable: false,
						errorName: false,
						errorEmail: false,
						errorMobile: false,
						errorCompany: false,
					});

					return;
				}
			}
		}

		this.setState({
			isAdd: true,
			isDisable: false,
			errorName: false,
			errorEmail: false,
			errorMobile: false,
			errorCompany: false,
			trady: {
				id: null,
				name: null,
				email: null,
				mobile: null,
				company_name: null,
			},
		});
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.company.value == "") {
			this.setState({
				isDisable: true,
				errorCompany: true
			});
			flag = true;
		}

		if(this.name.value == "") {
			this.setState({
				isDisable: true,
				errorName: true
			});
			flag = true;
		}

		if(this.mobile.value == "") {
			this.setState({
				isDisable: true,
				errorMobile: true
			});
			flag = true;
		}

		if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
			this.setState({
				isDisable: true,
				errorEmail: true
			});
			flag = true;
		} 

		if(!flag) {
			var params = {
				trady: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					company_name: this.company.value,
					maintenance_request_id: this.props.maintenance_request.id,
					trady_id: !!this.state.trady.id ? this.state.trady.id : "",
					skill_required: this.props.maintenance_request.service_type,
					trady_request: this.props.keyTitle == "request-quote" ? "Quote" : "Work Order",
					item: this.state.trady,
				},
			};
			this.props.requestQuote(params);
			this.setState({
				isDisable: true
			});
		}

		return
	},

	changeRadio: function(e) {
		this.setState({
			isTrady: e.target.value,
			isAdd: e.target.value === 'false' ? true : false,
			trady: {
				id: null,
				name: null,
				email: null,
				mobile: null,
			}
		});
	},

	render: function() {
		const self = this;
		const state = this.state;
		const {isTrady, isDisable, trady, isAdd} = this.state;
		const style = {
			background: this.state.isAdd ? 'none' : '#f2f2f2'
		};
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
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
								<h4 className="modal-title text-center">{ this.props.keyTitle == "request-quote" ? "Request Quote" : "Send Work Order" }</h4>
							</div>
							<div className="modal-body">
								<div className="row">
									<div className="radio">
										<label>
											<input type="radio" value="true" onChange={this.changeRadio} checked={isTrady === 'true' && "checked"}/>
											Select trady
										</label>
									</div>
									<div className="radio">
										<label>
											<input type="radio" value="false" onChange={this.changeRadio} checked={isTrady === 'false' && "checked"}/>
											Add trady
										</label>
									</div>
								</div>
								{
									isTrady === 'true' &&
										<div className="row">
											<select 
												id="trady" 
												ref={e => this.trady_id = e}
												className="form-control input-custom"
												onChange={() => this.selectTrady(this.trady_id.value)} 
											>
												<option value="" selected={!trady.id && "selected"}>Select Tradie</option>
												{
													this.props.tradies.map(function(item, index) {
														return (
															<option 
																key={index+1} 
																value={item.id} 
																selected={trady.id == item.id && "selected"}
															>
																{item.name}
															</option>
														);
													})
												}
											</select>
										</div>
								}
								{
									(isTrady === 'false' || (!isAdd && trady.id != null && isTrady === "true")) &&
										<div>
											<div className="row m-t-lg">
												<div>
													<input
														type="text" 
														id="company" 
														style={style}
														ref={e => this.company = e}
														readOnly={!this.state.isAdd}
														onChange={this.checkValidate} 
														placeholder="Enter Company Name"
														value={!!this.state.trady.company_name ? this.state.trady.company_name : ""}
														className={"input-custom u-full-width " + (this.state.errorCompany && "has-error")} 
													/>
												</div>
											</div>
											<div className="row m-t-lg">
												<div>
													<input
														id="name" 
														type="text" 
														style={style}
														placeholder="Enter Name"
														ref={e => this.name = e}
														readOnly={!this.state.isAdd}
														onChange={this.checkValidate}
														value={!!this.state.trady.name ? this.state.trady.name : ""}
														className={"input-custom u-full-width " + (this.state.errorName && "has-error")} 
													/>
												</div>
											</div>
											<div className="row m-t-lg">
												<div>
													<input
														id="email" 
														type="email" 
														style={style}
														autoCapitalize="off"
														autoCorrect="off"
														autoComplete="off"
														placeholder="Enter Email"
														ref={e => this.email = e} 
														readOnly={!this.state.isAdd}
														onChange={this.checkValidate}
														value={!!this.state.trady.email ? this.state.trady.email : ""} 
														className={"input-custom u-full-width " + (this.state.errorEmail && "has-error")} 
													/>
												</div>
											</div>
											<div className="row m-t-lg">
												<div>
													<input 
														id="mobile" 
														type="number"
														style={style}
														placeholder="Enter Mobile"
														ref={e => this.mobile = e} 
														readOnly={!this.state.isAdd}
														onChange={this.checkValidate}
														onKeyPress={(e) => this.checkLength(e)}
														value={!!this.state.trady.mobile ? this.state.trady.mobile : ""} 
														className={"input-custom u-full-width " + (this.state.errorMobile && "has-error")} 
													/>
												</div>
											</div>
										</div>
								}
							</div>
							<div className="modal-footer">
								<button 
									type="button" 
									onClick={this.props.close}
									className="btn btn-primary cancel" 
								>
									Cancel
								</button>
								{
									(isTrady === 'true' || isTrady === 'false' || !!isDisable) &&
										<button 
											type="submit" 
											className="btn btn-default success"
											disabled={(!!state.isDisable) ? true : false}
										>
											Submit
										</button>
								}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var MaintenanceRequest = React.createClass({
	getInitialState: function() {
		const {work_order_appointments, quote_appointments, landlord_appointments} = this.props;
		const comments = [],
					quoteComments = [],
					landlordComments = [];
		work_order_appointments.map((appointment, key) => {
			if(appointment.comments.length > 0) {
				comments.unshift(appointment.comments[0]);
			}
		});
		quote_appointments.map((appointment, key) => {
			if(appointment.comments.length > 0) {
				quoteComments.unshift(appointment.comments[0]);
			}
		});
		landlord_appointments.map((appointment, key) => {
			if(appointment.comments.length > 0) {
				landlordComments.unshift(appointment.comments[0]);
			}
		});

		return {
			modal: "",
			quote: null,
			invoice: null,
			isModal: false,
			statusItem: null,
			assignEmail: null,
			appointment: null,
			comments: comments,
			invoice_pdf_file: null,
			quotes: this.props.quotes,
			status: this.props.status,
			tradies: this.props.tradies,
			quoteComments: quoteComments,
			landlord: this.props.landlord,
			invoices: this.props.invoices,
			landlordComments: landlordComments,
			invoice_pdf_files: this.props.invoice_pdf_files,
			trady_conversation: this.props.trady_conversation,
			maintenance_request: this.props.maintenance_request,
			tenants_conversation: this.props.tenants_conversation,
			landlords_conversation: this.props.landlords_conversation,
			instruction: this.props.instruction ? this.props.instruction : {},
			tradies_with_quote_requests: this.props.tradies_with_quote_requests,
			notification: {
				title: "",
				content: "",
				bgClass: "",
			},
		};
	},

	isClose: function() {
		this.setState({isModal: false});
		this.setState({modal: ""});
		var body = document.getElementsByTagName('body')[0];
		body.classList.remove("modal-open");
		var div = document.getElementsByClassName('modal-backdrop in')[0];
		if(div){
			div.parentNode.removeChild(div);
		}
	},

	onModalWith: function(modal) {
		this.setState({
			modal: modal,
			isModal: true, 
		});
	},

	viewItem: function(key, item) {
		switch(key) {
			case 'viewQuote':
			case 'viewConfirmQuote':
			case 'viewQuoteMessage': {
				this.setState({
					quote: item
				});

				this.onModalWith(key);
				break;
			}

			case 'viewInvoice': {
				this.setState({
					invoice: item
				});

				this.onModalWith(key);
				break;
			}

			case 'viewPdfInvoice': {
				this.setState({
					invoice_pdf_file: item
				});

				this.onModalWith(key);
				break;
			}

			case 'viewAppointment': {
				this.setState({
					appointment: item
				});
				this.onModalWith(key);
				break;
			}

			case 'confirmAssign': {
				this.setState({
					assignEmail: item
				});
				this.onModalWith(key);
				break;
			}

			case 'confirmUpdateStatus': {
				this.setState({
					statusItem: item
				});
				this.onModalWith(key);
				break;
			}

			case 'editMaintenanceRequest': {
				this.onModalWith(key);
				break;
			}

			default: {
				break;
			}
		}
		
	},

	addAskLandlord: function(params){
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/create-and-notify-landlord',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						bgClass: "bg-success",
						title: "Ask landlord for instructions",
						content: "Thank you, the maintenance request has been emailed to the landlord. We will notify you with the landlord's instructions when he/she responds.",
					}
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Ask landlord for instructions",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});  
	},

	editAskLandlord: function(params) {
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/update-and-notify-landlord',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						title: "Ask landlord for instructions",
						content: "Thank you, the maintenance request has been emailed to the landlord. We will notify you with the landlord's instructions when he/she responds.",
						bgClass: "bg-success",
					},
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Ask landlord for instructions",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		}); 
	},

	addLandlord: function(params) {
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/landlords',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						title: "Add Lanlord",
						content: "Your Landlord has been added successfully!",
						bgClass: "bg-success",
					},
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Add Lanlord",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	editLandlord: function(params) {
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/update-landlord',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					landlord: res,
					notification: {
						title: "Edit Lanlord",
						content: "Your Landlord has been updated successfully!",
						bgClass: "bg-success",
					},
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Edit Lanlord",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendMessageLandlord: function(params) {
		const self = this;
		params.message.role = this.props.current_user_role.role;
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				const landlords_conversation = !!self.state.landlords_conversation ? self.state.landlords_conversation : [];
				landlords_conversation.push(res);

				self.setState({
					landlords_conversation: landlords_conversation,
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Landlord",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendMessageTenant: function(params) {
		const self = this;
		params.message.role = this.props.current_user_role.role;
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
			},
			data: params,
			success: function(res){
				const tenants_conversation = !!self.state.tenants_conversation ? self.state.tenants_conversation : [];
				tenants_conversation.push(res);
				self.setState({
					tenants_conversation: tenants_conversation
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Tenants",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendMessageTrady: function(params) {
		const {authenticity_token, maintenance_request, current_user_role} = this.props;
		const self = this;
		params.message.maintenance_request_id = maintenance_request.id;
		params.message.role = current_user_role.role;
		$.ajax({
			type: 'POST',
			url: '/messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			data: params,
			success: function(res){
				const trady_conversation = !!self.state.trady_conversation ? self.state.trady_conversation : [];
				trady_conversation.push(res);
				self.setState({
					trady_conversation: trady_conversation
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Trady",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	sendMessageQuote: function(params) {
		const self = this;
		params.message.role = this.props.current_user_role.role;
		$.ajax({
			type: 'POST',
			url: '/quote_messages',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				let quote = self.state.quote
				quote.conversation = quote.conversation ? quote.conversation : {};
				const messages = !!quote.conversation && quote.conversation.messages ? quote.conversation.messages : [];
				messages.push(res);
				quote.conversation.messages = messages;
				self.setState({
					quote: quote
				});
			},
			error: function(err) {
				self.setState({notification: {
					title: "Message Trady",
					content: err.responseText,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	updateStatusQuote: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/quote_status',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.isClose();
				self.setState({
					quotes: res
				});
				if(params.status == 'Approved') {
					self.setState({notification: {
						title: "Accept Quote",
						content: "You have accepted the quote.",
						bgClass: "bg-success",
					}});
					self.onModalWith('notification');
				}else if(params.status == 'Declined'){
					self.setState({notification: {
						title: "Decline Quote",
						content: "You have declined the quote.",
						bgClass: "bg-success",
					}});
					self.onModalWith('notification');
				}
			},
			error: function(err) {
				
			}
		});
	},

	sendEmailLandlord: function(params, quote) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/forward_quote',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				quote.forwarded_to_landlord = res.forwarded_to_landlord;
				self.setState({
					quote: quote,
					notification: {
						title: "Forward Landlord",
						content: "The email about quote information was sent for Landlord.",
						bgClass: "bg-success",
					}
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Forward Landlord",
					content: "Send emaid is error!",
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	updateQuotes: function(quote) {
		const {quotes} = this.state;
		let data = quotes.map((item, key) => {
			item.forwarded_to_landlord = quote.id == item.id ? quote.forwarded_to_landlord : item.forwarded_to_landlord;
			return item
		});

		this.setState({
			quotes: data
		});
	},
 
	requestQuote: function(params) {
		const self = this;
		const tradies_with_quote_requests = this.state.tradies_with_quote_requests;
		let flag = false;
		tradies_with_quote_requests.map((item, index) => {
			if(params.trady.trady_id == item.id) {
				flag = true;
			}
		});
		
		if(!!flag) {
			self.setState({
				notification: {
					bgClass: "bg-error",
					title: "Duplicate Quote Request",
					content: "You have already requested a quote from this tradie for this maintenance request. Please select another tradie if you would like another quote.",
				},
			});
			self.onModalWith('notification');
		}else {
			$.ajax({
				type: 'POST',
				url: '/tradies',
				beforeSend: function(xhr) {
					xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
				},
				data: params,
				success: function(res){
					tradies_with_quote_requests.push(params.trady.item);
					self.setState({
						tradies: res,
						tradies_with_quote_requests: tradies_with_quote_requests,
						notification: {
							title: "Request Quote",
							content: 'Thank you, a quote has been emailed to "' + params.trady.company_name +'". We will notify you once the quote been received.',
							bgClass: "bg-success",
						},
					});
					self.onModalWith('notification');
				},
				error: function(err) {
					self.setState({notification: {
						title: "Request Quote",
						content: "The request quote is error",
						bgClass: "bg-error",
					}});
					self.onModalWith('notification');
				}
			});	
		}
	},

	sendWorkOrder: function(params) {
		const self = this;
		delete params.item;
		$.ajax({
			type: 'POST',
			url: '/tradies',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.state.maintenance_request.trady_id = !!params.trady.trady_id ? params.trady.trady_id : res[res.length-1].id;
				self.setState({
					tradies: res,
					notification: {
						title: "Send Work Order",
						content: 'Thank you, a work order has been emailed to "Trady Company". You will receive an invoice form "Trady Company" once the job has been completed',
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Send Work Order",
					content: "The work order is error" ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	assignToUser: function() {
		const self = this;
		const {maintenance_request, assignEmail} = this.state;
		var params = {
			email: assignEmail,
			maintenance_request_id: maintenance_request.id,
		};

		$.ajax({
			type: 'POST',
			url: '/reassign_to',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					notification: {
						title: "Assign Matenance Request",
						content: "Thank you for reassigning this Mantenance Request.",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Assign Matenance Request",
					content: "The Assign Matenance Request was error" ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	editMaintenanceRequest: function(params) {
		const self = this;
		params.maintenance_request_id = this.state.maintenance_request.id;
		let {maintenance_request} = this.state;
		$.ajax({
			type: 'POST',
			url: '/update_maintenance_request',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				maintenance_request.service_type = res.service_type;
				maintenance_request.maintenance_heading = res.maintenance_heading;
				maintenance_request.maintenance_description = res.maintenance_description
				self.setState({
					maintenance_request: maintenance_request,
					notification: {
						title: "Edit Maintenance Request",
						content: "The Maintenance Request was update",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Edit Maintenance Request",
					content: "The Maintenance Request didnt update!" ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},

	updateStatusMR: function() {
		const self = this;
		const {maintenance_request, status, statusItem} = this.state;
		const params = {
			action_category: status.action_category,
			maintenance_request_status: statusItem.value,
			maintenance_request_id: maintenance_request.id,
		};
		
		$.ajax({
			type: 'POST',
			url: '/update_maintenance_request_status',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({
					status: res,
					notification: {
						title: "Update Status",
						content: "Thank you for updating the Mantenance Request status",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Update Status",
					content: "The Status of Maintenance Request didnt update!" ,
					bgClass: "bg-error",
				}});
				self.onModalWith('notification');
			}
		});
	},
	
	renderModal: function() {
		if(this.state.isModal) {
			var body = document.getElementsByTagName('body')[0];
			body.className += " modal-open";
			var div = document.getElementsByClassName('modal-backdrop in');

			if(div.length === 0) {
				div = document.createElement('div')
				div.className  = "modal-backdrop in";
				body.appendChild(div);
			}

			switch(this.state.modal) {
				case 'confirm':
					return (
						<ModalConfirm 
							close={this.isClose} 
							landlord={this.state.landlord}
							property={this.props.property}
							onModalWith={(modal) => this.onModalWith(modal)}
						/>
					);

				case 'addAskLandlord':
					return (
						<ModalAddAskLandlord
							close={this.isClose}
							addAskLandlord={this.addAskLandlord}
							authToken={this.props.authenticity_token}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);

				case 'editAskLandlord': 
					return (
						<ModalEditAskLandlord
							close={this.isClose}
							landlord={this.state.landlord}
							editAskLandlord={this.editAskLandlord}
							authToken={this.props.authenticity_token}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);

				case 'notification':
					return (
						<ModalNotification 
							close={this.isClose} 
							bgClass={this.state.notification.bgClass}
							title={this.state.notification.title} 
							content={this.state.notification.content}
						/>
					);

				case 'addLandlordSendEmail':
					return (
						<ModalAddLandlord 
							close={this.isClose}
							addLandlord={this.addLandlord}
							authToken={this.props.authenticity_token}
							maintenance_request_id={this.state.maintenance_request.id}
							note='Please add a landlord and then press "Forward To Landlord"'
						/>
					);

				case 'addLandlord':
					return (
						<ModalAddLandlord 
							close={this.isClose}
							addLandlord={this.addLandlord}
							authToken={this.props.authenticity_token}
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);

				case 'editLandlord':{
					if(!!this.state.landlord) {
						return (
							<ModalEditLandlord 
								close={this.isClose}
								landlord={this.state.landlord}
								editLandlord={this.editLandlord}
								authToken={this.props.authenticity_token}
								maintenance_request_id={this.state.maintenance_request.id}
							/>
						);
					}else {
						return (
							<ModalNotification 
								close={this.isClose} 
								title="Edit Lanlord"
								content="Landlord is empty!"
							/>
						);
					}
				}

				case 'sendMessageLandlord': {
					return (
						<ModalSendMessageLandlord 
							close={this.isClose} 
							current_user={this.props.current_user} 
							authToken={this.props.authenticity_token}
							sendMessageLandlord={this.sendMessageLandlord}
							landlords_conversation={this.state.landlords_conversation} 
							maintenance_request_id={this.state.maintenance_request.id}
						/>
					);
				}

				case 'sendMessageTenant': {
					return (
						<ModalSendMessageTenant 
							close={this.isClose} 
							current_user={this.props.current_user} 
							authToken={this.props.authenticity_token}
							sendMessageTenant={this.sendMessageTenant}
							tenants_conversation={this.state.tenants_conversation}
							maintenance_request_id={this.state.maintenance_request.id} 
						/>
					);
				}

				case 'sendMessageTrady': {
					return (
						<ModalSendMessageTrady 
							close={this.isClose} 
							current_user={this.props.current_user} 
							sendMessageTrady={this.sendMessageTrady}
							trady_conversation={this.state.trady_conversation}
						/>
					);
				}

				case 'viewQuote': {
					return (
						<ModalViewQuote 
							close={this.isClose}
							quote={this.state.quote} 
							quotes={this.state.quotes}
							agency={this.props.agency}
							property={this.props.property}
							landlord={this.state.landlord}
							onModalWith={this.onModalWith} 
							viewQuote={(quote) => this.viewQuote(quote)} 
							updateStatusQuote={this.updateStatusQuote} 
							sendEmailLandlord={this.sendEmailLandlord} current_user={this.props.current_user} 
						/>
					);
				}

				case 'viewQuoteMessage': {
					return (
						<ModalViewQuoteMessage
							close={this.isClose}
							quote={this.state.quote}
							current_user={this.props.current_user}
							sendMessageQuote={this.sendMessageQuote} 
						/>
					)
				}

				case 'requestQuote': {
					return (
						<ModalRequestModal
							close={this.isClose} 
							keyTitle="request-quote"
							tradies={this.state.tradies}
							requestQuote={this.requestQuote}
							maintenance_request={this.state.maintenance_request}
						/>
					);
				}

				case 'sendWorkOrder': {
					return (
						<ModalRequestModal
							close={this.isClose} 
							keyTitle="sen-work-order"
							tradies={this.state.tradies}
							requestQuote={this.sendWorkOrder}
							maintenance_request={this.state.maintenance_request}
						/>
					);
				}

				case 'viewInvoice': {
					return (
							<ModalViewInvoice
								close={this.isClose}
								agency={this.props.agency}
							 	invoice={this.state.invoice} 
							 	invoices={this.state.invoices}
								property={this.props.property}
							/>
					);
					
					break;	
				}

				case 'viewPdfInvoice': {
					return (
							<ModalViewPDFInvoice
								close={this.isClose}
								agency={this.props.agency}
								pdf_url={this.props.pdf_urls[0]}
							 	invoice_pdf_file={this.state.invoice_pdf_file} 
							 	invoice_pdf_files={this.state.invoice_pdf_files}
								property={this.props.property}
							/>
					);
					
					break;	
				}

				case 'editMaintenanceRequest': {
					return (
						<EditMaintenanceRequest
							close={this.isClose}
							services={this.props.services}
							maintenance_request={this.state.maintenance_request}
							editMaintenanceRequest={this.editMaintenanceRequest}
						/>
					);
				}

				case 'viewAppointment': {
					const {comments, quoteComments, landlordComments, appointment} = this.state;
					let commentShow = [];
					switch(appointment.appointment_type) {
						case 'Work Order Appointment': 
							commentShow = [...comments];
							break;

						case 'Quote Appointment': 
							commentShow = [...quoteComments];
							break;

						case 'Landlord Appointment': 
							commentShow = [...landlordComments];
							break;

						default: 
							break;
					}
					return (
						<ModalAppointment
							close={this.isClose}
							comments={commentShow}
							appointment={appointment}
							current_role={this.props.current_user_role}
						/>
					);
				}

				case 'viewConfirmQuote': 
					return (
						<ModalConfirmQuote 
							close={this.isClose}
							title="Cancel Quote"
							quote={this.state.quote}
							updateStatusQuote={this.updateStatusQuote}
							content="Are you sure you want to cancel the job ?"
						/>
					);

				case 'confirmUpdateStatus': 
					return (
						<ModalConfirmUpdateStatus 
							close={this.isClose}
							title="Update Status"
							quote={this.state.quote}
							click={this.updateStatusMR}
							content="Are you sure you want to update the Maintenance request status ?"
						/>
					);

				case 'confirmAssign': 
					return (
						<ModalConfirmUpdateStatus 
							title="Assign Matenance Request"
							close={this.isClose}
							quote={this.state.quote}
							click={this.assignToUser}
							content="Are you sure you want to Reassign this Maintenance request ?"
						/>
					);

				case 'viewModalInstruction':
					return (
						<ModalInstruction
							authenticity_token={this.props.authenticity_token}
							updateInsruction={this.updateInsruction}
						/>
					);
					
				default:
					return null;
			}
		}
	},

	autoScroll: function(key) {
		var offset = $('#' + key).offset();
		$('body').animate({
			scrollTop: offset.top
		}, 500);
		
	},

	openQuoteMesssage: function(quote_id) {
		const {quotes} = this.state;
		let quote = '';
		quotes.map((item, key) => {
			if(item.id == quote_id) {
				quote = item;
				return;
			}
		});

		if(quote) {
			this.viewItem('viewQuoteMessage', quote);
		}
	},

	componentDidMount: function() {
		const self = this;
		const {instruction} = this.state;
		if(!instruction.read_instruction) {
			$('body').chardinJs('start');
			this.onModalWith('viewModalInstruction');
			$(document).click(function(e) {
				var showInstruction = $('.show-instruction');
				if(showInstruction.length > 0) {
					if(e.target.className != 'show-instruction') {
						$('body').chardinJs('stop');
						self.isClose();	
					}
				}
			});
		}else {
			this.viewModalMessage();
		}
	},

	updateInsruction: function(data) {
		this.setState({
			instruction: data
		});
		this.isClose();
		$('body').chardinJs('stop');
		this.viewModalMessage();
	},

	viewModalMessage: function() {
		const href = window.location.href;
		const self = this;
		window.onload = function () {
			if(href.indexOf('email_quote_id') >= 0) {
				self.autoScroll('quotes');
			}else if(href.indexOf('send_maintenance_request_invoice') >= 0) {
				self.autoScroll('invoices');
			}

			const json = self.getUrlVars(href);
			switch(json.message) {
				case 'open_landlord_message': 
						self.onModalWith('sendMessageLandlord');
					break;

				case 'open_tenant_message': 
					self.onModalWith('sendMessageTenant');
					break;

				case 'open_trady_message': 
					self.onModalWith('sendMessageTrady');
					break;

				case 'open_quote_message':
					self.openQuoteMesssage(json.quote_message_id);
					break;

				default:
					break;
			}
		}
	},

	getUrlVars: function(url) {
		var hash;
		var json = {};
		var hashes = url.slice(url.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			json[hash[0]] = hash[1];
		}
		return json;
	},

	summary(e) {
		const {work_order_appointments, landlord_appointments, quote_appointments, current_user_role, tenants} = this.props;
		return ( 
			<div className="summary-container-index" id="summary-container-index">
				<div className="main-summary">
					<div className="section">
						<ItemMaintenanceRequest
							status={this.state.status}
							gallery={this.props.gallery} 
							property={this.props.property}
							all_agents={this.props.all_agents}
							updateStatusMR={this.updateStatusMR}
							all_agency_admins={this.props.all_agency_admins}
							viewItem={(key, item) => this.viewItem(key, item)}
							assignToUser={(email) => this.assignToUser(email)}
							maintenance_request={this.state.maintenance_request}
							show_assign={this.props.current_user_show_quote_message}
						/>
						{	this.props.quotes.length > 0 ?
						 		<Quotes 
							 		quotes={this.state.quotes} 
							 		onModalWith={this.onModalWith} 
							 		landlord={this.state.landlord} 
							 		current_user={this.props.current_user} 
							 		updateStatusQuote={this.updateStatusQuote} 
							 		sendEmailLandlord={this.sendEmailLandlord} 
							 		viewQuote={(key, item) => this.viewItem(key, item)} 
							 		current_user_show_quote_message={this.props.current_user_show_quote_message}
						 		/>
						 		: null
					 	}
						{	this.props.invoices.length > 0 && 
								<Invoices 
									invoices={this.state.invoices} 
									viewInvoice={(key, item) => this.viewItem(key, item)} 
								/>
						}
						{	this.props.invoice_pdf_files.length > 0 && 
								<PDFInvoices 
									invoice_pdf_files={this.state.invoice_pdf_files} 
									viewPDFInvoice={(key, item) => this.viewItem(key, item)} 
								/>
						}
					</div>
					<div className="sidebar">
						<Contact 
							tenants={tenants}
							landlord={this.state.landlord}
							current_user={this.props.current_user} 
							assigned_trady={this.props.assigned_trady}
							onModalWith={(modal) => this.onModalWith(modal)} 
						/>
						<Action 
							landlord={this.state.landlord} 
							onModalWith={(modal) => this.onModalWith(modal)} 
						/>
						{
							work_order_appointments.length > 0 &&
								<AppointmentRequest 
									appointments={work_order_appointments}
									title="Work Order Appointments"
									current_role={current_user_role}
									viewItem={(key, item) => this.viewItem(key, item)}
								/>
						}
						{
							quote_appointments.length > 0 &&
								<AppointmentRequest 
									title="Appointments For Quotes"
									current_role={current_user_role}
									appointments={quote_appointments}
									viewItem={(key, item) => this.viewItem(key, item)}
								/>
						}
						{
							landlord_appointments.length > 0 &&
								<AppointmentRequest 
									title="Landlord Appointments"
									current_role={current_user_role}
									appointments={landlord_appointments}
									viewItem={(key, item) => this.viewItem(key, item)}
								/>
						}
						<Activity logs={this.props.logs} />
					</div>
					{
						work_order_appointments.length > 0 &&
							<AppointmentRequestMobile 
								title="Work Order Appointments"
								current_role={current_user_role}
								appointments={work_order_appointments}
								viewItem={(key, item) => this.viewItem(key, item)}
							/>
					}
					{
						quote_appointments.length > 0 &&
							<AppointmentRequestMobile 
								title="Appointments For Quotes"
								current_role={current_user_role}
								appointments={quote_appointments}
								viewItem={(key, item) => this.viewItem(key, item)}
							/>
					}
					{ 
						landlord_appointments.length > 0 &&
							<AppointmentRequestMobile 
								title="Landlord Appointments"
								current_role={current_user_role}
								appointments={landlord_appointments}
								viewItem={(key, item) => this.viewItem(key, item)}
							/>
					}
					<ActivityMobile logs={this.props.logs} />
				</div>
				<SideBarMobile
					tenants={tenants}
					landlord={this.state.landlord} 
					current_user={this.props.current_user} 
					assigned_trady={this.props.assigned_trady}
					onModalWith={(modal) => this.onModalWith(modal)} 
					viewItem={(key, item) => this.viewItem(key, item)}
				/>
				{ this.renderModal() }
			</div>
		);
	},

	render: function() {
		return (
			<div>
				{ this.summary() }
			</div>
		);
	}
});
