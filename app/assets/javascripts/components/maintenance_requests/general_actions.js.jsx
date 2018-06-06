var GeneralAction = React.createClass({
  getInitialState() {
    const {images} = this.props;
    const {
      profile = '',
    } = images && images[0] || {};

    return {
      role: this.props.current_role.role,
      name: this.props.user_name,
      avatar: profile,
    };
  },

  logout (e) {
    e.preventDefault();
    const self = this;

		return $.ajax({
			type: 'DELETE',
			url: this.props.logout_path,
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
      success: (res) => {

      },
      error: (err) => {

      }
    })
  },

  search(e) {
    e.preventDefault();
    const self = this;

		return $.ajax({
			type: 'GET',
			url: '/search',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: {
        query: this.searchText.value || '',
      },
			success: function(res){
				
			},
			error: function(err) {
				
			}
		});
  },

  generateSearchBar() {
    return (
      <div className="search hidden-search">        
        <form className="form-search" onSubmit={this.search}>
          <button type="submit" className="btn-search">
            <i className="fa fa-search"></i>
          </button>
          <input
            id="query"
            type="search"
            ref={e => this.searchText = e}
            className="input-search"
            placeholder="Search..."
            defaultValue={this.props.searchText || ''}
          />
        </form>
      </div>
    )
  },

  generateActionButton(text, link, iconClass) {
    return (
      <div className="user-action-link" onClick={() => {
        triggerSpinner(true); // show spinner
        this[text].click();
      }}>
        <a href={link} className="display-none" ref={e => this[text] = e} />
        <span className={`icon ${iconClass}`}></span>
        <span className="action-text">{text}</span>
      </div>
    )
  },

  renderActionsForLandlord() {
    return (
      <div className="general-landlord-actions general-actions">
        {
          this.generateActionButton(
            'My Maintenance Requests',
            '/landlord_maintenance_requests',
            'fa fa-list'
          )
        }
      </div>
    )
  },

  renderActionsForAgent() {
    return (
      <div className="general-agent-actions general-actions">
        {
          this.generateActionButton(
            'Create Maintenance Request',
            '/',
            'fa fa-pencil-square-o'
          )
        }
        {
          this.generateActionButton(
            'My Maintenance Requests',
            '/agent_maintenance_requests',
            'fa fa-list'
          )
        }
        {
          this.generateActionButton(
            'Agent Account Settings',
            this.props.edit_agent,
            'fa fa-user'
          )
        }
      </div>
    )
  },

  renderActionsForAgencyAdmin() {
    return (
      <div className="general-agency-admin-actions general-actions">
        {
          this.generateActionButton(
            'Create Maintenance Request',
            '/',
            'fa fa-pencil-square-o'
          )
        }
        {
          this.generateActionButton(
            'My Maintenance Requests',
            '/agency_admin_maintenance_requests',
            'fa fa-list'
          )
        }
        {
          this.generateActionButton(
            'Agency Account Settings',
            this.props.edit_agency,
            'fa fa-cog'
          )
        }
        {
          this.generateActionButton(
            'Agency Admin Account Settings',
            this.props.edit_agency_admin,
            'fa fa-user'
          )
        }
      </div>
    )
  },

  renderActionsForTrady() {
    const {jfmo_participant} = this.props;
    return (
      <div className="general-trady-actions general-actions">
        {
          this.generateActionButton(
            'My Maintenance Requests',
            '/trady_maintenance_requests',
            'fa fa-list'
          )
        }
        {
          this.generateActionButton(
            'Trady Account Settings',
            this.props.edit_trady,
            'fa fa-user'
          )
        }
        { jfmo_participant &&
          this.generateActionButton(
            'Service Fee Receipts',
            '/receipts',
            'fa fa-list'
          )
        }
      </div>
    )
  },

  renderActionsForTenant() {
    return (
      <div className="general-tenant-actions general-actions">
        {
          this.generateActionButton(
            'Create Maintenance Request',
            '/',
            'fa fa-pencil-square-o'
          )
        }
        {
          this.generateActionButton(
            'My Maintenance Requests',
            '/tenant_maintenance_requests',
            'fa fa-list'
          )
        }
        {
          this.generateActionButton(
            'Tenant Account Settings',
            this.props.edit_tenant,
            'fa fa-user'
          )
        }
      </div>
    )
  },

  renderActions() {
    switch (this.state.role) {
      case 'AgencyAdmin':
        return this.renderActionsForAgencyAdmin();
      case 'Agent':
        return this.renderActionsForAgent();
      case 'Trady':
        return this.renderActionsForTrady();
      case 'Tenant':
        return this.renderActionsForTenant();
      case 'Landlord':
        return this.renderActionsForLandlord();
      default:
        return '';
    }
  },

  renderUserAvatar() {
    return (
      <div className="user-avatar flexbox">
        <div className="user-avatar-left">
          <AvatarImage className="general-user-image" imageUri={this.state.avatar} />
        </div>
        <div className="user-avatar-right flexbox flex-column justify-center align-center">
          <div className="user-name">{this.state.name}</div>
          <button type="button" className="sign-out-button" onClick={this.logout}>Sign Out</button>
        </div>
      </div>
    )
  },

  render() {
    const dontShowGeneral = this.state.role === 'Landlord' && this.props.listMR;
    return (
      <div className="user-general-action" id="user-general-action">
        {this.renderUserAvatar()}
        {/* {this.props.showSearchBar && this.generateSearchBar()} */}
        {<div className="general-action-title">General</div>}
        {this.renderActions()}
      </div>
    )
  }
})
