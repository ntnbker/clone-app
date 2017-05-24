var ContentAction = React.createClass({
	render: function() {
		return (
			<ul>
				<li>
					<a onClick={() => this.props.onModalWith(!!this.props.landlord ? 'confirm' : 'addAskLandlord')}>
						<i className="fa fa-user" />
						Ask Landlord
					</a>
				</li>
				<li className="active">
					<a onClick={() => this.props.onModalWith('requestQuote')}>
						<i className="fa fa-file-text" aria-hidden="true" />
						Request quote
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('sendWorkOrder')}>
						<i className="icon-send" aria-hidden="true" />
						Send work order
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('addLandlord')}>
						<i aria-hidden="true" className="fa fa-user-plus" />
						Add Landlord
					</a>
				</li>
				<li>
					<a onClick={() => this.props.onModalWith('editLandlord')}>
						<i aria-hidden="true" className="fa fa-pencil" />
						Edit Landlord
					</a>
				</li>
			</ul>
		);
	}
});

var Action = React.createClass({
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
					{ this.state.show && <ContentAction onModalWith={(modal) => this.props.onModalWith(modal)}  landlord={this.props.landlord} /> }
				</div>
			</div>
		);
	}
});

var ActionMobile = React.createClass({
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
						<ContentAction onModalWith={(modal) => this.props.onModalWith(modal)} landlord={this.props.landlord} />
					</div>
				</div>
			</div>
		);
	}
});