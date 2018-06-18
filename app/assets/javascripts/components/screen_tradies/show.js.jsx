const ScreenTradie = React.createClass({ 
  getInitialState() {
    const {insurance, license} = this.props.trady;

    return {
      skills: (this.props.trady.skills || []).map(({skill}) => skill),
      insured: insurance && insurance.insured,
      licensed: license && license.licensed,
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

  changeRadio({target: {value, name}}) {
    this.setState({[name]: value === 'true'});
  },

  submit() {
    const self = this;
    const {authenticity_token, trady: {id}} = this.props;
    const {skills, insured, licensed} = this.state;
    debugger
    const data = {
      id,
      insured,
      licensed,
      skill: {
        skill: skills
      }
    }

    $.ajax({
      type: 'PUT',
      url: '/screen_tradies/' + id,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', authenticity_token);
      },
      data,
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
    const {trady, services} = this.props;
    const {insured, licensed} = this.state;
    const {insurance, license} = trady;
    const insurance_url = insurance && insurance.image_url;
    const license_url = license && license.image_url;

    return (
    <div id="recruit" className="main-container">
        <FixCSS className='no-sidebar' />
        <div className="main-content">
          {/* <div className="sidebar">
            <div className="box-shadow flexbox flex-column">
              <GeneralAction
                {...this.props}
              />
            </div>
          </div> */}
          <div className="section">
            <div className="box-shadow">
              <div className="main-item screen-tradie-item">
                <div className="item-data">
                  <div className="content main-detail">
                    <div className="main-information">
                      <div className="row-information">
                        <span className="key">Name:</span>
                        <span className="data">{trady.name}</span>
                      </div>
                      <div className="row-information">
                        <span className="key">Email:</span>
                        <span className="data">{trady.email}</span>
                      </div>
                      <div className="row-information">
                        <span className="key">Company Name:</span>
                        <span className="data">{trady.company_name}</span>
                      </div>
                      <div className="row-information">
                        <span className="key">Phone:</span>
                        <span className="data">{trady.mobile}</span>
                      </div>
                      <div className="row-information">
                        <span className="key">Insured:</span>
                        <span className="data">{insured ? "True" : "False"}</span>
                      </div>
                      <div className="row-information">
                        <span className="key">Licensed:</span>
                        <span className="data">{licensed ? "True" : "False"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="view-uploader">
                <div className="pdf-view insurance">
                  <div className="title">License</div>
                  {insurance_url ?
                    <div id="Iframe-Master-CC-and-Rs" className="set-padding set-border set-box-shadow center-block-horiz">
                      <div
                        className="responsive-wrapper responsive-wrapper-wxh-572x612"
                      >
                        <object
                          width="100%"
                          height="400px"
                          data={insurance_url}
                        >
                          <iframe
                            width="100%"
                            height="400px"
                            src={`https://docs.google.com/gview?url=${insurance_url.replace(/(\..*)\?.*/g, '$1&embedded=true')}`}
                            className="scroll-custom" 
                          />
                        </object>
                      </div>
                    </div>
                    :
                    <div className="no-file" style={{width: "100%", height: "400px"}}>
                      <img src="/assets/no-image-available.png" alt=""/>
                    </div>
                  }
                  <div className="radio-valid-uploader text-center">
                    <div className="valid-title"> Is this Insurance Valid? </div>
                    <div className="radio-same-address">
                      <label className="radio-option">
                        Yes
                        <input
                          type="radio"
                          value={true}
                          defaultChecked={!!insured}
                          ref={e => this.insured = e}
                          name="insured"
                          onChange={this.changeRadio}
                        />
                        <span className="radio-checkmark"></span>
                      </label>
                      <label className="radio-option">
                        No
                        <input
                          type="radio"
                          value={false}
                          defaultChecked={!insured}
                          ref={e => this.insured = e}
                          name="insured"
                          onChange={this.changeRadio}
                        />
                        <span className="radio-checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="pdf-view license">
                  <div className="title">License</div>
                  {license_url ?
                    <div id="Iframe-Master-CC-and-Rs" className="set-padding set-border set-box-shadow center-block-horiz">
                      <div
                        className="responsive-wrapper responsive-wrapper-wxh-572x612"
                      >
                        <object
                          width="100%"
                          height="400px"
                          data={license_url}
                        >
                          <iframe
                            width="100%"
                            height="400px"
                            src={`https://docs.google.com/gview?url=${license_url.replace(/(\..*)\?.*/g, '$1&embedded=true')}`}
                            className="scroll-custom" 
                          />
                        </object>
                      </div>
                    </div>
                    :
                    <div className="no-file" style={{width: "100%", height: "400px"}}>
                      <img src="/assets/no-image-available.png" alt=""/>
                    </div>
                  }
                  <div className="radio-valid-uploader text-center">
                    <div className="valid-title"> Is this License Valid? </div>
                    <div className="radio-same-address">
                      <label className="radio-option">
                        Yes
                        <input
                          type="radio"
                          value={true}
                          defaultChecked={!!licensed}
                          ref={e => this.licensed = e}
                          name="licensed"
                          onChange={this.changeRadio}
                        />
                        <span className="radio-checkmark"></span>
                      </label>
                      <label className="radio-option">
                        No
                        <input
                          type="radio"
                          value={false}
                          defaultChecked={!licensed}
                          ref={e => this.licensed = e}
                          name="licensed"
                          onChange={this.changeRadio}
                        />
                        <span className="radio-checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-list">
                <label className="service-placeholder text-center">
                  What Services Can They Do?/ Do they have a license for it?
                </label>
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
              </div>
              <div className="submit-button">
                <button type="button" onClick={this.submit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
})