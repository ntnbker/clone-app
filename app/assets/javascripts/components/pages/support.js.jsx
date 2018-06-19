const Support = React.createClass({
  getInitialState() {
    return {
      errors: {}
    };
  },

  componentWillMount() {
    $('.layout').css({'background-color': '#7dc691'});
  },

  componentWillUnmount() {
    $('.layout').css({'background-color': ''});
  },

  removeError: function({ tarsget: { id } }) {
    this.setState({
      errors: {
        ...this.state.errors,
        [id]: '',
      },
    })
  },

  renderError: function(error) {
      return <div id="errorbox" className="error">{error || ''}</div>;
  },

  submit(e) {
    e.preventDefault();
    const data = {
      name: this.name.value,
      email: this.email.value,
      message: this.message.value,
    }
    const self = this;

		$.ajax({
			type: 'POST',
			url: '/suport',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: FD,
			success: function (res) {
        if (res) {
          self.setState({ 
            errors: res.errors,
            message: res.message
          });
        }
			},
			error: function (err) {

			}
		});
    return false;
  },
  
  render() {
    const {errors} = this.state;
    return (
      <div id="support-page" className="main-container">
        {/* <FixCSS className="no-sidebar" /> */}
        <div className="main-content support-main-content">
          <div className="contact-information">
            <div className="title">CONTACT US</div>
            <div className="description">ansod naosind aonsd inao ndiansd oansod naio</div>
            <div className="contact-detail">
              <div className="item">
                <div className="icon">
                <i className="fa fa-clock-o" aria-hidden="true" />
                </div>
                <div className="content">
                  <div className="content-title">OPENING HOURS</div>
                  <div className="content-description">9:00 / 18:00</div>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </div>
                <div className="content">
                  <div className="content-title">MAIL</div>
                  <div className="content-description">youremail@mail.com</div>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <i className="fa fa-phone" aria-hidden="true" />
                </div>
                <div className="content">
                  <div className="content-title">PHONE</div>
                  <div className="content-description">345678901</div>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <i className="fa fa-map-marker" aria-hidden="true" />
                </div>
                <div className="content">
                  <div className="content-title">MAPS</div>
                  <div className="content-description">Avenue Street 90 New York</div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form id="contact" onSubmit={this.submit}>
              <div className="form-title">Contact Us</div>
              <div className="form-subtitle">Add Subtitle</div>
              <div className="main-input">
                <div className="input-item name">
                  <input
                    type="text" 
                    placeholder="Name" 
                    id="name"
                    ref={e => this.name = e} 
                    onChange={this.removeError}
                  />
                  {this.renderError(errors['name'])}
                </div>
                <div className="input-item email">
                  <input
                    type="text" 
                    placeholder="Email" 
                    id="email"
                    ref={e => this.email = e} 
                    onChange={this.removeError}
                  />
                  {this.renderError(errors['email'])}
                </div>
                <div className="input-item name">
                  <textarea
                    type="text" 
                    placeholder="Message" 
                    id="message"
                    ref={e => this.message = e} 
                    onChange={this.removeError}
                  />
                  {this.renderError(errors['message'])}
                </div>
              </div>
              <div className="submit-button">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
})