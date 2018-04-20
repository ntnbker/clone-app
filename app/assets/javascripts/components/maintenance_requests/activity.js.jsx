var ContentActivity = React.createClass({
	render: function() {
		return (
			<div>
				<ul>
				{
					this.props.logs.map((item, index) => {
						return (
							<li key={index} className="user">
								<span className="icon-user">
									<i className="fa fa-user" />
								</span>
								<p className="info">
									<span className="title">
										{ item.action }
										<strong> { item.name }</strong>
									</span>
									<span className="time">{ moment(item.created_at).format('lll') }</span>
								</p>
							</li>
						);
					})
				}
				</ul>
			</div>
		);
	}
});

var Activity = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	showActivity: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="item box-shadow">
				<div className="header action general-action-title">
					<a>Activity log:</a>
					<i className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} aria-hidden="true" onClick={this.showActivity}></i>
				</div>
				<div className="content text-center activity-content" id="activity-content">
					{ (this.state.show && this.props.logs.length) ?
							<ContentActivity logs={this.props.logs} />
							: null
					}
				</div>
			</div>
		);
	}
});

var ActivityMobile = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	showActivity: function() {
		this.setState({show: !this.state.show});
	},

	render: function() {
		return (
			<div className="activity-mobile">
				<div className="item">
					<div className="header action">
						<a >Activity log:</a>
						<i className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} aria-hidden="true" onClick={this.showActivity}></i>
					</div>
					<div className="content text-center activity-content">
					{ (this.props.logs.length && !!this.state.show) ?
							<ContentActivity logs={this.props.logs} />
							: null
					}
					</div>
				</div>
			</div>
		);
	}
});
