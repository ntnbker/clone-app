
Recruit = React.createClass({
  getInitialState() {
    return {
      errors: {}
    }
  },

  renderError: function(key) {
    const {errors} = this.state;
    const error = errors[key];

    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  submit(e) {
    const self = this;
    e.preventDefault();
    var FD = new FormData(document.getElementById('submit-form'));

    $.ajax({
      type: 'POST',
      url: '/quote_request_for_recruit',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success: function (res) {
        if (res.errors) {
          self.setState({errors: res.errors});
        }
      },
      error: function (err) {

      }
    });
    return false;
  },

  render() {
    const {jfmo_request} = this.props;
    const {maintenance_request} = jfmo_request;
    const {
      id, maintenance_description, action_status, 
      created_at, service_type, property, quote_requests
    } = maintenance_request;
    const mrStatus = action_status && action_status.agent_status;
    const address = property && property.property_address;
    const QRCount = quote_requests.length;
    const QCount = quote_requests.reduce((count, qr) => count + qr.quotes.length, 0);
    
    const renderError = this.renderError;

    return (
    <div className="main-container recruit">
        <FixCSS haveScroll={true} />
        <div className="main-content">
          <div className="sidebar">
            <div className="box-shadow flexbox flex-column">
              <GeneralAction
                {...this.props}
              />
            </div>
          </div>
          <div className="section">
            <div className="box-shadow">
              <div className="row main-item">
                <div className="content main-detail">
                  <div className="job-detail">
                    <span className="title">Maintenance Description:</span>
                    <span className="description">{maintenance_description.length > 40 
                      ? maintenance_description.substring(0,37) + "..." 
                      : maintenance_description}
                    </span>
                  </div>
                  <div className="main-information">
                    <div className="row-information">
                      <span className="key">Maintenance Request ID:</span>
                      <span className="data">{id}</span>
                    </div>
                    <div className="row-information">
                      <span className="key">Status:</span>
                      {mrStatus && <span className="data status">{mrStatus}</span>}
                    </div>
                    <div className="row-information">
                      <span className="key">Address:</span>
                      <span className="data address">{address}</span>
                    </div>
                    <div className="row-information">
                      <span className="key">Submitted:</span>
                      <span className="data time">{moment(created_at).format('LL')}</span>
                    </div>
                    <div className="row-information">
                      <span className="key">Service Required:</span>
                      <span className="data service">{service_type}</span>
                    </div>
                    <div className="row-information">
                      <span className="key">Quote Request Sent Count:</span>
                      <span className="data service">{QRCount}</span>
                    </div>
                    <div className="row-information">
                      <span className="key">Quote Submitted Count:</span>
                      <span className="data service">{QCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="title">
                <p>Quote Requests Sent To Table</p>
              </div>
              <QuoteRequestTable quote_requests={quote_requests} />
              <div className="title">
                <p>Send Tradie Invite / Quote Request</p>
              </div>
              <div className="send-tradie">
                <form className="send-tradie-form" id="submit-form" onSubmit={this.submit}>
                  <input type="hidden" name="trady[maintenance_request_id]" value={id} />
                  <input type="hidden" name="trady[jfmo_request_id]" value={jfmo_request.id} />
                  <div className="name">
                    <input type="text" name="trady[name]" placeholder="Name" />
                    {renderError('trady[name')}
                  </div>
                  <div className="name">
                    <input type="text" name="trady[company_name]" placeholder="Business Name" />
                    {renderError('trady[company_name')}
                  </div>
                  <div className="name">
                    <input type="text" name="trady[email]" placeholder="Email" />
                    {renderError('trady[email')}
                  </div>
                  <div className="name">
                    <input type="text" name="trady[mobile]" placeholder="Phone" />
                    {renderError('trady[mobile')}
                  </div>
                  <div className="submit-button">
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <DropDownMobileList
          title="Menu"
        />
      </div>
    );
  }
})

const QuoteRequestTable = React.createClass({
  render() {
    const {quote_requests} = this.props;
    return (
      <div className="quote-request-table">
      <div className="table">
        <div className="table-title">
          <div className="name">Name</div>
          <div className="email">Email</div>
          <div className="phone">Phone</div>
          <div className="password-set">PW Set</div>
          <div className="tc-set">T&C</div>
          <div className="quote-submit-status">Quote Submitted</div>
        </div>
        {quote_requests.map((qr, index) => {
          const {trady: {customer_profile, user, name, mobile, email}, quotes} = qr;
          const {password_set} = (user || {});
          const {terms_and_conditions} = (customer_profile || {});

          return (
            <div className="table-item" key={index}>
              <div className="name">{name}</div>
              <div className="email">{email}</div>
              <div className="phone">{mobile}</div>
              <div className="password-set">{password_set ? 'true' : 'false'}</div>
              <div className="tc-set">{!!terms_and_conditions ? 'true' : 'false'}</div>
              <div className="quote-submit-status">{quotes.length > 0 ? 'true' : 'false'}</div>
            </div>
          )
        })}
      </div>
    </div>
    )
  }
})