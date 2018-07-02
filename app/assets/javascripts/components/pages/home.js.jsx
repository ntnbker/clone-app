var HomeComponent = React.createClass({
  getInitialState: function() {
    const { current_user, role, email_role } = this.props;
    const roleUsed = role || email_role;
    const step = this.detectStepFromRole(role, email_role);

    return {
      active: !roleUsed ? '' : roleUsed === 'AgencyAdmin' ? 'Agent' : roleUsed,
      step,
      signed: !!current_user,
      rolePicked: roleUsed || 'Tenant',
      user: current_user,
      focusEmail: false,
      focusPassword: false,
			suggestions: [],
			selectedAddress: ''
    };
  },

  detectStepFromRole(role, email_role) {
    if (!role && email_role) {
      return 'login';
    }
    return !role || role === 'Tenant'
              ? 'home'
              : role === 'Landlord' || role === 'Trady'
                ? 'mobile-button'
                : 'newMR';
  },

  chooseUser(user) {
    $('html, body').animate({
        scrollTop: $(this.homeForm).offset().top
    }, 500);
    if (this.state.active !== user && !this.state.signed) {
      const step = user === 'Tenant' || user === 'Trady' ? 'home' : 'login';
      this.setState({active: user, step, rolePicked: user, error: ''});
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

    const self = this;

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
        if (res && res.error) {
          self.setState({ error: res.error });
          // Need to remove the password if there is an error
          self.password.value = '';
        }
      },
      error: function(err) {

      },
    })
  },

	getAddressesFromGoogleMap() {
		const addressInput = this.address.value;
		var options = {types: ['address'], componentRestrictions: {country: 'au'}};
		const self = this;
		if (!addressInput) return self.setState({suggestions: []});

    var service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: addressInput, ...options }, (places, status) => {
			if (status != google.maps.places.PlacesServiceStatus.OK) {
				return self.setState({suggestions: []});
			}
			self.setState({suggestions: places.map(({description}) => description)});
		});
	},

	chooseAddress(place) {
		this.setState({selectedAddress: place, suggestions: []});
		this.address.value = place;
	},

  submitNewMR(e) {
    e.preventDefault();
    const { rolePicked } = this.state;
    const self = this;
    const tradie         = this.service && this.service.value || '';
    const address        = this.address && this.address.value;
		
		if (self.state.selectedAddress !== this.address.value) {
			return this.setState({error: 'Please choose an address from list'});
		}

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

  removeActive() {
    $('html, body').animate({
      scrollTop: $(this.mainPage).offset().top,
    }, 500);

    this.setState({active: ''});
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
          <img src={this.props.pen_img} alt=""/>
          <h4>Maintenance Requested</h4>
          <p>Receive Maintenance Requests in a centralized app</p>
        </div>
        <div className="three columns">
          <img src={this.props.letter_img} alt=""/>
          <h4>Easily action property maintenance requests</h4>
          <p>Quickly communicate with your agent on how maintenance should be handled</p>
        </div>
        <div className="three columns">
          <img src={this.props.note_3_img} alt=""/>
          <h4>Receive multiple competative quotes</h4>
          <p>Quickly request quotes from multiple tradies to receive competative prices</p>
        </div>
        <div className="three columns">
          <img src={this.props.enjoy_img} alt=""/>
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
          <img src={this.props.pen_img} alt=""/>
          <h4>Quickly organize maintenance requests</h4>
          <p>Instantly deal with maintenance requests submitted by tenants</p>
        </div>
        <div className="three columns">
          <img src={this.props.time_money_img} alt=""/>
          <h4>Time is money easily increase your productivity</h4>
          <p>With a just few clicks you can make sure the job is completed</p>
        </div>
        <div className="three columns">
          <img src={this.props.location_img} alt=""/>
          <h4>Track maintenance status</h4>
          <p>Automated reminders unsure jobs are progressing</p>
        </div>
        {/*<div className="three columns">
          <img src="/icons/notes.png" alt=""/>
          <h4>Increase revenue</h4>
          <p>Increase renvenue through out rebate program and Increased productivity</p>
        </div>*/}

      </div>
    )
  },

  howItWorkForTrady() {
    return (
      <div className="row how-it-works">
        <div className="three columns">
          <img src={this.props.pen_img} alt=""/>
          <h4>Receive High Quality Job Leads</h4>
          <p>Receive maintenance work from property and strata managers</p>
        </div>
        <div className="three columns">
          <img src={this.props.notepad_12_img} alt=""/>
          <h4>Easily track job information and schedule jobs</h4>
          <p>Easily organize job communications and appointments</p>
        </div>
        <div className="three columns">
          <img src={this.props.receipt_img} alt=""/>
          <h4>Easily create invoices or upload your own</h4>
          <p>Easily submit invoices. With Automated invoice reminders. We help make sure you get paid</p>
        </div>
        <div className="three columns">
          <img src={this.props.notes_img} alt=""/>
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
          <img src={this.props.pen_img} alt=""/>
          <h4>Maintenance requested</h4>
          <p>Fill in the Maintenance form and submit the request</p>
        </div>
        <div className="three columns">
          <img src={this.props.letter_img} alt=""/>
          <h4>Maintenance actioned</h4>
          <p>Sit back, and let us sort out the maintenance for you!</p>
        </div>
        <div className="three columns">
          <img src={this.props.location_img} alt=""/>
          <h4>Track Maintenance Status</h4>
          <p>Get updates on your maintenance request is up or check online</p>
        </div>
        <div className="three columns">
          <img src={this.props.enjoy_img} alt=""/>
          <h4>Maintenance complete</h4>
          <p>Enjoy a stress free process to maintain your home</p>
        </div>
      </div>
    )
  },

  homeActionForAgent() {
    return (
      <div className="agent-content">
        {this.loginRender()}
      </div>
    )
  },

  homeActionForLandlordMobile() {
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
    return (
      <div className="landlord-content">
        {this.loginRender()}
      </div>
    )
  },

  homeActionForTradyLogin() {
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
        <p className="text-center">Or</p>
        <button
          type="button text-center"
          className="btn"
          onClick={() => this.redirectNewPath('/tradie_term_agreements/new')}
        >
          Join Network & Get Free Leads
        </button>
      </div>
    )
  },

  loginRender() {
    const { active, focusEmail, focusPassword, error, rolePicked } = this.state;
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
                onChange={() => this.setState({rolePicked: 'Agent', error: ''})}
                defaultChecked={rolePicked !== 'AgencyAdmin'}
              />
              <span className="radio-checkmark"></span>
            </label>
            <label className="radio-option">Agency Administrator
              <input
                type="radio"
                name="role-picked"
                onChange={() => this.setState({rolePicked: 'AgencyAdmin', error: ''})}
                value="AgencyAdmin"
                defaultChecked={rolePicked === 'AgencyAdmin'}
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
              onChange={() => this.setState({error: ''})}
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
              onChange={() => this.setState({error: ''})}
              ref={(elem) => this.password = elem}
            />
          </div>
          { error && <div className="home-error">{error}</div> }
        </div>
        <div className="button-group login-button">
          { showBackButton &&
            <button
              type="button"
              className="btn btn-back"
              onClick={() => this.setState({step: 'home', error: ''})}
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
    const { signed = false, active, suggestions, error } = this.state;
    const { services } = this.props;
    const showSuggestion = !!suggestions.length;

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
            // id="pac-input"
            className={error ? 'has-error' : ''}
            placeholder="Please tell us the address."
            ref={(elem) => this.address = elem}
            onBlur={() => setTimeout(() => this.setState({suggestions: []}), 50)}
            onChange={() => {this.setState({error: ''}); this.getAddressesFromGoogleMap()}}
          />
          {showSuggestion && 
            <div className="suggestion-address">
              {suggestions.map((place, index) => (
                <div 
                  className="place-autocomplete" 
                  key={index}
                  onClick={() => this.chooseAddress(place)}
                >{place}</div>
              ))}
            </div> 
          }
        </div>
        { error && <div className="home-error">{error}</div>}
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
            "tenant-title " + (!active ? '' : active === 'Tenant' ?  'active' : 'hidden ')
          }
          disabled={!!active}
          onClick={() => this.chooseUser('Tenant')}
        >
          {active === 'Tenant' ? "Signing in as" : "I'm a"} Tenant
        </button>
        <button
          className={
            "trady-title " + (!active ? '' : active === 'Trady' ?  'active' : 'hidden ')
          }
          disabled={!!active}
          onClick={() => this.chooseUser('Trady')}
        >
          {active === 'Trady' ? "Signing in as" : "I'm a"} Tradie
        </button>
        <button
          className={
            "landlord-title " + (!active ? '' : active === 'Landlord' ?  'active' : 'hidden ')
          }
          disabled={!!active}
          onClick={() => this.chooseUser('Landlord')}
        >
          {active === 'Landlord' ? "Signing in as" : "I'm a"} Landlord
        </button>
        <button
          className={
            "agent-title " + (!active ? '' : active === 'Agent' ?  'active' : 'hidden ')
          }
          disabled={!!active}
          onClick={() => this.chooseUser('Agent')}
        >
          {active === 'Agent' ? "Signing in as" : "I'm an"} Agent
        </button>
      </div>
    )
  },

  homeActionContent() {
    const { active, step, signed } = this.state;
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
    return active &&
      <div className="home-action-content">
        <div className="action-content">{render && render()}</div>
        {
          !signed &&
          <div className="choose-other-role">
            <button onClick={this.removeActive}>
              Not a {(active === 'Trady' ? 'Tradie' : active).toLowerCase()} click here
            </button>
          </div>
      }
      </div>
  },

  renderHowItWork() {
    const { active } = this.state;
    let showHowItWork = null;
    switch (active) {
      case 'Tenant': showHowItWork = this.howItWorkForTenant; break;
      case 'Agent': showHowItWork = this.howItWorkForAgent; break;
      case 'Trady': showHowItWork = this.howItWorkForTrady; break;
      case 'Landlord': showHowItWork = this.howItWorkForLandlord; break;
      default: showHowItWork = () => '';
    }

    return (
      <div className="main">
        {showHowItWork()}
      </div>
    )
  },

  renderHomeAction() {
    const {active, signed} = this.state;

    return (
      <div className="home-action" ref={e => this.homeForm = e}>
        {!active && <h3 className="choose-role-title text-center">Please choose one.</h3>}
        {!signed && this.homeActionTitle()}
        {this.homeActionContent()}
      </div>
    )
  },

  render: function() {
    return (
      <div className="pages" ref={e => this.mainPage = e}>
        <div className="background-image" />
        <div className="home-content">
          <div className="header">
            <div className="home-logo">
              <AvatarImage
                className="home-logo"
                imageUri={this.props.logo_img}
                defaultImage={this.props.logo_img}
                alt="logo"
               />
              <h3>MaintenanceApp</h3>
            </div>
            <div id="home-title" className="home-title">Always getting things done.</div>
            {this.renderHowItWork()}
            {this.renderHomeAction()}
            <input type="hidden" id="refresh" value="no" />
          </div>
        </div>
      </div>
    )
  }
});
