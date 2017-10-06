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