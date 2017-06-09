var setSubmitFlag = false;
var MaintenanceRequestsNew = React.createClass({
	getInitialState: function() {
		this.getAgentEmail();
			return { 
			images: [],
			isAgent: true,
			dataImages: [],
			validName: false,
			validDate: false,
			validEmail: false,
			validMobile: false,
			agent_emails: null,
			validHeading: false,
			selectedRadio: "Agent",
			validDescription: false,
		};
	},

	getAgentEmail: function() {
		const self = this;
		$.ajax({
			type: 'GET',
			url: '/agent_emails',
			success: function(res){
				self.setState({
					agent_emails: res
				});
			},
			error: function(err) {
				self.setState({
					agent_emails: []
				});
			}
		});
	},

	checkAgentEmail: function(e) {
		if(this.state.selectedRadio == "Agent") {
			const email = e.target.value;
			var flag = false;
			for(var i = 0; i < this.state.agent_emails.length; i++) {
				const item = this.state.agent_emails[i];
				if(!!email && email == item.email) {
					flag= true;
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
		else if(e.target.value.length < 4){
			document.getElementById("errAgentEamil").textContent = strShortEmail;
			e.target.classList.add("border_on_error");
		}
		else if(e.target.value.length >= 4){
			this.validateEmail(e.target.value, e, true);
		}
	},

	handleRadioChange: function(e) {
		const value = e.currentTarget.value;
		this.setState({
			selectedRadio: value,
			isAgent: value == "Owner" ? false :true
    });
	},

	generateAtt: function(name_id, type) {
		if (name_id == "name") {
			return "maintenance_request[" + type + "]";
		}
		else if (name_id == "id") {
			return "maintenance_request_" + type;
		}
	},

	_handleRemoveFrame: function(e) {
		let {images, dataImages} = this.state;
		var index = e.target.id;
		images.splice(index, 1);
		dataImages.splice(index, 1);
		this.setState({
			images: images,
			dataImages: dataImages
		});
	},

	_handleImageChange: function(e) {
		var files = e.files;
		var reader = new FileReader();
		var images = this.state.images;
				
		readFile = (index) => {
			if (index >= files.length) {
				this.setState({
					images: images
				});
				return;
			}
			var file = files[index];
			var fileAlreadyExists = false;
			for (var i = 0; i < images.length; i ++) {
				if (images[i].fileInfo.name == file.name) {
					fileAlreadyExists = true;
					break;
				}
			}
			if (!fileAlreadyExists) {
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					images.push({url: e.target.result, fileInfo: file});
					readFile(index + 1);
				}
			}
			else {
				readFile(index + 1);
			}
		}
		readFile(0);
	},

	validDate: function(flag) {
		this.setState({
			validDate: flag
		});
	},

	handleCheckSubmit: function(e) {
		if(!!this.state.validName || !!this.state.validEmail || !!this.state.validMobile || !!this.state.validHeading || !!this.state.validDescription || !!this.state.validDate) {
			e.preventDefault();
			document.getElementById("errCantSubmit").textContent = strCantSubmit;
			return;
		}
		var XHR = new XMLHttpRequest();
		var FD = new FormData(document.getElementById('new_maintenance_request'));
		FD.delete('maintenance_request[images_attributes][image][]');
		FD.delete('commit');
		this.state.dataImages.map((image, index) => {
			var idx = index + 1;
			FD.append('maintenance_request[images_attributes][' + idx + '][image]', JSON.stringify(image));
		});
		FD.append('commit', 'Submit Maintenance Request');
		XHR.addEventListener('loadend', function(event) {
			var validationObject;
			var jsonObject = event.currentTarget.response;
			IsJsonString = (str) => { 
				try {
					JSON.parse(str);
				} catch (e) {
					return false;
				}
				return true; 
			}
			setErrorMessage = (id, strErrorMessage, validateObject) => {
				if(validateObject != undefined) {
					document.getElementById(id).textContent = strErrorMessage;
					document.getElementById(id).classList.add("border_on_error");
				}
			}
			if(IsJsonString(jsonObject) == true)
				validationObject = JSON.parse(jsonObject);
			else
				window.location.href = event.currentTarget.responseURL;
			if(validationObject['name'] != undefined) {
				document.getElementById("errorbox").textContent = strErrName;
				document.getElementById("errorbox").classList.add("border_on_error");
			}
			if(validationObject['email'] != undefined) {
				document.getElementById("errorboxemail").textContent = strErrEmail;
				document.getElementById("errorboxemail").classList.add("border_on_error");
			}
			if(validationObject['mobile'] != undefined) {
				document.getElementById("errorboxmobile").textContent = strErrMobile;
				document.getElementById("errorboxmobile").classList.add("border_on_error");
			}
			/*if(validationObject['maintenance_heading'] != undefined) {
				document.getElementById("errorboxheading").textContent = strErrHeading;
				document.getElementById("errorboxheading").classList.add("border_on_error");
			}
			if(validationObject['maintenance_description'] != undefined) {
				document.getElementById("errorboxdescription").textContent = strErrDescription;
				document.getElementById("errorboxdescription").classList.add("border_on_error");
			}*/
		});
		XHR.open('POST', '/maintenance_requests');
		XHR.setRequestHeader('Accept', 'text/html');
		XHR.setRequestHeader('X-CSRF-Token', this.props.authenticity_token);
		XHR.send(FD);
		e.preventDefault();
  	return false;
	},

	getFormData: function (object) {
	const formData = new FormData();
	Object.keys(object).forEach(key => formData.append(key, object[key]));
	return formData;
	},

	validateEmail: function(inputText, e, agentFlag){
		if(EMAIL_REGEXP.test(inputText)){
			if(agentFlag == false)
				document.getElementById("errorboxemail").textContent = strNone;
			else
				document.getElementById("errAgentEamil").textContent = strNone;
			e.target.classList.remove("border_on_error");
			this.setState({validEmail: false});
		}
		else{
			if(agentFlag == false)
				document.getElementById("errorboxemail").textContent = strInvalidEmail;
			else
				document.getElementById("errAgentEamil").textContent = strInvalidEmail;
			e.target.classList.add("border_on_error");
			this.setState({validEmail: true});
		}
	},

	validatePhoneNumber:function(inputText, e, agentFlag){
		if(NUMBER_REGEXP.test(inputText)){
			if(agentFlag == false)
				document.getElementById("errorboxmobile").textContent = strNone;
			else
				document.getElementById("errAgentMobile").textContent = strNone;
			e.target.classList.remove("border_on_error");
			this.setState({validMobile: false});
		}
		else{
			if(agentFlag == false)
				document.getElementById("errorboxmobile").textContent = strInvalidMobile;
			else
				document.getElementById("errAgentMobile").textContent = strInvalidMobile;
			e.target.classList.add("border_on_error");
			this.setState({validMobile: true});
		}
	},

	updateImage: function(image) {
  	let {dataImages} = this.state;
  	dataImages.push(image);
  	this.setState({
  		dataImages: dataImages
  	});
  },

  removeImage: function(file) {
  	let {dataImages} = this.state;
  	for(var i = 0; i < this.state.dataImages.length; i++ ){
  		var image = this.state.dataImages[i];
  		if(file.name == image.metadata.filename) {
  			dataImages.splice(i, 1);
  			break;
  		}
  	}
		this.setState({
			dataImages: dataImages
		});
  },

	componentDidMount: function() {
		let currentThis = this;
	  $('[type=file]').fileupload({
	    add: function(e, data) {
	      data.progressBar = $('<div class="progress" style="width: 300px"><div class="progress-bar"></div></div>').insertAfter(".form-group");
	      var options = {
	        extension: data.files[0].name.match(/(\.\w+)?$/)[0], // set extension
	        _: Date.now(),                                       // prevent caching
	      }
	      $.getJSON('/images/cache/presign', options, function(result) {
	      	debugger
	        data.formData = result['fields'];
	        data.url = result['url'];
	        data.paramName = 'file';
	        data.submit();
	      });
	    },
	    progress: function(e, data) {
	      var progress = parseInt(data.loaded / data.total * 100, 10);
	      var percentage = progress.toString() + '%'
	      data.progressBar.find(".progress-bar").css("width", percentage).html(percentage);
	    },
	    done: function(e, data) {
	      data.progressBar.remove();
	      var image = {
	        id: data.formData.key.match(/cache\/(.+)/)[1], // we have to remove the prefix part
	        storage: 'cache',
	        metadata: {
	          size:      data.files[0].size,
	          filename:  data.files[0].name.match(/[^\/\\]*$/)[0], // IE returns full path
	          mime_type: data.files[0].type
	        }
	      }
	     	self.updateImage(image);
	      self._handleImageChange(data);
	    }
	  });

    Dropzone.autoDiscover = false;
    this.dropzone = new Dropzone('#demo-upload', {
        parallelUploads: 1,
        thumbnailHeight: 120,
        thumbnailWidth: 120,
        maxFilesize: 10,
        filesizeBase: 1000,
    });

    this.dropzone.on("addedfile", function(file){
	      var removeButton = Dropzone.createElement("<a href=\"#\">Remove file</a>");
        var _this = this;
        removeButton.addEventListener("click", function(e) {
        	currentThis.removeImage(file); 
          e.preventDefault();
          e.stopPropagation();
          _this.removeFile(file);
        });
        file.previewElement.appendChild(removeButton);
    });

    var minSteps = 6,
        maxSteps = 60,
        timeBetweenSteps = 100,
        bytesPerStep = 100000;

    this.dropzone.uploadFiles = function(files) {
      var self = this;

      for (var i = 0; i < files.length; i++) {

      	var file = files[i];
      	var filename = file;
      	const options = {
	        extension: filename.name.match(/(\.\w+)?$/)[0], // set extension
	        _: Date.now(),                                       // prevent caching
	      }

      	// start upload file into S3
	      $.getJSON('/images/cache/presign', options, function(result) {
	      	var fd = new FormData();
	      	$.each(result.fields, function(key, value) {
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
				        //Download progress
				        xhr.upload.addEventListener("progress", function (evt) {
				            var percentComplete = evt.loaded / evt.total;
			              file.upload = {
			                progress: 100 * percentComplete,
			                total: evt.total,
			                bytesSent: evt.loaded
			              };
			              self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
			              if (file.upload.progress == 100) {
			                file.status = Dropzone.SUCCESS;
			                self.emit("success", file, 'success', null);
			                self.emit("complete", file);
			                self.processQueue();
			              }
				        }, false);
				        return xhr;
				    },
	          success: function() {
	          	var image = {
				        id: result.fields.key.match(/cache\/(.+)/)[1],
				        storage: 'cache',
				        metadata: {
				          size:      file.size,
				          filename:  file.name.match(/[^\/\\]*$/)[0],
				          mime_type: file.type
				        }
				      }
				     	currentThis.updateImage(image);
	          }
					});
	      });
      }
    }
  },

	render: function(){
		let {images} = this.state;
		let $imagePreview = [];
		if (images.length > 0) {
			for (i = 0; i < images.length; i ++) {
				let imageObject = (<div className="imgFrame" key={i}><img src={images[i].url} /><div className="btnRemoveFrame" id={i} onClick={(e) =>this._handleRemoveFrame(e)}>X</div></div>);
				$imagePreview.push(imageObject);
				}
			} else {
				$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
			}
		return (
			<div>
				<h1 className="text-center">New Maintenance Request</h1>
				<form role="form" id="new_maintenance_request" encType="multipart/form-data" acceptCharset="UTF-8" onSubmit={(e) =>this.handleCheckSubmit(e)} >
					<input name="utf8" type="hidden" value="✓" /> 
					<input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
					<div className="field">
						<p> Name </p>
			  		<input 
			  			required
			  			type="text"
			  			placeholder="Full name"
			  			ref={(ref) => this.name = ref}
			  	  	id={this.generateAtt("id", "name")} 
	  	  		 	name={this.generateAtt("name", "name")}
					   	onBlur={(e) => {
							if (!e.target.value.length) {
									document.getElementById("errorbox").textContent = strRequireName;
									e.target.classList.add("border_on_error");
									this.setState({validName: true});
							}
							else if(e.target.value.length < 4){
									document.getElementById("errorbox").textContent = strShortName;
									e.target.classList.add("border_on_error");
									this.setState({validName: true});
								}
							else if(e.target.value.length >= 4){
									document.getElementById("errorbox").textContent = strNone;
									e.target.classList.remove("border_on_error");
									this.setState({validName: false});
								}
							}}/>
						<p id="errorbox" className="error"></p>
						
						<p> Email </p>
						<input
							required
							type="email" 
							placeholder="E-mail"
							ref={(ref) => this.email = ref}
				   	id={this.generateAtt("id", "email")}
						  name={this.generateAtt("name", "email")}
							onBlur={(e) => {
								if (!e.target.value.length) {
									document.getElementById("errorboxemail").textContent = strRequireEmail;
									e.target.classList.add("border_on_error");
								}
								else if(e.target.value.length < 4){
									document.getElementById("errorboxemail").textContent = strShortEmail;
									e.target.classList.add("border_on_error");
								}
								else if(e.target.value.length >= 4){
									this.validateEmail(e.target.value, e, false);
								}
							}}/>
						<p id="errorboxemail" className="error"></p>
						
						<p> Mobile </p>
					<input 
						required 
						type="tel" 
						maxLength="10"
						placeholder="Mobile"
						ref={(ref) => this.mobile = ref}
						  id={this.generateAtt("id", "mobile")}
							name={this.generateAtt("name", "mobile")}
						  onBlur={(e) => {
							if (!e.target.value.length) {
									document.getElementById("errorboxmobile").textContent = strRequireMobile;
									e.target.classList.add("border_on_error");
								}
							else if(e.target.value.length < 8){
									document.getElementById("errorboxmobile").textContent = strShortMobile;
									e.target.classList.add("border_on_error");
								}
							if(e.target.value.length >= 8){
									this.validatePhoneNumber(e.target.value, e, false);
								}
							}}/>																														
						<p id="errorboxmobile" className="error"></p>
					</div>

					<hr/>
					<div id="access_contacts">
						<FieldList SampleField={AccessContactField} flag="contact"/>
					</div>

					<hr/>

					<div className="field">
						<p> Maintenance heading </p>
						<input
							type="text"
							ref={(ref) => this.maintenance_heading = ref}
							id={this.generateAtt("id", "maintenance_heading")}
						  name={this.generateAtt("name", "maintenance_heading")}
					 	/>
						<p id="errorboxheading" className="error"></p>

						<p> Maintenance description </p>
						<textarea 
							ref={(ref) => this.maintenance_description = ref}
							id={this.generateAtt("id", "maintenance_description")} 
						  name={this.generateAtt("name", "maintenance_description")}
						>
						</textarea>
						<p id="errorboxdescription" className="error"></p>

						<p> Images </p>
						<form action="/" className="dropzone needsclick dz-clickable" id="demo-upload">
		          <div className="dz-message needsclick">
		            Drop files here or click to upload.
		          </div>
		        </form>

					</div>

					{ (!this.props.current_user || this.props.current_user.tenant) ?
						<div className="field">
							<hr/>

							<div>
								<p> Agent email </p>
								<input 
									required
									type="text"
								 	onBlur={this.checkAgentEmail}
									ref={(ref) => this.agent_email = ref}
								id={this.generateAtt("id", "agent_email")} 
							   	name={this.generateAtt("name", "agent_email")}
							 	/>
								<p id="errAgentEamil" className="error"></p>
								{	!this.state.isAgent ?
										<div>
										<p> Real estate office </p>
										<input
											required 
											type="text"
											ref={(ref) => this.real_estate_office = ref}
										id={this.generateAtt("id", "real_estate_office")} 
									   	name={this.generateAtt("name", "real_estate_office")}
										 	onBlur={(e) => {
												if (!e.target.value.length) {
														e.target.classList.add("border_on_error");
														document.getElementById("errRealEstateOffice").textContent = strRequireText;
													}
												else if(e.target.value.length < 4){
														e.target.classList.add("border_on_error");
														document.getElementById("errRealEstateOffice").textContent = strShortRealEstate;
													}
												else if(e.target.value.length >= 4){
														e.target.classList.remove("border_on_error");
														document.getElementById("errRealEstateOffice").textContent = strNone;
													}
												}}/>
										<p id="errRealEstateOffice" className="error"></p>

				 						<p> Agent name </p>
										<input 
											required
											type="text"
											ref={(ref) => this.agent_name = ref}
										id={this.generateAtt("id", "agent_name")} 
									   	name={this.generateAtt("name", "agent_name")}
										 	onBlur={(e) => {
												if (!e.target.value.length) {
													e.target.classList.add("border_on_error");
													document.getElementById("errAgentName").textContent = strRequireName;
												}
												else if(e.target.value.length < 4){
													e.target.classList.add("border_on_error");
													document.getElementById("errAgentName").textContent = strShortName;
												}
												else if(e.target.value.length >= 4){
													e.target.classList.remove("border_on_error");
													document.getElementById("errAgentName").textContent = strNone;
												}
											}}/>
										<p id="errAgentName" className="error"></p>

				 						<p> Agent mobile </p>
										<input 
											required
											type="text"
											maxLength="10"
											ref={(ref) => this.agent_mobile = ref}
										id={this.generateAtt("id", "agent_mobile")} 
									   	name={this.generateAtt("name", "agent_mobile")}
										 	onBlur={(e) => {
												if (!e.target.value.length) {
													e.target.classList.add("border_on_error");
													document.getElementById("errAgentMobile").textContent = strRequireMobile;
												}
												else if(e.target.value.length < 8){
													e.target.classList.add("border_on_error");
													document.getElementById("errAgentMobile").textContent = strShortMobile;
												}
												if(e.target.value.length >= 8){
													this.validatePhoneNumber(e.target.value, e, true);
												}
											}}/>
										<p id="errAgentMobile" className="error"></p>
										</div>
										:
										null
								}
								
							</div>
							<hr/>
						</div>
						:
						<hr/>
					}

					<div id="availabilities">
						<FieldList SampleField={AvailabilityField} validDate={(flag) => this.validDate(flag)} flag="date"/>
					</div>
					
					<hr/>
					<p id="errCantSubmit" className="error"></p>
					<button type="submit" className="button-primary green" name="commit">
						Submit Maintenance Request
					</button>
				</form>
			</div>
		);
	}	
});