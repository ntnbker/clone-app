var triggerSpinner = () => {};

var Spinner = React.createClass({
	getInitialState() {
		triggerSpinner = this.showSpinner.bind(this);
		return {
			isShow: false,
			 currentTop: 0
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
		if (window.matchMedia) {
			var mediaQueryList = window.matchMedia('print');
			mediaQueryList.addListener(function(mql) {
				if (mql.matches) {
					if ($('.modal-custom')) {
						$('html, body').animate({ scrollTop: 0 }, 0);
					}
				}
				else {
					if ($('.modal-custom')) {
						$('html, body').animate({ scrollTop: self.state.currentTop }, 0);
					}
				}
			});
		}
		window.onbeforeprint = function(e) {
			if ($('.modal-custom')) {
				self.setState({
					currentTop: e.target.scrollY
				})
				$('html, body').animate({ scrollTop: 0 }, 0);
			}
		}
		window.onafterprint = function(e) {
			console.log(self.state.currentTop);
			if ($('.modal-custom')) {
				$('html, body').animate({ scrollTop: self.state.currentTop }, 0);
			}
		}
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