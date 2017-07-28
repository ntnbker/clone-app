var ModalInstruction = React.createClass({
	getInitialState: function() {
		return {
			isCheck: false
		};		
	},

	updateInstruction: function(e) {
		const props = this.props;
		const {authenticity_token} = this.props;
		e.target.value
		this.setState({
			isCheck: this.state.isCheck		
		});

		$.ajax({
			type: 'POST',
			url: '/update_instruction',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
			},
			success: function(res){
				props.updateInsruction(res);
			},
			error: function(err) {

			}
		});  
	},

	render: function() {
		return (
			<div className="modal-custom fade modal-instruction">
				<div className="modal-dialog">
					<div className="modal-content">
						<div>
							<div className="instruction">
								<label>
									<input type="checkbox" onChange={this.updateInstruction} className="show-instruction"/>
									<span className="show-instruction">
										Don't show this again
									</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});