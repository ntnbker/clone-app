var ServiceList = React.createClass({
  getInitialState: function () {
    const {services, is_edit, trady_skills} = this.props;

    return {
      services: services || [],
      skills: (trady_skills || []).map(({skill}) => skill),
      isEdit: !!is_edit,
      errors: '',
    };
  },

  checkSkill(service) {
    const {skills} = this.state;
    const isChecked = skills.some(skill => skill === service.service);

    if (isChecked) {
      this.setState({
        skills: skills.filter(skill => skill !== service.service),
        errors: '',
      })
    }
    else {
      this.setState({
        skills: skills.concat([service.service]),
        errors: ''
      })
    }
  },

  isChecked(value) {
    const {skills} = this.state;

    return skills.some(skill => skill === value);
  },

  onBack() {
    const {edit_register_tradie_company_path, onBack} = this.props;
    if (typeof onBack === 'function') {
      return onBack();
    }
    location.href = edit_register_tradie_company_path;
  },

  renderError: function() {
    const {errors} = this.state;
    return <p id="errorbox" className="error">{errors || ''}</p>;
  },

  onSubmit(e) {
    e.preventDefault();
    const {isEdit, skills}   = this.state;
    const {trady_id, trady_company_id, maintenance_request_id} = this.props;
    const self = this;
    const params = {
      trady_id, trady_company_id, maintenance_request_id,
      skill: {
        skill: skills
      }
    }

    if (this.props.editServices) {
      return this.props.editServices(params, errors => self.setState({errors: err}));
    }

    $.ajax({
      type: isEdit ? 'PUT' : 'POST',
      url: isEdit ? ('/services/' + trady_id) : '/add_services',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success(res) {
        if (res && res.errors) {
          self.setState({errors: res.errors})
        }
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
          {skills.map((skill, index) => (
            <div
              className="choosed-service-item"
              key={index}
            >{skill}</div>
          ))}
        </div>
        {this.renderError()}
        <div className="service-buttons">
          <button type="button" className="btn button-back" onClick={this.onBack}>
            Back
          </button>
          <button type="submit" className="btn button-submit">
            Add Service(s)
          </button>
        </div>
      </form>
    );
  }
});
