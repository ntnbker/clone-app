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
				<li>
					<a onClick={!this.state.isClick && this.requestQuote}>
						<i className="fa fa-file-text" aria-hidden="true" />
						Request quote
					</a>
				</li>
        <li>
          <a onClick={() => this.props.onModalWith('createAppointmentFixMyself')}>
            <i className="fa fa-send" aria-hidden="true" />
            Fix Myself
          </a>
        </li>
				<li>
					<a onClick={() => this.props.onModalWith('approveJob')}>
						<i className="fa fa-send" aria-hidden="true" />
						Approve Job
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('defere')}>
						<i className="fa fa-send" aria-hidden="true" />
						Defer
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
				<div className="header action general-action-title">
					<a>Maintenance Request</a>
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
	  return <p id="errorbox" className="error">{error || ''}</p>;
	},

	onSubmit: function(e) {
		e.preventDefault();
		const self = this;
		const params = {
			preapproved_note: this.note && this.note.value,
		}

		this.props.approveJob(params, function(err) {
			if (err) {
				self.setState({ errorMessage: err });
			}
		});
	},

	render: function() {
		const { maintenance_request, current_user } = this.props;
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
								<h4 className="modal-title text-center">Approval Note</h4>
							</div>
							<div className="modal-body">
								<div>
									<div className="note">Please let us know if you have a pre approved amount that you would like to spend on this job.</div>
									<textarea
										style={{ width: '100%', marginTop: '10px' }}
										placeholder="Note"
										defaultValue={maintenance_request.preapproved_note || ''}
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

var ModalEditAvailability = React.createClass({
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
	  return <p id="errorbox" className="error">{error || ''}</p>;
	},

	onSubmit: function(e) {
		e.preventDefault();
		const self = this;
		const params = {
			availability_access: this.availability_access && this.availability_access.value,
		}

		this.props.editAvailability(params, function(err) {
			if (err) {
				self.setState({ errorMessage: err['availability_access'] });
			}
		});
	},

	render: function() {
		const { maintenance_request } = this.props;
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
								<h4 className="modal-title text-center">Tenant Availability</h4>
							</div>
							<div className="modal-body">
								<div>
									<div className="note">Please add tenant availability and access instructions.</div>
									<textarea
										style={{ width: '100%', marginTop: '10px' }}
										placeholder="Availability"
										defaultValue={maintenance_request.availability_and_access || ''}
										ref={(rel) => this.availability_access = rel}
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

var ModalConfirmDefere = React.createClass({
	confirm: function() {
		this.props.confirm();
	},

	render: function() {
		const {title, content, confirmText} = this.props;
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
							<h4 className="modal-title text-center">{title}</h4>
						</div>
						<div className="modal-body">
							<p className="text-center">{content}</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-default success"
								onClick={this.confirm}
								data-dismiss="modal"
							>{confirmText || 'Yes'}</button>
							<button
								type="button"
								className="btn btn-primary cancel"
								onClick={this.props.close}
							>No</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
