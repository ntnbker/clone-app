var Header = React.createClass({
    mobileMenu() {
        var logged_in = this.props.logged_in;
        var current_user = this.props.current_user;

        var itemsForReg = [ {name: "Login", path: this.props.menu_login_path},
                            {name: "Register", path: this.props.new_agency_path, class: "register"} ];

        var itemsForAgent = [ {name: "New Maintenance Request", path: this.props.conversations_path},
                              {name: "My MR", path: this.props.maintenance_requests_path} ];

        return <div>
          <nav className="pushy pushy-left">
          {
          logged_in
          ? <ul>
              <li className="pushy-link"> <a href={this.props.conversations_path}> Inbox </a> </li> 
              <li className="pushy-link"> <a href={this.props.logout_path} data-method="delete" rel="nofollow"> Sign Out {this.props.current_user.email} </a> </li>
            </ul>
          : <ul> {
              itemsForReg.map((item) => {
                  return <li className="pushy-link"> <a href={item.path} className={item.class}> {item.name} </a> </li>
              }) }
            </ul>
          }
          </nav>
          <div className="site-overlay"></div>
        </div>
    },

    headerForHomepage() {
        var logged_in = this.props.logged_in;
        var current_user = this.props.current_user;

        var itemsForReg = [ {name: "Login", path: this.props.menu_login_path},
                            {name: "Register", path: this.props.new_agency_path, class: "register"} ];

        var itemsForAgent = [ {name: "New Maintenance Request", path: this.props.conversations_path},
                              {name: "My MR", path: this.props.maintenance_requests_path} ];

        return <nav className="header-homepage">
          {this.mobileMenu()}
          
          <div className="container">
            <div className="logo">
              <img src="/assets/logo.png" alt="logo" />
              <a href={this.props.root_path}> MaintenanceApp </a>
            </div>
            <span className="desktop-menu">
            {
            logged_in
            ? <span>
                <a href={this.props.conversations_path}> Inbox </a>
                <a href={this.props.logout_path} data-method="delete" rel="nofollow"> Sign Out {this.props.current_user.email}</a>
              </span>
            : itemsForReg.map((item) => {
                  return <a href={item.path} className={item.class}> {item.name} </a>
              })
            }
            </span>

            <button className="menu-btn button"> ☰ </button>
          </div>
        </nav>
    },

    header() {
        var logged_in = this.props.logged_in;
        var current_user = this.props.current_user;

        var itemsForReg = [ {name: "Login", path: this.props.menu_login_path},
                            {name: "Register", path: this.props.new_agency_path, class: "register"} ];

        var itemsForAgent = [ {name: "New Maintenance Request", path: this.props.conversations_path},
                              {name: "My MR", path: this.props.maintenance_requests_path} ];

        return <nav className="header-other">
          {this.mobileMenu()}
          
          <div className="container">
            <div className="logo">
              <img src="/assets/logo.png" alt="logo" />
              <a href={this.props.root_path}> MaintenanceApp </a>
            </div>
            <span className="desktop-menu">
            {
            logged_in
            ? <span>
                <a href={this.props.conversations_path}> Inbox </a>
                <a href={this.props.logout_path} data-method="delete" rel="nofollow"> Sign Out {this.props.current_user.email}</a>
              </span>
            : itemsForReg.map((item) => {
                  return <a href={item.path} className={item.class}> {item.name} </a>
              })
            }
            </span>

            <button className="menu-btn button"> ☰ </button>
          </div>
        </nav>
    },

    render: function() {
        return <div>
            { this.props.homepage
            ? this.headerForHomepage()
            : this.header() }
        </div>
    }
});