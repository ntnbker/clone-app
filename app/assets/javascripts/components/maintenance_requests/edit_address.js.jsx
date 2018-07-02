var ModalEditAddress = React.createClass({
	getInitialState: function() {
		return {
			errorMessage: false,
			suggestions: [],
			selectedAddress: ''
		};
	},



	removeError: function(e) {
		this.setState({
			errorMessage: '',
		})
	},

	renderError: function(error) {
	  return <p id="errorbox" className="error">{error || ''}</p>;
	},

	chooseAddress() {
		this.setState({selectedAddress: this.address.value, errorMessage: ''});
	},

	onSubmit: function(e) {
		e.preventDefault();
		const self = this;
		const params = {
			address: this.address && this.address.value,
    }
		
		if (self.state.selectedAddress !== params.address) {
			return this.setState({errorMessage: 'Please choose an address from list'});
		}

		this.props.editAddress(params, function(err) {
			if (err) {
				self.setState({ errorMessage: err['address'] });
			}
		});
	},

	render: function() {
		const { property } = this.props;
		const { errorMessage } = this.state;

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
								<h4 className="modal-title text-center">Edit Address</h4>
							</div>
							<div className="modal-body">
								<div>
                  <div className="note">Please type in the property address.</div>
                  <input
                    id='pac-input'
										type='text'
                    name='address'
                    placeholder='Enter your property address here.'
                    defaultValue={property.property_address || ''}
                    ref={e => this.address = e}
                    onChange={() => {this.removeError(); getAddressOfGoogleMap(this.chooseAddress)}}
										className={(errorMessage ? ' has-error' : '')}
                  />
								</div>
								{this.renderError(errorMessage)}
							</div>
							<div className="modal-footer">
								<button
									type="submit"
									onClick={this.onSubmit}
									className="btn btn-default success"
								>
									Submit
								</button>
								<button
									type="submit"
									onClick={this.props.close}
									className="btn btn-default cancel"
								>
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});