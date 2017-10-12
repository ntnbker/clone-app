var ModalSendMessageTenant = React.createClass({
	getInitialState: function() {
		return {
			errorMessage: false
		};
	},

	removeError: function(e) {
		this.setState({
			errorMessage: '',
		})
	},

	renderError: function(error) {
	  return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
	},

	onSubmit: function(e) {
		e.preventDefault();
		const self = this;
		const params = {
			authenticity_token: this.props.authToken,
			message: {
				body: this.message && this.message.value,
				conversation_type: 'Tenant',
				maintenance_request_id: this.props.maintenance_request_id,
			},
		}

		this.props.sendMessageTenant(params, function(err) {
			if (err) {
				self.setState({
					errorMessage: err['body'],
				})
			}
		});
		this.message.value = "";
	},

	render: function() {
		var tenants_conversation = this.props.tenants_conversation
		var current_user = this.props.current_user
		const { errorMessage } 		 = this.state;
		return (
			<div className="modal-custom fade">
				<div className="modal-dialog">
					<form role="form">
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
								<h4 className="modal-title text-center">Message Tenants</h4>
							</div>
							<div className="modal-body">
								{<ContentMessage current_user={current_user} messages={tenants_conversation} />}
							</div>
							<div className="modal-footer">
								<div>
									<textarea
										placeholder="Message"
										readOnly={!current_user}
										ref={(rel) => this.message = rel}
										onChange={this.removeError}
										className={'textarea-message ' + (!current_user ? 'readonly ' : '') + (errorMessage ? ' has-error' : '')}
									/>
								</div>
								{this.renderError(errorMessage)}
								<button
									type="submit"
									onClick={this.onSubmit}
									disabled={!current_user}
									className="btn btn-default success"
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});
