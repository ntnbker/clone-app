var TradyRegistrationForm = React.createClass({
  getInitialState : function() {
    const {step} = this.props;
    const level = ['terms-and-conditions', 'trady', 'trady-company', 'service', 'insurance', 'license'];

    return {
      errors: {},
      step,
      level: (level.indexOf(step) || 0) + 1,
    }
  },

  componentDidMount() {
    $('body > div.layout').css('background-color', 'white');
  },

  labelTitle(number, text, isPass) {
    return (
      <div className={"registration-label-title " + (isPass && 'pass' || '')}>
        <div className={"step-status " + (isPass && 'pass' || '')}>
          { number > 1 && <div className="separate-line "></div> }
        </div>
        <div className="step-number">{number}</div>
        <div className="step-text">{text}</div>
      </div>
    )
  },

  generateStepTitle() {
    const {level} = this.state;
    return (
      <div className="registration-title">
        {this.labelTitle(1, <p>Terms<br />&<br />Conditions</p>, level > 0)}
        {this.labelTitle(2, <p>User<br />Registration</p>, level > 1)}
        {this.labelTitle(3, <p>Company<br />Registration</p>, level > 2)}
        {this.labelTitle(4, <p>Services<br />Available</p>, level > 3)}
        {this.labelTitle(5, <p>Upload<br />Insurance</p>, level > 4)}
        {this.labelTitle(6, <p>Upload<br />License</p>, level > 5)}
      </div>
    )
  },

  generateTitle() {
    const {step} = this.state;

    switch (step) {
      case 'terms-and-conditions':
        return <h5 className="step-title text-center">Terms & Conditions</h5>
      case 'trady':
        return <h5 className="step-title text-center">User Registration</h5>
      case 'trady-company':
        return <h5 className="step-title text-center">Company Registration</h5>
      case 'service':
        return <h5 className="step-title text-center">Services Registration</h5>
      case 'license':
      return <h5 className="step-title text-center">Upload License</h5>
      case 'insurance':
      return <h5 className="step-title text-center">Upload Insurance</h5>
    }
  },

  generateForm() {
    const {step} = this.state;

    switch (step) {
      case 'terms-and-conditions':
        return <TradyTermsAndConditions {...this.props} />;
      case 'trady':
        return <Trady {...this.props} />;
      case 'trady-company':
        return <NewTradyCompany {...this.props} />;
      case 'service':
        return <ServiceList {...this.props} />;
      case 'license':
      return <TradyLicenseAndInsurance {...this.props} />;
      case 'insurance':
      return <TradyLicenseAndInsurance {...this.props} />;
    }
  },

  componentWillUnmount() {
    $('body > div.layout').css('background-color', '#F4F8FB');
  },

  render() {
    return (
      <div id="registration" className="trady-registration">
        {this.generateStepTitle()}
        {this.generateTitle()}
        {this.generateForm()}
      </div>
    )
  }
});

var TradyLicenseAndInsurance = React.createClass({
  getInitialState() {
    return {
      text: '',
      file: null,
      error: [],
      haveDocument: false,
    }
  },

	_handleChangeFile: function (e) {
    const self = this;
    const {error} = this.state;
    error.image = '';
		this.setState({error});
		const files = e.target.files;
		let file = files[0];

		var filename = files[0];
		const options = {
			extension: filename.name.match(/(\.\w+)?$/)[0],
			_: Date.now(),
		}

		// start upload file into S3
		$.getJSON('/images/cache/presign', options, function (result) {
			var fd = new FormData();
			$.each(result.fields, function (key, value) {
				fd.append(key, value);
			});
			fd.append('file', file);
			$.ajax({
				type: 'POST',
				url: result['url'],
				enctype: 'multipart/form-data',
				processData: false,
				contentType: false,
				data: fd,
				xhr: function () {
					var xhr = new window.XMLHttpRequest();
					xhr.upload.addEventListener("loadstart", function (evt) {
						if ($('.progress').length == 0) {
							$('<div class="progress" style="width: 80%;"><div class="progress-bar" style="width: ' + 0 + '%"></div></div>').insertAfter("#input-file");
						}

						if (/Edge/i.test(navigator.userAgent)) {
							var percentComplete = 0;
							var loop = 0;
							let inn = setInterval(() => {
								percentComplete += Math.ceil((51200 * ++loop) / file.size * 100);
								if (percentComplete >= 100) {
									clearInterval(inn);
								} else {
									$('#title-upload').html('Uploading ' + percentComplete + '%');
									$('.progress .progress-bar').css('width', percentComplete + '%');
								}
							}, 500)
						}
					})
					xhr.upload.addEventListener("progress", function (evt) {
						if (evt.loaded > 0 && evt.total > 0) {
							var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
							var progress = $('.progress');
							if (progress.length !== 0) {
								$('.progress .progress-bar').css('width', percentComplete + '%');
							}
							$('#title-upload').html('Uploading ' + percentComplete + '%');
						}
					}, false);
					return xhr;
				},
				success: function (res) {
					setTimeout(function () {
						$('#title-upload').html('<i class="fa fa-upload" /> Choose PDF to upload');
						$('.progress').remove();
					}, 0);
					var filePDF = {
						id: result.fields.key.match(/cache\/(.+)/)[1],
						storage: 'cache',
						metadata: {
							size: file.size,
							filename: file.name.match(/[^\/\\]*$/)[0],
							mime_type: file.type
						}
					};
					self.updateFile(filePDF);
				}
			});
		});
	},

	updateFile: function (filePDF) {
		this.setState({
			file: filePDF
		});
	},

	removeFile: function (index) {
		$('#input-file').val('');
		this.setState({
			file: {},
			error: '',
		});
	},

  onSubmit(e) {
    e.preventDefault();
    const self = this;
    const {file} = this.state;
    const {isEdit, isLicense, license_id, insurance_id} = this.props;
    // if (!file) return this.setState({error: {image: ['Please upload a file']}});
    const data = {
      trady_id: self.props.trady_id,
      maintenance_request_id: self.props.maintenance_request_id,
    }
    if (isEdit) {
      if (isLicense) data.license_id = license_id;
      else data.insurance_id = insurance_id;
    }

    // if (!isLicense) {
    //   data.insurance_company = self.insurance_company.value;
    //   data.policy_number = self.policy_number.value;
    //   data.policy_expiry_date = self.policy_expiry_date.value;
    // }

    $.ajax({
      type: self.props.isEdit ? 'PUT' : 'POST',
      url: self.props.isLicense ? '/licenses' : '/insurances',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: {
        [isLicense ? 'license' : 'insurance']: data,
        picture: {
          image: file && JSON.stringify(file),
        },
      },
      success(res) {
        self.setState({error: res.error || {}});
      },
      error(err) {

      }
    });
  },

  removeError: function({ target: { id } }) {
    let error     = Object.assign({}, this.state.error);
    if (error[id]) {
      error[id] = false;
      this.setState({ error });
    }
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  render() {
    const {file, error, haveDocument} = this.state;
    const {isLicense} = this.props;
    const renderErrorFunc = this.renderError;
    const removeErrorFunc = this.removeError;

    return (
      <div className="upload-file">
        <form role="form" className="form-horizontal" id="upload-license-insurance" onSubmit={this.onSubmit} >
          <div className="upload-description">
            {this.state.text}
          </div>
          {/* {!isLicense && <div className="form-group">
            <div className="col-sm-10 text-center">
              <input
                type="text"
                id="insurance_company"
                placeholder="Insurance Company"
                defaultValue={this.props.insurance_company}
                ref={(ref) => this.insurance_company = ref}
                className={"form-control " + (error['insurance_company'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(error['insurance_company'])}
            </div>
          </div>}
          {!isLicense && <div className="form-group">
            <div className="col-sm-10 text-center">
              <input
                type="text"
                id="policy_number"
                placeholder="Policy Number"
                defaultValue={this.props.policy_number}
                ref={(ref) => this.policy_number = ref}
                className={"form-control " + (error['policy_number'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(error['policy_number'])}
            </div>
          </div>}
          {!isLicense && <div className="form-group">
            <div className="col-sm-10 text-center">
              <input
                type="text"
                id="policy_expiry_date"
                placeholder="Policy Expiry Date"
                defaultValue={this.props.policy_expiry_date}
                ref={(ref) => this.policy_expiry_date = ref}
                className={"form-control " + (error['policy_expiry_date'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(error['policy_expiry_date'])}
            </div>
          </div>} */}
          <div className="do-you-have text-center">
            Do you have business insurance?
            <div className="radio-same-address">
              <label className="radio-option">No
                <input
                  type="radio"
                  name="haveDocument"
                  value={false}
                  onChange={() => this.setState({haveDocument: false, error: {}})}
                  defaultChecked={!haveDocument}
                />
                <span className="radio-checkmark"></span>
              </label>
              <label className="radio-option">Yes
                <input
                  type="radio"
                  name="haveDocument"
                  value={true}
                  onChange={() => this.setState({haveDocument: true, error: {}})}
                  defaultChecked={!!haveDocument}
                />
                <span className="radio-checkmark"></span>
              </label>
            </div>
          </div>
          { !isLicense && 
            <div className={"alert " + (haveDocument ? 'alert-message' : 'alert-danger')}>
              Please note that to successfully be awarded jobs from property agencies, companies are required to have business insurance. As evidence we require you to upload a photo or PDF file of the insurance certificate of currency.(This is provided to you by your insurance company)
            </div>
          }
          {haveDocument && 
            <div className="file-upload text-center">
              {
                file && file.id ?
                  <div className="file-pdf" >
                    <span>
                      {file.metadata.filename}
                    </span>
                    <i className="fa fa-file-o" />
                    <span className="remove-text" onClick={this.removeFile}>Remove</span>
                  </div>
                  :
                  <div className="browse-wrap">
                    <div className="title" id="title-upload">
                      <i className="fa fa-upload" />
                      {isLicense 
                        ? "Upload Image/PDF of professional license"
                        : "Upload Image/PDF of license insurance certificate of currency/work cover"
                      }
                    </div>
                    <input
                      type="file"
                      id="input-file"
                      className="upload inputfile"
                      accept="image/jpeg, image/png, application/pdf"
                      onChange={(e) => this._handleChangeFile(e)}
                    />
                  </div>
              }
            </div>
          }
          {renderErrorFunc(error['image'])}
          <div className="buttons">
            <button type="submit" className="button-primary green option-button">
              {!haveDocument ? "Skip for now" : isLicense ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    )
  }
})