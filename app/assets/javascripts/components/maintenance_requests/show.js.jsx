var Post = React.createClass({
  componentDidMount: function() {
    $(document).ready(function() {
      new Swiper('.swiper-container', {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        paginationClickable: true,
        paginationClickable: true,
        pagination: '.swiper-pagination',
      });
    });
  },

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
          <div className="slider-custom">
            <div className="swiper-container">
              <div className="swiper-wrapper slider">
                {
                  this.props.gallery.map(function(img, index) {
                    return (
                      <img 
                        key={index} 
                        src={img.url} 
                        className={"swiper-slide slide-image img-1 " + (index === 0 && "active")}
                      />
                    );
                  })
                }
              </div>
            </div>
            <div className="swiper-pagination swiper-pagination-custom"></div>
          </div>
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

var Quote = React.createClass({
  render: function() {
    const quotes = this.props.quotes;
    return (
      <div className="quotes">
        <p>
          Quotes ({quotes.length})
        </p>
        <div className="list-quote">
        {
          quotes.map(function(quote, index) {
            return (
              <div className="item-quote row" key={index}>
                <div className="user seven columns">
                  <img src="/assets/user1.png" />
                  <div className="info">
                    <div className="name">
                      <span>{quote.trady.name}</span>
                      <button className={'button-default ' + quote.status}>
                        <span>{quote.status}</span>
                      </button>
                    </div>
                    <p className="description">
                      {quote.trady.company_name}
                    </p>
                  </div>
                </div>
                <div className="actions five columns">
                  <button className="close button-default">
                    <i className="icon-close" aria-hidden="true" />
                  </button>
                  <button className="reload button-default">
                    <i className="icon-reload" aria-hidden="true" />
                  </button>
                  <button className="money button-default">{quote.amount}AUD</button>
                </div>
              </div>
            );
          })
        }
          
        </div>
      </div>
    );
  }
});

var Invoice = React.createClass({
  render: function() {
    const invoices = this.props.invoices;
    return (
      <div className="quotes m-t-xl">
        <p>
          Invoice ({invoices.length})
        </p>
        <div className="list-quote">
        {
          invoices.map(function(invoice, index) {
            return (
              <div className="item-quote row">
                <div className="user seven columns">
                  <img src="/assets/user1.png" />
                  <div className="info">
                    <div className="name">
                      <span>{invoice.trady.name}</span>
                      <button className={'button-default ' + invoice.status}>{invoice.status}</button>
                    </div>
                    <p className="description">
                      {invoice.trady.company_name}
                    </p>
                  </div>
                </div>
                <div className="actions five columns">
                  <button className="close button-default">
                    <i className="icon-close" aria-hidden="true" />
                  </button>
                  <button className="reload button-default">
                    <i className="icon-reload" aria-hidden="true" />
                  </button>
                  <button className="money button-default">{invoice.amount}AUD</button>
                </div>
              </div>
            );
          })
        }          
        </div>
      </div>
    );
  }
});

var ContentContact = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          <a>
            <i className="fa fa-phone" aria-hidden="true" />
            468873353989
          </a>
        </li>
        <li>
          <a>
            <i className="fa fa-commenting" aria-hidden="true" />
            Message LandLord
          </a>
        </li>
      </ul>
    );
  }
});

var Contact = React.createClass({
  getInitialState: function() {
    return {
      show: false
    };
  },

  showContact: function() {
    this.setState({show: !this.state.show});
  },

  render: function() {
    return (
      <div className="item">
        <div className="header contact">
          <a>Contact:</a>
          <i
            aria-hidden="true" 
            onClick={this.showContact} 
            className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} 
          />
        </div>
        <div className="content">
          { this.state.show && <ContentContact /> }
        </div>
      </div>
    );
  }
});

var ContentAction = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          <a onClick={this.props.openModel}>
            <i className="fa fa-user" />
            Ask Landlord
          </a>
        </li>
        <li className="active">
          <a>
            <i className="fa fa-file-text" aria-hidden="true" />
            Request quote
          </a>
        </li>
        <li>
          <a>
            <i className="icon-send" aria-hidden="true" />
            Send work order
          </a>
        </li>
        <li>
          <a>
            <i className="fa fa-user-plus" aria-hidden="true" />
            Add Landlord
          </a>
        </li>
        <li>
          <a>
            <i className="fa fa-pencil" aria-hidden="true" />
            Edit Landlord
          </a>
        </li>
      </ul>
    );
  }
});

var Action = React.createClass({
  getInitialState: function() {
    return {
      show: true
    };  
  },

  showAction: function(e) {
    this.setState({show: !this.state.show});
  },

  render: function() {
    return (
      <div className="item">
        <div className="header action">
          <a>Actions:</a>
          <i 
            aria-hidden="true" 
            onClick={this.showAction} 
            className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} 
          />
        </div>
        <div className="content" id="actions-content">
          { this.state.show && <ContentAction openModel={this.props.openModal} /> }
        </div>
      </div>
    );
  }
});

var Activity = React.createClass({
  getInitialState: function() {
    return {
      show: true
    };
  },

  showActivity: function() {
    this.setState({show: !this.state.show});
  },

  content: function() {
    return (
      <div>
        <ul>
          <li className="user">
            <img className="img-user" src="/assets/user1.png" />
            <p className="info">
              <span className="title">
                Request by 
                <strong>Dereck Carlson</strong>
              </span>
              <span className="time">Sep 16, 2017 at 9am</span>
            </p>
          </li>
          <li className="user">
            <img className="img-user" src="/assets/user1.png" />
            <p className="info">
              <span className="title">
                Request by 
                <strong>Dereck Carlson</strong>
              </span>
              <span className="time">Sep 16, 2017 at 9am</span>
            </p>
          </li>
          <li className="user">
            <img className="img-user" src="/assets/user1.png" />
            <p className="info">
              <span className="title">
                Request by 
                <strong>Dereck Carlson</strong>
              </span>
              <span className="time">Sep 16, 2017 at 9am</span>
            </p>
          </li>
          <li className="user">
            <img className="img-user" src="/assets/user1.png" />
            <p className="info">
              <span className="title">
              Request by <strong>Dereck Carlson</strong></span>
              <span className="time">Sep 16, 2017 at 9am</span>
            </p>
          </li>
        </ul>
        <button className="view-more button-default">
          View more
        </button>
      </div>
    );
  },

  render: function() {
    return (
      <div className="item">
        <div className="header action">
          <a >Activity log:</a>
          <i className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} aria-hidden="true" onClick={this.showActivity}></i>
        </div>
        <div className="content text-center" id="activity-content">
          { this.state.show && this.content() }
        </div>
      </div>
    );
  }
});

var ModalConfirm = React.createClass({
  render: function() {
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button 
                type="button" 
                className="close"
                data-dismiss="modal" 
                aria-label="Close" 
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">Confirm Landlord</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">Is {this.props.landlord.name} the correct landlord for {this.props.property.property_address}</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-default success" 
                onClick={() => this.props.onModalWith('edit')} 
                data-dismiss="modal"
              >Yes</button>
              <button 
                type="button" 
                className="btn btn-primary cancel" 
                onClick={() => this.props.onModalWith('add')}
              >No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ModalAddLandlord = React.createClass({
  getInitialState: function() {
    return {
      errorName: false,
      errorEmail: false,
      errorMobile: false,
    };
  },

  checkValidate: function(e) {
    var key = e.target.id;

    switch(key) {
      case "name": {
          if(e.target.value == "") {
            this.setState({errorName: true});
          }else {
            this.setState({errorName: false});
          }
        break;
      }

      case "mobile": {
        if(e.target.value == "") {
          this.setState({errorMobile: true});
        }else {
          this.setState({errorMobile: false});
        }        
        break;
      }

      default: {
        var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
        if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
          this.setState({errorEmail: true});
        }else {
          this.setState({errorEmail: false});
        }
        break;
      }
    }
  },

  submit: function(e) {
    e.preventDefault();

    var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
    if(this.name.value == "") {
      this.setState({errorName: true});
      e.preventDefault();
      return false;
    }
    if(this.mobile.value == "") {
      this.setState({errorMobile: true});
      e.preventDefault();
      return false;
    }

    if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
      this.setState({errorEmail: true});
      e.preventDefault();
      return false;
    } 

    var params = {
      authenticity_token: this.props.authToken,
      landlord: {
        name: this.name.value,
        email: this.email.value,
        mobile: this.mobile.value,
        maintenance_request_id: this.props.maintenance_request_id,
      },
    }
    this.props.addLandlord(params);
  },

  render: function() {
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form role="form" id="addForm" onSubmit={this.submit}>
              <div className="modal-header">
                <button 
                  type="button" 
                  className="close"
                  aria-label="Close" 
                  data-dismiss="modal" 
                  onClick={this.props.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title text-center">Forward Maintenance request</h4>
              </div>
              <div className="modal-body">
                  <div className="row">
                    <div>
                      <label>Name <strong>*</strong>:</label>
                      <input 
                        id="name" 
                        type="text" 
                        name="landlord[name]" 
                        placeholder="Enter Name"
                        ref={e => this.name = e}
                        onChange={this.checkValidate} 
                        className={"u-full-width " + (this.state.errorName && "has-error")} 
                      />
                    </div>
                  </div>
                  <div className="row m-t-lg">
                    <div>
                      <label>Mobile <strong>*</strong>:</label>
                      <input className={"u-full-width " + (this.state.errorMobile && "has-error")} id="mobile" ref={e => this.mobile = e} name="landlord[mobile]" type="number" onChange={this.checkValidate} placeholder="Enter Mobile"/>
                    </div>
                  </div>
                  <div className="row m-t-lg">
                    <div>
                      <label>Email <strong>*</strong>:</label>
                      <input className={"u-full-width " + (this.state.errorEmail && "has-error")} id="email" ref={e => this.email = e} name="landlord[email]" type="text" onChange={this.checkValidate} placeholder="Enter Email"/>
                    </div>
                  </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={this.props.close}
                  className="btn btn-primary cancel" 
                >Cancel</button>
                <button type="submit" className="btn btn-default success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

var ModalEditLandlord = React.createClass({
  getInitialState: function() {
    return {
      isEdit: false,
      errorName: false,
      errorEmail: false,
      errorMobile: false,
    };
  },

  isEdit: function() {
    this.setState({isEdit: !this.state.isEdit});
  },

  checkValidate: function(e) {
    var key = e.target.id;

    switch(key) {
      case "name": {
          if(e.target.value == "") {
            this.setState({errorName: true});
          }else {
            this.setState({errorName: false});
          }
        break;
      }

      case "mobile": {
        if(e.target.value == "") {
          this.setState({errorMobile: true});
        }else {
          this.setState({errorMobile: false});
        }        
        break;
      }

      default: {
        var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
        if(e.target.value == "" || !EMAIL_REGEXP.test(e.target.value)) {
          this.setState({errorEmail: true});
        }else {
          this.setState({errorEmail: false});
        }
        break;
      }
    }
  },

  submit: function(e) {
    e.preventDefault();

    var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');

    if(this.name.value == "") {
      this.setState({errorName: true});
      e.preventDefault();
      return false;
    }
    if(this.mobile.value == "") {
      this.setState({errorMobile: true});
      e.preventDefault();
      return false;
    }
    if(this.email.value == "" || !EMAIL_REGEXP.test(this.email.value)) {
      this.setState({errorEmail: true});
      e.preventDefault();
      return false;
    }
    

    var params = {
      authenticity_token: this.props.authToken,
      landlord: {
        name: this.name.value,
        email: this.email.value,
        mobile: this.mobile.value,
        id: this.props.landlord.id,
        maintenance_request_id: this.props.maintenance_request_id,
      }
    }
    this.props.editLandlord(params); 
  },

  render: function() {
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form id="editForm" onSubmit={this.submit}>
              <div className="modal-header">
                <button 
                  type="button" 
                  className="close"
                  aria-label="Close" 
                  data-dismiss="modal" 
                  onClick={this.props.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title text-center">Forward Maintenance request</h4>
              </div>
              <div className="modal-body">
                  <div className="row">
                    <a className="btn-edit" onClick={this.isEdit}>Edit</a>
                  </div>
                  <div className="row m-t-lg">
                    <div className="form-input">
                      <label>Name <strong>*</strong>:</label>
                      <input 
                        type="text" 
                        onChange={this.checkValidate} 
                        readOnly={!this.state.isEdit} 
                        id="name" ref={e => this.name = e} 
                        defaultValue={this.props.landlord.name} 
                        className={(this.state.errorName && "has-error") + (!this.state.isEdit && " readonly")}
                      />
                    </div>
                  </div>
                  <div className="row m-t-lg">
                    <div className="form-input">
                      <label>Mobile <strong>*</strong>:</label>
                      <input 
                        id="mobile" 
                        type="number" 
                        ref={e => this.mobile = e} 
                        onChange={this.checkValidate} 
                        readOnly={!this.state.isEdit} 
                        defaultValue={this.props.landlord.mobile} 
                        className={(this.state.errorMobile && "has-error") + (!this.state.isEdit && " readonly")}
                      />
                    </div>
                  </div>
                  <div className="row m-t-lg">
                    <div className="form-input">
                      <label>Email <strong>*</strong>:</label>
                      <input 
                        id="email"
                        type="text"
                        ref={e => this.email = e}
                        onChange={this.checkValidate}
                        readOnly={!this.state.isEdit}
                        defaultValue={this.props.landlord.email} 
                        className={(this.state.errorEmail && "has-error") + (!this.state.isEdit && " readonly")}
                      />
                    </div>
                  </div>
              </div>
              <div className="modal-footer">
                <button 
                  onClick={this.props.close}
                  className="btn btn-primary cancel" 
                >Cancel</button>
                <button type="submit" className="btn btn-default success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

var ActivityMobile = React.createClass({
  render: function() {
    return (
      <div className="activity-mobile">
        <div className="item">
          <div className="header action">
            <a >Activity log:</a>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
          <div className="content text-center">
            <ul>
              <li className="user">
                <img className="img-user" src="/assets/user1.png" />
                <p className="info">
                  <span className="title">Request by <strong>Dereck Carlson</strong></span>
                  <span className="time">Sep 16, 2017 at 9am</span>
                </p>
              </li>
              <li className="user">
                <img className="img-user" src="/assets/user1.png" />
                <p className="info">
                  <span className="title">Request by <strong>Dereck Carlson</strong></span>
                  <span className="time">Sep 16, 2017 at 9am</span>
                </p>
              </li>
              <li className="user">
                <img className="img-user" src="/assets/user1.png" />
                <p className="info">
                  <span className="title">Request by <strong>Dereck Carlson</strong></span>
                  <span className="time">Sep 16, 2017 at 9am</span>
                </p>
              </li>
              <li className="user">
                <img className="img-user" src="/assets/user1.png" />
                <p className="info">
                  <span className="title">Request by <strong>Dereck Carlson</strong></span>
                  <span className="time">Sep 16, 2017 at 9am</span>
                </p>
              </li>
            </ul>
            <div className="text-center">
              <button className="view-more button-default">
                View more
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ActionMobile = React.createClass({
  render: function() {
    return (
      <div className="actions-full" id="actions-full">
        <div className="item">
          <div className="header action">
            <a>Actions:</a>
            <i 
              aria-hidden="true" 
              className="fa fa-close" 
              onClick={this.props.close}
            />
          </div>
          <div className="content">
            <ContentAction openModel={this.props.openModal} />
          </div>
        </div>
      </div>
    );
  }
});

var SideBarMobile = React.createClass({
  getInitialState: function() {
    return {      
      showAction: false
    };
  },

  showAction: function() {
    this.setState({showAction: !this.state.showAction});
  },

  render: function() {
    return (
      <div>
        <div className="sidebar-mobile">
          <div className="fixed">       
            <button className="contact button-default">Contact</button>
            <button className="actions button-default" onClick={this.showAction}>Actions</button>
          </div>
        </div>
        { !!this.state.showAction && <ActionMobile close={this.showAction} openModal={this.props.openModal} /> }
      </div>
    );
  }
});

var ModalNotification = React.createClass({
  render: function() {
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button 
                type="button" 
                className="close"
                aria-label="Close" 
                data-dismiss="modal" 
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">{ this.props.title }</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">{ this.props.content }</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Summary = React.createClass({
  getInitialState: function() {
    var landlord = this.props.landlord;
    

    return {
      modal: "",
      isModal: false,
      landlord: landlord,
      notification: {
        title: "",
        content: ""
      },
    };
  },

  isClose: function() {
    this.setState({isModal: false});
    this.setState({modal: ""});
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    var div = document.getElementsByClassName('modal-backdrop in')[0];
    div.parentNode.removeChild(div);
  },

  onModalWith: function(modal) {
    this.setState({
      modal: modal,
      isModal: true, 
    });
  },

  openModal: function() {
    if(!this.state.landlord) {
      this.onModalWith('add');
    }else {
      this.onModalWith('confirm');
    }
  },

  addLandlord: function(params){
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/create-and-notify-landlord',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({
          landlord: res,
          notification: {
            title: "Forward Maintenance request",
            content: "Your Landlord has been created successfully!"
          }
        });
        self.isClose();
        self.isNotification();
      },
      error: function() {
        self.setState({notification: {
          title: "Forward Maintenance request",
          content: "Create Landlord error!"
        }});
        self.isNotification();
      }
    });  
  },

  editLandlord: function(params) {
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/update-and-notify-landlord',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({
          landlord: res,
          notification: {
            title: "Forward Maintenance request",
            content: "Your Landlord has been updated successfully!",
          },
        });
        self.isClose();
        self.isNotification();
      },
      error: function() {
        self.setState({notification: {
          title: "Forward Maintenance request",
          content: "Your Landlord has been updated successfully",
        }});
        self.isNotification();
      }
    }); 
  },
  
  renderModal: function() {
    if(this.state.isModal) {
      var body = document.getElementsByTagName('body')[0];
      body.className += " modal-open";
      var div = document.getElementsByClassName('modal-backdrop in');

      if(div.length === 0) {
        div = document.createElement('div')
        div.className  = "modal-backdrop in";
        body.appendChild(div);
      }
      
      if(this.state.modal == "confirm") {
        return (
          <ModalConfirm 
            close={this.isClose} 
            landlord={this.state.landlord}
            property={this.props.property}
            onModalWith={(modal) => this.onModalWith(modal)}
          />
        );
      } else if(this.state.modal == "add"  && this.props.maintenance_request.id) {
        return (
          <ModalAddLandlord
            close={this.isClose}
            addLandlord={this.addLandlord}
            authToken={this.props.authenticity_token}
            maintenance_request_id={this.props.maintenance_request.id}
          />
        );
      } else  if(this.state.modal == "edit" && this.props.maintenance_request.id) {
        return (
          <ModalEditLandlord
            close={this.isClose}
            landlord={this.state.landlord}
            editLandlord={this.editLandlord}
            authToken={this.props.authenticity_token}
            maintenance_request_id={this.props.maintenance_request.id}
          />
        );
      } else if(this.state.modal = "notification") {
        return (
          <ModalNotification 
            close={this.isClose} 
            title={this.state.notification.title} 
            content={this.state.notification.content}
          />
        );
      }
    }

    return null;
  },

  summary(e) {
    return ( 
      <div className="summary-container-index" id="summary-container-index">
        <div className="main-summary">
          <div className="section">
            <Post 
              gallery={this.props.gallery} 
              property={this.props.property} 
              maintenance_request={this.props.maintenance_request}
            />
            {this.props.quotes.length > 0 && <Quote quotes={this.props.quotes} />}
            {this.props.invoices.length > 0 && <Invoice invoices={this.props.invoices} />}
          </div>
          <div className="sidebar">
            <Contact />
            <Action openModal={this.openModal} />
            <Activity />
          </div>
          <ActivityMobile />
        </div>
        <SideBarMobile openModal={this.openModal} />
        { this.renderModal() }
      </div>
    );
  },

  render: function() {
    return (
      <div>
        { this.summary() }
      </div>
    );
  }
});
