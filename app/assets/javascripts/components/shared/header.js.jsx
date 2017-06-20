const MenuAgency = [
  {
    url: "/agency_admin_maintenance_requests",
    name: "Agency Admin Maintenance Requests",
  },
  {
    url: "/agents/new",
    name: "Add Agent",
  },
  {
    url: "/agency_admins/new",
    name: "Add Agency Admin",
  }
];

const MenuAgent = [
  {
    url: "/agent_maintenance_requests",
    name: "Agent Maintenance Request",
  },
];

const MenuTrady = [
  {
    url: "/trady_maintenance_requests",
    name: "Trady Maintenance Request",
  }
];

const MenuTenant = [
  {
    url: "/tenant_maintenance_requests",
    name: "Tenant Maintenance Request",
  }
];

const MenuLandlord = [
  {
    url: "/landlord_maintenance_requests",
    name: "Landlord Maintenance Request",
  }
];

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
        var component = ReactDOM.findDOMNode(this.refs.showItems);
        if (e.target == component || $(component).has(e.target).length) {
            // Inside of the component.
        } else {
            // Outside of the component.
            this.setState({ isItems: false});
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
        if(e.target.id != "menu-bar") {
          self.hideBar();
        }
        self.clickDocument(e);
        self.closeMenu();
      });  
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

    menuBar: function() {
      var dataMenu = [];
      if(!!this.props.user_agency_admin)
        dataMenu = [...MenuAgency];
      else if(!!this.props.user_agent) 
        dataMenu = [...MenuAgent];
      else if(!!this.props.user_trady) 
        dataMenu = [...MenuTrady];
      else if(!!this.props.user_tenant)
        dataMenu = [...MenuTenant];
      else if(!!this.props.user_landlord)
        dataMenu = [...MenuLandlord];

      return(       
        dataMenu.map((item, key) => {
          return (
            <li key={key}>
              <a href={item.url}>
                {item.name}
              </a>
            </li>
          );
        })
      );
    },

    search: function() {
      return (
        <div className="search">
          <form action="/search" className="form-search" acceptCharset="UTF-8" method="get">
            <input name="utf8" type="hidden" value="✓" />
            <input 
              id="query" 
              name="query" 
              type="search" 
              className="input-search"
              placeholder="Search..."
            />
            <button name="button" type="submit" className="btn-search">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      );
    },

    header: function(e) {
      const props = this.props;
      const expanded = this.props.expanded;
      const logged_in = this.props.logged_in;
      const current_user = this.props.current_user;

      return (
        <nav className="header-expanded">
          <MobileMenu ref="Bar" id="bar" isShow={this.state.isShowBar}>
            {
              logged_in ?
                <ul className="menu-mobile">
                    <li>
                      <img src="/assets/user1.png" />
                      <span>
                        Hi, {current_user.name}
                      </span>
                    </li>
                    { this.menuBar() }
                    <li>
                      <a href={props.logout_path} data-method="delete" rel="nofollow"> 
                        Sign Out
                      </a>
                    </li>
                </ul>
                : 
                <span className="mobile-menu-items">
                  <a href={props.menu_login_path} > Login </a>
                  <a href={props.new_agency_path} className="register"> Register </a>
                </span>
            }
          </MobileMenu>

          <div className="container container-custom">
            <div className={"column header-custom " + (e && "forhome")}>
                <div className="logo">
                  <img src="/assets/logo.png" alt="logo" />
                  <a href={props.root_path}> MaintenanceApp </a>
                </div>
                {
                  logged_in? 
                    <div>
                      {
                        !expanded ?
                          <div className="header-right">
                            { this.search() }
                            <div className="question">
                              <i className="fa fa-question" />
                            </div>
                            <div className="notification">
                              <i className="fa fa-bell" />
                            </div>
                            <div className="menu-bar dropdown-custom">
                              <button type="button" className="btn-menu" id="btn-menu-header" onClick={this.showMenu}>
                                <img src="/assets/user1.png" />
                                <span>
                                  Hi, {current_user.name}
                                  <i className="fa fa-angle-down"/>
                                </span>
                              </button>
                              <ul className="dropdown-menu">
                                { this.menuBar() }
                                <li  ref="Items">
                                  <a href={props.logout_path} data-method="delete" rel="nofollow"> Sign Out</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          :
                          <div className="log_in">
                            <div className="menu-button" onClick={this.showItems} ref="showItems"> S </div>
                            {
                            this.state.isItems &&
                              <ul className="desktop-menu-items"> 
                                <li>
                                  <img src="/assets/user1.png" />
                                  <span>
                                    Hi, {current_user.name}
                                  </span>
                                </li>
                                { this.menuBar() }
                                <li  ref="Items">
                                  <a href={props.logout_path} data-method="delete" rel="nofollow"> Sign Out</a>
                                </li>
                              </ul>
                            }
                          </div>
                      }
                    </div>
                    : 
                    <span className="desktop-menu-items">
                      <a href={props.menu_login_path} > Login </a>
                      <a href={props.new_agency_path} className="register"> Register </a>
                    </span>
                }
              <button className="menu-btn button" id="menu-bar" onClick={this.showBar}> ☰ </button>
            </div>
          </div>
        </nav>
      );
    },

    render: function() {
      return (
        <div>
          { this.props.expanded ? 
              this.header(true)
              :
              this.header()
          }
        </div>
      );
      
    }
});