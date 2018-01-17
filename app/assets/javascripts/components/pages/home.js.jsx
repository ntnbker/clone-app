var HomeComponent = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  chooseUser(user) {
    if (this.state.active !== user) {
      this.setState({active: user});
    }
  },

  howItWorkForAgent() {

  },

  howItWorkForTrady() {

  },

  howItWorkForTenant() {
    return (
      <div className="row how-it-works">
        <div className="three columns">
          <img src="/assets/key1.png" alt=""/>
          <h4>Maintenance requested</h4>
          <p>Fill in the Maintenance form and submit the request</p>
        </div>
        <div className="three columns">
          <img src="/assets/key2.png" alt=""/>
          <h4>Maintenance actioned</h4>
          <p>Sit back, and let us sort out the maintenance for you!</p>
        </div>
        <div className="three columns">
          <img src="/assets/key3.png" alt=""/>
          <h4>Track Maintenance Status</h4>
          <p>Get updates on your maintenance request is up or check online</p>
        </div>
        <div className="three columns">
          <img src="/assets/key4.png" alt=""/>
          <h4>Maintenance complete</h4>
          <p>Enjoy a stress free process to maintain your home</p>
        </div>
      </div>
    )
  },

  login() {
    <div className="login">
      <div className="main-login">
        {this.howItWorkForTenant()}
      </div>
    </div>
  },

  homeActionForAgent() {

  },

  homeActionForTrady() {

  },

  homeActionForTenant() {
    const { signed = false } = this.props;

    return (
      <div className="action-content tenant-content">
        <div className="login-info">
          <div className="login-input email-input">
            <span className="email">
              Email:
            </span>
            <input type="text" />
          </div>
          <div className="login-input password-input">
            <span className="password">
              Password:
            </span>
            <input type="password" />
          </div>
        </div>
        <div className="button-group tenant-buttons">
          <button type="button" className="btn btn-back">Back</button>
          <button type="button" className="btn btn-login">Login</button>
        </div>
        <div className="forget-password">
          <a href="#" className="link-forget-password">Forgot Password</a>
        </div>
      </div>
    )
  },

  homeActionTitle() {
    const {active = 'tenant'} = this.state;
    return (
      <div className="home-action-title">
        <button
          className={"tanent-title " + (active === 'tenant' ? 'active' : '')}
          onClick={() => this.chooseUser('tenant')}
        >
          For Tenants
        </button>
        <button
          className={"trady-title " + (active === 'trady' ? 'active' : '')}
          onClick={() => this.chooseUser('trady')}
        >
          For Tradies
        </button>
        <button
          className={"landlord-title " + (active === 'landlord' ? 'active' : '')}
          onClick={() => this.chooseUser('landlord')}
        >
          For Landlords
        </button>
        <button
          className={"agent-title " + (active === 'agent' ? 'active' : '')}
          onClick={() => this.chooseUser('agent')}
        >
          For Agents
        </button>
      </div>
    )
  },

  homeActionContent() {
    return (
      <div className="home-action-content">
        <div className="content-frame"></div>
        {this.homeActionForTenant()}
      </div>
    )
  },

  renderHowItWork() {
    const { role } = this.props;
    return (
      <div className="main">
      </div>
    )
  },

  renderHomeAction() {
    return (
      <div className="home-action">
        {this.homeActionTitle()}
        {this.homeActionContent()}
      </div>
    )
  },

  render: function() {
    return (
      <div className="pages">
        <div className="background-image" />
        <div className="home-content">
          <div className="header">
            <div className="home-logo">
              <AvatarImage
                className="home-logo"
                imageUri="/assets/logo.png"
                defaultImage="/assets/logo.png"
                alt="logo"
               />
              <h3>MaintenanceApp</h3>
            </div>
            {this.renderHowItWork()}
            {this.renderHomeAction()}
          </div>
        </div>
      </div>
    )
  }
});
