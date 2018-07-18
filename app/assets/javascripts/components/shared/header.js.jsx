const defaultImages = {

}
const MenuAgency = function(edit_agency, edit_agency_admin) {
  return [
    {
      url: "/",
      name: "Create Maintenance Request",
    },
    {
      url: "/agency_admin_maintenance_requests",
      name: "My Maintenance Requests",
    },
    {
      url: edit_agency,
      name: "Agency Account Settings",
    },
    {
      url: edit_agency_admin,
      name: "Agency Admin Account Settings",
    },
  ];
}
const MenuAgent = function(edit_agent) {
  return [
    {
      url: "/",
      name: "Create Maintenance Request",
    },
    {
      url: "/agent_maintenance_requests",
      name: "My Maintenance Requests",
    },
    {
      url: edit_agent,
      name: "Agent Account Settings",
    },
  ];
}
const MenuTrady = function(edit_trady) {
  return [
    {
      url: "/trady_maintenance_requests",
      name: "My Maintenance Requests",
    },
    {
      url: edit_trady,
      name: "Trady Account Settings",
    },
  ];
}
const MenuTenant = function(edit_tenant) {
  return [
    {
      url: "/",
      name: "Create Maintenance Request",
    },
    {
      url: "/tenant_maintenance_requests",
      name: "My Maintenance Requests",
    },
    {
      url: edit_tenant,
      name: "Tenant Account Settings",
    },
  ];
}
const MenuLandlord = function() {
  return [
    {
      url: "/landlord_maintenance_requests",
      name: "My Maintenance Requests",
    },
  ];
}
var showFlash = function(message, status, positionShow) {
  flashFunctions.forEach(flashFunc => flashFunc(message, status, positionShow));
};
var flashFunctions = [];
var ShowMessage = React.createClass({
  getInitialState: function() {
    flashFunctions.push(this.showMessage.bind(this));
    return {
      status: '',
      message: '',
      positionShow: '',
      isShow: false,
      position: this.props.position,
    }
  },
  showMessage(message, status, position) {
    this.setState({ message, status, positionShow: position, isShow: true });
  },
  close() {
    this.setState({ isShow: false });
  },
  render() {
    const { message, status, isShow, position, positionShow } = this.state;
    return isShow && positionShow === position
      ? <div className={`alert alert-${status} show-message`}>
          <div className="content-message">
            <div id={`flash_${status}`}>
              {message}
            </div>
            <button type="button" style={{margin: '0px'}} onClick={this.close}><i className="fa fa-times" aria-hidden="true"></i></button>
          </div>
        </div>
      : <div></div>
  }
});
var MobileMenu = React.createClass({
  getInitialState: function() {
    return {
      visible: this.props.isShow
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      visible: nextProps.isShow
    });
  },
  render: function() {
    return <div className="slide-menu">
      <div className={this.state.visible ? "visible " : ""}>{this.props.children}</div>
    </div>;
  }
});
var Header = React.createClass({
  getInitialState: function() {
    const {default_image_img, logo_img, empty_image_img, invalid_img} = this.props;
    defaultImages.defaultAvatar = default_image_img;
    defaultImages.logo = logo_img;
    defaultImages.emptyImage = empty_image_img;
    defaultImages.invalidFile = invalid_img;

    return {
      isShow: false,
      isShowBar: false,
      isClicked: false,
      isItems: !this.props.expanded,
    };
  },
  showBar: function() {
    this.setState({ isShowBar: !this.state.isShowBar });
  },
  hideBar: function() {
    if(this.state.isShowBar) {
      this.setState({ isShowBar: false });
    }
  },
  showItems: function() {
    this.setState({ isItems: !this.state.isItems,
                    isClicked: !this.state.isClicked });
  },
  clickDocument: function(e) {
    if (this.props.expanded) {
      var component = ReactDOM.findDOMNode(this.showItemMenus);
      if (e.target == component || $(component).has(e.target).length) {
          // Inside of the component.
      } else {
          // Outside of the component.
          if(this.state.isItems === true) {
            this.setState({ isItems: false});
          }
      }
    }
  },
  showMenu: function() {
    let myDropdown = document.getElementById("menu-bar");
    if(myDropdown && !this.state.isShow) {
      myDropdown.classList.toggle("show");
      this.setState({
        isShow: true
      });
    }
  },
  closeMenu: function() {
    let myDropdown = document.getElementById("menu-bar");
    if(myDropdown && this.state.isShow) {
      myDropdown.classList.remove('show');
      this.setState({
        isShow: false
      });
    }
  },
  componentDidMount: function(e) {
    const self = this;
    var event = "click";
    if(this.iOS()) {
      event += " touchstart";
    }
    $(document).bind(event, function(e) {
      self.clickDocument(e);
      self.closeMenu();
      if(e.target.id != "btn-menu-bar") {
        self.hideBar();
        var className = e.target.class;
        if(className && className.indexOf('click')) {
          e.target.click();
        }
      }
    });
  },
  menuBar: function() {
    var {
      edit_agency, edit_agency_admin, edit_agent, edit_trady, edit_tenant, user_agency_admin, user_agent, user_trady, user_tenant, user_landlord
    } = this.props;
    var dataMenu = [];
    if (user_agency_admin)
      dataMenu = [...MenuAgency(edit_agency, edit_agency_admin)];
    else if (user_agent)
      dataMenu = [...MenuAgent(edit_agent)];
    else if (user_trady)
      dataMenu = [...MenuTrady(edit_trady)];
    else if (user_tenant)
      dataMenu = [...MenuTenant(edit_tenant)];
    else if (user_landlord)
      dataMenu = [...MenuLandlord()];
    return(
      dataMenu.map((item, key) => {
      return (
          <li key={key}>
            <a href={item.url} className="click">
              {item.name}
            </a>
          </li>
        )
      })
    );
  },
  search: function(hidden) {
    const { role, searchText = '' } = this.props;
    const hiddenSearch = hidden || ['AgencyAdmin', 'Agent'].indexOf(role) === -1;
    const style =  hiddenSearch
                ? { visibility: 'hidden' }
                : {};
    return (
      <div className={"search " + (hiddenSearch && "hidden-search")} style={style}>
        <form action="/search" className="form-search" acceptCharset="UTF-8" method="get">
          <div className="search-input">
            <button type="button" type="submit" className="btn-search">
              <i className="fa fa-search"></i>
            </button>
            <input
              id="query"
              name="query"
              type="search"
              className="input-search"
              placeholder="Search..."
              defaultValue={searchText}
            />
          </div>
          <div className="archived-checkbox">
            <input 
              type="hidden"
              id="search_archived"
              name="search_archived"
              value="false"
            />
            <input 
              type="checkbox"
              id="search_archived"
              name="search_archived"
              value="true"
            />
            <span className="text">Archived Only</span>
          </div>
        </form>
      </div>
    );
  },
  componentWillUnmount: function() {
    $(document).unbind('click', this.clickDocument);
  },
  iOS: function() {
    const iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];
    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){
          return true;
        }
      }
    }
    return false;
  },
  header: function(e) {
    const props = this.props;
    const { expanded, logged_in, current_user, role, images } = props;
    const user_name = (props.user_name ||  '').trim() || role || '';
    const user_name_show_pc = user_name.length > 12
        ? (user_name.trim() && user_name || role).replace(/(.{0,12}).+/, '$1...')
        : user_name;
    const user_name_show_mobile = user_name.length > 20
        ? (user_name.trim() && user_name || role).replace(/(.{0,20}).*/, '$1...')
        : user_name;
    const {
      profile = '',
    } = images && images.length && images[0] || {};
    const isAgent = ['AgencyAdmin', 'Agent'].includes(role);

    return (
      <nav className="header-expanded">
        <MobileMenu ref={ref => this.Bar = ref} id="bar" isShow={this.state.isShowBar}>
          {
            logged_in ?
              <ul className="menu-mobile">
                  <li>
                    <span className="icon-user">
                      <AvatarImage className="fa fa-user" imageUri={profile} />
                    </span>
                    <span title={user_name}>
                      {user_name_show_mobile}
                    </span>
                  </li>
                  { this.menuBar() }
                  <li>
                    <a href={props.logout_path} className="click" data-method="delete" rel="nofollow">
                      Sign Out
                    </a>
                  </li>
              </ul>
              :
              <span className="mobile-menu-items">
                <a href={props.menu_login_path} className="click" > Login </a>
              </span>
          }
        </MobileMenu>
        <div className={"container " + (expanded ? 'full-header' : '')} >
          <div className={"column header-custom " + (e && "forhome ")}>
            <div className="logo">
              <img src={defaultImages.logo} alt="logo" onClick={() => location.href = '/'} />
              <a href={props.root_path}> MaintenanceApp </a>
            </div>
            {
              logged_in
              ? (
                  !expanded
                  ?
                    <div className={"header-right " + (isAgent && " agent ")}>
                      { this.search() }
                      <div className="menu-bar dropdown-custom">
                        <button type="button" className="btn-menu" onClick={this.showMenu}>
                          <span className="icon-user">
                            <AvatarImage className="fa fa-user" imageUri={profile} />
                          </span>
                          <span title={user_name}>
                            {user_name_show_pc}
                            <i className="fa fa-angle-down"/>
                          </span>
                        </button>
                        <ul className="dropdown-menu" id="menu-bar">
                          { this.menuBar() }
                          <li ref={ref => this.Items = ref}>
                            <a href={props.logout_path} data-method="delete" rel="nofollow"> Sign Out</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    :
                    <div className="log_in">
                      { this.search(true) }
                      <div
                        className="menu-button"
                        onClick={this.showItems}
                        ref={ref => this.showItemMenus = ref}
                      >
                        <span className="icon-user">
                          <AvatarImage className="fa fa-user" imageUri={profile} />
                        </span>
                        <span title={user_name}>
                          {user_name_show_pc}
                        </span>
                        <i className="fa fa-angle-down"/>
                      </div>
                      {
                      this.state.isItems &&
                        <ul className="desktop-menu-items">
                          { this.menuBar() }
                          <li  ref={ref => this.Items = ref}>
                            <a href={props.logout_path} data-method="delete" rel="nofollow"> Sign Out</a>
                          </li>
                        </ul>
                      }
                    </div>
                )
              : <div className="log_in desktop-menu-items">
                  { this.search(true) }
                  <a href={props.menu_login_path} > Login </a>
                </div>
            }
            <button
              className={"menu-btn button " + (logged_in ? 'signed' : '')}
              id="btn-menu-bar"
              onClick={this.showBar}> {!expanded ? "☰" : "MENU"}
            </button>
          </div>
        </div>
      </nav>
    );
  },
  render: function() {
    return (
      <div className="dontprint">
        <ShowMessage position="header" />
        { this.props.expanded ?
            this.header(true)
            :
            this.header()
        }
      </div>
    );
  }
});