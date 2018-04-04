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

	generateKey() {
		return parseInt(Math.random() * 100000);
	},

	getSenderName(user, role) {
		switch (role) {
			case 'AgencyAdmin': {
				return user && user.agency_admin && user.agency_admin.first_name;
			}
			case 'Trady': {
				return user && user.trady && user.trady.name;
			}
			case 'Tenant': {
				return user && user.tenant && user.tenant.name;
			}
			case 'Landlord': {
				return user && user.landlord && user.landlord.name;
			}
			case 'Agent': {
				return user && user.agent && user.agent.name;
			}
			default: {
				return '';
			}
		}
	},

	render: function() {
		const {messages, current_user} = this.props;
		const generateKey = this.generateKey;
		const getSenderName = this.getSenderName;

		if(!!messages) {
			return (
				<ul className="message scroll-custom" id="message">
					{
						messages.map(function(item, key) {

							const currentClass = current_user
																&& item.user_id == current_user.id
																&& 'current-message';
							return (
								<div>
									<li
										key={generateKey()}
										className={'item-name ' + currentClass}
									>
										{getSenderName(item.user, item.role)}
									</li>
									<li key={generateKey()} className={'item-message ' + currentClass}>
										<div>
											<span className="item-text">{item.body}</span>
											<span className="item-date">
												{moment(item.created_at).format('LLLL')}
											</span>
										</div>
									</li>
								</div>
							);
						})
					}
				</ul>
			);
		}else {
			return <p className="text-center" id="message"> 0 messages in this conversation</p>
		}

	}
});
