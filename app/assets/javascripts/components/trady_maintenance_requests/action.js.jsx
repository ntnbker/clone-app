var ContentTradyAction = React.createClass({
	render: function() {
		return (
			<ul>
				<li className="active">
					<a>
						<i className="fa fa-file-text" aria-hidden="true" />
						Create or Upload Quote
					</a>
				</li>
				<li>
					<a>
						<i className="icon-send" aria-hidden="true" />
						Create or Upload Invoice
					</a>
				</li>
			</ul>
		);
	}
});

var TradyAction = React.createClass({
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
			<div className="item">
				<div className="header action">
					<a>Actions:</a>
					<i 
						aria-hidden="true" 
						onClick={this.showAction} 
						className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} 
					/>
				</div>
				<div className="content" id="actions-content">
					{ this.state.show && <ContentTradyAction onModalWith={(modal) => this.props.onModalWith(modal)}  landlord={this.props.landlord} /> }
				</div>
			</div>
		);
	}
});

var TradyActionMobile = React.createClass({
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
						<ContentTradyAction onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} />
					</div>
				</div>
			</div>
		);
	}
});