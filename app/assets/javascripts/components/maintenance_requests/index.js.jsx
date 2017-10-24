var DropContent = React.createClass({
                render: function() {
                var content = this.props.content;
                return <ul className="dropcontent drop-content">
                {
                this.props.content.map((item, index) =>
                <li key={index}>
                <a href={item.href}>
                {item.title}
          </a>
          <span>
                {item.count}
          </span>
        </li>
      )
    }
    </ul>
  }
});

var DropList = React.createClass({
	propTypes: {
		children: React.PropTypes.element
	},

  getInitialState: function() {
  	return {hidden : true}
	},

	onDrop() {
		this.setState({hidden: !this.state.hidden});
	},

	render: function() {
		return <div className="droplist">
			<div className={this.state.hidden ? 'title' : 'title active'} onClick={this.onDrop}>
        {this.props.title}
      </div>
      <div className="content" style={{display: this.state.hidden ? 'none' : 'block' }}>
          <DropContent content={this.props.content}/>
      </div>
		</div>
	}
});

var DropDownContent = React.createClass({
  getInitialState: function() {
    return {
      valueAction: this.props.valueAction
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.isHide === true || nextProps.isHide === false) {
      this.setHeight(nextProps.isHide);
    }
    this.setState({
      valueAction: nextProps.valueAction
    });
  },

  setHeight: function(flag) {
    if(!flag) {
      var dropdown = $('.show .content-action');
      var heightScreen = $(window).height() - 90;
      if(heightScreen < 450) {
        dropdown.css({
          "height": heightScreen,
          "overflow-y": "scroll"
        });
      }else {
        dropdown.css("height", 450);
      }
    }else {
      $('.content-mobile .dropcontent').css('height', 0);
    }
  },

  render: function() {
    var content = this.props.content;
    const props = this.props;
    const state = this.state;
    return (
      <ul className="dropcontent content-action">
      {
        content.map((item, index) => {
          return (
            <li key={index} className={state.valueAction == item.value ? 'active' : ''}>
              <a onClick={(value) => props.getAction(item.value)}>
                <span>{item.count}</span>
                <b className="name">{item.title}</b>
              </a>
            </li>
          );
        })
      }
      </ul>
    );
  }
});

var DropDownList = React.createClass({
  getInitialState: function() {
    return {hidden : false, valueAction: this.props.valueAction}
  },

  onDrop() {
    this.setState({hidden: !this.state.hidden});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      valueAction: nextProps.valueAction
    });
  },

  render: function() {
    return (
      <div className="droplist">
        <div className={this.state.hidden ? 'title' : 'title active'} onClick={this.onDrop}>
          {this.props.title}
        </div>
        <div className="content" style={{display: this.state.hidden ? 'none' : 'block' }}>
            <DropDownContent
              content={this.props.content}
              valueAction={this.state.valueAction}
              getAction={(value) => this.props.getAction(value)}
            />
        </div>
      </div>
    );
  }
});

var DropDownMobileList = React.createClass({
  getInitialState: function() {
    return {hidden: true, valueAction: this.props.valueAction}
  },

  onDrop: function(id) {
    if(id != "over") {
      this.setState({
        hidden: !this.state.hidden
      });
    }else if(!this.state.hidden){
      this.setState({
        hidden: true
      });
    }
  },

  componentDidMount: function() {
    const self = this;
    $(document).bind('click', function(e) {
      if (!e.target.matches('#' + self.props.id)) {
        self.onDrop('over');
      }
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      valueAction: nextProps.valueAction
    });
  },

  render: function() {
    const props = this.props;
    const state = this.state;
    return (
      <div className="drop-mobile-list">
        <button
          id={props.id}
          onClick={(id) => this.onDrop(props.id)}
          className={'btn-drop-mobile title ' + props.id + ' ' + (!state.hidden && 'active')}
        >
          {this.props.title}
        </button>
        <div className={"content-mobile action-mobile " + (!state.hidden && 'show')}>
          <DropDownContent
            isHide={state.hidden}
            content={props.content}
            valueAction={state.valueAction}
            getAction={(value) => props.getAction(value)}
          />
        </div>
      </div>
    );
  }
});

var P = React.createClass({
  getInitialState: function() {
      return {
         expanded: false
     };
  },

  readMore: function() {
      this.setState({
          expanded: !this.state.expanded
      });
  },

  getMoreTextP: function() {
    var maxLength = 200;
   	if (this.state.expanded || this.props.content.length < maxLength) {
    	return <p style={{display: "inline"}}> {this.props.content} </p>;
    } else {
    	var content = this.props.content.substr(0,maxLength-3) + "...";
		  return <p style={{display: "inline"}}> {content} </p>;
    }
  },

  render: function() {
    var expandedDiv = this.getMoreTextP();
    var expanded = this.state.expanded;
    var maxLength = 200;
    return (
      <div className="readmore">
        { expandedDiv }
        {
        	this.props.content.length >= maxLength &&
            <a onClick={this.readMore}>{expanded ? 'less' : 'more'}</a>
        }
      </div>
    );
  }
});


var ImgSlider = React.createClass({
  getInitialState: function() {
    return {
      stx: 0,
      stpos: 0,
      stwidth: 0,
      stlen: this.props.images.length,
    };
  },

  sliderTopRun: function(stpos) {
      var stx = stpos * -this.state.stwidth;

      this.setState({
          stx: stx
      });
  },

  sliderTopPrev: function() {
      var stpos = this.state.stpos - 1;
      if(stpos < 0) {
        stpos = this.state.stlen - 1;
      }
      this.setState({
          stpos: stpos
      });
      this.sliderTopRun(stpos);
  },

  sliderTopNext: function() {
      var stpos = this.state.stpos + 1;
      if(stpos >= this.state.stlen) {
        stpos = 0;
      }
      this.setState({
          stpos: stpos
      });
      this.sliderTopRun(stpos);
  },

  setWidth: function() {
    const slider = $('#slider');
    if(slider.length > 0 && slider.width() > 0) {
      this.setState({
        stwidth: slider.width()
      });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      stlen: nextProps.images.length > 0 ? nextProps.images.length : 1
    });
  },

  componentDidMount: function() {
    const self = this;
    if($('#slider').length > 0) {
      this.setWidth();

      $(window).on('load resize', function() {
        self.setWidth();
      });
    }

    $("." + self.props.nameClass).on("touchstart", function(event){
      var xClick = event.originalEvent.touches[0].pageX;
      $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.ceil(xClick - xMove) > 5 ){
          self.sliderTopNext();
        }
        else if( Math.ceil(xClick - xMove) < -5 ){
          self.sliderTopPrev();
        }
      });
      $("." + self.props.nameClass).on("touchend", function(){
        $(this).off("touchmove");
      });
    });
  },

  render: function() {
    var styles = {
      left: this.state.stx,
      width: this.state.stlen * this.state.stwidth,
    };
    var subWidth = 100/(this.state.stlen ? this.state.stlen : 1) + '%';
    const images = this.props.images;
    return <div id="slider">
      { this.state.stlen > 1 &&
          <div>
            <button className="button btn prev" onClick={this.sliderTopPrev}>
              <i className="fa fa-angle-left"></i>
            </button>
            <button className="button btn next" onClick={this.sliderTopNext}>
              <i className="fa fa-angle-right"></i>
            </button>
          </div>
      }
      <div className={"swiper-container swiper-container-horizontal " + this.props.nameClass}>
        <div className="swiper-wrapper slider" style={styles}>
        {
          images.map((image, i) => {
            return <img key={i} className="swiper-slide slide-image" src={image} style={{width: subWidth}} alt="Uploading..." />
          })
        }
        </div>
      </div>
    </div>
  }
});

var DropforSort = React.createClass({
  getInitialState: function() {
      return {
        sort_by_date: this.props.sort_by_date ? this.props.sort_by_date : ''
     };
  },

  handleChange(event) {
    this.setState({sort_by_date: event.target.value});
    this.refs.select.submit();
  },

  render: function() {
    return <form name="sort_by_date" action="/maintenance_requests" method="get" ref="select">
      <input type="hidden" name="page" value={this.props.page ? this.props.page : 1}/>
      <select className="select-custom" value={this.state.sort_by_date} name='sort_by_date' onChange={this.handleChange}>
        <option className="option-custom" value="Oldest to Newest">Oldest to Newest</option>
        <option className="option-custom" value="Newest to Oldest">Newest to Oldest</option>
      </select>
      <input type="submit" value="Submit" style={{display:'none'}}/>
    </form>
  }
});

var ListMaintenanceRequest = React.createClass({
  getInitialState: function() {
    const {maintenance_requests} = this.props;
    const page = 1;
    const prePage = 3;
    const dataShow = [...maintenance_requests].splice(0, prePage);

    return {
      page: page,
      valueAction: "",
      prePage: prePage,
      dataShow: dataShow,
      data: maintenance_requests,
      sortByDate: "Newest to Oldest",
      filterDate: [
        {value: "Oldest to Newest", name: "Oldest to Newest"},
        {value: "Newest to Oldest", name: "Newest to Oldest"},
      ],
      actionRequests: [
        {
          title: "Maintenance Request",
          value: "Initiate Maintenance Request",
          count: this.props.new_maintenance_requests_count,
        },
        {
          title: "Quote Requested",
          value: "Quote Requested",
          count: this.props.quote_requested_count
        },
        {
          title: "Quote Received",
          value: "Quote Received",
          count: this.props.quotes_received_count,
        },
        {
          title: "New Invoice",
          value: "New Invoice",
          count: this.props.new_invoice_count,
        },
        {
          title: "Pending Payment",
          value: "Pending Payment",
          count: this.props.pending_payment_count,
        }
      ],
      awaitingAction: [
        {
          title: "Awaiting Owner Initiation",
          value: "Awaiting Owner Initiation",
          count: this.props.awaiting_owner_initiation_count
        },
        {
          title: "Awaiting Owner Instruction",
          value: "Awaiting Owner Instruction",
          count: this.props.awaiting_owner_instruction_count
        },
        {
          title: "Awaiting Tradie Initiation",
          value: "Awaiting Tradie Initiation",
          count: this.props.awaiting_trady_initiation_count
        },
        {
          title: "Awaiting Tradie`s Quote",
          value: "Awaiting Quote",
          count: this.props.awaiting_trady_quote_count
        },
        {
          title: "Awaiting Quote Approval",
          value: "Quote Received Awaiting Approval",
          count: this.props.awaiting_quote_approval_count
        },
        {
          title: "Quote Approved Tradie To Organise Appointment",
          value: "Quote Approved Tradie To Organise Appointment",
          count: this.props.trady_organise_appointment_count
        },
        {
          title: "Tradie To Confirm Appointment",
          value: "Tradie To Confirm Appointment",
          count: this.props.trady_confirm_appointment_count
        },
        {
          title: "Tenant To Confirm Appointment",
          value: "Tenant To Confirm Appointment",
          count: this.props.tenant_confirm_appointment_count
        },
        {
          title: "Landlord To Confirm Appointment",
          value: "Landlord To Confirm Appointment",
          count: this.props.landlord_confirm_appointment_count
        },
        {
          title: "Maintenance Scheduled - Awaiting Invoice",
          value: "Maintenance Scheduled - Awaiting Invoice",
          count: this.props.maintenance_scheduled_count
        },
        {
          title: "Maintenance Scheduled With Landlord",
          value: "Maintenance Scheduled With Landlord",
          count: this.props.maintenance_scheduled_with_landlord_count
        },
      ],
      tradyFilter: [
        {
          title: "Quote Requests",
          value: "Quote Requests",
          count: this.props.quote_request
        },
        {
          title: "Awaiting Quote Approvals",
          value: "Awaiting Quote Approvals",
          count: this.props.awaiting_quote_approvals
        },
        {
          title: "Appointments Required",
          value: "Appointment Required",
          count: this.props.appointments_required
        },
        {
          title: "Awaiting Appointment Confirmation",
          value: "Awaiting Appointment Confirmation",
          count: this.props.awaiting_appointment_confirmation
        },
        {
          title: "Alternate Appointment Requested",
          value: "Alternate Appointment Requested",
          count: this.props.alternate_appointment_requested
        },
        {
          title: "Job Booked",
          value: "Job Booked",
          count: this.props.job_booked
        },
        {
          title: "Awaiting Payment",
          value: "Awaiting Payment",
          count: this.props.awaiting_payment
        },
        {
          title: "Jobs Completed",
          value: "Job Complete",
          count: this.props.job_complete
        },
        {
          title: "Declined Quotes",
          value: "Declined Quotes",
          count: this.props.declined_quotes
        },
      ]
    };
  },

  getMaintenanceRequests: function(page = null, sortByDate = null) {
    const self = this;
    var page = !!page ? page : this.state.page;
    var params = {
      sort_by_date: sortByDate ? sortByDate : this.state.sortByDate,
    }

    this.getData(this.props.link, page, params);
  },

  getData: function(link, page, params) {
    const self = this;
    $.ajax({
      type: 'GET',
      url: link,
      data: params,
      success: function(res){
        const dataShow = [...res].splice((page-1) * self.state.prePage, self.state.prePage);
        self.setState({
          data: [...res],
          dataShow: dataShow,
        });
      },
      error: function(err) {
        self.setState({
          data: [],
          dataShow: [],
        });
      }
    });
  },

  componentWillMount: function() {
    //this.getMaintenanceRequests();
  },

  setPage: function(page){
    this.setState({
      page: page
    });
    if(this.state.valueAction) {
      if(!!this.props.current_user_agent || !!this.props.current_user_agency_admin) {
        this.getData("/maintenance_request_filter", page, {
          sort_by_date: this.state.sortByDate,
          maintenance_request_filter: this.state.valueAction,
        });
      }else if(!!this.props.current_user_trady) {
        this.getData("/trady_maintenance_request_filter", page, {
          sort_by_date: this.state.sortByDate,
          trady_id: this.props.current_user_trady.id,
          maintenance_request_filter: this.state.valueAction,
        });
      }
    }else {
      this.getData(this.props.link, page, {sort_by_date: this.state.sortByDate});
    }
  },

  selectFilter: function(value) {
    this.setState({
      sortByDate: value
    });

    if(this.state.valueAction) {
      if(!!this.props.current_user_agent || !!this.props.current_user_agency_admin) {
        this.getData("/maintenance_request_filter", this.state.page, {
          sort_by_date: value,
          maintenance_request_filter: this.state.valueAction
        });
      }else if(!!this.props.current_user_trady) {
        this.getData("/trady_maintenance_request_filter", this.state.page, {
          sort_by_date: value,
          trady_id: this.props.current_user_trady.id,
          maintenance_request_filter: this.state.valueAction,
        });
      }
    }else {
      this.getData(this.props.link, this.state.page, {sort_by_date: value});
    }
  },

  getAction: function(action) {
    const self = this;
    var params = {
      sort_by_date: this.state.sortByDate,
      maintenance_request_filter: action ? action : this.state.valueAction,
    }
    this.setState({
      page: 1,
      valueAction: action,
    });

    if(!!this.props.current_user_agent || !!this.props.current_user_agency_admin) {
      this.getData("/maintenance_request_filter", 1, params);
    } else if(!!this.props.current_user_trady) {
      params.trady_id = this.props.current_user_trady.id;
      this.getData("/trady_maintenance_request_filter", 1, params);
    }
  },

  render: function() {
    const self = this;
    const current_user_agent = this.props.current_user_agent;
    const current_user_trady = this.props.current_user_trady;
    const current_user_tenant = this.props.current_user_tenant;
    const current_user_landlord = this.props.current_user_landlord;
    const current_user_agency_admin = this.props.current_user_agency_admin;

    return (
      <div className="maintenance-list">
        <div className="dropdown-MR">
          {
            <DropforSortDate
              selectFilter={this.selectFilter}
              filterDate={this.state.filterDate}
              valueSelect={this.state.sortByDate}
            />
          }
          {
            (!!current_user_agent || !!current_user_agency_admin) &&
              <div className="dropdown-custom archived">
                <span className="count">
                  {this.props.archived_count}
                </span>
                <a onClick={() => this.getAction('Archive')}>
                  Archived
                </a>
              </div>
          }
          {
            (!!current_user_agent || !!current_user_agency_admin) &&
              <div className="dropdown-custom archived">
                <span className="count">
                  {this.props.deferred_count}
                </span>
                <a onClick={() => this.getAction('Defer')}>
                  Deferred
                </a>
              </div>
          }
          {
            (!!current_user_agent || !!current_user_agency_admin) &&
              <div className="dropdown-custom archived">
                <span className="count">
                  {this.props.jobs_completed}
                </span>
                <a onClick={() => this.getAction('Jobs Completed')}>
                  Completed
                </a>
              </div>
          }
        </div>
        <div className="maintenance-content">
          <div className={"main-column " + ((!!current_user_landlord || !!current_user_tenant) && "main-landlord")}>
            <div>
              {
                this.state.dataShow.map((maintenance_request, key) => {
                  return (
                    <MaintenanceRequestItem key={key} maintenance_request={maintenance_request} link={self.props.link}/>
                  );
                })
              }
              { this.state.data.length > this.state.prePage &&
                <Pagination
                  page={this.state.page}
                  setPage={this.setPage}
                  total={this.state.data.length}
                  prePage={this.state.prePage}
                />
              }
            </div>
          </div>
          <div className="side-column">
            {
              (!!current_user_agent || !!current_user_agency_admin) &&
                <DropDownList
                  class="action"
                  title="Action Required"
                  content={this.state.actionRequests}
                  valueAction={this.state.valueAction}
                  getAction={(value) => this.getAction(value)}
                />
            }
            {
              (!!current_user_agent || !!current_user_agency_admin) &&
                <DropDownList
                  class="awaiting"
                  title="Awaiting Action"
                  content={this.state.awaitingAction}
                  valueAction={this.state.valueAction}
                  getAction={(value) => this.getAction(value)}
                />
            }
            {
              (!!current_user_trady) &&
                <DropDownList
                  class="trady"
                  id="trady-filter"
                  title="Trady Filter"
                  content={this.state.tradyFilter}
                  valueAction={this.state.valueAction}
                  getAction={(value) => this.getAction(value)}
                />
            }
          </div>
        </div>
        <div className="action-mobile">
          {
            (!!current_user_agent || !!current_user_agency_admin) &&
              <DropDownMobileList
                class="action"
                id="action-required"
                title="Action Required"
                content={this.state.actionRequests}
                valueAction={this.state.valueAction}
                getAction={(value) => this.getAction(value)}
              />
          }
          {
            (!!current_user_agent || !!current_user_agency_admin) &&
              <DropDownMobileList
                class="awaiting"
                id="awaiting-action"
                title="Awaiting Action"
                content={this.state.awaitingAction}
                valueAction={this.state.valueAction}
                getAction={(value) => this.getAction(value)}
              />
          }
          {
            (!!current_user_trady) &&
              <DropDownMobileList
                class="trady"
                id="trady-filter"
                title="Trady Filter"
                content={this.state.tradyFilter}
                valueAction={this.state.valueAction}
                getAction={(value) => this.getAction(value)}
              />
          }
        </div>
      </div>
    );
  }
});

var MaintenanceRequestItem = React.createClass({
  render: function() {
    const maintenance_request = this.props.maintenance_request;
    return (
      <div className="row maintenance-request">
        <div className="image">
          <ImgSlider
            nameClass={"slider-custom-" + maintenance_request.id}
            images={maintenance_request.get_image_urls.length > 0 ? maintenance_request.get_image_urls : ["/uploads/maintenance_request_image/images/no_image.png"]}
          />
        </div>
        <div className="content">
          <div className="info">
            <div className="row">
              <h3 className="heading">
                <a href={this.props.link + "/" + maintenance_request.id}>
                {maintenance_request.maintenance_description.length > 40 ? maintenance_request.maintenance_description.substring(0,40) + "..." : maintenance_request.maintenance_description}
                </a>
              </h3>
              {
                maintenance_request.action_status && maintenance_request.action_status.maintenance_request_statu &&
                <p className="status">{maintenance_request.action_status.maintenance_request_status}</p>
              }

            </div>
            <div className="row">
              <p className="created_at">
                { moment(maintenance_request.created_at).format('LL')}
              </p>
              <span> | </span>
              <p className="type">
                {maintenance_request.service_type}
              </p>
            </div>
            {
              maintenance_request.property && maintenance_request.property.property_address &&
                <p className="address">
                  <i className="fa fa-map-marker"></i>
                  {maintenance_request.property.property_address}
                </p>
            }

          </div>
          <div className="view">
            <a className="btn-view" href={this.props.link + "/" + maintenance_request.id}>View</a>
          </div>
        </div>
      </div>
    );
  }
});

var DropforSortDate = React.createClass({
  handleChange: function(value) {
    this.props.selectFilter(value);
  },

  showMenu: function() {
    document.getElementById("menu").classList.toggle("show");
  },

  componentDidMount: function() {
    window.onclick = function(e) {
      if (!e.target.matches('.btn-show')) {
        var myDropdown = document.getElementById("menu");
          if (myDropdown && myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
          }
      }
    }
  },

  render: function() {
    const self = this;
    return (
      <div className="dropdown-custom">
        <button type="button" className="btn-show" onClick={this.showMenu}>
          {self.props.valueSelect}
          <span className="fa fa-angle-down"></span>
        </button>
        <ul className="dropdown-menu" id="menu">
        {
          self.props.filterDate.map((item, key) => {
            return (
              <li
                key={key}
                onClick={(value) => self.handleChange(item.value)}
                className={self.props.valueSelect == item.value && "active"}
              >
                {item.name}
              </li>
            );
          })
        }
        </ul>
      </div>
    )
  }
});

var Pagination = React.createClass({
  getInitialState: function() {
    return {
      group: 1,
      numbGroup: 5,
      totalPage: 0,
      totalGroup: 0,
      page: this.props.page,
    }
  },

  calculatePage: function(total) {
    let totalPage = Math.ceil(total / this.props.prePage);
    let totalGroup = Math.ceil(totalPage / this.state.numbGroup);
    this.setState({
      totalPage: totalPage,
      totalGroup: totalGroup,
    });
  },

  componentWillMount: function() {
    this.calculatePage(this.props.total);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      page: nextProps.page
    });
    this.calculatePage(nextProps.total);
  },

  switchPage: function(page) {
    let group = 1;
    if(page > this.state.page) {
      group = page > this.state.group * this.state.numbGroup ? this.state.group + 1 : this.state.group;
    }else {
      group = page <= (this.state.group - 1) * this.state.numbGroup ? this.state.group - 1 : this.state.group;
    }

    this.setState({
      page: page,
      group: group,
    });

    this.props.setPage(page);
  },

  switchGroup: function(group) {
    let page = (group - 1) * this.state.numbGroup + 1;
    this.setState({
      page: page,
      group: group,
    });

    this.props.setPage(page);
  },

  render: function() {
    const self = this;
    const paginations = [...Array(this.state.numbGroup).keys()].map((key) => {
      var i = (self.state.group - 1) * self.state.numbGroup + key + 1;
      if(i <= self.state.totalPage) {
        if(i == self.state.page)
          return <em key="current" className="current">{i}</em>
        return <a key={key} onClick={(page) => self.switchPage(i)}>{i}</a>
      }

      return
    });

    return (
      <div className="pagination">
        <div className="content">
          <a
            className={"previous_page fa fa-angle-left " + (this.state.page == 1 && "disabled")}
            onClick={this.state.page > 1 ? (page) => this.switchPage(this.state.page-1) : ""}
          >
          </a>
          {
            this.state.group > 1 &&
              <a onClick={(group) => this.switchGroup(this.state.group - 1)}>
                ...
              </a>
          }
          { paginations }
          {
            this.state.group < this.state.totalGroup &&
              <a onClick={(group) => this.switchGroup(this.state.group + 1)}>
                ...
              </a>
          }
          <a
            key="next"
            className={"next_page fa fa-angle-right " + (this.state.page == this.state.totalPage && "disabled")}
            onClick={(page) => this.switchPage(this.state.page < this.state.totalPage ? this.state.page+1 : this.state.page)}
          >
          </a>
        </div>
      </div>
    );
  }
});


var SearchResultMaintenanceRequest = React.createClass({
  getInitialState: function() {
    const { maintenance_requests, query = '' } = this.props;
    const page = 1;
    const prePage = 3;
    const dataShow = [...maintenance_requests].splice(0, prePage);

    return {
      page: page,
      query: query,
      prePage: prePage,
      dataShow: dataShow,
      data: maintenance_requests,
    };
  },

  setPage: function(page){
    const { prePage, data = [] } = this.state;
    const dataShow = [...data].splice((page - 1) * prePage, prePage);
    this.setState({ page, dataShow });
  },

  render: function() {
    const isPagination = this.state.data.length > this.state.prePage;

    return (
      <div className="maintenance-list">
        <div className="maintenance-content">
          <div className={"main-column"} style={{ width: '100%' }}>
            {
              this.state.dataShow.map((maintenance_request, key) => {
                return (
                  <MaintenanceRequestItem key={key} maintenance_request={maintenance_request} link={this.props.link}/>
                );
              })
            }
            { isPagination &&
              <Pagination
                page={this.state.page}
                setPage={this.setPage}
                total={this.state.data.length}
                prePage={this.state.prePage}
              />
            }
          </div>
        </div>
      </div>
    );
  }
});
