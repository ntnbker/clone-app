var ContentMessage = React.createClass({
	getInitialState: function() {
		var messages = this.props.messages;
		return {
			messages: messages
		};	
	},

	autoScroll: function() {
		$('#message').animate({
  		scrollTop: $('#message').get(0).scrollHeight
  	}, 200);
	},

	componentDidMount: function() {
		this.autoScroll();
	},

	componentDidUpdate: function() {
		this.autoScroll();
	},

	render: function() {
		if(!!this.props.messages) {
			var current_user = this.props.current_user
			return (
				<ul className="message scroll-custom" id="message">
					{
						this.props.messages.map(function(item, key) {
							return (
								<li key={key} className={'item-message ' + (current_user && item.user_id == current_user.id && 'current-message')}>
									<span>
										{item.body}
									</span>
								</li>
							);
						})
					}
				</ul>
			);
		}else {
			return <p className="text-center" id="message">Message is empty!</p>
		}
		
	}
});