var triggerSpinner = () => {};

var Spinner = React.createClass({
	getInitialState() {
		triggerSpinner = this.showSpinner.bind(this);
		return {
			isShow: false
		};
	},

	showSpinner(isShow) {
		this.setState({isShow: !!isShow});
	},

	componentDidMount: function() {
		const self = this;
		/*$(document).ajaxStart(function() {
			$("#spinner").css('display', 'flex');
		});

		$(document).ajaxStop(function() {
			$("#spinner").css('display', 'none');
		});*/

		$(document).bind('ajaxSend popstate', function(e) {
			self.setState({isShow: true});
		}).bind('ajaxComplete load', function(e) {
			self.setState({isShow: false});
			
			let firstError = null;
			$('.error').each((i, item) => {
				if (!firstError && $(item).text().trim()) firstError = item;
			})

			if (firstError) {
				$('html, body').animate({
					scrollTop: $(firstError).offset().top - 100
				}, 500);
			}
		});
	},

	render: function() {
		return (
			<div id="spinner" className="spinner-content" style={{display: this.state.isShow ? 'flex' : 'none'}}>
				<div className="spinner-bg"></div>
				<div className="spinner">
					<div className="bounce1"></div>
				  <div className="bounce2"></div>
				  <div className="bounce3"></div>
				</div>
			</div>
		);
	}
});