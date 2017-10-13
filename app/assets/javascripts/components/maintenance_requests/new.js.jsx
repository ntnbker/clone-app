var setSubmitFlag = false;
var MaintenanceRequestsNew = React.createClass({
  getInitialState: function () {
    this.getAgentEmail();
    return {
      images: [],
      fileDisabled: false,
      totalFile: 0,
      isAgent: true,
      dataImages: [],
      totalProgress: 0,
      isAndroid: false,
      validName: false,
      validDate: false,
      validEmail: false,
      validMobile: false,
      agent_emails: null,
      validHeading: false,
      selectedRadio: "Agent",
      validDescription: false,
      totalSize: 0,
      errors: {},
    };
  },

  getAgentEmail: function () {
    const self = this;
    $.ajax({
      type: 'GET',
      url: '/agent_emails',
      success: function (res) {
        self.setState({
          agent_emails: res
        });
      },
      error: function (err) {
        self.setState({
          agent_emails: []
        });
      }
    });
  },

  checkAgentEmail: function (e) {
    if (this.state.selectedRadio == "Agent") {
      const email = e.target.value;
      var flag = false;
      for (var i = 0; i < this.state.agent_emails.length; i++) {
        const item = this.state.agent_emails[i];
        if (!!email && email == item.email) {
          flag = true;
          break;
        }
      }

      this.setState({
        isAgent: flag
      });
    }

    if (!e.target.value.length) {
      document.getElementById("errAgentEamil").textContent = strRequireEmail;
      e.target.classList.add("border_on_error");
    }
    else if (e.target.value.length < 4) {
      document.getElementById("errAgentEamil").textContent = strShortEmail;
      e.target.classList.add("border_on_error");
    }
    else if (e.target.value.length >= 4) {
      this.validateEmail(e.target.value, e, true);
    }
  },

  handleRadioChange: function (e) {
    const value = e.currentTarget.value;
    this.setState({
      selectedRadio: value,
      isAgent: value == "Owner" ? false : true
    });
  },

  generateAtt: function (name_id, type) {
    if (name_id == "name") {
      return "maintenance_request[" + type + "]";
    }
    else if (name_id == "id") {
      return "maintenance_request_" + type;
    }
  },

  _handleRemoveFrame: function (e) {
    let { images, dataImages } = this.state;
    var index = e.target.id;
    images.splice(index, 1);
    dataImages.splice(index, 1);
    this.setState({
      images: images,
      dataImages: dataImages
    });
  },

  _handleImageChange: function (e) {
    const self = this;
    const files = e.target.files;
    var reader = new FileReader();
    var fr = new FileReader();
    var images = this.state.images;
    var orientation;
    self.setState({ fileDisabled: true });
    readFile = (index) => {
      if (index >= files.length) {
        this.setState({
          images: images
        });
        return;
      }
      var file = files[index];
      var fileAlreadyExists = false;
      for (var i = 0; i < images.length; i++) {
        if (images[i].fileInfo.name == file.name && images[i].fileInfo.size == file.size) {
          fileAlreadyExists = true;
          break;
        }
      }
      if (!fileAlreadyExists) {
        var fr = new FileReader();
        fr.readAsArrayBuffer(file);
        fr.onload = function (e) {
          orientation = self.getOrientation(e.target.result);
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            images.push({ url: e.target.result, fileInfo: file, isUpload: false, orientation: orientation });
            self.setState({
              totalFile: index + 1,
              totalSize: self.state.totalSize + file.size
            });
            readFile(index + 1);
          }
        }
      }
      else {
        readFile(index + 1);
      }
    }
    readFile(0);
  },

  getOrientation: function (result) {
    var view = new DataView(result);
    if (view.getUint16(0, false) != 0xFFD8) return -2;
    var length = view.byteLength, offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) return -1;
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return view.getUint16(offset + (i * 12) + 8, little);
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return -1;
  },

  validDate: function (flag) {
    this.setState({
      validDate: flag
    });
  },

  handleCheckSubmit: function (e) {
    e.preventDefault();
    const self = this;

    var FD = new FormData(document.getElementById('new_maintenance_request'));
    self.state.dataImages.map((image, index) => {
      var idx = index + 1;
      FD.append('maintenance_request[images_attributes][' + idx + '][image]', JSON.stringify(image));
    });
    FD.append('commit', 'Submit Maintenance Request');

    var props = self.props;
    $.ajax({
      type: 'POST',
      url: '/maintenance_requests',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', props.authenticity_token);
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

  getFormData: function (object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  },

  validateEmail: function (inputText, e, agentFlag) {
    if (EMAIL_REGEXP.test(inputText)) {
      if (agentFlag == false)
        document.getElementById("errorboxemail").textContent = strNone;
      else
        document.getElementById("errAgentEamil").textContent = strNone;
      e.target.classList.remove("border_on_error");
      this.setState({ validEmail: false });
    }
    else {
      if (agentFlag == false)
        document.getElementById("errorboxemail").textContent = strInvalidEmail;
      else
        document.getElementById("errAgentEamil").textContent = strInvalidEmail;
      e.target.classList.add("border_on_error");
      this.setState({ validEmail: true });
    }
  },

  validatePhoneNumber: function (inputText, e, agentFlag) {
    if (NUMBER_REGEXP.test(inputText)) {
      if (agentFlag == false)
        document.getElementById("errorboxmobile").textContent = strNone;
      else
        document.getElementById("errAgentMobile").textContent = strNone;
      e.target.classList.remove("border_on_error");
      this.setState({ validMobile: false });
    }
    else {
      if (agentFlag == false)
        document.getElementById("errorboxmobile").textContent = strInvalidMobile;
      else
        document.getElementById("errAgentMobile").textContent = strInvalidMobile;
      e.target.classList.add("border_on_error");
      this.setState({ validMobile: true });
    }
  },

  updateImage: function (image) {
    let { dataImages } = this.state;
    dataImages.push(image);
    this.setState({
      dataImages: dataImages
    });
  },

  removeImage: function (index) {
    let { images, dataImages } = this.state;
    images.splice(index, 1);
    dataImages.splice(index, 1);
    this.setState({
      images: images,
      dataImages: dataImages
    });
  },

  loadImage: function (e, image, key) {
    const img = e.target;
    const maxSize = 500000; // byte
    const self = this;
    const { data = {} } = self.state;
    data[key] = 0;
    if (!image.isUpload) {
      var target_img = {};
      var { images } = this.state;
      var file = image.fileInfo;
      image.isUpload = true;

      // resize image
      if (file.size > maxSize) {
        var quality = Math.ceil(maxSize / file.size * 100);
        target_img.src = self.reduceQuality(img, file.type, quality, image.orientation).src;
      } else {
        if (!!this.state.isAndroid) {
          target_img.src = self.reduceQuality(img, file.type, 100, image.orientation).src;
        } else {
          target_img.src = image.url;
        }
      }

      image.url = target_img.src
      images[key] = image;
      this.setState({
        images: images
      });

      var filename = file;
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

        fd.append('file', self.dataURItoBlob(target_img.src));
        $.ajax({
          type: 'POST',
          url: result['url'],
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false,
          data: fd,
          xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
              if (evt.loaded > 0 && evt.total > 0) {
                var progressValue = file.size >= evt.loaded ? evt.loaded - data[key] : file.size - data[key];
                data[key] = evt.loaded;
                var totalProgress = self.state.totalProgress + progressValue;

                self.setState({ totalProgress: totalProgress })

                if (evt.loaded == evt.total) {
                  self.setState({
                    totalFile: self.state.totalFile - 1
                  });
                }

                var percentComplete = Math.ceil(totalProgress / self.state.totalSize * 100);
                var progress = $('.progress');
                if (progress.length == 0) {
                  $('<div class="progress" style="width: 80%;"><div class="progress-bar" style="width: ' + percentComplete + '%"></div></div>').insertAfter("#input-file");
                } else {
                  $('.progress .progress-bar').css('width', percentComplete + '%');
                }
                $('#title-upload').html('Uploading ' + percentComplete + '%');
              }
            }, false);
            return xhr;
          },
          success: function () {
            if (self.state.totalFile == 0) {
              self.setState({
                totalFile: 0,
                fileDisabled: false
              });
              setTimeout(function () {
                $('#title-upload').html('<i class="fa fa-upload" /> Choose a file to upload');
                $('.progress').remove();
              }, 500);
            }
            var image = {
              id: result.fields.key.match(/cache\/(.+)/)[1],
              storage: 'cache',
              metadata: {
                size: file.size,
                filename: file.name.match(/[^\/\\]*$/)[0],
                mime_type: file.type
              }
            };
            self.updateImage(image);
          }
        });
      });
    }
  },

  reduceQuality: function (source_img, type, quality, orientation) {
    var mime_type = "image/jpeg";
    if (typeof output_format !== "undefined" && output_format == "image/png") {
      mime_type = "image/png";
    }

    var cvs = document.createElement('canvas'),
      width = source_img.naturalWidth,
      height = source_img.naturalHeight,
      ctx = cvs.getContext("2d");

    // set proper canvas dimensions before transform & export
    if ([5, 6, 7, 8].indexOf(orientation) > -1) {
      cvs.width = height;
      cvs.height = width;
    } else {
      cvs.width = width;
      cvs.height = height;
    }

    // transform context before drawing image
    switch (orientation) {
      case 2:
        ctx.transform(-1, 0, 0, 1, width, 0);
        break;
      case 3:
        ctx.transform(-1, 0, 0, -1, width, height);
        break;
      case 4:
        ctx.transform(1, 0, 0, -1, 0, height);
        break;
      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        ctx.transform(0, 1, -1, 0, height, 0);
        break;
      case 7:
        ctx.transform(0, -1, -1, 0, height, width);
        break;
      case 8:
        ctx.transform(0, -1, 1, 0, 0, width);
        break;
    }
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.strokeRect(0, 0, cvs.width, cvs.height);
    ctx.lineWidth = 0;
    ctx.drawImage(source_img, 0, 0);
    var newImageData = cvs.toDataURL(mime_type, quality / 100);
    var result_image = new Image();
    result_image.src = newImageData;
    return result_image;
  },

  dataURItoBlob: function (dataURI) {
    var byteString,
      mimestring;

    if (dataURI.split(',')[0].indexOf('base64') !== -1) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], { type: mimestring });
  },

  detectAndroid: function () {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
      this.setState({
        isAndroid: true
      });
    }
  },

  removeError: function({ target: { id } }) {
    let errors     = Object.assign({}, this.state.errors);
    let errorField = id.replace('maintenance_request_', '');
    if (errors[errorField]) {
      errors[errorField] = false;
      this.setState({ errors });
    }
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  componentDidMount: function () {
    this.detectAndroid();
  },

  render: function () {
    let { images, errors } = this.state;
    let $imagePreview = [];
    const { current_user_tenant, current_role } = this.props;
    const renderError = this.renderError;
    let valueEmail = '';
    let valueMobile = '';
    if (current_role && current_role.role == "Tenant") {
      valueEmail = current_user_tenant.email;
      valueMobile = current_user_tenant.mobile;
    }
    if (images.length > 0) {
      for (i = 0; i < images.length; i++) {
        let imageObject = (<div className="imgFrame" key={i}><img src={images[i].url} /><div className="btnRemoveFrame" id={i} onClick={(e) => this._handleRemoveFrame(e)}>X</div></div>);
        $imagePreview.push(imageObject);
      }
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <div>
        <h5 className="text-center color-grey">Enter Tenant Details</h5>
        <form key="add" role="form" id="new_maintenance_request" encType="multipart/form-data" acceptCharset="UTF-8" onSubmit={(e) => this.handleCheckSubmit(e)} >
          <input name="utf8" type="hidden" value="✓" />
          <input
            type="hidden"
            name="authenticity_token"
            value={this.props.authenticity_token}
          />
          <input
            type="hidden"
            value={this.props.service_type}
            name="maintenance_request[service_type]"
            id="maintenance_request_service_type"
          />
          <div className="field">
            <input
              className={(errors['name'] ? ' border_on_error' : '')}
              type="text"
              placeholder="Full name"
              ref={(ref) => this.name = ref}
              id={this.generateAtt("id", "name")}
              name={this.generateAtt("name", "name")}
              onChange={this.removeError}
            />
            {renderError(errors['name'])}

            <input
              className={(errors['email'] ? ' border_on_error' : '')}
              type="email"
              autoCorrect="off"
              autoComplete="off"
              autoCapitalize="off"
              placeholder="E-mail"
              pattern=".{4,}"
              defaultValue={valueEmail}
              title={strShortEmail}
              ref={(ref) => this.email = ref}
              id={this.generateAtt("id", "email")}
              name={this.generateAtt("name", "email")}
              onChange={this.removeError}
            />
            {renderError(errors['email'])}

            <input
              className={(errors['mobile'] ? ' border_on_error' : '')}
              type="text"
              minLength="8"
              maxLength="11"
              pattern=".{8,}"
              placeholder="Mobile"
              title={strShortMobile}
              defaultValue={valueMobile}
              ref={(ref) => this.mobile = ref}
              id={this.generateAtt("id", "mobile")}
              name={this.generateAtt("name", "mobile")}
              onChange={this.removeError}
            />
            {renderError(errors['mobile'])}
          </div>

          <div id="access_contacts" className="m-b-lg">
            <FieldList SampleField={AccessContactField} errors={errors} flag="contact" />
          </div>

          <div className="field">
            <textarea
              className={errors['maintenance_description'] ? 'border_on_error' : ''}
              placeholder="Maintenance Description"
              ref={(ref) => this.maintenance_description = ref}
              id={this.generateAtt("id", "maintenance_description")}
              name={this.generateAtt("name", "maintenance_description")}
              onChange={this.removeError}
            />
            {renderError(errors['maintenance_description'])}

            <textarea
              type="text"
              ref={(ref) => this.maintenance_heading = ref}
              id={this.generateAtt("id", "availability_and_access")}
              name={this.generateAtt("name", "availability_and_access")}
              placeholder="Appointment Availability and Access Instructions"
            />
            <p id="erroravailabilityandaccess" className="error"></p>
            <div className="browse-wrap">
              <div className="title" id="title-upload">
                <i className="fa fa-upload" />
                Choose image to upload
              </div>
              <input
                multiple
                type="file"
                id="input-file"
                className="upload inputfile"
                accept="image/jpeg, image/png"
                onChange={(e) => this._handleImageChange(e)}
                disabled={this.state.fileDisabled}
              />
            </div>
            <div id="img-render">
              {
                images.map((img, index) => {
                  return (
                    <div key={index} className="img">
                      <img
                        src={img.url}
                        className=""
                        onLoad={(e, image, key) => this.loadImage(e, img, index)}
                      />
                      <a className="remove" onClick={(key) => this.removeImage(index)}>Remove</a>
                    </div>
                  );
                })
              }
            </div>
          </div>

          {(!this.props.current_user || this.props.current_user.tenant) ?
            <div className="field">
              <hr />

              <div>
                <input

                  type="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  placeholder="Agent email"
                  // onBlur={this.checkAgentEmail}
                  ref={(ref) => this.agent_email = ref}
                  id={this.generateAtt("id", "agent_email")}
                  name={this.generateAtt("name", "agent_email")}
                  onChange={this.removeError}
                />
                {renderError(errors['agent_email'])}
                {!this.state.isAgent ?
                  <div>
                    <input

                      type="text"
                      pattern=".{4,}"
                      title={strShortRealEstate}
                      placeholder="Real estate office"
                      ref={(ref) => this.real_estate_office = ref}
                      id={this.generateAtt("id", "real_estate_office")}
                      name={this.generateAtt("name", "real_estate_office")}
                      onChange={this.removeError}
                    />
                    {renderError(errors['real_estate_office'])}

                    <input

                      type="text"
                      pattern=".{4,}"
                      placeholder="Agent name"
                      title={strShortName}
                      ref={(ref) => this.agent_name = ref}
                      id={this.generateAtt("id", "agent_name")}
                      name={this.generateAtt("name", "agent_name")}
                      onChange={this.removeError}
                    />
                    {renderError(errors['agent_name'])}

                    <input

                      type="text"
                      maxLength="11"
                      minLength="10"
                      pattern=".{8,}"
                      title={strShortMobile}
                      placeholder="Agent mobile"
                      ref={(ref) => this.agent_mobile = ref}
                      id={this.generateAtt("id", "agent_mobile")}
                      name={this.generateAtt("name", "agent_mobile")}
                      onChange={this.removeError}
                    />
                    {renderError(errors['agent_mobile'])}
                  </div>
                  :
                  null
                }

              </div>
              <hr />
            </div>
            :
            <hr />
          }
          <p id="errCantSubmit" className="error"></p>
          <div className="text-center">
            <button type="submit" className="button-primary green" name="commit">
              Submit Maintenance Request
            </button>
          </div>
        </form>
      </div>
    );
  }
});
