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
