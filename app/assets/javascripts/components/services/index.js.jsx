var ServiceList = React.createClass({
  getInitialState: function () {
    const {services} = this.props;

    return {
      services: services || [],
    };
  },

  onSubmit: function(e){
    e.preventDefault();
    var flag = false;
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;

    var trady = {
      name        : getValidValue(this.name),
      company_name: getValidValue(this.company_name),
      mobile      : getValidValue(this.mobile),
    }

    var params = { trady };

    const self = this;
    $.ajax({
      type: 'PUT',
      url: `/tradies/${(this.props.trady || {}).id}`,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res.errors) {
          self.setState({errors: res.errors || {}});
        }
      },
      error: function(err) {
      }
    });

    return;
  },

  removeError: function({ target: { id } }) {
      this.setState({ errors: {...this.state.errors, [id]: ''} });
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  render: function() {
    const { services } = this.state;
    return (
      <div id="services">
        <div className="list-services">
          {services.map((service) => (
            <div className="service-item" key={service.id}>
              {service.service}
            </div>
          ))}
        </div>
        <div className="service-buttons">
          <button type="button" className="btn button-back">
            BACK
          </button>
          <button type="button" className="btn button-primany">
            CREATE SKILL
          </button>
        </div>
      </div>
    );
  }
});
