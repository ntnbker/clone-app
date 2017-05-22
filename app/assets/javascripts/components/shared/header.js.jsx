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
      visible: false
    };
  },

  show: function() {
    this.setState({ visible: true });
    document.addEventListener("click", this.hide);
  },

  hide: function() {
    document.removeEventListener("click", this.hide);
    this.setState({ visible: false });
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
        isItems: !this.props.expanded,
        isClicked: false
      };
    },

    showBar: function() {
      this.refs.Bar.show();
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
      document.getElementById("menu-bar").classList.toggle("show");
    },

    componentDidMount: function(e) {
        $(document).bind('click', this.clickDocument);
        $(document).bind('click', function(e) {
          if (!e.target.matches('.btn-menu')) {
            var myDropdown = document.getElementById("menu-bar");
            if (myDropdown && myDropdown.classList.contains('show')) {
              myDropdown.classList.remove('show');
            }
          }
        });
    },

    componentWillUnmount: function() {
        $(document).unbind('click', this.clickDocument);
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

    Search: function() {
      return (
        <div className="search">
          <form action="/search" className="form-search" accept-charset="UTF-8" method="get">
            <input name="utf8" type="hidden" value="✓" />
            <input 
              id="query" 
              name="query" 
              type="search" 
              className="input-search"
              placeholder="Search Here"
            />
            <button name="button" type="submit" className="btn-search">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      );
    },

    header: function(e) {
        var logged_in = this.props.logged_in;
        var current_user = this.props.current_user;

        return <nav className="header-expanded">

          <MobileMenu ref="Bar">
            {
            logged_in ?
              <ul className="menu-mobile">
                  { this.menuBar() }
                  <li>
                    <a href={this.props.logout_path} data-method="delete" rel="nofollow"> 
                      Sign Out
                    </a>
                  </li>
              </ul>
              : <span className="mobile-menu-items">
                  <a href={this.props.menu_login_path} > Login </a>
                  <a href={this.props.new_agency_path} className="register"> Register </a>
                </span>
            }
          </MobileMenu>

          <div className="container container-custom">
              <div className={"column header-custom " + (e && "forhome")}>
                  <div className="logo">
                    <img src="/assets/logo.png" alt="logo" />
                    <a href={this.props.root_path}> MaintenanceApp </a>
                  </div>
                  {
                    logged_in ?
                      this.Search()
                      : null
                  }
                  {
                    logged_in ?
                      <div className="menu-bar dropdown-custom">
                        <button type="button" className="btn-menu" onClick={this.showMenu}>
                          My Maintenance Request
                        </button>
                        <ul className="dropdown-menu" id="menu-bar">
                        { this.menuBar() }
                        </ul>
                      </div>
                      : null
                  }
                  {
                  logged_in
                    ? <span className="log_in">
                        <div className="menu-button" onClick={this.showItems} ref="showItems"> S </div>
                        {
                        this.state.isItems
                          ? <span className="desktop-menu-items" ref="Items">
                              <a href={this.props.logout_path} data-method="delete" rel="nofollow"> Sign Out</a>
                            </span>
                          : null
                        }
                      </span>
                    : <span className="desktop-menu-items">
                        <a href={this.props.menu_login_path} > Login </a>
                        <a href={this.props.new_agency_path} className="register"> Register </a>
                      </span>
                  }
              </div>

              <button className="menu-btn button" onClick={this.showBar}> ☰ </button>
          </div>
        </nav>
    },

    render: function() {
        return <div>
            { this.props.expanded
            ? this.header(true)
            : this.header() }
        </div>
    }
});