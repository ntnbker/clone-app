var HomeComponent = React.createClass({
  getInitialState: function() {
    const { current_user, role } = this.props;
    const step = this.detectStepFromRole(role);

    return {
      active: !role ? 'Tenant' : role === 'AgencyAdmin' ? 'Agent' : role,
      step,
      signed: !!current_user,
      rolePicked: role || 'Tenant',
      user: current_user,
      focusEmail: false,
      focusPassword: false,
    };
  },

  detectStepFromRole(role) {
    return !role || role === 'Tenant'
              ? 'home'
              : role === 'Landlord' || role === 'Trady'
                ? 'mobile-button'
                : 'newMR';
  },

  chooseUser(user) {
    if (this.state.active !== user && !this.state.signed) {
      const step = user === 'Tenant' || user === 'Trady' ? 'home' : 'login';
      this.setState({active: user, step, rolePicked: user});
    }
  },

  redirectNewPath(path) {
    location.href = path;
  },

  login(e) {
    e.preventDefault();
    const { rolePicked } = this.state;
    const email          = this.email && this.email.value;
    const password       = this.password && this.password.value;
    const {
      query_id, user_type, maintenance_request_id, anchor, message, quote_request_id, appointment_id, stop_reminder, quote_message_id
    } = this.props;

    $.ajax({
      type: 'POST',
      url: '/menulogin',
      data: {
        email, password, role_picked: rolePicked,
        query_id, user_type, maintenance_request_id, anchor,
        message, quote_request_id, appointment_id,
        stop_reminder, quote_message_id
      },
      success: function(res) {

      },
      error: function(err) {

      },
    })
  },

  submitNewMR(e) {
    e.preventDefault();
    const { rolePicked } = this.state;
    const tradie         = this.service && this.service.value || '';
    const address        = this.address && this.address.value;

    $.ajax({
      type: 'POST',
      url: '/route_user_type',
      data: { form_fields:
        {tradie, address, user_role: rolePicked === 'Tenant' ? rolePicked : 'Agent'}
      },
      success: function(res) {

      },
      error: function(err) {

      },
    })
  },

  handleLandlordCheckMR() {
    const { signed } = this.state;

    if (!signed) {
      return this.setState({step: 'login'});
    }
    this.redirectNewPath('/tenant_maintenance_requests');
  },

  howItWorkForLandlord() {
    return (
      <div className="row how-it-works">
        <div className="three columns">
          <img src="/icons/pen.png" alt=""/>
          <h4>Maintenance Requested</h4>
          <p>Receive Maintenance Requests in a centralized app</p>
        </div>
        <div className="three columns">
          <img src="/icons/letter.png" alt=""/>
          <h4>Easily action property maintenance requests</h4>
          <p>Quickly communicate with your agent on how maintenance should be handled</p>
        </div>
        <div className="three columns">
          <img src="/icons/notepad-3.png" alt=""/>
          <h4>Receive multiple competative quotes</h4>
          <p>Quickly request quotes from multiple tradies to receive competative prices</p>
        </div>
        <div className="three columns">
          <img src="/icons/enjoy.png" alt=""/>
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
          <img src="/icons/pen.png" alt=""/>
          <h4>Quickly organize maintenance requests</h4>
          <p>Instantly deal with maintenance requests submitted by tenants</p>
        </div>
        <div className="three columns">
          <img src="/icons/time-is-money.png" alt=""/>
          <h4>Time is money easily increase your productivity</h4>
          <p>With a just few clicks you can make sure the job is completed</p>
        </div>
        <div className="three columns">
          <img src="/icons/location.png" alt=""/>
          <h4>Track maintenance status</h4>
          <p>Automated reminders unsure jobs are progressing</p>
        </div>
       
      </div>
    )
  },

  howItWorkForTrady() {
    return (
      <div className="row how-it-works">
        <div className="three columns">
          <img src="/icons/pen.png" alt=""/>
          <h4>Receive High Quality Job Leads</h4>
          <p>Receive maintenance work from property and strata managers</p>
        </div>
        <div className="three columns">
          <img src="/icons/notepad-12.png" alt=""/>
          <h4>Easily track job information and schedule jobs</h4>
          <p>Easily organize job communications and appointments</p>
        </div>
        <div className="three columns">
          <img src="/icons/receipt.png" alt=""/>
          <h4>Easily create invoices or upload your own</h4>
          <p>Easily submit invoices. With Automated invoice reminders. We help make sure you get paid</p>
        </div>
        <div className="three columns">
          <img src="/icons/notes.png" alt=""/>
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
          <img src="/icons/pen.png" alt=""/>
          <h4>Maintenance requested</h4>
          <p>Fill in the Maintenance form and submit the request</p>
        </div>
        <div className="three columns">
          <img src="/icons/letter.png" alt=""/>
          <h4>Maintenance actioned</h4>
          <p>Sit back, and let us sort out the maintenance for you!</p>
        </div>
        <div className="three columns">
          <img src="/icons/location.png" alt=""/>
          <h4>Track Maintenance Status</h4>
          <p>Get updates on your maintenance request is up or check online</p>
        </div>
        <div className="three columns">
          <img src="/icons/enjoy.png" alt=""/>
          <h4>Maintenance complete</h4>
          <p>Enjoy a stress free process to maintain your home</p>
        </div>
      </div>
    )
  },

  homeActionForAgent() {
    const { signed = false } = this.props;

    return (
      <div className="agent-content">
        {this.loginRender()}
      </div>
    )
  },

  homeActionForLandlordMobile() {
    const { signed = false } = this.props;

    return (
      <div className="button-group landlord-home-button">
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.redirectNewPath('/landlord_maintenance_requests')}
        >
          My Maintenance Requests
        </button>
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

  homeActionForTradyMobile() {
    return (
      <div className="button-group trady-home-button">
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.redirectNewPath('/trady_maintenance_requests')}
        >
          Trady Maintenance Requests
        </button>
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.redirectNewPath(this.props.edit_trady)}
        >
          Trady Account Settings
        </button>
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
        { false && <p className="text-center">Or</p> }
        { false &&
          <button
            type="button text-center"
            className="btn"
            onClick={() => this.setState({step: 'home'})}
          >
            Join our network
          </button>
        }
      </div>
    )
  },

  loginRender() {
    const { active, focusEmail, focusPassword } = this.state;
    const { new_password_reset_path } = this.props;
    const showBackButton = active === 'Tenant' || active === 'Trady';
    const showChooseRole = active === 'Agent';

    return (
      <form id="login" onSubmit={this.login}>
        { showChooseRole &&
          <div className="choose-role">
            <label className="radio-option">Agent
              <input
                type="radio"
                name="role-picked"
                value="Agent"
                onChange={() => this.setState({rolePicked: 'Agent'})}
                defaultChecked
              />
              <span className="radio-checkmark"></span>
            </label>
            <label className="radio-option">Agency Administrator
              <input
                type="radio"
                name="role-picked"
                onChange={() => this.setState({rolePicked: 'AgencyAdmin'})}
                value="AgencyAdmin"
              />
              <span className="radio-checkmark"></span>
            </label>
          </div>
        }
        <div className="login-info">
          <div className={"login-input email-input " + (focusEmail && 'focus')}>
            <span className="email" onClick={() => this.email.focus()}>
              Email:
            </span>
            <input
              type="text"
              name="email"
              onFocus={() => this.setState({focusEmail: true})}
              onBlur={() => this.setState({focusEmail: false})}
              ref={(elem) => this.email = elem}
            />
          </div>
          <div className={"login-input password-input " + (focusPassword && 'focus')}>
            <span className="password"  onClick={() => this.password.focus()}>
              Password:
            </span>
            <input
              type="password"
              name="password"
              onFocus={() => this.setState({focusPassword: true})}
              onBlur={() => this.setState({focusPassword: false})}
              ref={(elem) => this.password = elem}
            />
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
            type="submit"
            className="btn btn-login"
          >
            Login
          </button>
        </div>
        <div className="forget-password">
          <a href={new_password_reset_path} className="link-forget-password">Forgot Password</a>
        </div>
      </form>
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
          onClick={this.handleLandlordCheckMR}
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
    const { signed = false, active } = this.state;
    const { services } = this.props;

    return (
      <form
        className={`submit-new-mr ${active.toLowerCase()}-content`}
        id="submit-new-mr"
        onSubmit={this.submitNewMR}
      >
        <div className="type-service">
          <select
            className="type-service"
            id="select-type-service"
            ref={(elem) => this.service = elem}
          >
            <option value=''>What type of service do you require?</option>
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
            placeholder="Please tell us the address."
            ref={(elem) => this.address = elem}
            onChange={getAddressOfGoogleMap}

          />
        </div>
        <div className="button-group login-button new-mr-button">
          { active !== 'Agent' &&
            <button
              type="button"
              className="btn btn-back"
              onClick={() => this.setState({step: 'home'})}
            >
              Back
            </button>
          }
          <button
            type="submit"
            className="btn btn-summit"
          >
            Submit
          </button>
        </div>
      </form>
    )
  },

  homeActionTitle() {
    const {active = 'tenant', signed} = this.state;
    return (
      <div className="home-action-title">
        <button
          className={
            "tenant-title "
            + (active === 'Tenant' ? 'active ' : !signed ? '' : 'hidden ')
            + (signed ? 'signed ' : '')
          }
          onClick={() => this.chooseUser('Tenant')}
        >
          {!signed && "For "}Tenants
        </button>
        <button
          className={
            "trady-title "
            + (active === 'Trady' ? 'active ' : !signed ? '' : 'hidden ')
            + (signed ? 'signed ' : '')
          }
          onClick={() => this.chooseUser('Trady')}
        >
          {!signed && "For "}Tradies
        </button>
        <button
          className={
            "landlord-title "
            + (active === 'Landlord' ? 'active ' : !signed ? '' : 'hidden ')
            + (signed ? 'signed ' : '')
          }
          onClick={() => this.chooseUser('Landlord')}
        >
          {!signed && "For "}Landlords
        </button>
        <button
          className={
            "agent-title "
            + (active === 'Agent' ? 'active ' : !signed ? '' : 'hidden ')
            + (signed ? 'signed ' : '')
          }
          onClick={() => this.chooseUser('Agent')}
        >
          {!signed && "For "}Agents
        </button>
      </div>
    )
  },

  homeActionContent() {
    const { active, step } = this.state;
    let render = null;

    switch (active) {
      case 'Tenant':
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
      case 'Trady':
        if (step === 'login') {
          render = this.homeActionForTradyLogin;
        }
        if (step === 'home') {
          render = this.homeActionForTrady;
        }
        if (step === 'mobile-button') {
          render = this.homeActionForTradyMobile;
        }
        break;
      case 'Landlord':
        if (step === 'home' || step ==='login') {
          render = this.homeActionForLandlord;
        }
        if (step === 'mobile-button') {
          render = this.homeActionForLandlordMobile;
        }
        break;
      case 'Agent':
        if (step === 'home' || step ==='login') {
          render = this.homeActionForAgent;
        }
        if (step === 'newMR') {
          render = this.homeActionForSubmitNewMR;
        }
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
      case 'Tenant': showHowItWork = this.howItWorkForTenant; break;
      case 'Agent': showHowItWork = this.howItWorkForAgent; break;
      case 'Trady': showHowItWork = this.howItWorkForTrady; break;
      case 'Landlord': showHowItWork = this.howItWorkForLandlord; break;
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
            <input type="hidden" id="refresh" value="no" />
          </div>
        </div>
      </div>
    )
  }
});
