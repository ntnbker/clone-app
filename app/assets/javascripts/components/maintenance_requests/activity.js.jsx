var Activity = React.createClass({
	getInitialState: function() {
		return {
			show: true
		};
	},

	showActivity: function() {
		this.setState({show: !this.state.show});
	},

	content: function() {
		return (
			<div>
				<ul>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
								Request by 
								<strong>Dereck Carlson</strong>
							</span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
								Request by 
								<strong>Dereck Carlson</strong>
							</span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
								Request by 
								<strong>Dereck Carlson</strong>
							</span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
					<li className="user">
						<img className="img-user" src="/assets/user1.png" />
						<p className="info">
							<span className="title">
							Request by <strong>Dereck Carlson</strong></span>
							<span className="time">Sep 16, 2017 at 9am</span>
						</p>
					</li>
				</ul>
				<button className="view-more button-default">
					View more
				</button>
			</div>
		);
	},

	render: function() {
		return (
			<div className="item">
				<div className="header action">
					<a >Activity log:</a>
					<i className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} aria-hidden="true" onClick={this.showActivity}></i>
				</div>
				<div className="content text-center" id="activity-content">
					{ this.state.show && this.content() }
				</div>
			</div>
		);
	}
});

var ActivityMobile = React.createClass({
	render: function() {
		return (
			<div className="activity-mobile">
				<div className="item">
					<div className="header action">
						<a >Activity log:</a>
						<i className="fa fa-angle-down" aria-hidden="true"></i>
					</div>
					<div className="content text-center">
						<ul>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
							<li className="user">
								<img className="img-user" src="/assets/user1.png" />
								<p className="info">
									<span className="title">Request by <strong>Dereck Carlson</strong></span>
									<span className="time">Sep 16, 2017 at 9am</span>
								</p>
							</li>
						</ul>
						<div className="text-center">
							<button className="view-more button-default">
								View more
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});