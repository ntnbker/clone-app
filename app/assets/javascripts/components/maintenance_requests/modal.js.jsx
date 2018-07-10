
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

	removeError: function(e) {
		var key = e.target.id;
		var errorField = {
			'name'  : 'errorName',
			'email' : 'errorEmail',
			'mobile': 'errorMobile',
		}[key];
		if (!errorField || !this.state[errorField]) return;
		this.setState({ [errorField]: '' });
	},

	submit: function(e) {
		e.preventDefault();
		const self = this;
		var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name && this.name.value,
					email: this.email && this.email.value,
					mobile: this.mobile && this.mobile.value,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.addAskLandlord(params, function(err) {
				if (err) {
					self.setState({
						errorEmail: err.email,
						errorName: err.name,
						errorMobile: err.mobile,
					})
				}
			});
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
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorName && "has-error")}
											/>
										</div>
										{renderError(this.state['errorName'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<input
												type="text"
												name="landlord[mobile]"
												placeholder="Landlord Mobile"
												id="mobile"
												ref={e => this.mobile = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorMobile && "has-error")}
											/>
										</div>
										{renderError(this.state['errorMobile'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<input
												type="text"
												autoCorrect="off"
												autoComplete="off"
												autoCapitalize="off"
												name="landlord[email]"
												placeholder="Landlord Email"
												id="email"
												ref={e => this.email = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorEmail && "has-error")}
											/>
										</div>
										{renderError(this.state['errorEmail'])}
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
			// errorEmail: false,
			errorMobile: false,
		};
	},

	isEdit: function() {
		this.setState({isEdit: !this.state.isEdit});
	},

	removeError: function(e) {
		var key = e.target.id;
		var errorField = {
			'name'  : 'errorName',
			// 'email' : 'errorEmail',
			'mobile': 'errorMobile',
		}[key];
		if (!errorField || !this.state[errorField]) return;
		this.setState({ [errorField]: '' });
	},

	submit: function(e) {
		e.preventDefault();
		const self = this;
		var params = {
			authenticity_token: this.props.authToken,
			landlord: {
				id: this.props.landlord.id,
				email: this.props.landlord.email,
				name: this.name && this.name.value,
				mobile: this.mobile && this.mobile.value,
				maintenance_request_id: this.props.maintenance_request_id,
			},
		}
		this.props.editAskLandlord(params, function(err) {
			if (err) {
				self.setState({
					errorEmail: err.email,
					errorName: err.name,
					errorMobile: err.mobile,
				})
			}
		});
		return
	},

	render: function() {
		const { isEdit, errorName, errorMobile } = this.state;
		const { landlord } = this.props;
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
							 	{ !isEdit &&
							 		<div className="row">
										<a
											className="btn-edit"
											onClick={() => this.isEdit()}
										>
											Edit Landlord Details
										</a>
									</div>
								}
								<div className="row">
									<div>
										<input
											id="name"
											type="text"
											name="landlord[name]"
											placeholder="Landlord Name"
											readOnly={!isEdit}
											defaultValue={landlord.name}
											ref={e => this.name = e}
											onChange={this.removeError}
											className={(errorName && "has-error") + (!isEdit && " readonly")}
										/>
									</div>
									{renderError(errorName)}
								</div>
								<div className="row m-t-lg">
									<div>
										<input
											type="text"
											name="landlord[mobile]"
											placeholder="Landlord Mobile"
											id="mobile"
											readOnly={!isEdit}
											defaultValue={landlord.mobile}
											ref={e => this.mobile = e}
											onChange={this.removeError}
											className={(errorMobile && "has-error") + (!isEdit && " readonly")}
										/>
									</div>
									{renderError(errorMobile)}
								</div>
								<div className="row m-t-lg">
									<div>
										<p className="landlord-email font-bold">
											{landlord.email}
											<span>
												<button type="button" className="btn btn-link" onClick={() => this.props.onModalWith('addLandlord')}>
													Edit Email
												</button>
											</span>
										</p>
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


var ModalAddLandlord = React.createClass({
	getInitialState: function() {
		return {
			errorName: '',
			errorEmail: '',
			errorMobile: '',
		};
	},

	removeError: function(e) {
		var key = e.target.id;
		var errorField = {
			'name'  : 'errorName',
			'email' : 'errorEmail',
			'mobile': 'errorMobile',
		}[key];
		if (!errorField || !this.state[errorField]) return;
		this.setState({ [errorField]: '' });
	},

	submit: function(e) {
		e.preventDefault();
		const self = this;
		var params = {
				authenticity_token: this.props.authToken,
				landlord: {
					name: this.name && this.name.value,
					email: this.email && this.email.value,
					mobile: this.mobile && this.mobile.value,
					maintenance_request_id: this.props.maintenance_request_id,
				},
			}
			this.props.addLandlord(params, function(err) {
				if (err) {
					self.setState({
						errorEmail: err.email,
						errorName: err.name,
						errorMobile: err.mobile,
					})
				}
			});
		return
	},

	render: function() {
		const {note, landlord} = this.props;
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
								<h4 className="modal-title text-center">{landlord? 'Change Landlord' : 'Add Landlord'}</h4>
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
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorName && "has-error")}
											/>
										</div>
										{renderError(this.state['errorName'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input
												id="mobile"
												type="text"
												name="landlord[mobile]"
												placeholder="Enter Mobile"
												ref={e => this.mobile = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorMobile && "has-error")}
											/>
										</div>
										{renderError(this.state['errorMobile'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input
												id="email"
												type="text"
												autoCapitalize="off"
												autoCorrect="off"
												autoComplete="off"
												name="landlord[email]"
												placeholder="Enter Email"
												ref={e => this.email = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorEmail && "has-error")}
											/>
										</div>
										{renderError(this.state['errorEmail'])}
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

var ModalAddTenant = React.createClass({
	getInitialState: function() {
		return {
			errorName: '',
			errorEmail: '',
			errorMobile: '',
		};
	},

	removeError: function(e) {
		var key = e.target.id;
		var errorField = {
			'name'  : 'errorName',
			'email' : 'errorEmail',
			'mobile': 'errorMobile',
		}[key];
		if (!errorField || !this.state[errorField]) return;
		this.setState({ [errorField]: '' });
	},

	submit: function(e) {
		e.preventDefault();
		const self = this;
		const {tenant} = this.props;
		var params = {
			authenticity_token: this.props.authToken,
			tenant: {
				name: this.name && this.name.value,
				email: this.email && this.email.value,
				mobile: this.mobile && this.mobile.value,
				maintenance_request_id: this.props.maintenance_request_id,
				property_id: this.props.property.id,
			},
		}
		if (tenant) params.tenant.id = tenant.id;

		this.props.addTenant(params, function(err) {
			if (err) {
				self.setState({
					errorEmail: err.email,
					errorName: err.name,
					errorMobile: err.mobile,
				})
			}
		});
		return
	},

	render: function() {
		const tenant = this.props.tenant;
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
								<h4 className="modal-title text-center">{tenant ? 'Edit' : 'Add'} Tenant</h4>
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
												defaultValue={tenant && tenant.name}
												ref={e => this.name = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorName && "has-error")}
											/>
										</div>
										{renderError(this.state['errorName'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input
												id="mobile"
												type="text"
												name="landlord[mobile]"
												placeholder="Enter Mobile"
												defaultValue={tenant && tenant.mobile}
												ref={e => this.mobile = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorMobile && "has-error")}
											/>
										</div>
										{renderError(this.state['errorMobile'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<input
												id="email"
												type="text"
												autoCapitalize="off"
												autoCorrect="off"
												autoComplete="off"
												name="landlord[email]"
												placeholder="Enter Email"
												defaultValue={tenant && tenant.email}
												disabled={!!tenant}
												ref={e => this.email = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorEmail && "has-error")}
											/>
										</div>
										{renderError(this.state['errorEmail'])}
									</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									onClick={() => {
										if (tenant) {
											this.props.viewItem('showTenants');
										} else {
											this.props.close();
										}
									}}
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

var ModalAddAccessContact = React.createClass({
	getInitialState: function() {
		return {
			errorName: '',
			errorMobile: '',
		};
	},

	removeError: function(e) {
		var key = e.target.id;
		var errorField = {
			'name'  : 'errorName',
			'mobile': 'errorMobile',
		}[key];
		if (!errorField || !this.state[errorField]) return;
		this.setState({ [errorField]: '' });
	},

	submit: function(e) {
		e.preventDefault();
		const self = this;
		const {access_contact} = this.props;
		var params = {
			authenticity_token: this.props.authToken,
			access_contact: {
				name: this.name && this.name.value,
				mobile: this.mobile && this.mobile.value,
				maintenance_request_id: this.props.maintenance_request_id,
				property_id: this.props.property.id,
				email: 'guest@email.com',
				relation: 'guest',
			},
		}
		if (access_contact) params.access_contact.id = access_contact.id;

		this.props.addAccessContact(params, function(err) {
			if (err) {
				self.setState({
					errorName: err.name,
					errorMobile: err.mobile,
				})
			}
		});
		return
	},

	render: function() {
		const access_contact = this.props.access_contact;
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
								<h4 className="modal-title text-center">{access_contact ? 'Edit' : 'Add'} Access Contact</h4>
							</div>
							<div className="modal-body">
									<div>{access_contact ? 'Edit' : 'Add'} non tenant access contacts</div>
									<div className="row m-t-lg">
										<div>
											<label>Name <strong>*</strong>:</label>
											<input
												id="name"
												type="text"
												name="access_contact[name]"
												placeholder="Enter Name"
												defaultValue={access_contact && access_contact.name}
												ref={e => this.name = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorName && "has-error")}
											/>
										</div>
										{renderError(this.state['errorName'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input
												id="mobile"
												type="text"
												name="access_contact[mobile]"
												placeholder="Enter Mobile"
												defaultValue={access_contact && access_contact.mobile}
												ref={e => this.mobile = e}
												onChange={this.removeError}
												className={"u-full-width " + (this.state.errorMobile && "has-error")}
											/>
										</div>
										{renderError(this.state['errorMobile'])}
									</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									onClick={() => {
										if (access_contact) {
											this.props.viewItem('showAccessContacts');
										} else {
											this.props.close();
										}
									}}
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

var ModalShowTenants = React.createClass({
	render: function() {
		const {tenants = []} = this.props;
		const canRemove = tenants.length > 1;
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
								<h4 className="modal-title text-center">Tenants</h4>
							</div>
							<div className="modal-body">
								{
									tenants.map((tenant) => (
										<div className="row tenant-detail" key={tenant.id}>
											<span className="tenant-name">{tenant.name}</span>
						          <div className="view-tenant-button">
							          <span
							          	title="Edit Information"
							          	className="edit-tenant fa fa-pencil-square-o"
							            onClick={() => this.props.viewItem('editTenant', tenant)}
							          />
							          { canRemove &&
							          	<span
								          	title="Remove Tenant"
								            className="remove-tenant fa fa-times"
								            onClick={() => this.props.viewItem('removeTenant', tenant)}
								          />
								        }
						          </div>
										</div>
									))
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
								<button
									type="button"
									className="btn btn-default success"
									onClick={() => this.props.viewItem('addTenant')}
								>
									Add Tenant
								</button>
							</div>
					</div>
				</div>
			</div>
		);
	}
});

var ModalShowAccessContacts = React.createClass({
	render: function() {
    const {access_contacts = []} = this.props;
    const canRemove = true;
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
								<h4 className="modal-title text-center">Access Contacts</h4>
							</div>
							<div className="modal-body">
								Add/Edit non tenant access contacts
								{
									access_contacts.map((accessContact) => (
										<div className="row tenant-detail" key={accessContact.id}>
											<span className="tenant-name">{accessContact.name}</span>
						          <div className="view-tenant-button">
							          <span
							          	title="Edit Information"
							          	className="edit-tenant fa fa-pencil-square-o"
							            onClick={() => this.props.viewItem('editAccessContact', accessContact)}
							          />
							          { canRemove &&
							          	<span
								          	title="Remove Access Contact"
								            className="remove-tenant fa fa-times"
								            onClick={() => this.props.viewItem('removeAccessContact', accessContact)}
								          />
								        }
						          </div>
										</div>
									))
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
								<button
									type="button"
									className="btn btn-default success"
									onClick={() => this.props.viewItem('addAccessContact')}
								>
									Add More
								</button>
							</div>
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
			// errorEmail: false,
			errorMobile: false,
		};
	},

	removeError: function(e) {
		var key = e.target.id;
		var errorField = {
			'name'  : 'errorName',
			// 'email' : 'errorEmail',
			'mobile': 'errorMobile',
		}[key];

		if (!errorField || !this.state[errorField]) return;
		this.setState({ [errorField]: '' });
	},

	submit: function(e) {
		e.preventDefault();
		const self = this;
		var params = {
			authenticity_token: this.props.authToken,
			landlord: {
				id: this.props.landlord.id,
				email: this.props.landlord.email,
				name: this.name && this.name.value,
				mobile: this.mobile && this.mobile.value,
				maintenance_request_id: this.props.maintenance_request_id,
			},
		}
		this.props.editLandlord(params, function(err) {
			if (err) {
				self.setState({
					errorEmail: err.email,
					errorName: err.name,
					errorMobile: err.mobile,
				})
			}
		});
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
												onChange={this.removeError}
												defaultValue={this.props.landlord.name}
												className={"u-full-width " + (this.state.errorName && "has-error")}
											/>
										</div>
										{renderError(this.state['errorName'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Mobile <strong>*</strong>:</label>
											<input
												id="mobile"
												type="text"
												name="landlord[mobile]"
												placeholder="Enter Mobile"
												ref={e => this.mobile = e}
												onChange={this.removeError}
												defaultValue={this.props.landlord.mobile}
												className={"u-full-width " + (this.state.errorMobile && "has-error")}
											/>
										</div>
										{renderError(this.state['errorMobile'])}
									</div>
									<div className="row m-t-lg">
										<div>
											<label>Email <strong>*</strong>:</label>
											<p className="landlord-email font-bold">
												{this.props.landlord.email}
												<span>
													<button type="button" className="btn btn-link" onClick={() => this.props.onModalWith('addLandlord')}>
														Edit Email
													</button>
												</span>
											</p>
										</div>
										{renderError(this.state['errorEmail'])}
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

	removeError: function(e) {
		const { trady } = this.state;

		var key = e.target.id;
		var errorField = {
			'name'   : 'errorName',
			'email'  : 'errorEmail',
			'mobile' : 'errorMobile',
			'company': 'errorCompany',
		}[key];

		var keyField = (key === 'company' ? 'company_name' : key);
		// if (!errorField || !this.state[errorField]) return;
		this.setState({ [errorField]: '', trady: { ...trady, [keyField]: e.target.value } });
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
		const self = this;
		var params = {
			trady: {
				name:   								this.name && 		this.name.value,
				email:   								this.email && 	this.email.value,
				mobile:   							this.mobile && 	this.mobile.value,
				company_name:   				this.company && this.company.value,
				item:   								this.state.trady,
				trady_id:   						this.state.trady.id || "",
				maintenance_request_id: this.props.maintenance_request.id,
				skill_required:   			this.props.maintenance_request.service_type,
				trady_request:   				this.props.keyTitle == "request-quote" ? "Quote" : "Work Order",
			},
		};
		this.props.requestQuote(params, function(err) {
			if (err) {
				self.setState({
					isDisable   : false,
					errorEmail  : err.email,
					errorName   : err.name,
					errorMobile : err.mobile,
					errorCompany: err.company_name,
				});
			}
		});

		this.setState({
			isDisable: true
		});

		return
	},

	changeRadio: function({ target: { value } } ) {
		const boolValue = JSON.parse(value);
		this.setState({
			isTrady: value,
			isAdd: !boolValue,
			trady: {
				id: null,
				name: null,
				email: null,
				mobile: null,
				company_name: null,
			}
		});
	},

	renderAddTrady() {
		if (!!this.props.assigned_trady) return null;

		return (
			<div className="radio">
				<label>
					<input type="radio" value="false" onChange={this.changeRadio} checked={this.state.isTrady === 'false' && "checked"}/>
					Add trady
				</label>
			</div>
		);
	},

	render: function() {
		const self = this;
		const state = this.state;
		const assignedTrady = this.props.assigned_trady;
		const {isTrady, isDisable, trady, isAdd} = this.state;

		const style = { background: isAdd ? 'none' : '#f2f2f2' };
		const isAssigned = !!assignedTrady;
		const tradies = isAssigned ? [assignedTrady] : this.props.tradies;

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
									{this.renderAddTrady()}
								</div>
								{
									isTrady === 'true' &&
										<div className="row">
											<select
												id="trady"
												value={trady.id || ""}
												ref={e => this.trady_id = e}
												className="form-control input-custom"
												onChange={() => this.selectTrady(this.trady_id.value)}
											>
												<option value="">Select Tradie</option>
												{
													tradies.map(function(item, index) {
														return (
															<option
																key={index+1}
																value={item.id}
															>
																{item.company_name}
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
														onChange={this.removeError}
														placeholder="Enter Business Name"
														value={trady.company_name || ""}
														className={"input-custom u-full-width " + (this.state.errorCompany && "has-error")}
													/>
												</div>
												{renderError(this.state.errorCompany)}
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
														onChange={self.removeError}
														value={trady.name || ""}
														className={"input-custom u-full-width " + (this.state.errorName && "has-error")}
													/>
												</div>
												{renderError(this.state.errorName)}
											</div>
											<div className="row m-t-lg">
												<div>
													<input
														id="email"
														type="text"
														style={style}
														autoCapitalize="off"
														autoCorrect="off"
														autoComplete="off"
														placeholder="Enter Email"
														ref={e => this.email = e}
														readOnly={!this.state.isAdd}
														onChange={self.removeError}
														value={trady.email || ""}
														className={"input-custom u-full-width " + (this.state.errorEmail && "has-error")}
													/>
												</div>
												{renderError(this.state.errorEmail)}
											</div>
											<div className="row m-t-lg">
												<div>
													<input
														id="mobile"
														type="text"
														style={style}
														placeholder="Enter Mobile"
														ref={e => this.mobile = e}
														readOnly={!this.state.isAdd}
														onChange={self.removeError}
														value={trady.mobile || ""}
														onKeyPress={(e) => this.checkLength(e)}
														className={"input-custom u-full-width " + (this.state.errorMobile && "has-error")}
													/>
												</div>
												{renderError(this.state.errorMobile)}
											</div>
										</div>
								}
							</div>
							<div className="modal-footer">
								{ this.props.keyTitle === 'request-quote' &&
									<div className="row">
										<button
											type="button"
											className="btn btn-primary cancel"
											onClick={() => this.props.viewItem('justFindMeOne')}
										>
											JUST FIND ME ONE!
										</button>
									</div>
								}
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