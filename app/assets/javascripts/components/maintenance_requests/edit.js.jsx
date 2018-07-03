var EditMaintenanceRequest = React.createClass({
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

	submit: function(e) {
		e.preventDefault();
		const self = this;

		var FD = new FormData(document.getElementById('addForm'));

		this.props.editMaintenanceRequest(FD, function(err) {
			if (err) {
				self.setState({
					descriptionError: err['maintenance_description'],
					titleError 			: err['title'],
					serviceError 		: err['service_type'],
				})
			}
		});
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

	render: function() {
		const { descriptionError, titleError, serviceError } = this.state;
		const {maintenance_request, services} = this.props;
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form role="form" id="addForm" onSubmit={this.submit}>
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
								<h4 className="modal-title text-center">Edit Maintenance Request</h4>
							</div>
							<div className="modal-body edit-maintenance-request">
								<div className="row">
									<button
										type="button"
										className="btn-edit btn-address"
										onClick={() => this.props.viewItem('editAddress')}
									>
										Edit Address
									</button>
									<button
										type="button"
										className="btn-edit"
										onClick={() => this.props.onModalWith('addPhoto')}
									>
										Add Photo
									</button>
								</div>
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
		);
	}
});

var ModalEditDescription = React.createClass({
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
								<h4 className="modal-title text-center">Edit Description</h4>
							</div>
							<div className="modal-body edit-maintenance-request">
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
		);
	}
});
