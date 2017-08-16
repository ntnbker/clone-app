var ContentTradyDetail = React.createClass({
	render: function() {
		return (
			<div>
				{ this.props.assigned_trady &&
						<ul>
							<li>
								<a onClick={() => selt.props.onModalWith('addPhoto')}>
									<i className="fa fa-commenting" aria-hidden="true" />
									Add Photo
								</a>
							</li>
							<li>
								<a onClick={() => selt.props.onModalWith('editDescription')}>
									<i className="fa fa-commenting" aria-hidden="true" />
									Edit Description
								</a>
							</li>
						</ul>
				}
			</div>
		);
	}
});

var TradyDetail = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	showContact: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item" data-intro="This is edit details" data-position="left">
				<div className="header action">
					<a>Maitenance Request Detail:</a>
					<i
						aria-hidden="true" 
						onClick={this.showContact} 
						className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} 
					/>
				</div>
				<div className="content">
					{ this.state.show && 
							<ContentTradyDetail 
								assigned_trady={this.props.assigned_trady}
								onModalWith={(modal) => this.props.onModalWith(modal)}
							/>
					}
				</div>
			</div>
		);
	}
});

var TradyDetailMobile = React.createClass({
	render: function() {
		return (
			<div className="activity-mobile">
				<div className="item">
					<div className="header action">
						<a>Maintenance Request Details:</a>
						<i 
							aria-hidden="true" 
							className="fa fa-close" 
							onClick={this.props.close}
						/>
					</div>
					<div className="content">
						<ContentTradyDetail 
							assigned_trady={this.props.assigned_trady}
							onModalWith={(modal) => this.props.onModalWith(modal)}
						/>
					</div>
				</div>
			</div>
		);
	}
});