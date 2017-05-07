var Carousel = React.createClass({
	getInitialState: function() {
		return {
			indexSlider: 0
		};
	},

	switchSlider: function(index) {
		if(index != this.state.indexSlider){
			this.setState({indexSlider: index});
		}
	},

	render: function() {
		var temp = this;
		return (
			<div className="slider-custom">
				<div className="swiper-container swiper-container-horizontal">
					<div className="swiper-wrapper slider">
						<img
							key={this.state.indexSlider} 
							src={this.props.gallery[this.state.indexSlider].url} 
							className="swiper-slide slide-image img-1 active"
						/>
					</div>
				</div>
				<div className="swiper-pagination swiper-pagination-custom swiper-pagination-clickable swiper-pagination-bullets">
				{
					this.props.gallery.map(function(img, index) {
						return (
							<span
								key={index}
								className={'swiper-pagination-bullet ' + ( index === temp.state.indexSlider && 'swiper-pagination-bullet-active')}
								onClick={() => temp.switchSlider(index)}
							></span>
						);
					})
				}
				</div>
			</div>
		);
	}
});

var ItemMaintenanceRequest = React.createClass({
	render: function() {
		const maintenance = this.props.maintenance_request;
		return (
			<div className="post">
				<div className="info">
					<div className="info-title">
						<div className="title">
							<span>
								{maintenance.maintenance_heading}
							</span>
							<button className="button-primary" type="">Active</button>
						</div>
						<div className="author">
							<i className="fa fa-map-marker" aria-hidden="true" />
							<span className="address">
								{this.props.property.property_address}.
							</span>
							<a className="time">
								{moment(maintenance.created_at).startOf('day').fromNow()}
							</a>
							<a>|</a>
							<a className="name-author">{maintenance.service_type}</a>
						</div>
					</div>
					<div className="actions">
						<button className="button-primary update-status">
							Update status
						</button>
						<button className="button-primary edit-detail">
							<i className="fa fa-pencil" aria-hidden="true" />
							<span>
								Edit Details
							</span>
						</button>
						<button className="button-primary assign-to">
							<i className="icon-user" aria-hidden="true" />
							<span>
								Assign to
							</span>
							<i className="fa fa-angle-down" aria-hidden="true" />
						</button>
					</div>
				</div>
				<div className="content">
					<Carousel gallery={this.props.gallery} />
					<div className="description">
						<p>{maintenance.maintenance_description}</p>
					</div>
					<div className="date-time">
						<button>
							<span className="vailability">Availability: </span>
							<span className="time">{maintenance.availability}</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
});
