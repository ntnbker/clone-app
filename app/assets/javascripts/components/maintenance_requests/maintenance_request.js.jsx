var Carousel = React.createClass({
	getInitialState: function() {
		const gallery = this.props.gallery.length > 0 ? this.props.gallery : ["/uploads/maintenance_request_image/images/no_image.png"];
		return {
			stx: 0,
			stpos: 0,
			stwidth: 0,
			indexSlider: 0,
			gallery: gallery,
			stlen: gallery.length,
		};
	},

	sliderRun: function(stpos) {
		var stx = stpos * -this.state.stwidth;
		this.setState({
			stx: stx,
			stpos: stpos,
		});
	},

	sliderPrev: function() {
		var stpos = this.state.stpos - 1;
		if(stpos < 0) {
			stpos = this.state.stlen - 1;
		}
		this.sliderRun(stpos);
	},

	sliderNext: function() {
		var stpos = this.state.stpos + 1;
		if(stpos >= this.state.stlen) {
			stpos = 0;
		}
		this.sliderRun(stpos);
	},

	setWidth: function(width) {
		if(width) {
			this.setState({
				stwidth: width
			});
		}
	},

	componentDidMount: function() {
		const self = this;
		var sliderDetail = $('#slider-detail')
		if(sliderDetail.length > 0) {
			this.setWidth(sliderDetail.width())
			
			$( window ).resize(function() {
				self.setWidth(sliderDetail.width());
			});

			sliderDetail.on("touchstart", function(event){
				var xClick = event.originalEvent.touches[0].pageX;
				$(this).one("touchmove", function(event){
					var xMove = event.originalEvent.touches[0].pageX;
					if(Math.ceil(xClick - xMove) > 5 ){
						self.sliderNext();
					}
					else if( Math.ceil(xClick - xMove) < -5 ){
						self.sliderPrev();
					}
				});
				sliderDetail.on("touchend", function(){
					$(this).off("touchmove");
				});
			});
		}
	},

	render: function() {
		var styles = {
			left: this.state.stx,
			width: this.state.stlen * this.state.stwidth,
		};
		const temp = this;
		var subWidth = 100/(this.state.stlen ? this.state.stlen : 1) + '%';
		return (
			<div className="slider-custom" id="slider-detail">
				<div className="swiper-container swiper-container-horizontal">
					<div className="swiper-wrapper slider" style={styles} id="mySlider">
					{
						this.state.gallery.map(function(img, index) {
							return (
								<img
									key={index} 
									src={img} 
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
					this.state.gallery.length > 1 ?
						this.state.gallery.map(function(img, index) {
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

var Assigns = React.createClass({
	render: function() {
		const assigns = this.props.assigns;
		return (
			<ul>
				{
					assigns.map((item, key) => {
						if(item.name || item.first_name){
							return (
								<li key={item.id}>
									<a onClick={(email) => this.props.assignToUser(item.email)}>
										{ item.name ? item.name : item.first_name + " " + item.last_name }
									</a>
								</li>
							);
						}
						
					})
				}
			</ul>
		);
	}
});

var ButtonHeaderMR = React.createClass({
	getInitialState: function() {
		return {
			isShow: false
		};
	},

	show: function(key) {
		this.setState({
			isShow: true
		});
	},

	close: function() {
		this.setState({
			isShow: false
		});
	},

	componentDidMount: function() {
		const self = this;
		$(document).bind('click', function(e) {
			if(self.state.isShow) {
				self.close();
			}
		});
	},

	render: function() {
		const all_agents = this.props.all_agents;
		const all_agency_admins = this.props.all_agency_admins;
		return (
			<div className="actions">
				<button className="button-primary update-status">
					Update status
				</button>
				<button className="button-primary edit-detail" onClick={(key) => this.props.viewItem('editMaintenanceRequest')}>
					<i className="fa fa-pencil" aria-hidden="true" />
					<span>
						Edit Details
					</span>
				</button>
				<div className="assign">
					<button className="button-primary assign-to" id="assign-to" onClick={(key) => this.show(this.state.isShow ? "close" : "")}>
						<i className="icon-user" aria-hidden="true" />
						<span>
							Assign to
						</span>
						<i className="fa fa-angle-down" aria-hidden="true" />
					</button>
					<div className="dropdown-assign" style={{display: this.state.isShow ? 'block' : 'none'}}>
						<div>
							<p>Agency Administrators</p>
							<Assigns assigns={all_agency_admins} assignToUser={(email) => this.props.assignToUser(email)} />
						</div>
						<div>
							<p className="agent">Agents</p>
							<Assigns assigns={all_agents} assignToUser={(email) => this.props.assignToUser(email)} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var ItemMaintenanceRequest = React.createClass({
	render: function() {
		const maintenance = this.props.maintenance_request;
		const props = this.props;
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
					{
						props.show_assign &&
							<ButtonHeaderMR
								all_agents={props.all_agents}
								all_agency_admins={props.all_agency_admins}
								viewItem={(key, item) => this.props.viewItem(key, item)}
								assignToUser={(email) => this.props.assignToUser(email)}
							/>
					}
				</div>
				<div className="content">
					{<Carousel gallery={this.props.gallery} />}
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
