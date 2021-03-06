function renderError(error) {
  return <p id="errorbox" className="error">{error && error[0] || ''}</p>;
}

var SideBarMobile = React.createClass({
  getInitialState: function() {
    return {
      showAction: false,
      showContact: false,
      showGeneral: false,
    };
  },

  show: function(key) {
    const height = $( window ).height();
    if (key == 'general-action') {
      this.setState({showGeneral: true});
      return $('.sidebar').addClass('visible');
    }
  },

  close: function() {
    if (!!this.state.showGeneral) {
      this.setState({showGeneral: false});
    }
    $('.sidebar').removeClass('visible');
  },

  checkClose(e) {
    const self = this;
    const {className} = e.target;
    dontCloseMe = !!DONT_CLOSE_WHEN_CLICK_ME_LIST.filter(element => className.includes(element))[0];

    if (!dontCloseMe && self.state.showGeneral) {
      e.target.click && e.target.click();
      self.close();
    }
  },

  componentDidMount: function() {
    const self = this;
    $(document).on('click.sidebar', this.checkClose);
    $(document).on('touchstart.sidebar', this.checkClose);
  },

  componentWillUnmount() {
    $(document).unbind('click.sidebar');
    $(document).unbind('touchstart.sidebar');
  },

  render: function() {
    const {showContact, showAction} = this.state;
    return (
      <div className="dontprint">
        <div className="sidebar-mobile">
          <div className="fixed">
            {/* <button
              id="contact" data-intro="Select 'Contact' to call or message." data-position="top"
              className={"contact button-default " + (showContact && 'active')}
              onClick={(key) => this.show('contact')}
            >
              CONTACT MENU
            </button>
            <button
              data-intro="Select 'Action' to action the maintenance request." data-position="top"
              className={"actions button-default " + (showAction && 'active')}
              onClick={(key) => this.show('action')}
            >
              ACTIONS MENU
            </button> */}
            <button
              data-intro="Select 'Action' to action the maintenance request." data-position="top"
              className={"button-default show-sidebar-menu " + (this.state.showGeneral && 'active')}
              onClick={(key) => this.show('general-action')}
            >
              MENU
            </button>
            <div className="background" />
          </div>
        </div>
        {/* <div className="action-mobile">
          <ActionMobile
            close={this.close}
            hasTenant={this.props.hasTenant}
            landlord={this.props.landlord}
            onModalWith={(modal) => this.props.onModalWith(modal)}
            viewItem={this.props.viewItem}
          />
          <ContactMobile
            close={this.close}
            tenants={this.props.tenants}
            landlord={this.props.landlord}
            assigned_trady={this.props.assigned_trady}
            onModalWith={(modal) => this.props.onModalWith(modal)}
          />
        </div> */}
      </div>
    );
  }
});

var MaintenanceRequest = React.createClass({
  getInitialState: function() {
    const {work_order_appointments, quote_appointments, landlord_appointments} = this.props;
    const comments = [],
          quoteComments = [],
          landlordComments = [];
    work_order_appointments.map((appointment, key) => {
      if(appointment.comments.length > 0) {
        comments.unshift(appointment.comments[0]);
      }
    });
    quote_appointments.map((appointment, key) => {
      if(appointment.comments.length > 0) {
        quoteComments.unshift(appointment.comments[0]);
      }
    });
    landlord_appointments.map((appointment, key) => {
      if(appointment.comments.length > 0) {
        landlordComments.unshift(appointment.comments[0]);
      }
    });

    return {
      modal                      : "",
      quote                      : null,
      invoice                    : null,
      isModal                    : false,
      statusItem                 : null,
      assignEmail                : null,
      appointment                : null,
      quote_request              : null,
      comments                   : comments,
      logs                       : this.props.logs,
      invoice_pdf_file           : null,
      access_contact             : null,
      access_contacts            : this.props.access_contacts || [],
      agency                     : this.props.agency,
      property                   : this.props.property,
      status                     : this.props.status,
      tenants                    : this.props.tenants || [],
      tradies                    : this.props.tradies,
      gallery                    : this.props.gallery,
      quoteComments              : quoteComments,
      landlord                   : this.props.landlord,
      trady                      : this.props.hired_trady || null,
      invoices                   : this.props.invoices,
      landlordComments           : landlordComments,
      invoice_pdf_files          : this.props.pdf_files,
      quote_requests             : this.props.quote_requests,
      trady_conversation         : this.props.trady_conversation,
      maintenance_request        : this.props.maintenance_request,
      tenants_conversation       : this.props.tenants_conversation,
      landlords_conversation     : this.props.landlords_conversation,
      instruction                : this.props.instruction || {},
      tradies_with_quote_requests: this.props.tradies_with_quote_requests,
      notification: {
        title: "",
        content: "",
        bgClass: "",
        reopenModal: '',
      },
    };
  },

  isClose: function(e) {
    if(this.state.isModal == true) {
      this.setState({
        isModal: false,
        modal: "",
      });
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    var div = document.getElementsByClassName('modal-backdrop in')[0];
    if(div){
      div.parentNode.removeChild(div);
    }
  },

  onModalWith: function(modal) {
    this.setState({
      modal: modal,
      isModal: true,
    });
  },

  viewItem: function(key, item) {
    switch(key) {
      case 'viewQuote':
      case 'viewConfirmQuote':
      case 'viewQuoteMessage':
      case 'confirmForwardLandlord': {
        this.setState({
          quote: item
        });

        this.onModalWith(key);
        break;
      }

      case 'viewPhoto': {
        this.setState({
          quote_images: item,
        });

        this.onModalWith(key);
        break;
      }

      case 'viewQuoteRequestMessage':
      case 'confirmStopQuoteReminder': {
        this.setState({
          quote_request: item,
        });

        this.onModalWith(key);
        break;
      }

      case 'voidInvoice':
      case 'viewInvoice': {
        this.setState({
          invoice: item
        });

        this.onModalWith(key);
        break;
      }

      case 'viewPdfInvoice': {
        this.setState({
          invoice_pdf_file: item
        });

        this.onModalWith(key);
        break;
      }

      case 'viewAppointment': {
        this.setState({
          appointment: item
        });
        this.onModalWith(key);
        break;
      }

      case 'confirmAssign': {
        this.setState({
          assignEmail: item
        });
        this.onModalWith(key);
        break;
      }

      case 'confirmUpdateStatus': {
        this.setState({
          statusItem: item
        });
        this.onModalWith(key);
        break;
      }

      case 'splitMR':
			case 'addPhoto':
      case 'addTenant':
      case 'approveJob':
			case 'duplicateMR':
      case 'justFindMeOne':
      case 'editAvailability':
      case 'confirmcancelTrady':
      case 'editMaintenanceRequest': {
        this.onModalWith(key);
        break;
      }

      case 'viewTrady': {
        this.setState({
          trady: item
        });
        this.onModalWith(key);
        break;
      }

      case 'removeTenant':
      case 'editTenant': {
        this.setState({
          tenant: item
        })
        this.onModalWith(key);
        break;
      }

      case 'showTenants': {
        this.setState({
          tenant: null
        })
        this.onModalWith(key);
        break;
      }

      case 'editAddress':
      case 'confirmEditAddress': {
        this.setState({
          addressTemp: item,
          errorAddress: ''
        })
        this.onModalWith(key);
        break;
      }

      case 'errorEditAddress': {
        this.setState({
          errorAddress: item
        })
        this.onModalWith('editAddress');
        break;
      }

      case 'addAccessContact':
      case 'editAccessContact':
      case 'showAccessContacts':
      case 'removeAccessContact': {
        this.setState({
          access_contact: item
        })
        this.onModalWith(key);
        break;
			}
			
			case 'deletePhoto': {
				this.setState({
					photo: item
				})

				this.onModalWith(key);
				break;
			}

      default: {
        break;
      }
    }
  },

  addAskLandlord: function(params, callback){
    const {logs} = this.state;
    var self = this;

    $.ajax({
      type: 'POST',
      url: '/create-and-notify-landlord',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        self.setState({
          logs: logs,
          landlord: res.landlord,
          notification: {
            bgClass: "bg-success",
            title: "Ask landlord for instructions",
            content: "Thank you, the maintenance request has been emailed to the landlord. We will notify you with the landlord's instructions when he/she responds.",
          }
        });
        self.isClose();
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Ask landlord for instructions",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  editAskLandlord: function(params, callback) {
    const {logs} = this.state;
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/update-and-notify-landlord',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        self.setState({
          logs: logs,
          landlord: res.landlord,
          notification: {
            title: "Ask landlord for instructions",
            content: "Thank you, the maintenance request has been emailed to the landlord. We will notify you with the landlord's instructions when he/she responds.",
            bgClass: "bg-success",
          },
        });
        self.isClose();
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Ask landlord for instructions",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  addLandlord: function(params, callback) {
    const {landlord} = this.state;
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/landlords',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        self.setState({
          landlord: res.landlord,
          notification: {
            title: landlord ? "Change Landlord" : "Add Landlord",
            content: landlord ? 'You have successfully changed the landlord for the property "Address".' : "Your Landlord has been added successfully!",
            bgClass: "bg-success",
          },
        });
        self.isClose();
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Add Lanlord",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  addTenant: function(params, callback) {
    const {tenant, tenants} = this.state;
    var self = this;
    $.ajax({
      type: tenant ? 'PUT' : 'POST',
      url: '/tenants' + (tenant ? '/' + tenant.id : ''),
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        let updatedTenants = tenants;

        if (!tenant) {
          updatedTenants.push(res.tenant);
        } else {
          updatedTenants = tenants.map((tenantState) => {
            return tenantState.id === res.tenant.id ? res.tenant : tenantState;
          });
        }

        self.setState({
          tenants: updatedTenants,
          notification: {
            title: tenant ? "Edit Tenant" : "Add Tenant",
            content: res.message,
            bgClass: "bg-success",
            reopenModal: 'showTenants',
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: (tenant ? "Edit" : "Add") + " Tenant",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  removeTenant: function(callback) {
    var self = this;
    const {tenant, maintenance_request, tenants} = this.state;
    $.ajax({
      type: 'DELETE',
      url: '/tenants/' + tenant.id,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: {
        tenant: {
          id: tenant.id,
          maintenance_request_id: maintenance_request.id,
        }
      },
      success: function(res){
        const filterTenant = tenants.filter(te => te.id !== tenant.id);
        self.setState({
          tenants: filterTenant,
          notification: {
            title: "Remove Tenant",
            content: res.message,
            bgClass: "bg-success",
            reopenModal: 'showTenants',
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Remove Tenant",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },
  
  addAccessContact: function (params, callback) {
    const { access_contact, access_contacts } = this.state;
    var self = this;
    $.ajax({
      type: access_contact ? 'PUT' : 'POST',
      url: '/access_contacts' + (access_contact ? '/' + access_contact.id : ''),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function (res) {
        if (res.errors) {
          return callback(res.errors);
        }
        let updatedAccessContacts = access_contacts;

        if (!access_contact) {
          updatedAccessContacts.push(res.access_contact);
        } else {
          updatedAccessContacts = access_contacts.map((a_c_state) => {
            return a_c_state.id === res.access_contact.id ? res.access_contact : a_c_state;
          });
        }

        self.setState({
          access_contacts: updatedAccessContacts,
          notification: {
            title: access_contact ? "Edit Access Contact" : "Add Access Contact",
            content: res.message,
            bgClass: "bg-success",
            reopenModal: 'showAccessContacts',
          },
        });
        self.onModalWith('notification');
      },
      error: function (err) {
        self.setState({
          notification: {
            title: (access_contact ? "Edit" : "Add") + " Access Contact",
            content: err.responseText,
            bgClass: "bg-error",
          }
        });
        self.onModalWith('notification');
      }
    });
  },

  removeAccessContact: function (callback) {
    var self = this;
    const { access_contact, maintenance_request, access_contacts } = this.state;
    $.ajax({
      type: 'DELETE',
      url: '/access_contacts/' + access_contact.id,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: {
        access_contact: {
          id: access_contact.id,
          maintenance_request_id: maintenance_request.id,
        }
      },
      success: function (res) {
        const filterAccessContact = access_contacts.filter(te => te.id !== access_contact.id);
        self.setState({
          access_contacts: filterAccessContact,
          notification: {
            title: "Remove Access Contact",
            content: res.message,
            bgClass: "bg-success",
            reopenModal: 'showAccessContacts',
          },
        });
        self.onModalWith('notification');
      },
      error: function (err) {
        self.setState({
          notification: {
            title: "Remove Access Contact",
            content: err.responseText,
            bgClass: "bg-error",
          }
        });
        self.onModalWith('notification');
      }
    });
  },

  editLandlord: function(params, callback) {
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/update-landlord',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        self.setState({
          landlord: res,
          notification: {
            title: "Edit Lanlord",
            content: "Your Landlord has been updated successfully!",
            bgClass: "bg-success",
          },
        });
        self.isClose();
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Edit Lanlord",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  sendMessageLandlord: function(params, callback) {
    const self = this;
    params.message.role = this.props.current_user_role.role;
    $.ajax({
      type: 'POST',
      url: '/messages',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        const landlords_conversation = !!self.state.landlords_conversation ? self.state.landlords_conversation : [];
        landlords_conversation.push(res);

        self.setState({
          landlords_conversation: landlords_conversation,
        });
        callback();
      },
      error: function(err) {
        self.setState({notification: {
          title: "Message Landlord",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  sendMessageTenant: function(params, callback) {
    const self = this;
    params.message.role = this.props.current_user_role.role;
    $.ajax({
      type: 'POST',
      url: '/messages',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', params.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        const tenants_conversation = !!self.state.tenants_conversation ? self.state.tenants_conversation : [];
        tenants_conversation.push(res);
        self.setState({
          tenants_conversation: tenants_conversation
        });
        callback();
      },
      error: function(err) {
        self.setState({notification: {
          title: "Message Tenants",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  sendMessageTrady: function(params, callback) {
    const {authenticity_token, maintenance_request, current_user_role} = this.props;
    const self = this;
    params.message.maintenance_request_id = maintenance_request.id;
    params.message.role = current_user_role.role;
    $.ajax({
      type: 'POST',
      url: '/messages',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        const trady_conversation = !!self.state.trady_conversation ? self.state.trady_conversation : [];
        trady_conversation.push(res);
        self.setState({
          trady_conversation: trady_conversation
        });
        callback();
      },
      error: function(err) {
        self.setState({notification: {
          title: "Message Trady",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  sendMessageQuote: function(params, callback) {
    const self = this;
    params.message.role = this.props.current_user_role.role;
    $.ajax({
      type: 'POST',
      url: '/quote_messages',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        let quote = self.state.quote
        quote.conversation = quote.conversation ? quote.conversation : {};
        const messages = !!quote.conversation && quote.conversation.messages ? quote.conversation.messages : [];
        messages.push(res);
        quote.conversation.messages = messages;
        self.setState({
          quote: quote
        });
        callback();
      },
      error: function(err) {
        self.setState({notification: {
          title: "Message Trady",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  sendMessageQuoteRequest: function(params, callback) {
    const self = this;
    params.message.role = this.props.current_user_role.role;
    $.ajax({
      type: 'POST',
      url: '/quote_request_messages',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        let quote_request = self.state.quote_request
        quote_request.conversation = quote_request.conversation ? quote_request.conversation : {};
        const messages = !!quote_request.conversation && quote_request.conversation.messages ? quote_request.conversation.messages : [];
        messages.push(res);
        quote_request.conversation.messages = messages;
        self.setState({
          quote_request: quote_request
        });
        callback();
      },
      error: function(err) {
        self.setState({notification: {
          title: "Message Trady",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  updateStatusQuote: function(params) {
    const self = this;
     $.ajax({
      type: 'POST',
      url: '/quote_status',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.isClose();
        if (Array.isArray(res)) {
          self.setState({
            quote_requests: res
          });
        }
        if(params.status == 'Approved') {
          self.setState({notification: {
            title: "Accept Quote",
            content: "You have accepted the quote.",
            bgClass: "bg-success",
          }});
          self.onModalWith('notification');
        }else if(params.status == 'Declined'){
          self.setState({notification: {
            title: "Decline Quote",
            content: "You have declined the quote.",
            bgClass: "bg-success",
          }});
          self.onModalWith('notification');
        }
      },
      error: function(err) {

      }
    });
  },

  sendEmailLandlord: function(params, quote) {
    const self = this;
    $.ajax({
      type: 'POST',
      url: '/forward_quote',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        quote.forwarded_to_landlord = res.forwarded_to_landlord;
        self.setState({
          quote: quote,
          notification: {
            title: "Forward Quote To Landlord",
            content: "You have successfully emailed the quote to the landlord.",
            bgClass: "bg-success",
          }
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Forward Landlord",
          content: "Send emaid is error!",
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  updateQuotes: function(quote) {
    const {quote_requests} = this.state;
    let data = quote_requests.map((item, key) => {
      item.forwarded_to_landlord = quote.id == item.id ? quote.forwarded_to_landlord : item.forwarded_to_landlord;
      return item
    });

    this.setState({
      quote_requests: data
    });
  },

  requestQuote: function(params, callback) {
    const {logs} = this.state;
    const self = this;
    const tradies_with_quote_requests = this.state.tradies_with_quote_requests;
    let flag = false;
    const hasAssiged = !!this.props.assigned_trady;

    tradies_with_quote_requests.map((item, index) => {
      if(params.trady.trady_id == item.id && !hasAssiged) {
        flag = true;
      }
    });

    if(!!flag) {
      self.setState({
        notification: {
          bgClass: "bg-error",
          title: "Duplicate Quote Request",
          content: "You have already requested a quote from this tradie for this maintenance request. Please select another tradie if you would like another quote.",
        },
      });
      self.onModalWith('notification');
    }else {
      $.ajax({
        type: 'POST',
        url: '/tradies',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
        },
        data: params,
        success: function(res){
          if (res.errors) {
            return callback(res.errors);
          }
          logs.push(res.log);
          tradies_with_quote_requests.push(params.trady.item);
          self.setState({
            logs: logs,
            trady: res.hired_trady,
            tradies: res.all_tradies,
            tradies_with_quote_requests: tradies_with_quote_requests,
            notification: {
              title: "Quote Request Sent",
              content: 'Thank you, an email has been sent to ' + params.trady.company_name +' requesting a quote for the job. We will notify you once the quote has been received.',
              bgClass: "bg-success",
            },
          });
          self.onModalWith('notification');
        },
        error: function(err) {
          self.setState({notification: {
            title: "Request Quote",
            content: "An error has occured with the quote request",
            bgClass: "bg-error",
          }});
          self.onModalWith('notification');
        }
      });
    }
  },

  editAvailability: function(params, callback) {
    const self = this;
    const { authenticity_token, maintenance_request } = this.props;

    params.maintenance_request_id = maintenance_request.id;

    $.ajax({
      type: 'POST',
      url: '/update_availability_access',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
      },
      data: {
        availability_access: params
      },
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        maintenance_request.availability_and_access = res.availability_and_access;

        self.setState({
          maintenance_request,
          notification: {
            bgClass: "bg-success",
            title: "Edit Availability",
            content: 'Thank you, the availability and access has been updated',
          }
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          bgClass: "bg-error",
          title: "Edit Availability",
          content: err.responseText,
        }});
        self.onModalWith('notification');
      }
    });
  },

  editAddress: function(params, callback) {
    const self = this;
    const { authenticity_token, maintenance_request } = this.props;
    let {property, landlord} = this.state;

    params.maintenance_request_id = maintenance_request.id;

    $.ajax({
      type: 'POST',
      url: '/update_address',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
      },
      data: {
        address: params
      },
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        property.property_address = res.address;
        landlord = res.landlord;
        property.landlord_id = landlord && landlord.id;
        self.setState({
          property,
          landlord,
          notification: {
            bgClass: "bg-success",
            title: "Edit Address",
            content: 'Thank you, the address has been updated.',
          }
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          bgClass: "bg-error",
          title: "Edit Address",
          content: err.responseText,
        }});
        self.onModalWith('notification');
      }
    });
  },

  approveJob: function(params, callback) {
    const self = this;
    const { authenticity_token, maintenance_request } = this.props;

    params.maintenance_request_id = maintenance_request.id;

    $.ajax({
      type: 'POST',
      url: '/pre_approved',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }
        maintenance_request.preapproved_note = res.preapproved_note;

        self.setState({
          maintenance_request,
          notification: {
            bgClass: "bg-success",
            title: "Approve Jobs",
            content: 'Approved',
          }
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          bgClass: "bg-error",
          title: "Approve Jobs",
          content: err.responseText,
        }});
        self.onModalWith('notification');
      }
    });
  },

  sendWorkOrder: function(params, callback) {
    const {logs, quote_requests} = this.state;
    const self = this;
    delete params.item;
    $.ajax({
      type: 'POST',
      url: '/tradies',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          return callback(res.errors);
        }

        logs.push(res.log);
        self.state.maintenance_request.trady_id = !!params.trady ? params.trady.trady_id : res.all_tradies[res.all_tradies.length-1].id;
        if (res.work_order_quote_request) {
          if (quote_requests.some(({id}) => id === res.work_order_quote_request.id) === false) {
            quote_requests.push(res.work_order_quote_request);
          }
        }

        self.setState({
          logs: logs,
          trady: res.hired_trady,
          tradies: res.all_tradies,
          quote_requests,
          notification: {
            title: "Send Work Order",
            content: 'Thank you, a work order has been emailed to ' + params.trady.company_name +'. You will receive an invoice from ' + params.trady.company_name +' once the job has been completed',
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Send Work Order",
          content: "The work order is error" ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  assignToUser: function() {
    const self = this;
    const {maintenance_request, assignEmail} = this.state;
    var params = {
      email: assignEmail,
      maintenance_request_id: maintenance_request.id,
    };

    $.ajax({
      type: 'POST',
      url: '/reassign_to',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({
          notification: {
            title: "Assign Maintenance Request",
            content: "Thank you for reassigning this Maintenance Request.",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Assign Matenance Request",
          content: "An error occured reassigning this maintenance request." ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  editMaintenanceRequest: function(params, callback) {
    const self = this;
        let {maintenance_request} = this.state;

        $.ajax({
          type: 'POST',
          url: '/update_maintenance_request',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
          },
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false,
          data: params,
          success: function(res){
            if (res.errors) {
              return callback(res.errors);
            }
            maintenance_request.service_type = res.service_type;
            maintenance_request.maintenance_heading = res.maintenance_heading;
            maintenance_request.maintenance_description = res.maintenance_description
            self.setState({
              tradies: res.all_tradies,
              maintenance_request: maintenance_request,
              notification: {
                title: "Edit Maintenance Request",
                content: "The Maintenance Request has been updated.",
                bgClass: "bg-success",
              },
            });
            self.onModalWith('notification');
          },
          error: function(err) {
            self.setState({notification: {
              title: "Edit Maintenance Request",
              content: "The Maintenance Request didn't update!" ,
              bgClass: "bg-error",
            }});
            self.onModalWith('notification');
          }
    });
  },

  updateStatusMR: function() {
    const self = this;
    const {maintenance_request, status, statusItem} = this.state;
    const params = {
      action_category: status.action_category,
      maintenance_request_status: statusItem.value,
      maintenance_request_id: maintenance_request.id,
    };

    $.ajax({
      type: 'POST',
      url: '/update_maintenance_request_status',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({
          status: res,
          notification: {
            title: "Update Status",
            content: "Thank you for updating the maintenance request status.",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Update Status",
          content: "The Status of Maintenance Request didn't update!" ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  duplicateMR: function() {
    const self = this;
    const {maintenance_request} = this.state;
    const params = {
      maintenance_request_id: maintenance_request.id,
    };

    $.ajax({
      type: 'POST',
      url: '/duplicate_maintenance_request',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({
          status: res,
          notification: {
            title: "Duplicate Maintenance Request",
            content: "The Maintenance Request has been duplicated.",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Duplicate Maintenance Request",
          content: "The Maintenance Request has been error." ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  splitSubmit: function(params, callback) {
    const self = this;

    $.ajax({
      type: 'POST',
      url: '/split_maintenance_request',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: params,
      success: function(res){
        if (res.errors && res.errors.length) {
          return callback(res);
        }
        self.setState({
          notification: {
            title: "Split Maintenance Request",
            content: "You have successfully split the maintenance request. Please edit the original maintenance request by removing the information that no longer pertains. The split maintenance request(s) will now be listed under new maintenance request(s).",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Split Maintenance Request",
          content: "The Maintenance Request didn't split!" ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  quoteAlreadySent: function() {
    const self = this;
    const { maintenance_request, quote_request } = this.state;
    const { current_user_role } = this.props;

    const params = {
      trady_id: quote_request.trady_id,
      quote_request_id: quote_request.id,
      maintenance_request_id: maintenance_request.id,
      role: current_user_role.role === 'Trady' ? 'Trady' : 'Agent' ,
    };

    $.ajax({
      type: 'POST',
      url: '/quote_sent',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({
          quote_requests: res.quote_requests,
          notification: {
            title: "Quote Already Sent",
            content: "Thank you for marking quote as 'Already Sent'. To keep the work flow automated please upload a photo of the quote, so you may quickly forward the quote to the landlord and keep the automated email reminders for the landlord going.",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Quote Already Sent",
          content: "Quote Already Sent didn't confirm." ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  stopQuoteReminder: function() {
    const self = this;
    const { maintenance_request, quote_request } = this.state;

    const params = {
      trady_id: quote_request.trady_id,
      quote_request_id: quote_request.id,
      maintenance_request_id: maintenance_request.id,
      role: 'Agent' ,
    };

    $.ajax({
      type: 'POST',
      url: '/stop_quote_reminder',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({
          quote_requests: res.quote_requests,
          notification: {
            title: "Stop Quote Reminder",
            content: "Thank you!",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Stop Quote Reminder",
          content: "Something wrong" ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    })
  },

  uploadImage: function(images, callback) {
    if (images.length == 0) {
      return;
    }

    const { quote_request }     = this.state;
    const { current_user_role } = this.props;

    const image = images[0];

    const data = {
      picture: {
        image: JSON.stringify(image),
        quote_request_id      : quote_request.id,
        trady_id              : quote_request.trady_id,
        maintenance_request_id: quote_request.maintenance_request_id,
        role                  : current_user_role.role === 'Trady' ? 'Trady' : 'Agent',
      },
    }

    const self = this;
    $.ajax({
      type: 'POST',
      url: '/quote_image',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: data,
      success: function (res) {
        if (res.error || res.errors) {
          const error = {
            image: [((res.error || res.errors).image || [])[0].replace(/\w+ /, '')]
          };
          return callback(error);
        }
        callback(null, 'You Has Successfully Upload');
        if (res && res.quote_requests) {
          self.setState({ quote_requests: res.quote_requests });
        }
      },
      error: function (err) {

      }
    });
  },

  chooseQuoteRequest: function(quote_request) {
    this.setState({ quote_request });
  },

  markAsPaid: function(invoice, uploaded = false) {
    const self = this;
    const {maintenance_request} = this.state;
    const params = {
      invoice_id: invoice.id,
      invoice_type: 'system_invoice',
      maintenance_request_id: maintenance_request.id,
    };

    if (uploaded) {
      delete params.invoice_id;
      params.uploaded_invoice_id = invoice.id;
      params.invoice_type = 'uploaded_invoice';
    }

    $.ajax({
      type: 'POST',
      url: '/mark_as_paid',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        invoice.paid = true;
        self.setState({
          notification: {
            title: "Mark As Paid",
            content: "Invoice has been marked as scheduled for payment.",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Mark As Paid",
          content: "An error occured marking this invoice as paid." ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  voidInvoice: function(params, callback) {
    const self = this;
    const {current_user} = this.props;
    const {invoice, invoices, invoice_pdf_files} = this.state;
    const isPdf = !!invoice.pdf_url;

    params.current_user_id = current_user && current_user.id;

    $.ajax({
      type: 'POST',
      url: isPdf ? '/void_uploaded_invoice' : '/void_invoice',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return callback(res.errors);
        }

        if (isPdf) {
          self.setState({
            invoice_pdf_files: invoice_pdf_files.map(inv => inv.id === res.uploaded_invoice.id
              ? Object.assign({}, inv, res.uploaded_invoice)
              : inv
            ),
          })
        }

        else {
          self.setState({
            invoices: invoices.map(inv => inv.id === res.invoice.id
              ? Object.assign({}, inv, res.invoice)
              : inv
            ),
          })
        }
        self.setState({
          notification: {
            title: "Void Invoice",
            content: res && res.message || "You have void this invoice.",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Void Invoice",
          content: "An error occured voiding this invoice." ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  cancelWorkOrder: function() {
    const self = this;
    const {maintenance_request, logs} = this.state;
    const params = {
      maintenance_request_id: maintenance_request.id,
    };

    $.ajax({
      type: 'POST',
      url: '/cancel_work_order',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.log) logs.push(res.log);
        self.setState({
          trady: null,
          notification: {
            title: "Cancel Work Order",
            content: "You have now cancelled the work order. Please choose another tradie to complete this maintenance request",
            bgClass: "bg-success",
          },
        });
        self.onModalWith('notification');
      },
      error: function(err) {
        self.setState({notification: {
          title: "Cancel Work Order",
          content: "Cancel Work Order is error" ,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  justFindMeOne: function() {
    const self = this;
    const {maintenance_request, logs} = this.state;
    const params = {
      maintenance_request_id: maintenance_request.id,
    };

    $.ajax({
      type: 'POST',
      url: '/just_find_me_one',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.log) {
          logs.push(res.log);

          self.setState({logs});
        }
        if (res.message) {
          self.setState({
            notification: {
              title: "Just Find Me One",
              content: res.message,
              bgClass: "bg-success",
            },
          });
          self.onModalWith('notification');
        }
        else {
          self.isClose();
        }
      },
      error: function(err) {
        self.setState({notification: {
          title: "Just Find Me One",
          content: err.responseText,
          bgClass: "bg-error",
        }});
        self.onModalWith('notification');
      }
    });
  },

  renderModal: function() {
    if(this.state.isModal) {
      var body = document.getElementsByTagName('body')[0];
      body.className += " modal-open";
      var div = document.getElementsByClassName('modal-backdrop in');

      if(div.length === 0) {
        div = document.createElement('div')
        div.className  = "modal-backdrop in";
        body.appendChild(div);
      }

      switch(this.state.modal) {
        case 'confirm':
          return (
            <ModalConfirm
              close={this.isClose}
              landlord={this.state.landlord}
              property={this.state.property}
              onModalWith={(modal) => this.onModalWith(modal)}
            />
          );

        case 'addAskLandlord':
          return (
            <ModalAddAskLandlord
              close={this.isClose}
              addAskLandlord={this.addAskLandlord}
              authToken={this.props.authenticity_token}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          );

        case 'editAskLandlord':
          return (
            <ModalEditAskLandlord
              close={this.isClose}
              landlord={this.state.landlord}
              editAskLandlord={this.editAskLandlord}
              authToken={this.props.authenticity_token}
              maintenance_request_id={this.state.maintenance_request.id}
              onModalWith={this.onModalWith}
            />
          );

        case 'notification':
          const {notification} = this.state;
					const {reopenModal} = notification;
          return (
            <ModalNotification
              close={reopenModal ? this.viewItem.bind(this, reopenModal) : this.isClose}
              bgClass={this.state.notification.bgClass}
              title={this.state.notification.title}
              content={this.state.notification.content}
            />
          );

        case 'addLandlordSendEmail':
          return (
            <ModalAddLandlord
              close={this.isClose}
              addLandlord={this.addLandlord}
              authToken={this.props.authenticity_token}
              maintenance_request_id={this.state.maintenance_request.id}
              note='Please add a landlord and then press "Forward To Landlord"'
            />
          );

        case 'addLandlord':
          return (
            <ModalAddLandlord
              close={this.isClose}
              landlord={this.state.landlord}
              addLandlord={this.addLandlord}
              authToken={this.props.authenticity_token}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          );

        case 'addTenant':
        case 'editTenant':
          return (
            <ModalAddTenant
              close={this.isClose}
              property={this.state.property}
              tenant={this.state.tenant}
              addTenant={this.addTenant}
              authToken={this.props.authenticity_token}
              viewItem={this.viewItem}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          );

        case 'editLandlord':{
          if(!!this.state.landlord) {
            return (
              <ModalEditLandlord
                close={this.isClose}
                landlord={this.state.landlord}
                editLandlord={this.editLandlord}
                authToken={this.props.authenticity_token}
                onModalWith={this.onModalWith}
                maintenance_request_id={this.state.maintenance_request.id}
              />
            );
          }else {
            return (
              <ModalNotification
                close={this.isClose}
                title="Edit Lanlord"
                content="Landlord is empty!"
              />
            );
          }
        }

        case 'sendMessageLandlord': {
          return (
            <ModalSendMessageLandlord
              close={this.isClose}
              current_user={this.props.current_user}
              authToken={this.props.authenticity_token}
              sendMessageLandlord={this.sendMessageLandlord}
              landlords_conversation={this.state.landlords_conversation}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          );
        }

        case 'sendMessageTenant': {
          return (
            <ModalSendMessageTenant
              close={this.isClose}
              current_user={this.props.current_user}
              authToken={this.props.authenticity_token}
              sendMessageTenant={this.sendMessageTenant}
              tenants_conversation={this.state.tenants_conversation}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          );
        }

        case 'sendMessageTrady': {
          return (
            <ModalSendMessageTrady
              close={this.isClose}
              current_user={this.props.current_user}
              sendMessageTrady={this.sendMessageTrady}
              trady_conversation={this.state.trady_conversation}
            />
          );
        }

        case 'viewQuote': {
          return (
            <ModalViewQuote
              close={this.isClose}
              role="Agent"
              quote={this.state.quote}
              quotes={this.state.quote_requests}
              hideRestore={!!this.state.trady}
              agency={this.props.agency}
              property={this.state.property}
              landlord={this.state.landlord}
              onModalWith={this.onModalWith}
              updateStatusQuote={this.updateStatusQuote}
              viewQuote={this.viewItem}
              sendEmailLandlord={this.sendEmailLandlord} current_user={this.props.current_user}
            />
          );
        }

        case 'viewQuoteMessage': {
          return (
            <ModalViewQuoteMessage
              close={this.isClose}
              quote={this.state.quote}
              current_user={this.props.current_user}
              sendMessageQuote={this.sendMessageQuote}
            />
          )
        }

        case 'viewQuoteRequestMessage': {
          return (
            <ModalViewQuoteRequestMessage
              close={this.isClose}
              quote_request={this.state.quote_request}
              current_user={this.props.current_user}
              sendMessageQuoteRequest={this.sendMessageQuoteRequest}
            />
          )
        }

        case 'requestQuote': {
          return (
            <ModalRequestModal
              close={this.isClose}
              keyTitle="request-quote"
              tradies={this.state.tradies}
              requestQuote={this.requestQuote}
              assigned_trady={this.state.trady}
              maintenance_request={this.state.maintenance_request}
              viewItem={this.viewItem}
            />
          );
        }

        case 'sendWorkOrder': {
          return (
            <ModalRequestModal
              close={this.isClose}
              keyTitle="sent-work-order"
              tradies={this.state.tradies}
              requestQuote={this.sendWorkOrder}
              maintenance_request={this.state.maintenance_request}
              viewItem={this.viewItem}
            />
          );
        }

        case 'viewInvoice': {
          return (
            <ModalViewInvoice
              close={this.isClose}
              agency={this.props.agency}
              invoice={this.state.invoice}
              invoices={this.state.invoices}
              property={this.state.property}
              viewInvoice={this.viewItem}
              role={this.props.current_user_role}
              authenticity_token={this.props.authenticity_token}
            />
          );

          break;
        }

        case 'viewPdfInvoice': {
          return (
            <ModalViewPDFInvoice
              close={this.isClose}
              agency={this.props.agency}
              property={this.state.property}
              trady={this.props.assigned_trady}
              invoice_pdf_file={this.state.invoice_pdf_file}
              viewInvoice={this.viewItem}
              role={this.props.current_user_role}
            />
          );

          break;
        }

        case 'editMaintenanceRequest': {
          return (
            <EditMaintenanceRequest
              close={this.isClose}
              services={this.props.services}
              onModalWith={(modal) => this.onModalWith(modal)}
              viewItem={this.viewItem}
              maintenance_request={this.state.maintenance_request}
              editMaintenanceRequest={this.editMaintenanceRequest}
              trady={this.state.trady || this.props.assigned_trady}
            />
          );
        }

        case 'splitMR': {
          return (
            <ModalSplitMR
              close={this.isClose}
              services={this.props.services}
              onModalWith={(modal) => this.onModalWith(modal)}
              maintenance_request={this.state.maintenance_request}
              splitSubmit={this.splitSubmit}
              trady={this.state.trady || this.props.assigned_trady}
            />
          );
        }

        case 'viewAppointment': {
          const {comments, quoteComments, landlordComments, appointment} = this.state;
          let commentShow = [];
          switch(appointment.appointment_type) {
            case 'Work Order Appointment':
              commentShow = [...comments];
              break;

            case 'Quote Appointment':
              commentShow = [...quoteComments];
              break;

            case 'Landlord Appointment':
              commentShow = [...landlordComments];
              break;

            default:
              break;
          }
          return (
            <ModalAppointment
              close={this.isClose}
              comments={commentShow}
              appointment={appointment}
              current_role={this.props.current_user_role}
            />
          );
        }

        case 'viewConfirmQuote':
          return (
            <ModalConfirmQuote
              close={this.isClose}
              title="Cancel Quote"
              quote={this.state.quote}
              updateStatusQuote={this.updateStatusQuote}
              content="Are you sure you want to cancel the job ?"
            />
          );


        case 'duplicateMR':
          return (
            <ModalConfirmMR
              close={this.isClose}
              confirm={this.duplicateMR}
              title="Duplicate Maintenance Request"
              content="Are you sure you want to duplicate this maintenance request? If there are any quotes or work orders associated with this maintenance request they WONT be carried over"
            />
          )

        case 'confirmUpdateStatus':
          return (
            <ModalConfirmUpdateStatus
              close={this.isClose}
              title="Update Status"
              quote={this.state.quote}
              click={this.updateStatusMR}
              content="Are you sure you want to update the maintenance request status ?"
            />
          );

        case 'confirmAssign':
          return (
            <ModalConfirmUpdateStatus
              close={this.isClose}
              quote={this.state.quote}
              click={this.assignToUser}
              title="Assign Matenance Request"
              content="Are you sure you want to reassign this maintenance request?"
            />
          );

        case 'viewModalInstruction':
          return (
            <ModalInstruction
              authenticity_token={this.props.authenticity_token}
              updateInsruction={this.updateInsruction}
            />
          );

        case 'editAddress':
          return (
            <ModalEditAddress
              close={this.isClose}
              editAddress={this.editAddress}
              address={this.state.addressTemp || this.state.property.property_address}
              error={this.state.errorAddress}
              viewItem={this.viewItem}
            />
          );

        case 'addPhoto':
          return (
						<ModalAddPhoto
              close={this.isClose}
              gallery={this.state.gallery}
							notifyAddPhoto={this.notifyAddPhoto}
							viewItem={this.viewItem}
              authenticity_token={this.props.authenticity_token}
              maintenance_request={this.state.maintenance_request}
            />
          );

        case 'confirmAddPhoto':
          return (
            <ModalConfirmAddPhoto
              close={this.isClose}
              onModalWith={(modal) => this.onModalWith(modal)}
            />
          );

        case 'viewTrady':
          const hasApproved = this.state.quote_requests.some(({quotes}) => quotes && quotes.some(({status}) => status === 'Approved'));

          return (
            <ModalViewTrady
              close={this.isClose}
              trady={this.state.trady}
              property={this.state.property}
              agency_admin={this.props.agency_admin}
              maintenance_request={this.state.maintenance_request}
              agency={this.props.agency}
              agent={this.props.agent}
              tenants={this.state.tenants}
              hasApproved={hasApproved}
            />
          );

        case 'confirmCancelTrady':
          return (
            <ModalConfirmCancelTrady
              close={this.isClose}
              cancelWorkOrder={this.cancelWorkOrder}
            />
          );

        case 'confirmStopQuoteReminder':
          return (
            <ModalConfirmAnyThing
              close={this.isClose}
              confirm={this.stopQuoteReminder}
              title="Stop Quote Request Reminder"
              content="Are you sure that the tradie has already submitted a quote?"
            />
          );

        case 'viewPhoto':
          return (
            <ModalViewPhoto
              title="Quote Photo"
              close={this.isClose}
              quote={this.state.quote_request}
              quotes={this.state.quote_requests}
              agency={this.props.agency}
              property={this.state.property}
              landlord={this.state.landlord}
              onModalWith={this.onModalWith}
              hideRestore={!!this.state.trady}
              gallery={this.state.quote_images}
              updateStatusQuote={this.updateStatusQuote}
              viewQuote={this.viewItem}
              sendEmailLandlord={this.sendEmailLandlord}
              current_user={this.props.current_user}
            />
          )

        case 'approveJob':
          return (
            <ModalApproveJob
              content="Pre-Approved Note"
              close={this.isClose}
              confirmText="Send"
              approveJob={this.approveJob}
              maintenance_request={this.state.maintenance_request}
            />
          )

        case 'confirmForwardLandlord':
          const params = {
            quote_id: this.state.quote.id,
            maintenance_request_id: this.state.quote.maintenance_request_id,
          };

          return (
            <ModalConfirmAnyThing
              title="Forward To Landlord"
              content="You have already forwarded this quote to the landlord. Are you sure you want to send it again to the landlord?"
              confirm={() => this.sendEmailLandlord(params, this.state.quote)}
              close={this.isClose}
            />
          )

        case 'showTenants':
          return (
            <ModalShowTenants
              close={this.isClose}
              property={this.state.property}
              tenants={this.state.tenants}
              addTenant={this.addTenant}
              authToken={this.props.authenticity_token}
              viewItem={this.viewItem}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          )

        case 'removeTenant':
          return (
            <ModalConfirmAnyThing
              title="Remove Tenant"
              content={`Are you sure you want to remove ${this.state.tenant.name} from this maintenance request`}
              confirm={this.removeTenant}
              close={() => this.viewItem('showTenants')}
            />
          )

        case 'justFindMeOne':
          return (
            <ModalConfirmAnyThing
              title="Just Find Me One"
              content={'Would you like us to find a competative quote from a qualified tradie to complete the work? and recieve compensation from our rebate program once the work has been done?'}
              confirm={this.justFindMeOne}
              close={() => this.onModalWith('requestQuote')}
            />
          )

        case 'updateMRStatus':
          return (
            <UpdateStatusModal
              existLandlord={!!this.state.landlord}
              existQuoteRequest={!!this.state.quote_requests.length}
              existTradyAssigned={!!this.state.trady}
              onModalWith={this.onModalWith}
              current_role={this.props.current_user_role}
              viewItem={this.viewItem}
              close={this.isClose}
            />
          )
        case 'voidInvoice':
          return (
            <ModalVoidInvoice
              voidInvoice={this.voidInvoice}
              text={"Are you sure want to void this invoice? Voiding this invoice will mark the invoice with a DO NOT PAY status. An email will be sent to the tradie to inform them you have voided and rejected this invoice along with the reason why it was voided."}
              invoice={this.state.invoice}
              close={this.isClose}
            />
          )
  

        case 'assignTo':
          return (
            <AssignModal
              onModalWith={this.onModalWith}
              all_agents={this.props.all_agents}
              all_agency_admins={this.props.all_agency_admins}
              viewItem={this.viewItem}
              close={this.isClose}
            />
          )

        case 'showSettings':
          return (
            <ModalShowSettings
              onModalWith={this.onModalWith}
              close={this.isClose}
            />
          )

        case 'showLandlordSettings':
          return (
            <ShowLandlordSettings
              onModalWith={this.onModalWith}
              close={this.isClose}
            />
          )
        
        case 'confirmEditAddress':
          const self = this;
          const {addressTemp} = this.state;

          return (
            <ModalConfirmAnyThing 
              title="Property Address"
              content={(<div>Sorry, but we can’t find <b>{addressTemp}</b>. Is this address correct?</div>)}
              confirm={() => {

                self.editAddress({address: addressTemp}, (err) => {
                  if (err) {
                    self.viewItem('errorEditAddress', err);
                  }
                })
              }}
              close={() => this.viewItem('editAddress', addressTemp)}
            />
          )

        case 'editAvailability':
        return (
          <ModalEditAvailability
            close={this.isClose}
            editAvailability={this.editAvailability}
            maintenance_request={this.state.maintenance_request}
          />
        )

        case 'addAccessContact':
        case 'editAccessContact':
          return (
            <ModalAddAccessContact
              close={this.isClose}
              property={this.state.property}
              access_contact={this.state.access_contact}
              addAccessContact={this.addAccessContact}
              authToken={this.props.authenticity_token}
              viewItem={this.viewItem}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          );


        case 'showAccessContacts':
          return (
            <ModalShowAccessContacts
              close={this.isClose}
              property={this.state.property}
              access_contacts={this.state.access_contacts}
              authToken={this.props.authenticity_token}
              viewItem={this.viewItem}
              maintenance_request_id={this.state.maintenance_request.id}
            />
          )


        case 'removeAccessContact':
          return (
            <ModalConfirmAnyThing
              title="Remove Access Contact"
              content={`Are you sure you want to remove ${this.state.access_contact.name} from this maintenance request`}
              confirm={this.removeAccessContact}
              close={() => this.viewItem('showAccessContacts')}
            />
					)
					
				case 'deletePhoto':
				return (
					<ModalDeletePhoto
						close={this.closeDeletePhoto}
						photoData={this.state.photo}
						authenticity_token={this.props.authenticity_token}
					/>
				)

        default:
          return null;
      }
    }
	},
	
	closeDeletePhoto(err, res) {
		if (err === undefined) {
			return this.onModalWith('addPhoto');
		}
		if (err) {
			this.setState({notification: {
				title: "Delete Photo",
				content: err.responseText,
				bgClass: "bg-error",
			}});
			return this.onModalWith('notification');
		}
		if (res) {
			const {gallery, photo} = this.state;
			this.setState({
				notification: {
					title: "Delete Photo",
					content: res.message,
					bgClass: "bg-success",
					reopenModal: 'addPhoto',
				},
				gallery: gallery.filter(({id}) => id !== photo.id)
			});
			return this.onModalWith('notification');
		}
		this.isClose();
	},

  autoScroll: function(key) {
    var offset = $('#' + key).offset();
    $('body').animate({
      scrollTop: offset.top
    }, 500);

  },

  openQuoteMesssage: function(quote_id) {
    const {quote_requests} = this.state;
    let quote = '';
    quote_requests.map((item, key) => {
      if(item.id == quote_id) {
        quote = item;
        return;
      }
    });

    if(quote) {
      this.viewItem('viewQuoteMessage', quote);
    }
  },

  openQuoteRequestMesssage: function(quote_request_id) {
    const { quote_requests } = this.state;

    const quote_request = quote_requests.filter(item => item.id == quote_request_id)[0];

    if(quote_request) {
      this.viewItem('viewQuoteRequestMessage', quote_request);
    }
  },

  componentDidMount: function() {
    const self = this;
    const {instruction} = this.state;
    const body = $('body');
    if(!instruction.read_instruction) {
      body.chardinJs('start');
      this.onModalWith('viewModalInstruction');
      $(document).click(function(e) {
        var showInstruction = $('.show-instruction');
        if(showInstruction.length > 0) {
          if(e.target.className != 'show-instruction') {
            body.chardinJs('stop');
            self.isClose();
            self.viewModalMessage();
          }
        }
      });
    }else {
      this.viewModalMessage();
    }
  },

  updateInsruction: function(data) {
    this.setState({
      instruction: data
    });
    this.isClose();
    $('body').chardinJs('stop');
    this.viewModalMessage();
  },

  viewModalMessage: function() {
    const href = window.location.href;
    const self = this;

    if(href.indexOf('email_quote_id') >= 0) {
      self.autoScroll('quotes');
    }else if(href.indexOf('send_maintenance_request_invoice') >= 0) {
      self.autoScroll('invoices');
    }

    const json = self.getUrlVars(href);
    switch(json.message) {
      case 'open_landlord_message':
          self.onModalWith('sendMessageLandlord');
        break;

      case 'open_tenant_message':
        self.onModalWith('sendMessageTenant');
        break;

      case 'open_trady_message':
        self.onModalWith('sendMessageTrady');
        break;

      case 'open_quote_message':
        self.openQuoteMesssage(json.quote_message_id);
        break;

      case 'open_quote_request_message':
        self.openQuoteRequestMesssage(json.quote_request_message_id);
        break;

      default:
        break;
    }
  },

  getUrlVars: function(url) {
    var hash;
    var json = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      json[hash[0]] = hash[1];
    }
    return json;
  },

  notifyAddPhoto: function(gallery) {
    this.setState({
      gallery: gallery
    });
    this.onModalWith('confirmAddPhoto');
  },

  summary(e) {
    const {invoices} = this.props;
    const {invoice_pdf_files, trady, quote_requests, tenants, landlord} = this.state;

    const hasApproved = quote_requests.some(({quotes}) => quotes && quotes.some(({status}) => status === 'Approved'));

    return (
      <div className="summary-container-index new-ui-maintenance-request main-container" id="summary-container-index">
        <div className="main-summary dontprint main-content">
          <div className="sidebar">
            <div className="box-shadow flexbox flex-column">
              {
                /*<Contact
                  tenants={tenants}
                  landlord={this.state.landlord}
                  current_user={this.props.current_user}
                  assigned_trady={trady || this.props.assigned_trady}
                  onModalWith={(modal) => this.onModalWith(modal)}
                />*/
              }
              <GeneralAction
                {...this.props}
                current_role={this.props.current_user_role}
                showSearchBar={true}
                searchText={this.props.searchText}
              />
              <Action
                show_assign={this.props.current_user_show_quote_message}
                onModalWith={(modal) => this.onModalWith(modal)}
                landlord={this.state.landlord}
                hasTenant={this.state.tenants.length}
                viewItem={this.viewItem}
              />
              {/* <AgentLandlordAction
                onModalWith={this.onModalWith}
                viewItem={this.viewItem}
                landlord={this.state.landlord}
              />
              <AgentTradyAction
                onModalWith={this.onModalWith}
                viewItem={this.viewItem}
                assigned_trady={trady || this.props.assigned_trady}
              />
              <AgentTenantAction
                onModalWith={this.onModalWith}
                viewItem={this.viewItem}
                hasTenant={this.state.tenants.length}
              /> */}
            </div>
          </div>
          <div className="section">
            <ItemMaintenanceRequest
              status={this.state.status}
              gallery={this.state.gallery}
              property={this.state.property}
              access_contacts={this.state.access_contacts}
              all_agents={this.props.all_agents}
              agent={this.props.agent || this.props.agency_admin}
              updateStatusMR={this.updateStatusMR}
              existLandlord={!!landlord}
              existQuoteRequest={!!quote_requests.length}
              existTradyAssigned={!!trady}
              all_agency_admins={this.props.all_agency_admins}
              viewItem={(key, item) => this.viewItem(key, item)}
              tenants={this.state.tenants}
              onModalWith={this.onModalWith}
              assignToUser={(email) => this.assignToUser(email)}
              maintenance_request={this.state.maintenance_request}
              landlord={this.state.landlord}
              current_role={this.props.current_user_role}
              isShowLandlord={true}
              show_assign={this.props.current_user_show_quote_message}
              strike_approval={hasApproved}
              edit_availability={true}
            />
            { (invoices && invoices.length > 0) &&
                <Invoices
                  invoices={this.state.invoices}
                  current_role={this.props.current_user_role}
                  markAsPaid={(item) => this.markAsPaid(item)}
                  viewInvoice={(key, item) => this.viewItem(key, item)}
                />
            }
            { (invoice_pdf_files && invoice_pdf_files.length > 0) &&
                <PDFInvoices
                  trady={this.props.assigned_trady}
                  invoice_pdf_files={invoice_pdf_files}
                  current_role={this.props.current_user_role}
                  viewPDFInvoice={(key, item) => this.viewItem(key, item)}
                  markAsPaid={(item) => this.markAsPaid(item, true)}
                />
            }
            {
              // this.state.trady &&
              //  <AssignTrady
              //    trady={this.state.trady}
              //    current_role={this.props.current_user_role}
              //    onModalWith={(modal) => this.onModalWith(modal)}
              //    viewTrady={(key, item) => this.viewItem(key, item)}
              //  />
            }
            {
              quote_requests && quote_requests.length > 0
              ? <QuoteRequests
                  role="Agent"
                  hideRestore={!!trady}
                  assignedTrady={trady}
                  quote_requests={quote_requests}
                  onModalWith={this.onModalWith}
                  landlord={this.state.landlord}
                  current_role={this.props.current_user_role}
                  current_user={this.props.current_user}
                  updateStatusQuote={this.updateStatusQuote}
                  sendEmailLandlord={this.sendEmailLandlord}
                  uploadImage={this.uploadImage}
                  chooseQuoteRequest={this.chooseQuoteRequest}
                  viewQuote={this.viewItem}
                  current_user_show_quote_message={this.props.current_user_show_quote_message}
                />
              : ''
            }
            <Activity logs={this.props.logs} />
          </div>
        </div>
        <SideBarMobile
          tenants={tenants}
          hasTenant={!!this.state.tenants.length}
          landlord={this.state.landlord}
          current_user={this.props.current_user}
          onModalWith={(modal) => this.onModalWith(modal)}
          assigned_trady={trady || this.props.assigned_trady}
          viewItem={(key, item) => this.viewItem(key, item)}
        />
        { this.renderModal() }
      </div>
    );
  },

  render: function() {
    return (
      <div>
        <FixCSS />
        { this.summary() }
      </div>
    );
  }
});
