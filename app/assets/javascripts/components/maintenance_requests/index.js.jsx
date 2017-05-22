var DropContent = React.createClass({
    render: function() {
        var content = this.props.content;
        return <ul className="dropcontent">
            {
                this.props.content.map((item, index) => 
                    <li key={index}><a href={item.href}> {item.title}</a> <span>{item.count}</span></li>)
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
			<div className={this.state.hidden ? 'title' : 'title active'} onClick={this.onDrop}>{this.props.title}</div>
            <div className="content" style={{display: this.state.hidden ? 'none' : 'block' }}>
                <DropContent content={this.props.content}/>
            </div>
		</div>
	}
});

var DropDownContent = React.createClass({
  render: function() {
    var content = this.props.content;
    const self = this;
    return (
      <ul className="dropcontent">
      {
        this.props.content.map((item, index) => {
          return (
            <li key={index}>
              <a onClick={(value) => self.props.getAction(item.value)}> 
                {item.title}
              </a> 
              <span>{item.count}</span>
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
      return {hidden : true}
    },

  onDrop() {
    this.setState({hidden: !this.state.hidden});
  },

  render: function() {
    return (
      <div className="droplist">
        <div className={this.state.hidden ? 'title' : 'title active'} onClick={this.onDrop}>
          {this.props.title}
        </div>
        <div className="content" style={{display: this.state.hidden ? 'none' : 'block' }}>
            <DropDownContent content={this.props.content} getAction={(value) => this.props.getAction(value)} />
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
            	this.props.content.length < maxLength 
            	? null
            	: <a onClick={this.readMore}>{expanded ? 'less' : 'more'}</a>
            }
            
         </div>
     );
	}
});


var ImgSlider = React.createClass({
    getInitialState: function() {
        return {
           stlen: this.props.images ? this.props.images.length : 0,
           stpos: 0,
           stwidth: 300,
           stx: 0
       };
    },

    sliderTopRun(stpos) {
        var stx = stpos * -this.state.stwidth;

        this.setState({
            stx: stx
        });
    },

    sliderTopPrev() {
        var stpos = this.state.stpos - 1;
        if(stpos < 0) stpos = this.state.stlen - 1;
        this.setState({
            stpos: stpos
        });
        this.sliderTopRun(stpos);
    },

    sliderTopNext() {
        var stpos = this.state.stpos + 1;
        if(stpos >= this.state.stlen) stpos = 0;
        this.setState({
            stpos: stpos
        }); 
        this.sliderTopRun(stpos);
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        stlen: nextProps.images ? nextProps.images.length : 0
      });
    },

    render: function() {
        let styles = {
          strip: {
            left: this.state.stx,
            width: this.state.stlen * this.state.stwidth,
          },
          mask: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 70,
            width: '100%',
            height: 300,
            overflow: 'hidden',
          }
        };
        var subWidth = 100/(this.state.stlen ? this.state.stlen : 1) + '%';
        return <div id="slider">
            { this.state.stlen > 1
              ? <div>
                    <button className="button btn prev" onClick={this.sliderTopPrev}><i className="fa fa-angle-left"></i></button>
                    <button className="button btn next" onClick={this.sliderTopNext}><i className="fa fa-angle-right"></i></button>
                </div>
              : null
            }
            <div className="mask" id="mak" style={styles.mask}>
                <div className="strip" style={styles.strip}>
                { this.state.stlen
                  ? this.props.images.map((image, i) => {
                    return <span key={i} style={{width: subWidth}}>
                        <img src={image.url} alt="Uploading..." width='100%'/>
                    </span>
                  })
                  : 
                  null
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
    return {
      page: 1,
      data: [],
      prePage: 3,
      dataShow: [],
      sortByDate: "Oldest to Newest",
      valueAction: "",
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
          title: "Quote Requested", 
          value: "Quote Requested", 
          count: this.props.quote_requested_count
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
        }
      ],
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
        const data = [...res];
        var dataShow = res.splice((page-1) * self.state.prePage, self.state.prePage);
        self.setState({
          data: data,
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
    this.getMaintenanceRequests();
  },

  setPage: function(page){
    this.setState({
      page: page
    });
    if(this.state.valueAction) {
      this.getData("/maintenance_request_filter", page, {
        maintenance_request_filter: this.state.valueAction
      });
    }else {
      this.getData(this.props.link, page, {sort_by_date: this.state.sortByDate});
    }
  },

  selectFilter: function(value) {
    this.setState({
      sortByDate: value
    });

    if(this.state.valueAction) {
      this.getData("/maintenance_request_filter", this.state.page, {
        sort_by_date: value,
        maintenance_request_filter: this.state.valueAction
      });
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

    this.getData("/maintenance_request_filter", 1, params);
  },

  render: function() {
    const current_user_agent = this.props.current_user_agent;
    const current_user_agency_admin = this.props.current_user_agency_admin;
    return (
      <div className="maintenance-list container">
        { <DropforSortDate selectFilter={this.selectFilter} filterDate={this.state.filterDate} valueSelect={this.state.sortByDate} />}
        <div className="main-column">
          <div>
            {
              this.state.dataShow.map(function(maintenance_request, key) {
                return <MaintenanceRequestItem key={key} maintenance_request={maintenance_request} />
              })
            }
            { this.state.data.length > this.state.prePage && <Pagination page={this.state.page} total={this.state.data.length} prePage={this.state.prePage} setPage={this.setPage} /> }
          </div>
        </div>
        <div className="side-column">
          { 
            (!!current_user_agent || !!current_user_agency_admin) ?
            <DropDownList 
              class="action" 
              title="Action Required" 
              content={this.state.actionRequests} 
              getAction={(value) => this.getAction(value)}
            />
            : null
          }
          {
            (!!current_user_agent || !!current_user_agency_admin) ?
            <DropDownList 
              class="awaiting" 
              title="Awaiting Action" 
              content={this.state.awaitingAction} 
              getAction={(value) => this.getAction(value)} 
            />
            : null
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
      <div className="row m-t-lg maintenance-request">
        <div className="image">
          {<ImgSlider images={maintenance_request.maintenance_request_image ? maintenance_request.maintenance_request_image.images : [{url: "/uploads/maintenance_request_image/images/no_image.png"}]} />}
        </div>
        <div className="content">
          <div className="info">
            <div className="row">
              <h3 className="heading">
                <a href={"/maintenance_requests/" + maintenance_request.id}>
                  {maintenance_request.maintenance_heading}
                </a>
              </h3>
              {
                maintenance_request.action_status && maintenance_request.action_status.maintenance_request_statu ? 
                  <p className="status">{maintenance_request.action_status.maintenance_request_status}</p>
                  : null
              }
              
            </div>
            <div className="row">
              <p className="created_at">
                { moment(maintenance_request.created_at).format('LL')}
              </p>
              <p className="type">
                 | 
                {maintenance_request.service_type}
              </p>
            </div>
            <div>
              { <P content={maintenance_request.maintenance_description} /> }
            </div>
            {
              maintenance_request.property && maintenance_request.property.property_address ? 
              <p className="address">
                <i className="fa fa-map-marker"></i>
                {maintenance_request.property.property_address}
              </p>
              : null
            }
            
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
          if (myDropdown.classList.contains('show')) {
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
      totalPage: 0,
      page: this.props.page,
    }
  },

  calculatePage: function(total) {
    var totalPage = Math.ceil(total / this.props.prePage);
    this.setState({
      totalPage: totalPage
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
    this.setState({
      page: page
    });

    this.props.setPage(page);
  },

  render: function() {
    const sefl = this;
    const paginations = [...Array(this.state.totalPage).keys()].map((key) => {
      var i = key + 1;
      if(i == sefl.state.page) 
        return <em key="current" className="current">{i}</em>
      return <a key={key} onClick={(page) => sefl.switchPage(i)}>{i}</a>
    });
    return (
      <div className="pagination">
        <span 
          className={"previous_page " + (this.state.page == 1 && "disabled")} 
          onClick={this.state.page > 1 ? (page) => this.switchPage(this.state.page-1) : ""}
        >
          &lt; Back
        </span> 
        { paginations }
        <a 
          key="next" 
          className={"next_page " + (this.state.page == this.state.totalPage && "disabled")} 
          onClick={(page) => this.switchPage(this.state.page < this.state.totalPage ? this.state.page+1 : this.state.page)}
        >
          Next &gt;
        </a>
      </div>
    );
  }
});