var Carousel = React.createClass({
	getInitialState: function() {
		return {
			stlen: this.props.gallery ? this.props.gallery.length : 0,
			indexSlider: 0,
			stpos: 0,
     	stwidth: 0,
     	stx: 0
		};
	},

	sliderRun: function(stpos) {
    var stx = stpos * -this.state.stwidth;
    this.setState({
        stx: stx,
    		stpos: stpos,
    });
  },

  sliderPrev: function(argument) {
    var stpos = this.state.stpos - 1;
    if(stpos < 0) stpos = this.state.stlen - 1;
    this.sliderRun(stpos);
  },

  sliderNext: function() {
    var stpos = this.state.stpos + 1;
    if(stpos >= this.state.stlen) stpos = 0;
    this.sliderRun(stpos);
  },

	componentDidMount: function() {
		const self = this;
		this.setState({
			stwidth: $('.slider-custom').width()
		});
		
		$( window ).resize(function() {
			self.setState({
				stwidth: $('.slider-custom').width()
			});
		});

		$(".slider-custom").on("touchstart", function(event){
      var xClick = event.originalEvent.touches[0].pageX;
	    $(this).one("touchmove", function(event){
	    	debugger
	        var xMove = event.originalEvent.touches[0].pageX;
	        if( Math.floor(xClick - xMove) > 10 ){
	            self.sliderNext();
	        }
	        else if( Math.floor(xClick - xMove) < -10 ){
	            self.sliderPrev();
	        }
	    });
	    $(".slider-custom").on("touchend", function(){
	            $(this).off("touchmove");
	    });
		});
	},

	render: function() {
		var styles = {
      left: this.state.stx,
      width: this.state.stlen * this.state.stwidth,
    };
		const temp = this;
		var subWidth = 100/(this.state.stlen ? this.state.stlen : 1) + '%';
		return (
			<div className="slider-custom">
				<div className="swiper-container swiper-container-horizontal">
					<div className="swiper-wrapper slider" style={styles} id="mySlider">
					{
						this.props.gallery.map(function(img, index) {
							return (
								<img
									key={index} 
									src={img.url} 
									style={{width: subWidth}}
									className="swiper-slide slide-image"
								/>
							);
						})
					}
					</div>
				</div>
				<div className="swiper-pagination">
				{
					this.props.gallery.length > 1 ?
						this.props.gallery.map(function(img, index) {
							return (
								<span 
									key={index} 
									className={"swiper-pagination-bullet " + (temp.state.stpos == index && "swiper-pagination-bullet-active")}
									onClick={(stops) => temp.sliderRun(index)}
								>
									
								</span>
							);
						})
						: null
				}					
				</div>
				{
					this.props.gallery.length > 1 && <div className="btn-slider btn-next" onClick={this.sliderNext}><i className="fa fa-angle-right"></i></div>
				}
				{
					this.props.gallery.length > 1 && <div className="btn-slider btn-prev" onClick={this.sliderPrev}><i className="fa fa-angle-left"></i></div>
				}
        
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
