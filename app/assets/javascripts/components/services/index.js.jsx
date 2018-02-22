var ServiceList = React.createClass({
  getInitialState: function () {
    const {services, is_edit, trady_skills} = this.props;

    return {
      services: services || [],
      skills: trady_skills || [],
      isEdit: !!is_edit,
    };
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
    debugger
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
    const { services } = this.state;
    return (
      <form id="services" onSubmit={this.onSubmit}>
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
        <div className="list-services">
          {services.map((service) => (
            <div className="service-item" key={service.id}>
              <label>
                <input
                  type="checkbox"
                  name="skill[skill][]"
                  defaultChecked={this.isChecked(service.service)}
                  value={service.service}
                />
                {service.service}
              </label>
            </div>
          ))}
        </div>
        <div className="service-buttons">
          <button type="button" className="btn btn-back" onClick={this.onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            {this.state.isEdit ? 'Submit' : 'Create Skill'}
          </button>
        </div>
      </form>
    );
  }
});
