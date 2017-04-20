var Post = React.createClass({
  render: function() {
    return (
      <div className="post">
        <div className="info">
          <div className="info-title">
            <div className="title">
              <span>
              Plumber Needed in Sydney  
              </span>
              <button className="button-primary" type="">Active</button>
            </div>
            <div className="author">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span className="address">
              Australia, Sydney, 774 Botany RD.
              </span>
              <a className="time">
              2 Days ago
              </a>
              <a>|</a>
              <a className="name-author">Plumbing</a>
            </div>
          </div>
          <div className="actions">
            <button className="button-primary update-status">
            Update status
            </button>
            <button className="button-primary edit-detail">
            <i className="fa fa-pencil" aria-hidden="true"></i>
            <span>
            Edit Details
            </span>
            </button>
            <button className="button-primary assign-to">
            <i className="icon-user" aria-hidden="true"></i>
            <span>
            Assign to
            </span>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="content">
          <div className="slider-custom">
            <div className="swiper-container">
              <div className="swiper-wrapper slider">
                <img src="/assets/slider1.jpg" className="swiper-slide slide-image img-1 active" />
                <img src="/assets/slider1.jpg" className="swiper-slide slide-image img-2" />
                <img src="/assets/slider1.jpg" className="swiper-slide slide-image img-3" />
                <img src="/assets/slider1.jpg" className="swiper-slide slide-image img-4" />
              </div>
            </div>
            <div className="swiper-pagination swiper-pagination-custom"></div>
          </div>
          <div className="description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nunc ante, pharetra in luctus eget, sagittis et ante. Aliquam erat volutpat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nunc ante, pharetra in luctus eget, sagittis et ante. </p>
          </div>
          <div className="date-time">
            <button>
            <span className="vailability">Availability: </span>
            <span className="time">Sep 4 (10am to 3pm)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

var Quote = React.createClass({
  render: function() {
    return (
      <div className="quotes">
        <p>
          Quotes (3)
        </p>
        <div className="list-quote">
          <div className="item-quote row">
            <div className="user seven columns">
              <img src="/assets/user1.png" />
              <div className="info">
                <div className="name">
                  <span>John Carlson</span>
                  <button className="approved button-default">
                  <span>Approved</span>
                  </button>
                </div>
                <p className="description">
                  Dereck Plumbing Inc.
                </p>
              </div>
            </div>
            <div className="actions five columns">
              <button className="close button-default">
              <i className="icon-close" aria-hidden="true"></i>  
              </button>
              <button className="reload button-default">
              <i className="icon-reload" aria-hidden="true"></i>
              </button>
              <button className="money button-default">500AUD</button>
            </div>
          </div>
          <div className="item-quote row">
            <div className="user seven columns">
              <img src="/assets/user1.png" />
              <div className="info">
                <div className="name">
                  <span>John Carlson</span>
                  <button className="declined button-default"><span>Declined</span></button>
                </div>
                <p className="description">
                  Dereck Plumbing Inc.
                </p>
              </div>
            </div>
            <div className="actions five columns">
              <button className="close button-default">
              <i className="icon-close" aria-hidden="true"></i>  
              </button>
              <button className="reload button-default">
              <i className="icon-reload" aria-hidden="true"></i>
              </button>
              <button className="money button-default">500AUD</button>
            </div>
          </div>
          <div className="item-quote row">
            <div className="user seven columns">
              <img src="/assets/user1.png" />
              <div className="info">
                <div className="name">
                  <span>John Carlson</span>
                  <button className="pending button-default">Pending</button>
                </div>
                <p className="description">
                  Dereck Plumbing Inc.
                </p>
              </div>
            </div>
            <div className="actions five columns">
              <button className="close button-default">
              <i className="icon-close" aria-hidden="true"></i>  
              </button>
              <button className="reload button-default">
              <i className="icon-reload" aria-hidden="true"></i>
              </button>
              <button className="money button-default">500AUD</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Invoice = React.createClass({
  render: function() {
    return (
      <div className="quotes m-t-xl">
        <p>
          Invoice (3)
        </p>
        <div className="list-quote">
          <div className="item-quote row">
            <div className="user seven columns">
              <img src="/assets/user1.png" />
              <div className="info">
                <div className="name">
                  <span>John Carlson</span>
                  <button className="approved button-default">Approved</button>
                </div>
                <p className="description">
                  Dereck Plumbing Inc.
                </p>
              </div>
            </div>
            <div className="actions five columns">
              <button className="close button-default">
              <i className="icon-close" aria-hidden="true"></i>  
              </button>
              <button className="reload button-default">
              <i className="icon-reload" aria-hidden="true"></i>
              </button>
              <button className="money button-default">500AUD</button>
            </div>
          </div>
          <div className="item-quote row">
            <div className="user seven columns">
              <img src="/assets/user1.png" />
              <div className="info">
                <div className="name">
                  <span>John Carlson</span>
                  <button className="declined button-default">
                  <span>Declined</span>
                  </button>
                </div>
                <p className="description">
                  Dereck Plumbing Inc.
                </p>
              </div>
            </div>
            <div className="actions five columns">
              <button className="close button-default">
              <i className="icon-close" aria-hidden="true"></i>  
              </button>
              <button className="reload button-default">
              <i className="icon-reload" aria-hidden="true"></i>
              </button>
              <button className="money button-default">500AUD</button>
            </div>
          </div>
          <div className="item-quote row">
            <div className="user seven columns">
              <img src="/assets/user1.png" />
              <div className="info">
                <div className="name">
                  <span>John Carlson</span>
                  <button className="pending button-primary">Pending</button>
                </div>
                <p className="description">
                  Dereck Plumbing Inc.
                </p>
              </div>
            </div>
            <div className="actions five columns">
              <button className="close button-default">
              <i className="icon-close" aria-hidden="true"></i>  
              </button>
              <button className="reload button-default">
              <i className="icon-reload" aria-hidden="true"></i>
              </button>
              <button className="money button-primary">500AUD</button>
            </div>
          </div>
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
          <a href="">
            <i className="fa fa-phone" aria-hidden="true"></i>
            468873353989
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa fa-commenting" aria-hidden="true"></i>
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
          <i className={this.state.show ? "fa fa-angle-down" : "fa fa-angle-right"} aria-hidden="true" onClick={this.showContact}></i>
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
          <i className="fa fa-user"></i>
            Ask Landlord
          </a>
        </li>
        <li className="active">
          <a href="">
          <i className="fa fa-file-text" aria-hidden="true"></i>
          Request quote
          </a>
        </li>
        <li>
          <a href="">
          <i className="icon-send" aria-hidden="true"></i>
          Send work order
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            Add Landlord
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa fa-pencil" aria-hidden="true"></i>
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
          <i className={"fa " + (this.state.show ? "fa-angle-down" : "fa-angle-right")} aria-hidden="true" onClick={this.showAction}></i>
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
              <button type="button" 
                      className="close"
                      data-dismiss="modal" 
                      aria-label="Close" 
                      onClick={this.props.close}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">Confirm Landlord</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">Is {this.props.landlord.name} the correct landlord for 123 street Ave</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default success" onClick={this.props.editLandlord} data-dismiss="modal">Yes</button>
              <button type="button" className="btn btn-primary cancel" onClick={this.props.addLandlord}>No</button>
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
      errorMobile: false,
      errorEmail: false
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
        mobile: this.mobile.value,
        email: this.email.value,
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
                <button type="button" 
                        className="close"
                        data-dismiss="modal" 
                        aria-label="Close" 
                        onClick={this.props.close}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title text-center">Forward Maintenance request</h4>
              </div>
              <div className="modal-body">
                  <div className="row">
                    <div>
                      <label>Name <strong>*</strong>:</label>
                      <input className={"u-full-width " + (this.state.errorName && "has-error")} id="name" ref={e => this.name = e} name="landlord[name]" type="text" onChange={this.checkValidate} placeholder="Enter Name"/>
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
                <button type="button" className="btn btn-primary cancel" onClick={this.props.close}>Cancel</button>
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
      errorName: false,
      errorMobile: false,
      errorEmail: false,
      isEdit: false
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
        id: this.props.landlord.id,
        name: this.name.value,
        mobile: this.mobile.value,
        email: this.email.value,
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
                <button type="button" 
                        className="close"
                        data-dismiss="modal" 
                        aria-label="Close" 
                        onClick={this.props.close}>
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
                      <input className={(this.state.errorName && "has-error") + (!this.state.isEdit && " readonly")} id="name" ref={e => this.name = e} defaultValue={this.props.landlord.name} type="text" onChange={this.checkValidate} readOnly={!this.state.isEdit} />
                    </div>
                  </div>
                  <div className="row m-t-lg">
                    <div className="form-input">
                      <label>Mobile <strong>*</strong>:</label>
                      <input className={(this.state.errorMobile && "has-error") + (!this.state.isEdit && " readonly")} id="mobile" ref={e => this.mobile = e} defaultValue={this.props.landlord.mobile} type="number" onChange={this.checkValidate} readOnly={!this.state.isEdit} />
                    </div>
                  </div>
                  <div className="row m-t-lg">
                    <div className="form-input">
                      <label>Email <strong>*</strong>:</label>
                      <input className={(this.state.errorEmail && "has-error") + (!this.state.isEdit && " readonly")} id="email" ref={e => this.email = e} type="text" defaultValue={this.props.landlord.email} onChange={this.checkValidate} readOnly={!this.state.isEdit} />
                    </div>
                  </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary cancel" onClick={this.props.close}>Cancel</button>
                <button type="submit" className="btn btn-default success" disabled={!this.state.isEdit}>Submit</button>
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
            <i className="fa fa-close" aria-hidden="true" onClick={this.props.close}></i>
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
              <button type="button" 
                      className="close"
                      data-dismiss="modal" 
                      aria-label="Close" 
                      onClick={this.props.close}>
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
      isModal: false,
      isConfirm: !!landlord,
      isAdd: false,
      isEdit: false,
      isNotification: false,
      notification: {
        title: "",
        content: ""
      },
      landlord: landlord
    };
  },

  isConfirm: function() {
    this.setState({isConfirm: !this.state.isConfirm});
    this.setState({isModal: true});
    this.setState({isEdit: false});
    this.setState({isAdd: false});
    this.setState({isNotification: false});
  },

  isAdd: function() {
    this.setState({isAdd: !this.state.isAdd});
    this.setState({isEdit: false});
    this.setState({isConfirm: false});
    this.setState({isNotification: false});
  },

  isEdit: function() {
    this.setState({isEdit: !this.state.isEdit});
    this.setState({isAdd: false});
    this.setState({isConfirm: false});
    this.setState({isNotification: false});
  },

  isNotification: function() {
    this.setState({isNotification: !this.state.isNotification});
    this.setState({isAdd: false});
    this.setState({isConfirm: false});
    this.setState({isEdit: false});
  },

  openModal: function() {
    if(!this.state.landlord) {
      this.isAdd();
    }else {
      this.isConfirm();
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
        self.setState({notification: {
          title: "Forward Maintenance request",
          content: "Your Landlord has been created successfully!"
        }});
        self.setState({landlord: res});
        self.isAdd();
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
        self.setState({notification: {
          title: "Forward Maintenance request",
          content: "Your Landlord has been updated successfully!"
        }});
        self.setState({landlord: res});
        self.isEdit();
        self.isNotification();
      },
      error: function() {
        self.setState({notification: {
          title: "Forward Maintenance request",
          content: "Your Landlord has been updated successfully"
        }});
        self.isNotification();
      }
    }); 
  },
  
  renderModal: function() {
    if(this.state.isConfirm && this.state.isModal) {
      return <ModalConfirm close={this.isConfirm} landlord={this.state.landlord} addLandlord={this.isAdd} editLandlord={this.isEdit} />;
    } else if(this.state.isAdd  && this.props.maintenance_request.id) {
      return <ModalAddLandlord authToken={this.props.authenticity_token} maintenance_request_id={this.props.maintenance_request.id} close={this.isAdd} addLandlord={this.addLandlord} />;
    } else  if(this.state.isEdit) {
      return <ModalEditLandlord close={this.isEdit} authToken={this.props.authenticity_token} landlord={this.state.landlord} maintenance_request_id={this.props.maintenance_request.id} editLandlord={this.editLandlord} />;
    } else if(this.state.isNotification) {
      return <ModalNotification close={this.isNotification} title={this.state.notification.title} content={this.state.notification.content} />
    }

    return null;
  },

  summary(e) {
    return ( 
      <div className="summary-container-index" id="summary-container-index">
        <div className="main-summary">
          <div className="section">
            <Post />
            <Quote />
            <Invoice />
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
