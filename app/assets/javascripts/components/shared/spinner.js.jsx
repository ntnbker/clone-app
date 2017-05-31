var Spinner = React.createClass({
	componentDidMount: function() {
		/*$(document).ajaxStart(function() {
			$("#spinner").css('display', 'flex');
		});

		$(document).ajaxStop(function() {
			$("#spinner").css('display', 'none');
		});*/
	},

	render: function() {
		return (
			<div id="spinner" className="spinner-content">
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