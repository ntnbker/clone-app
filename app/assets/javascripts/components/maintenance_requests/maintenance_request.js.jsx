var Carousel = React.createClass({
	getInitialState: function() {
		return {
			indexSlider: 0
		};
	},

	componentDidMount: function() {
		new Swiper('.swiper-container', {
      paginationClickable: true,
      pagination: '.swiper-pagination',
      autoplay: 2500,
      centeredSlides: true,
      autoplayDisableOnInteraction: false,
      slidesPerView: 1,
      loop: true,
    });
	},

	render: function() {
		var temp = this;
		return (
			<div className="slider-custom">
				<div className="swiper-container swiper-container-horizontal">
					<div className="swiper-wrapper slider">
					{
						this.props.gallery.map(function(img, index) {
							return (
								<img
									key={index} 
									src={img.url} 
									className="swiper-slide slide-image"
								/>
							);
						})
					}
					</div>
				</div>
				<div className="swiper-pagination"></div>
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
					{this.props.gallery && <Carousel gallery={this.props.gallery} />}
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
