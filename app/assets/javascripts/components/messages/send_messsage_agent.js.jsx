var ModalSendMessageAgent = React.createClass({
	getInitialState: function() {
		return {
			errorMessage: false
		};
	},

	onSubmit: function(e) {
		e.preventDefault();

		if(!this.message.value) {
			this.setState({errorMessage: true});
			return
		}

		const params = {
			message: {
				body: this.message.value,
				conversation_type: 'Trady_Agent',
			},
		}

		this.props.sendMessageAgent(params);
		this.message.value = "";
	},

	render: function() {
		const {trady_agent_conversation, current_user} = this.props;
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
								<h4 className="modal-title text-center">Message Agent</h4>
							</div>
							<div className="modal-body">
								{<ContentMessage current_user={current_user} messages={trady_agent_conversation} />}
							</div>
							<div className="modal-footer">
								<div>
									<textarea 
										placeholder="Message" 
										readOnly={!current_user}
										ref={(rel) => this.message = rel} 
										className={'textarea-message ' + (!current_user && 'readonly ') + (!!this.state.errorMessage && 'has-error')} 
									/>
								</div>
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