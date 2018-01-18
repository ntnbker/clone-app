var HomeComponent = React.createClass({
  getInitialState: function() {
    return {
      active: 'agent',
      step: 'login',
    };
  },

  chooseUser(user) {
    if (this.state.active !== user) {
      const step = user === 'tenant' || user === 'trady' ? 'home' : 'login';
      this.setState({active: user, step });
    }
  },

  howItWorkForLandlord() {
    return (
      <div className="row how-it-works">
        <div className="three columns">
          <img src="/assets/key1.png" alt=""/>
          <h4>Maintenance Requested</h4>
          <p>Receive Maintenance Requests in a centralized app</p>
        </div>
        <div className="three columns">
          <img src="/assets/key2.png" alt=""/>
          <h4>Easily action property <br /> maintenance requests</h4>
          <p>Quickly communicate with your agent on how maintenance should be handled</p>
        </div>
        <div className="three columns">
          <img src="/assets/key3.png" alt=""/>
          <h4>Receive multiple competative quotes</h4>
          <p>Quickly request quotes from multiple tradies to receive competative prices</p>
        </div>
        <div className="three columns">
          <img src="/assets/key4.png" alt=""/>
          <h4>Maintenance Complete</h4>
          <p>Enjoy a stress free process to maintain your property</p>
        </div>
      </div>
    )
  },

  howItWorkForAgent() {
    return (
      <div className="row how-it-works">
        <div className="three columns">
          <img src="/assets/key1.png" alt=""/>
          <h4>Quickly organize maintenance requests</h4>
          <p>Instantly deal with maintenance requests submitted by tenants</p>
        </div>
        <div className="three columns">
          <img src="/assets/key2.png" alt=""/>
          <h4>Time is money easily <br /> increase your productivity</h4>
          <p>With a just few clicks you can make sure the job is completed</p>
        </div>
        <div className="three columns">
          <img src="/assets/key3.png" alt=""/>
          <h4>Track maintenance status</h4>
          <p>Automated reminders unsure jobs are progressing</p>
        </div>
        <div className="three columns">
          <img src="/assets/key4.png" alt=""/>
          <h4>Increase revenue</h4>
          <p>Increase revenue through our rebate program and increased productivity</p>
        </div>
      </div>
    )
  },

  howItWorkForTrady() {
    return (
      <div className="row how-it-works">
        <div className="three columns">
          <img src="/assets/key1.png" alt=""/>
          <h4>Receive High Quality <br /> Job Leads</h4>
          <p>Receive maintenance work from property and strata managers</p>
        </div>
        <div className="three columns">
          <img src="/assets/key2.png" alt=""/>
          <h4>Easily track job information <br /> and schedule jobs</h4>
          <p>Easily organize job communications and appointments</p>
        </div>
        <div className="three columns">
          <img src="/assets/key3.png" alt=""/>
          <h4>Easily create invoices <br /> or upload your own</h4>
          <p>Easily submit invoices. With Automated invoice reminders. We help make sure you get paid</p>
        </div>
        <div className="three columns">
          <img src="/assets/key4.png" alt=""/>
          <h4>Increase your revenue</h4>
          <p>Join our network to grow your business</p>
        </div>
      </div>
    )
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
  },

  homeActionForAgent() {
    const { signed = false } = this.props;

    return (
      <div className="agent-content">
        {this.loginRender()}
      </div>
    )
  },

  homeActionForLandlord() {
    const { signed = false } = this.props;

    return (
      <div className="landlord-content">
        {this.loginRender()}
      </div>
    )
  },

  homeActionForTradyLogin() {
    const { signed = false } = this.props;

    return (
      <div className="trady-content">
        {this.loginRender()}
      </div>
    )
  },

  homeActionForTrady() {
    return (
      <div className="button-group trady-home-button">
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.setState({step: 'login'})}
        >
          Login
        </button>
        <p className="text-center">Or</p>
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.setState({step: 'home'})}
        >
          Join our network
        </button>
      </div>
    )
  },

  loginRender() {
    const { active } = this.state;
    const showBackButton = active === 'tenant' || active === 'trady';
    const showChooseRole = active === 'agent';

    return (
      <div>
        { showChooseRole &&
          <div className="choose-role">
            <label className="radio-option">Agent
              <input
                type="radio"
                name="role"
                value="agent"
                defaultChecked
              />
              <span className="radio-checkmark"></span>
            </label>
            <label className="radio-option">Agency Administrator
              <input
                type="radio"
                name="role"
                value="agency_admin"
              />
              <span className="radio-checkmark"></span>
            </label>
          </div>
        }
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
        <div className="button-group login-button">
          { showBackButton &&
            <button
              type="button"
              className="btn btn-back"
              onClick={() => this.setState({step: 'home'})}
            >
              Back
            </button>
          }
          <button
            type="button"
            className="btn btn-login"
            // onClick={() => this.setState({step: 'login'})}
          >
            Login
          </button>
        </div>
        <div className="forget-password">
          <a href="#" className="link-forget-password">Forgot Password</a>
        </div>
      </div>
    )
  },

  homeActionForTenantLogin() {
    const { signed = false } = this.props;

    return (
      <div className="tenant-content">
        {this.loginRender()}
      </div>
    )
  },

  homeActionForTenant() {
    const { signed = false } = this.props;

    return (
      <div className="button-group tenant-home-button">
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.setState({step: 'login'})}
        >
          Check My Maintenance Requests
        </button>
        <p className="text-center">Or</p>
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.setState({step: 'newMR'})}
        >
          Submit New Maintenance Request
        </button>
      </div>
    )
  },

  homeActionForSubmitNewMR() {
    const { signed = false, services } = this.props;

    return (
      <div className="submit-new-mr">
        <div className="type-service">
          <select className="type-service" id="select-type-service">
            <option value={null}>What type of service do you require?</option>
            {
              services.map(({service, id}) => {
                return (
                  <option value={service} key={id}>{service}</option>
                )
              })
            }
          </select>
          <span className="dropdown-arrow fa fa-caret-down"></span>
        </div>
        <div className="input-address">
          <textarea
            type="text"
            id="pac-input"
            placeholder="Where do need the service done? Please tell us the address."
            onChange={getAddressOfGoogleMap}
          />
        </div>
        <div className="button-group login-button new-mr-button">
          <button
            type="button"
            className="btn btn-back"
            onClick={() => this.setState({step: 'home'})}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-summit"
            onClick={() => this.setState({step: 'home'})}
          >
            Submit
          </button>
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
    const { active, step } = this.state;
    let render = null;

    switch (active) {
      case 'tenant':
        if (step === 'login') {
          render = this.homeActionForTenantLogin;
        }
        if (step === 'home') {
          render = this.homeActionForTenant;
        }
        if (step === 'newMR') {
          render = this.homeActionForSubmitNewMR;
        }
        break;
      case 'trady':
        if (step === 'login') {
          render = this.homeActionForTradyLogin;
        }
        if (step === 'home') {
          render = this.homeActionForTrady;
        }
        break;
      case 'landlord':
        render = this.homeActionForLandlord;
        break;
      case 'agent':
        render = this.homeActionForAgent;
        break;
    }
    return (
      <div className="home-action-content">
        <div className="content-frame"></div>
        <div className="action-content">{render && render()}</div>
      </div>
    )
  },

  renderHowItWork() {
    const { active } = this.state;
    let showHowItWork = null;
    switch (active) {
      case 'tenant': showHowItWork = this.howItWorkForTenant; break;
      case 'agent': showHowItWork = this.howItWorkForAgent; break;
      case 'trady': showHowItWork = this.howItWorkForTrady; break;
      case 'landlord': showHowItWork = this.howItWorkForLandlord; break;
    }

    return (
      <div className="main">
        {showHowItWork()}
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
