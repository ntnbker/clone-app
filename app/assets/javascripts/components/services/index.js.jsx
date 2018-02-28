var ServiceList = React.createClass({
  getInitialState: function () {
    const {services, is_edit, trady_skills} = this.props;

    return {
      services: services || [],
      skills: trady_skills || [],
      isEdit: !!is_edit,
    };
  },

  checkSkill(service) {
    const {skills} = this.state;
    const isChecked = skills.some(({id}) => id === service.id);

    if (isChecked) {
      this.setState({
        skills: skills.filter(({id}) => id !== service.id),
      })
    }
    else {
      this.setState({
        skills: skills.concat([service]),
      })
    }
  },

  isChecked(value) {
    const {skills} = this.state;

    return skills.some(({service}) => service === value);
  },

  onBack() {
    const {edit_register_tradie_company_path} = this.props;

    location.href = edit_register_tradie_company_path;
  },

  onSubmit(e) {
    e.preventDefault();
    const {isEdit} = this.state;
    const self = this;
    var FD = new FormData(document.getElementById('services'));

    $.ajax({
      type: isEdit ? 'DELETE' : 'POST',
      url: isEdit ? '/remove_services' : '/add_services',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success(res) {

      },
      error(err) {

      }
    });
  },

  render: function() {
    const { services, skills } = this.state;
    return (
      <form id="services" onSubmit={this.onSubmit}>
        <label className="service-placeholder text-center">
          What service(s) will you be providing? Please pick from the services list below.
        </label>
        <input type="hidden" name="trady_id" value={this.props.trady_id} />
        <input
          type="hidden"
          name="trady_company_id"
          value={this.props.trady_company_id}
        />
        <input
          type="hidden"
          name="maintenance_request_id"
          value={this.props.maintenance_request_id}
        />
        <div className="list-services scroll-bar">
          {services.map((service) => (
            <label className="service-item" key={service.id}>
              {service.service}
              <input
                type="checkbox"
                name="skill[skill][]"
                defaultChecked={this.isChecked(service.service)}
                onChange={() => this.checkSkill(service)}
                value={service.service}
              />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
        <label className="service-placeholder text-center">
          Services you will be providing
        </label>
        <div className="horizontal-line"></div>
        <div className="list-choosed-services">
          {skills.map((service, index) => (
            <div className="choosed-service-item" key={index}>{service.service}</div>
          ))}
        </div>
        <div className="service-buttons">
          <button type="button" className="btn button-back" onClick={this.onBack}>
            Back
          </button>
          <button type="submit" className="btn button-submit">
            {this.state.isEdit ? 'Submit' : 'Create Skill'}
          </button>
        </div>
      </form>
    );
  }
});
