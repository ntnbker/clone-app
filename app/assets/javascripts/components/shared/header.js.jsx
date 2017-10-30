const MenuAgency = function(edit_agency, edit_agency_admin) {
  return [
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

const MenuTenant = function() {
  return [
    {
      url: "/tenant_maintenance_requests",
      name: "My Maintenance Requests",
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
      var {
        edit_agency, edit_agency_admin, edit_agent, edit_trady, user_agency_admin, user_agent, user_trady, user_tenant, user_landlord
      } = this.props;
      var dataMenu = [];
      if (user_agency_admin)
        dataMenu = [...MenuAgency(edit_agency, edit_agency_admin)];
      else if (user_agent)
        dataMenu = [...MenuAgent(edit_agent)];
      else if (user_trady)
        dataMenu = [...MenuTrady(edit_trady)];
      else if (user_tenant)
        dataMenu = [...MenuTenant()];
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

    search: function() {
      const { role, searchText = '' } = this.props;
      if (['AgencyAdmin', 'Agent'].indexOf(role) === -1) return null;

      return (
        <div className="search">
          <form action="/search" className="form-search" acceptCharset="UTF-8" method="get">
            <input
              id="query"
              name="query"
              type="search"
              className="input-search"
              placeholder="Search..."
              defaultValue={searchText}
            />
            <button type="button" type="submit" className="btn-search">
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
                      <span className="icon-user">
                        <AvatarImage className="fa fa-user" />
                      </span>
                      <span>
                        Hi, {props.role}
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
                  <a href={props.new_agency_path} className="register click"> Register </a>
                </span>
            }
          </MobileMenu>

          <div className={"container " + (expanded ? 'full-header' : '')} >
            <div className={"column header-custom " + (e && "forhome")}>
                <div className="logo">
                  <img src="/assets/logo.png" alt="logo" />
                  <a href={props.root_path}> MaintenanceApp </a>
                </div>
                {
                  logged_in?
                    (
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
                            <button type="button" className="btn-menu" onClick={this.showMenu}>
                              <span className="icon-user">
                                <AvatarImage className="fa fa-user" />
                              </span>
                              <span>
                                Hi, {props.role}
                                <i className="fa fa-angle-down"/>
                              </span>
                            </button>
                            <ul className="dropdown-menu" id="menu-bar">
                              { this.menuBar() }
                              <li  ref="Items">
                                <a href={props.logout_path} data-method="delete" rel="nofollow"> Sign Out</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        :
                        <div className="log_in">
                          <div
                            className="menu-button"
                            onClick={this.showItems}
                            ref="showItems"
                          >
                            <span className="icon-user">
                              <AvatarImage className="fa fa-user" />
                            </span>
                            <span>
                              Hi, {props.role}
                            </span>
                            <i className="fa fa-angle-down"/>
                          </div>
                          {
                          this.state.isItems &&
                            <ul className="desktop-menu-items">
                              { this.menuBar() }
                              <li  ref="Items">
                                <a href={props.logout_path} data-method="delete" rel="nofollow"> Sign Out</a>
                              </li>
                            </ul>
                          }
                        </div>
                    )
                    :
                    <span className="desktop-menu-items">
                      <a href={props.menu_login_path} > Login </a>
                      <a href={props.new_agency_path} className="register"> Register </a>
                    </span>
                }
              <button className="menu-btn button" id="btn-menu-bar" onClick={this.showBar}> ☰ </button>
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
