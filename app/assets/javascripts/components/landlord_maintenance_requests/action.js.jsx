var ContentLandlordAction = React.createClass({
	getInitialState: function() {
		return {
			isClick: false
		};
	},

	requestQuote: function() {
		this.props.requestQuote();
		this.setState({
			isClick: true
		});
	},

	render: function() {
		return (
			<ul>
				<li className="active">
					<a onClick={!this.state.isClick && this.requestQuote}>
						<i className="fa fa-file-text" aria-hidden="true" />
						Request quote
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('createAppointment')}>
						<i className="icon-send" aria-hidden="true" />
						Create appointment to fix myself
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('approveJob')}>
						<i className="icon-send" aria-hidden="true" />
						Approve Job
					</a>
				</li>
			</ul>
		);
	}
});

var LandlordAction = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	showAction: function(e) {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item"  data-intro="This is Action" data-position="left">
				<div className="header action">
					<a>Actions:</a>
					<i
						aria-hidden="true"
						onClick={this.showAction}
						className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")}
					/>
				</div>
				<div className="content" id="actions-content">
					{ this.state.show &&
							<ContentLandlordAction
								landlord={this.props.landlord}
								requestQuote={this.props.requestQuote}
								maintenance_request={this.props.maintenance_request}
								onModalWith={(modal) => this.props.onModalWith(modal)}
							/>
					}
				</div>
			</div>
		);
	}
});

var LandlordActionMobile = React.createClass({
	render: function() {
		return (
			<div className="actions-full" id="actions-full">
				<div className="item">
					<div className="header action">
						<a>Actions:</a>
						<i
							aria-hidden="true"
							className="fa fa-close"
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						<ContentLandlordAction
							landlord={this.props.landlord}
							requestQuote={this.props.requestQuote}
							maintenance_request={this.props.maintenance_request}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/>
					</div>
				</div>
			</div>
		);
	}
});

var ModalApproveJob = React.createClass({
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
			preapproved_note: this.note && this.note.value,
		}

		this.props.approveJob(params, function(err) {
			if (err) {
				self.setState({ errorMessage: err['body'] });
			}
		});
	},

	render: function() {
		const current_user 		 = this.props.current_user;
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
								<h4 className="modal-title text-center">Approve Job</h4>
							</div>
							<div className="modal-body">
								<div>
									<div>Pre-Approved Amount</div>
									<textarea
										style={{ width: '100%', marginTop: '10px' }}
										placeholder="Note"
										ref={(rel) => this.note = rel}
										onChange={this.removeError}
										className={'textarea-message ' + (errorMessage ? ' has-error' : '')}
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
