var RecruitList = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    const {jfmo_requests} = this.props;
    return (
      <div className="recruit-list">
        {jfmo_requests.map((jfmo) => {
          return <RecruitItem jfmoRequest={jfmo} key={jfmo.id} />
        })}

      </div>
    )
  }
})

var RecruitItem = React.createClass({
  render: function() {
    const jfmoRequest = this.props.jfmoRequest;
    const maintenanceRequest = jfmoRequest.maintenance_request;
    const link = '/recruits/' + jfmoRequest.id;

    return (
      <div className="row maintenance-request">
        <div className="content">
        </div>
        <div className="view">
          <a className="btn-view" href={link}>Show</a>
        </div>
      </div>
    );
  }
});

RecruitListDashboard = React.createClass({
  render() {
    const {jfmo_requests, link} = this.props;
    
    return (
    <div className="main-container">
        <FixCSS className="no-sidebar" />
        <div className="main-content">
          {/* <div className="sidebar">
            <div className="box-shadow flexbox flex-column">
              <GeneralAction
                {...this.props}
              />
            </div>
          </div> */}
          <div className="section">
            {jfmo_requests.map((jfmo) => {
              return <NewRecruitItem jfmoRequest={jfmo} key={jfmo.id} link={link} />
            })}
          </div>
        </div>
        {/* <DropDownMobileList
          title="Menu"
        /> */}
      </div>
    );
  }
})


var NewRecruitItem = React.createClass({
  render: function() {
    const {maintenance_request} = this.props.jfmoRequest;
    const {id, maintenance_description, action_status, created_at, service_type, property} = maintenance_request;
    const mrStatus = action_status && action_status.agent_status;
    const address = property && property.property_address;
    return (
      <div className="row main-item box-shadow">
        <div className="job-detail maintenance-request-detail">
          <span className="title">Maintenance Description:</span>
          <span className="description">{maintenance_description.length > 40 
            ? maintenance_description.substring(0,37) + "..." 
            : maintenance_description}
          </span>
        </div>
        <div className="item-data">
          <div className="content main-detail">
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
            </div>
          </div>
          <div className="view-button">
            <button 
              type="button"
              className="btn-view" 
              onClick={() => location.href = this.props.link + "/" + this.props.jfmoRequest.id}
            >
              Onboard Tradie
            </button>
          </div>
        </div>
      </div>
    );
  }
});