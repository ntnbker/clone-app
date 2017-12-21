const SUCCESS_MESSAGE = 'Thank you for uploading your profile image.';

UploadImageComponent = React.createClass({
  getInitialState: function () {
    // this.getAgentEmail();
    return {
      images: [],
      fileDisabled: false,
      totalFile: 0,
      dataImages: [],
      totalProgress: 0,
      totalSize: 0,
      uploadComplete: false,
      gallery: this.props.gallery || [],
      errors: {},
    };
  },


  componentDidMount: function () {
    this.detectAndroid();
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      gallery: nextProps.gallery || [],
    });
  },

  getOrientation: function (result) {
    var view = new DataView(result);
    try {
      if (view.getUint16(0, false) != 0xFFD8) return -2;
    }
    catch (e) {
      return -2;
    }
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
      dataImages: dataImages,
      error: '',
    });
    if (!dataImages.length) {
      this.setState({ uploadComplete: false });
    }
  },

  loadImage: function (e, image, key, isError) {
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

      if (isError) {
        image.isPdf = target_img.src.includes('data:application/pdf');
        image.isInvalid = !image.isPdf;
      }
      image.url = target_img.src;
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
                totalProgress: 0,
                uploadComplete: true
              });
              setTimeout(function () {
                $('#title-upload').html('<i class="fa fa-upload" /> Choose image to change');
                $('.progress').remove();
              }, 200);
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

  submit: function (e) {
    e.preventDefault();
    const self = this;
    const { dataImages } = self.state;
    if (dataImages.length == 0) {
      return;
    }

    self.props.uploadImage(dataImages, function(error, message) {
      if (error) {
        return self.setState({ error: error.image && error.image[0] });
      }
      self.props.notifyAddPhoto(message || SUCCESS_MESSAGE);
      // self.props.close();
    });
    return false;
  },

  render: function () {
    const { images, gallery, uploadComplete, error } = this.state;

    const uploadButton = !uploadComplete
      ? <div className="browse-wrap">
          <div className="title" id="title-upload">
            <i className="fa fa-upload" />
            { this.props.chooseImageText ||
              "Choose/Take a picture to upload"
            }
          </div>
          <input
            multiple
            type="file"
            id="input-file"
            className={"upload inputfile"}
            accept="image/jpeg, image/png, application/pdf"
            onChange={(e) => this._handleImageChange(e)}
          />
        </div>
      : '';
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form role="form" onSubmit={this.submit}>
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  data-dismiss="modal"
                  onClick={this.props.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title text-center">Add Photo</h4>
              </div>
              <div className="modal-body add-photo">
                <div className="list-img">
                  {
                    gallery && gallery.map((item, key) => {
                      return (
                        <img key={key} src={item.image_url} className="img" />
                      );
                    })
                  }
                  {
                    images.map((img, index) => {
                      return (
                        <div key={index} className="img">
                          { !img.isPdf && !img.isInvalid
                            ? <img
                                src={img.url}
                                className="img"
                                onLoad={(e) => this.loadImage(e, img, index)}
                                onError={(e) => this.loadImage(e, img, index, true)}
                              />
                            : !img.isInvalid
                              ? <div className="file-pdf">
                                  <i className="fa fa-file-pdf-o" />
                                </div>
                              : <div className="file-pdf file-error">
                                  <i className="fa fa-file" />
                                </div>

                          }
                          <i className="fa fa-close" onClick={(key) => this.removeImage(index)} />
                        </div>
                      );
                    })
                  }
                </div>
                {uploadButton}
                <p id="errorbox" className="error">{error ? 'Please remove invalid file!' : ''}</p>
                <p id="errorbox" className="error">{error ? error : ''}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.props.close}
                  className="btn btn-primary cancel"
                >Cancel</button>
                <button
                  type="submit"
                  className="btn btn-default success"
                  onClick={this.submit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
})

ModalMessageAddPhoto = React.createClass({
  render: function () {
    const { close, message } = this.props;
    return (
      <div className="modal-custom fade add-photo">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">Add Photo</h4>
            </div>
            <div className="modal-body">
              <p className="title">{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default success title"
                onClick={close}
                data-dismiss="modal"
              >OK</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ModalImageUpload = React.createClass({

  getInitialState: function() {
    return {
      modal: "",
      isModal: false,
      gallery: this.props.gallery || [],
      errors: {},
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      gallery: nextProps.gallery || [],
    });
  },

  isClose: function() {
    if(this.state.isModal == true) {
      this.setState({
        isModal: false,
        modal: "",
        message: '',
      });
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    var div = document.getElementsByClassName('modal-backdrop in')[0];
    if(div){
      div.parentNode.removeChild(div);
    }
  },

  onModalWith: function(modal, message) {
    this.setState({
      modal: modal,
      isModal: true,
      message,
    });
  },

  notifyAddPhoto: function(message) {
    this.onModalWith('messageAddPhoto', message);
  },

  renderModal: function() {
    if (!this.state.isModal) return '';
    var body = document.getElementsByTagName('body')[0];
    body.className += " modal-open";
    var div = document.getElementsByClassName('modal-backdrop in');

    if(div.length === 0) {
      div = document.createElement('div')
      div.className  = "modal-backdrop in";
      body.appendChild(div);
    }

    switch (this.state.modal) {
      case 'addPhoto':
        return (
          <div id="image_uploader">
            <UploadImageComponent
              close={this.isClose}
              notifyAddPhoto={this.notifyAddPhoto}
              uploadImage={this.props.uploadImage}
              gallery={this.state.gallery}
              authenticity_token={this.props.authenticity_token}
              maintenance_request={this.state.maintenance_request}
              onModalWith={this.onModalWith}
              {...this.props}
            />
          </div>
        );

      case 'messageAddPhoto':
        return (
          <div id="image_uploader">
            <ModalMessageAddPhoto
              close={this.isClose}
              onModalWith={this.onModalWith}
              message={this.state.message}
            />
          </div>
        );
    }
  },

  render: function() {
    const { className, onClick } = this.props;

    return this.renderModal() || (<button
        className={className || 'btn-edit'}
        onClick={() => {
          if (onClick) onClick();
          this.onModalWith('addPhoto')
        }}
      >
        {this.props.text || 'Add Photo'}
      </button>
    )
  }
})
