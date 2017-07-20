var EditMaintenanceRequest = React.createClass({
	getInitialState: function() {
		return {
			trady_id: false,
			errorTitle: false,
			errorDescription: false,
		};	
	},

	checkValidate: function(e, key) {
		var value = e.target.value;
		switch(key) {
			case 'title': {
				if(value == "") {
					this.setState({
						errorTitle: true
					});
				}else {
					this.setState({
						errorTitle: false
					});
				}
				break;
			}

			case 'description': {
				if(value == "") {
					this.setState({
						errorDescription: true
					});
				}else {
					this.setState({
						errorDescription: false
					});
				}
				break;
			}
		}
	},

	submit: function(e) {
		e.preventDefault();
		let flag = false;

		if(this.description.value == "") {
			this.setState({
				errorDescription: true
			});
			flag = true;
		}

		if(flag == true) {
			return
		}

		var params = {
			trady_id: this.trady_id.value,
			maintenance_description: this.description.value,
		};
		this.props.editMaintenanceRequest(params);
	},
	
	render: function() {
		const state = this.state;
		const {maintenance_request, tradies} = this.props;
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
								<h4 className="modal-title text-center">Edit Maintenance Request</h4>
							</div>
							<div className="modal-body edit-maintenance-request">
								<div className="row m-t-lg">
									<label>Service Type:</label>
									<select 
										required
										id="trady"
										ref={e => this.trady_id = e}
										className="form-control input-custom"
									>
										<option value="" selected={!maintenance_request.trady_id && "selected"}>Service Type</option>
										{
											tradies.map(function(trady, index) {
												return (
													<option 
														key={index+1} 
														value={trady.id} 
														selected={maintenance_request.trady_id == trady.id && "selected"}
													>
														{trady.name}
													</option>
												);
											})
										}
									</select>
								</div>
								<div className="row">
									<label>Maintenance Request Description:</label>
									<textarea 
										placeholder="Enter Description"
										ref={e => this.description = e}
										onChange={(e, key) => this.checkValidate(e, 'description')} 
										defaultValue={maintenance_request.maintenance_description}
										className={"u-full-width " + (this.state.errorDescription && "has-error")} 
									/>
								</div>
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
									disabled={!!state.errorTitle || !!state.errorDescription ? true : false}
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