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
		const files = e.target.files;
		var reader = new FileReader();
		var images = this.state.images;
		readFile = (index) => {
			if (index >= files.length) {
				this.setState({
					images: images
				});
				e.target.value = '';
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
					images.push({url: e.target.result, fileInfo: file, isUpload: false});
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

	removeImage: function(index) {
		let {images, dataImages} = this.state;
		images.splice(index, 1);
		dataImages.splice(index, 1);
		this.setState({
			images: images,
			dataImages: dataImages
		});
	},

	loadImage: function(e, image, key) {
		const img = e.target;
		const maxSize = 250000; // byte
		const self = this;
		if(!image.isUpload) {
			var target_img = {};
			var {images} = this.state;
			var file = image.fileInfo;
			image.isUpload = true;
			images[key] = image;
			this.setState({
				images: images
			});

			if(file.size > maxSize) {
				var quality =  Math.ceil(maxSize/file.size * 100);
				target_img.src = self.reduceQuality(img, file.type, quality).src;
			}else {
				target_img.src = image.url;
			}

			var filename = file;
			const options = {
				extension: filename.name.match(/(\.\w+)?$/)[0],
				_: Date.now(),
			}

			// start upload file into S3
			$.getJSON('/images/cache/presign', options, function(result) {
				var fd = new FormData();
				$.each(result.fields, function(key, value) {
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
							var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
							var progress = $('.progress');
							if(progress.length == 0) {
								$('<div class="progress" style="width: 80%;"><div class="progress-bar" style="width: ' +  percentComplete + '%"></div></div>').insertAfter("#input-file");
							}else {
								var progressBar = $('.progress .progress-bar');
								progressBar.css('width', percentComplete + '%');
							}
							$('#title-upload').html('Uploading ' + percentComplete + '%');
						}, false);
						return xhr;
					},
					success: function() {
						setTimeout(function() {
							$('#title-upload').html('<i class="fa fa-upload" /> Choose a file to upload');
							$('.progress').remove();
						}, 1000);
						var image = {
							id: result.fields.key.match(/cache\/(.+)/)[1],
							storage: 'cache',
							metadata: {
								size:  file.size,
								filename:  file.name.match(/[^\/\\]*$/)[0],
								mime_type: file.type
							}
						};
						self.updateImage(image);
					}
				});
			});
		}
	},

	componentDidMount: function() {

		/*Dropzone.autoDiscover = false;
		this.dropzone = new Dropzone('#upload-image', {
			maxFilesize: 10,
			resizeWidth: 960,
			resizeHeight: 600,
			filesizeBase: 1000,
			resizeQuality: 0.5,
			parallelUploads: 10,
			thumbnailWidth: 120,
			addRemoveLinks: true,
			thumbnailHeight: 120,
			dictRemoveFile: "Remove"
		});

		this.dropzone.on("removedfile", function(file) {
			currentThis.removeImage(file); 
		});

		this.dropzone.uploadFiles = function(files) {
			var self = this;

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var filename = file;
				const options = {
					extension: filename.name.match(/(\.\w+)?$/)[0],
					_: Date.now(),
				}

				// start upload file into S3
				$.getJSON('/images/cache/presign', options, function(result) {
					var fd = new FormData();
					$.each(result.fields, function(key, value) {
						fd.append(key, value);
					});
					var source = {};
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						source = e.target.result;
						fd.append('file', currentThis.dataURItoBlob(source));
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
										size:  file.size,
										filename:  file.name.match(/[^\/\\]*$/)[0],
										mime_type: file.type
									}
								};
								currentThis.updateImage(image);
							}
						});
					}
	      });
      }
    }*/
  },

	reduceQuality: function(source_img, type, quality) {
		var mime_type = "image/jpeg";
		if(typeof output_format !== "undefined" && output_format=="image/png"){
			mime_type = "image/png";
		}


		var cvs = document.createElement('canvas');
		cvs.width = source_img.naturalWidth;
		cvs.height = source_img.naturalHeight;
		var ctx = cvs.getContext("2d").drawImage(source_img, 0, 0);
		var newImageData = cvs.toDataURL(mime_type, quality/100);
		var result_image = new Image();
		result_image.src = newImageData;
		return result_image;
	},

  dataURItoBlob: function(dataURI) {
    'use strict'
    var byteString, 
        mimestring 

    if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
        byteString = atob(dataURI.split(',')[1])
    } else {
        byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], {type: mimestring});
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
				<form key="add" role="form" id="new_maintenance_request" encType="multipart/form-data" acceptCharset="UTF-8" onSubmit={(e) =>this.handleCheckSubmit(e)} >
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
						type="text" 
						minLength="10"
						maxLength="11"
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
						<div className="browse-wrap">
							<div className="title" id="title-upload">
								<i className="fa fa-upload" />
								Choose a file to upload
							</div>
							<input 
								multiple
								type="file"
								id="input-file"
								className="upload inputfile" 
								accept="image/jpeg, image/png"
								onChange={(e)=>this._handleImageChange(e)}
							/>
						</div>
						<div id="img-render">
							{
								images.map((img, index) => {
									return (
										<div key={index} className="img">
											<img  
												src={img.url}
												onLoad={(e, image, key) => this.loadImage(e, img, index)}
											/>
											<a className="remove" onClick={(key) => this.removeImage(index)}>Remove</a>
										</div>
									);
								})
							}
						</div>
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
											maxLength="11"
											minLength="10"
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