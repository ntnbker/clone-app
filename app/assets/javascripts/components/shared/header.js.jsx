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
    showBar() {
      this.refs.Bar.show();
    },

    header(e) {
        var logged_in = this.props.logged_in;
        var current_user = this.props.current_user;

        return <nav className="header-homepage">

          <MobileMenu ref="Bar">
            {
            logged_in
              ? <span className="mobile-menu-items">
                  <a href={this.props.conversations_path}> Inbox </a>
                  <a href={this.props.logout_path} data-method="delete" rel="nofollow"> Sign Out {this.props.current_user.email}</a>
                </span>
              : <span className="mobile-menu-items">
                  <a href={this.props.menu_login_path} > Login </a>
                  <a href={this.props.new_agency_path} className="register"> Register </a>
                </span>
            }
          </MobileMenu>

          <div className="container">
              <div className={e ? "forhome column" : "column"}>
                  <div className="logo">
                    <img src="/assets/logo.png" alt="logo" />
                    <a href={this.props.root_path}> MaintenanceApp </a>
                  </div>
                
                  {
                  logged_in
                    ? <span className="desktop-menu-items">
                        <a href={this.props.conversations_path}> Inbox </a>
                        <a href={this.props.logout_path} data-method="delete" rel="nofollow"> Sign Out {this.props.current_user.email}</a>
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
            { this.props.homepage
            ? this.header(true)
            : this.header() }
        </div>
    }
});