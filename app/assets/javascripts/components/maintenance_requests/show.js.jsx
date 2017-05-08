const EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');

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
							<h4 className="modal-title text-center">Confirm Landlord</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">Is {this.props.landlord.name} the correct landlord for {this.props.property.property_address}</p>
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
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
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
								<h4 className="modal-title text-center">Forward Maintenance request</h4>
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
												className={"u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input className={"u-full-width " + (this.state.errorMobile && "has-error")} id="mobile" ref={e => this.mobile = e} name="landlord[mobile]" type="number" onChange={this.checkValidate} placeholder="Enter Mobile"/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input className={"u-full-width " + (this.state.errorEmail && "has-error")} id="email" ref={e => this.email = e} name="landlord[email]" type="text" onChange={this.checkValidate} placeholder="Enter Email"/>
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
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
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
								<h4 className="modal-title text-center">Forward Maintenance request</h4>
							</div>
							<div className="modal-body">
									<div className="row">
										<a className="btn-edit" onClick={this.isEdit}>Edit</a>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<label>Name <strong>*</strong>:</label>
											<input 
												type="text" 
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
											<label>Mobile <strong>*</strong>:</label>
											<input 
												id="mobile" 
												type="number" 
												ref={e => this.mobile = e} 
												onChange={this.checkValidate} 
												readOnly={!this.state.isEdit} 
												defaultValue={this.props.landlord.mobile} 
												className={(this.state.errorMobile && "has-error") + (!this.state.isEdit && " readonly")}
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div className="form-input">
											<label>Email <strong>*</strong>:</label>
											<input 
												id="email"
												type="text"
												ref={e => this.email = e}
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
		if(key == 'action') {
			this.setState({showAction: !this.state.showAction});
		}else {
			this.setState({showContact: !this.state.showContact});
		}
	},

	render: function() {
		return (
			<div>
				<div className="sidebar-mobile">
					<div className="fixed">       
						<button className="contact button-default" onClick={(key) => this.show('contact')}>Contact</button>
						<button className="actions button-default" onClick={(key) => this.show('action')}>Actions</button>
					</div>
				</div>
				{ !!this.state.showAction && <ActionMobile close={(key) => this.show('action')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} /> }
				{ !!this.state.showContact && <ContactMobile close={(key) => this.show('contact')} onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} current_user={this.props.current_user} /> }
			</div>
		);
	}
});

var ModalNotification = React.createClass({
	render: function() {
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className={'modal-header ' + (this.props.bgClass && this.props.bgClass)}>
							<button 
								type="button" 
								className="close"
								aria-label="Close" 
								data-dismiss="modal" 
								onClick={this.props.close}
							>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title text-center">{ this.props.title }</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">{ this.props.content }</p>
						</div>
					</div>
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
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
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
												type="text" 
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
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
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
												type="text" 
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
			errorName: false,
			errorEmail: false,
			errorMobile: false,
			errorCompany: false,
			maintenance_request: this.props.maintenance_request,
			trady: {
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
						this.setState({errorCompany: true});
					}else {
						this.setState({errorCompany: false});
					}
					this.state.trady.company_name = e.target.value;
					this.forceUpdate();
				break;
			}

			case "name": {
					if(e.target.value == "") {
						this.setState({errorName: true});
					}else {
						this.setState({errorName: false});
					}
					this.state.trady.name = e.target.value;
					this.forceUpdate();
				break;
			}

			case "mobile": {
				if(e.target.value == "") {
					this.setState({errorMobile: true});
				}else {
					this.setState({errorMobile: false});
				}        
				this.state.trady.mobile = e.target.value;
					this.forceUpdate();
				break;
			}

			default: {
				if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
					this.setState({errorEmail: true});
				}else {
					this.setState({errorEmail: false});
				}
				this.state.trady.email = e.target.value;
					this.forceUpdate();
				break;
			}
		}
	},

	componentWillMount: function() {
		this.selectTrady(this.state.maintenance_request.trady_id);
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
					});

					return;
				}
			}
		}

		this.setState({
			isAdd: true,
			trady: {
				name: null,
				email: null,
				mobile: null,
				company_name: null,
			}
		});
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.company.value == "") {
			this.setState({errorCompany: true});
			flag = true;
		}

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
				trady: {
					name: this.name.value,
					email: this.email.value,
					mobile: this.mobile.value,
					company_name: this.company.value,
					maintenance_request_id: this.props.maintenance_request.id,
					trady_id: !!this.state.trady.id ? this.state.trady.id : "",
					skill_required: this.props.maintenance_request.service_type,
					trady_request: this.props.keyTitle == "request-quote" ? "Quote" : "Work Order",
				},
			};
			this.props.requestQuote(params);
		}

		return
	},

	render: function() {
		const self = this;
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
										<label className="label-custom">Select Trady:</label>
										<select 
											id="trady" 
											className="form-control"
											ref={e => this.trady_id = e}
											onChange={() => this.selectTrady(this.trady_id.value)} 
										>
											<option value="" selected={!self.props.maintenance_request.trady_id && "selected"}>Select or Add New Tradie</option>
											{
												this.props.tradies.map(function(trady, index) {
													return (
														<option 
															key={index+1} 
															value={trady.id} 
															selected={self.props.maintenance_request.trady_id == trady.id && "selected"}
														>
															{trady.name}
														</option>
													);
												})
											}
										</select>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Company Name<strong>*</strong>:</label>
											<input
												type="text" 
												id="company" 
												ref={e => this.company = e}
												onChange={this.checkValidate} 
												placeholder="Enter Company Name"
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.company_name ? this.state.trady.company_name : ""}
												className={"input-custom u-full-width " + (this.state.errorCompany && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Name <strong>*</strong>:</label>
											<input
												id="name" 
												type="text" 
												ref={e => this.name = e}
												placeholder="Enter Name"
												onChange={this.checkValidate}
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.name ? this.state.trady.name : ""}
												className={"input-custom u-full-width " + (this.state.errorName && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Email <strong>*</strong>:</label>
											<input
												id="email" 
												type="text" 
												placeholder="Enter Email"
												ref={e => this.email = e} 
												onChange={this.checkValidate}
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.email ? this.state.trady.email : ""} 
												className={"input-custom u-full-width " + (this.state.errorEmail && "has-error")} 
											/>
										</div>
									</div>
									<div className="row m-t-lg">
										<div>
											<label className="label-custom">Mobile <strong>*</strong>:</label>
											<input 
												id="mobile" 
												type="number" 
												placeholder="Enter Mobile"
												ref={e => this.mobile = e} 
												onChange={this.checkValidate}
												readOnly={!this.state.isAdd}
												value={!!this.state.trady.mobile ? this.state.trady.mobile : ""} 
												className={"input-custom u-full-width " + (this.state.errorMobile && "has-error")} 
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

var MaintenanceRequest = React.createClass({
	getInitialState: function() {
		return {
			modal: "",
			quote: null,
			invoice: null,
			isModal: false,
			invoice_pdf_file: null,
			quotes: this.props.quotes,
			tradies: this.props.tradies,
			landlord: this.props.landlord,
			invoices: this.props.invoices,
			invoice_pdf_files: this.props.invoice_pdf_files,
			maintenance_request: this.props.maintenance_request,
			tenants_conversation: this.props.tenants_conversation,
			landlords_conversation: this.props.landlords_conversation,
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
		div.parentNode.removeChild(div);
	},

	onModalWith: function(modal) {
		this.setState({
			modal: modal,
			isModal: true, 
		});
	},

	viewItem: function(key, item) {
		switch(key) {
			case 'viewQuote': {
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
						title: "Forward Maintenance request",
						content: "Your Landlord has been created successfully!",
						bgClass: "bg-success",
					}
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Forward Maintenance request",
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
						title: "Forward Maintenance request",
						content: "Your Landlord has been updated successfully!",
						bgClass: "bg-success",
					},
				});
				self.isClose();
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: "Forward Maintenance request",
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
				self.setState({
					quotes: res
				});
			},
			error: function(err) {
				
			}
		});
	},

	sendEmailLandlord: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/forward_quote',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				self.setState({notification: {
					title: "Forward Landlord",
					content: "The email about quote information was sent for Landlord.",
					bgClass: "bg-success",
				}});
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

	requestQuote: function(params) {
		const self = this;
		$.ajax({
			type: 'POST',
			url: '/tradies',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
				if(params.trady.trady_request == "Work Order") {
					self.state.maintenance_request.trady_id = !!params.trady.trady_id ? params.trady.trady_id : res[res.length-1].id;
					self.forceUpdate();
				} 
				self.setState({
					tradies: res,
					notification: {
						title: params.trady.trady_request == "Quote" ? "Request Quote" : "Send Work Order",
						content: params.trady.trady_request == "Quote" ? "the request quote has sent successfully" : "the work order has sent successfully",
						bgClass: "bg-success",
					},
				});
				self.onModalWith('notification');
			},
			error: function(err) {
				self.setState({notification: {
					title: params.trady.trady_request == "Quote" ? "Request Quote" : "Send Work Order",
					content: params.trady.trady_request == "Quote" ? "The request quote is error" : "The work order is error" ,
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
						this.setState({notification: {
							title: "Edit Lanlord",
							content: "Landlord is empty!",
							bgClass: "bg-error",
						}});
						return (
							<ModalNotification 
								close={this.isClose} 
								title={this.state.notification.title} 
								content={this.state.notification.content}
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
							requestQuote={this.requestQuote}
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
							 	invoice_pdf_file={this.state.invoice_pdf_file} 
							 	invoice_pdf_files={this.state.invoice_pdf_files}
								property={this.props.property}
							/>
					);
					
					break;	
				}
					
				default:
					return null;
			}
		}
	},

	summary(e) {
		return ( 
			<div className="summary-container-index" id="summary-container-index">
				<div className="main-summary">
					<div className="section">
						<ItemMaintenanceRequest 
							gallery={this.props.gallery} 
							property={this.props.property} 
							maintenance_request={this.state.maintenance_request}
						/>
						{this.props.quotes.length > 0 && <Quotes viewQuote={(key, item) => this.viewItem(key, item)} onModalWith={this.onModalWith} quotes={this.state.quotes} updateStatusQuote={this.updateStatusQuote} sendEmailLandlord={this.sendEmailLandlord} current_user={this.props.current_user} landlord={this.state.landlord} />}
						{this.props.invoices.length > 0 && <Invoices invoices={this.state.invoices} viewInvoice={(key, item) => this.viewItem(key, item)} />}
						{this.props.invoice_pdf_files.length > 0 && <PDFInvoices invoice_pdf_files={this.state.invoice_pdf_files} viewPDFInvoice={(key, item) => this.viewItem(key, item)} />}
					</div>
					<div className="sidebar">
						<Contact landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} current_user={this.props.current_user} />
						<Action landlord={this.state.landlord} onModalWith={(modal) => this.onModalWith(modal)} />
						<Activity />
					</div>
					<ActivityMobile />
				</div>
				<SideBarMobile onModalWith={(modal) => this.onModalWith(modal)} landlord={this.state.landlord} current_user={this.props.current_user} />
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
