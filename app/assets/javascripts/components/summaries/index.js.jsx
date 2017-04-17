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

var Contact = React.createClass({
	render: function() {
		return (
			<div className="item">
        <div className="header contact">
          <a>Contact:</a>
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </div>
        <div className="content">
        </div>
      </div>
		);
	}
});

var Action = React.createClass({
	render: function() {
		return (
			<div className="item">
        <div className="header action">
          <a >Actions:</a>
          <i className="fa fa-angle-down" aria-hidden="true" onclick="showAction('actions-content')"></i>
        </div>
        <div className="content" id="actions-content">
          <ul>
            <li>
              <a onClick={this.props.openModal}>
              <i className="icon-user"></i>
                Ask Landcord
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
              <i className="icon-setup" aria-hidden="true"></i>
              Defer and setup reminder
              </a>
            </li>
            <li>
              <a href="">
              <i className="icon-print" aria-hidden="true"></i>
              View / Print log
              </a>
            </li>
          </ul>
        </div>
      </div>
		);
	}
});

var Activity = React.createClass({
	render: function() {
		return (
			<div className="item">
        <div className="header action">
          <a >Activity log:</a>
          <i className="fa fa-angle-down" aria-hidden="true" onclick="showAction('activity-content')"></i>
        </div>
        <div className="content text-center" id="activity-content">
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
              <h4 className="modal-title text-center">Confirm Landcord</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">Is John Smith the correct landcord for 123 street ave</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default success" onClick={this.props.editLandCord} data-dismiss="modal">Yes</button>
              <button type="button" className="btn btn-primary cancel" onClick={this.props.addLandCord}>No</button>
            </div>
          </div>
        </div>
      </div>
    );
	}
});

var ModalAddLandCord = React.createClass({
	submit: function(e) {
		e.preventDefault();
		var params = {
			name: this.refs.name.value,
			mobile: this.refs.mobile.value,
			email: this.refs.email.value
		}
		this.props.addLandCord(params); 
	},

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
              <h4 className="modal-title text-center">Create Landcord</h4>
            </div>
            <div className="modal-body">
              <form
              	onSubmit={this.submit}>
							  <div className="row">
							    <div>
							      <label>Name <strong>(*)</strong></label>
							      <input className="u-full-width" ref="name" type="text" />
							    </div>
							  </div>
							  <div className="row">
							    <div>
							      <label>Mobile <strong>(*)</strong></label>
							      <input className="u-full-width" ref="mobile" type="number" />
							    </div>
							  </div>
							  <div className="row">
							    <div>
							      <label>Email <strong>(*)</strong></label>
							      <input className="u-full-width" ref="email" type="email" />
							    </div>
							  </div>
							  <button type="submit" className="btn btn-default success" data-dismiss="modal">Submit</button>
							</form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary cancel" onClick={this.props.close}>Cancle</button>
              
            </div>
          </div>
        </div>
      </div>
    );
	}
});

var ModalEditLandCord = React.createClass({
	submit: function(e) {
		e.preventDefault();
		var params = {
			name: this.refs.name.value,
			mobile: this.refs.mobile.value,
			email: this.refs.email.value
		}
		this.props.editLandCord(params); 
	},

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
              <h4 className="modal-title text-center">Edit Landcord</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.submit}>
							  <div className="row">
							    <div>
							      <label for="exampleEmailInput">Name <strong>(*)</strong></label>
							      <input className="u-full-width" ref="name" defaultValue={this.props.landCord.name} type="text" />
							    </div>
							  </div>
							  <div className="row">
							    <div>
							      <label for="exampleEmailInput">Mobile <strong>(*)</strong></label>
							      <input className="u-full-width" ref="mobile" defaultValue={this.props.landCord.mobile} type="number" />
							    </div>
							  </div>
							  <div className="row">
							    <div>
							      <label for="exampleEmailInput">Email <strong>(*)</strong></label>
							      <input className="u-full-width" ref="email" type="email" defaultValue={this.props.landCord.email} />
							    </div>
							  </div>
							</form>
							<button type="submit" className="btn btn-default success"  onClick={this.submit} data-dismiss="modal">Submit</button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary cancel" onClick={this.props.close}>Cancle</button>
            </div>
          </div>
        </div>
      </div>
    );
	}
});


var Summary = React.createClass({
	getInitialState: function() {
    return {
    	isModal: false,
    	isConfirm: false,
      isAdd: false,
      isEdit: false,
      landCord: {
      	name: "test",
      	mobile: 123456789,
      	email: "text@mail.com"
      }
    };
  },

  isConfirm: function() {
  	this.setState({isConfirm: !this.state.isConfirm});
  	this.setState({isEdit: false});
  	this.setState({isAdd: false});
  },

  isAdd: function() {
  	this.setState({isAdd: !this.state.isAdd});
  	this.setState({isEdit: false});
  	this.setState({isConfirm: false});
  },

  isEdit: function() {
  	this.setState({isEdit: !this.state.isEdit});
  	this.setState({isAdd: false});
  	this.setState({isConfirm: false});
  },

  openModal: function() {
  	if(this.state.landCord.name == "") {
  		this.isAdd();
  	}else {
  		this.isConfirm();
  	}
  },

  addLandCord: function(landCord){
  	this.setState({landCord: landCord});
  	this.isAdd();
  },

  editLandCord: function(landCord) {
  	this.setState({landCord: landCord});
  	this.isEdit();
  },
  
	renderModal: function() {
		if(this.state.isConfirm) {
  		return <ModalConfirm close={this.isConfirm} addLandCord={this.isAdd} editLandCord={this.isEdit}/>;
  	} else if(this.state.isAdd) {
			return <ModalAddLandCord close={this.isAdd} addLandCord={this.addLandCord}/>;
  	} else  if(this.state.isEdit) {
  		return <ModalEditLandCord close={this.isEdit} landCord={this.state.landCord} editLandCord={this.editLandCord} />;
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
			    	<Action openModal={this.openModal}/>
			    	<Activity />
	    		</div>
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
			  </div>
			  <div className="sidebar-mobile">
			    <div className="fixed">       
			      <button className="contact button-default">Contact</button>
			      <button className="actions button-default" onclick="showAction('actions-full')">Actions</button>
			    </div>
			  </div>
			  <div className="actions-full" id="actions-full">
			    <div className="item">
			      <div className="header action">
			        <a >Actions:</a>
			        <i className="fa fa-close" aria-hidden="true" onclick="showAction('actions-full')"></i>
			      </div>
			      <div className="content">
			        <ul>
			          <li>
			            <a href="">
			            <i className="icon-field"></i>
			            Request more info
			            </a>
			          </li>
			          <li>
			            <a href="">
			            <i className="icon-user" aria-hidden="true"></i>
			            Seek owner instructions
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
			            <i className="icon-setup" aria-hidden="true"></i>
			            Defer and setup reminder
			            </a>
			          </li>
			          <li>
			            <a href="">
			            <i className="icon-print" aria-hidden="true"></i>
			            View / Print log
			            </a>
			          </li>
			        </ul>
			      </div>
			    </div>
			  </div>
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