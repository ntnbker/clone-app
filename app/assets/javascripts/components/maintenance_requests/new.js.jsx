var setSubmitFlag = false;
var MaintenanceRequestsNew = React.createClass({
	getInitialState() {
		this.getAgentEmail();
  	return { 
			images: [],
			isAgent: false,
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
		const email = e.target.value;
		for(var i = 0; i < this.state.agent_emails.length; i++) {
			const item = this.state.agent_emails[i];
			if(!!email && email == item.email) {
				this.setState({
					isAgent: true
				});
				break;
			}
		}
	},

	handleRadioChange: function(e) {
		const value = e.currentTarget.value;
		if(value == "Owner") {
			this.setState({
	      isAgent: false
	    });
		}
		this.setState({
      selectedRadio: value
    });
	},

  generateAtt(name_id, type) {
  	if (name_id == "name") {
  		return "maintenance_request[" + type + "]";
  	}
  	else if (name_id == "id") {
  		return "maintenance_request_" + type;
  	}
  },

	_handleRemoveFrame(e) {
		let {images} = this.state;
		var index = e.target.id;
		images.splice(index, 1);
		this.setState({images: images});
	},

	_handleImageChange(e) {
		e.preventDefault();
		var files = e.target.files;
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

	handleCheckSubmit: function(e) {
		if(!!this.state.validName || !!this.state.validEmail || !!this.state.validMobile || !!this.state.validHeading || !!this.state.validDescription) {
			e.preventDefault();
			document.getElementById("errCantSubmit").textContent = strCantSubmit;
			return;
		}
		var XHR = new XMLHttpRequest();
		var FD = new FormData(document.getElementById('new_maintenance_request'));
		FD.delete('maintenance_request[maintenance_request_image_attributes][images][]');
		FD.delete('commit');
		this.state.images.map((image, index) => {
			var idx = index + 1;
			FD.append('maintenance_request[maintenance_request_image_attributes][images][]', image.fileInfo, image.fileInfo.name);
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
			if(validationObject['maintenance_heading'] != undefined) {
				document.getElementById("errorboxheading").textContent = strErrHeading;
				document.getElementById("errorboxheading").classList.add("border_on_error");
			}
			if(validationObject['maintenance_description'] != undefined) {
				document.getElementById("errorboxdescription").textContent = strErrDescription;
				document.getElementById("errorboxdescription").classList.add("border_on_error");
			}
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
					<FieldList SampleField={AccessContactField} />
				</div>

				<hr/>

				<div className="field">
					<p> Maintenance heading </p>
					<input
						required
						type="text"
						ref={(ref) => this.maintenance_heading = ref}
						id={this.generateAtt("id", "maintenance_heading")}
					  name={this.generateAtt("name", "maintenance_heading")}
						onBlur={(e) => {
							if (!e.target.value.length) {
								document.getElementById("errorboxheading").textContent = strErrHeading;
								e.target.classList.add("border_on_error");
								this.setState({validHeading: true});
							}
							else {
								document.getElementById("errorboxheading").textContent = "";
								e.target.classList.remove("border_on_error");
								this.setState({validHeading: false});
							}
						}} 
				 	/>
					<p id="errorboxheading" className="error"></p>

					<p> Maintenance description </p>
					<textarea 
						required
						ref={(ref) => this.maintenance_description = ref}
						id={this.generateAtt("id", "maintenance_description")} 
					  name={this.generateAtt("name", "maintenance_description")}
						onBlur={(e) => {
							if (!e.target.value.length) {
								document.getElementById("errorboxdescription").textContent = strErrDescription;
								e.target.classList.add("border_on_error");
								this.setState({validDescription: true});
							}
							else {
								document.getElementById("errorboxdescription").textContent = "";
								e.target.classList.reqmove("border_on_error");
								this.setState({validDescription: false});
							}
						}} 
					>
					</textarea>
					<p id="errorboxdescription" className="error"></p>

					<p> Images </p>
					<input 
						multiple 
						type="file" 
						className="fileInput" 
						multiple
						onChange={(e)=>this._handleImageChange(e)} 
						id="maintenance_request_maintenance_request_image_attributes_images" 
						name="maintenance_request[maintenance_request_image_attributes][images][]" 
					/>
							
					<div className="imgPreview">{$imagePreview}</div>

				</div>

				{ (!this.props.current_user || this.props.current_user.tenant) ?
					<div className="field">
						<hr/>
						<div className="person_in_charge">
							<label className="one-half column">
								<input 
							    required 
									type="radio" 
									value="Agent"
									onChange={this.handleRadioChange}
									ref={(ref) => this.person_in_charge = ref}
									name={this.generateAtt("name", "person_in_charge")}
							    id={this.generateAtt("id", "person_in_charge_agent")} 
									defaultChecked={this.state.selectedRadio == "Agent" ? "checked" : false}
						    />
								Agent
							</label>

							<label className="one-half column">
						    <input 
					    	  required 
						    	type="radio" 
						    	value="Owner"
						    	onChange={this.handleRadioChange}
					    		ref={(ref) => this.person_in_charge = ref}
					    	  name={this.generateAtt("name", "person_in_charge")}
					    	  id={this.generateAtt("id", "person_in_charge_owner")} 
					    	  defaultChecked={this.state.selectedRadio == "Owner" ? "checked" : false}
				    	  />
								Owner
		    	    </label>
						</div>

						<div>
							<p> Agent email </p>
							<input 
								required
								type="text"
								ref={(ref) => this.agent_email = ref}
								onChange={this.state.selectedRadio == "Agent" ? this.checkAgentEmail : null}
					     	id={this.generateAtt("id", "agent_email")} 
						   	name={this.generateAtt("name", "agent_email")}
							 	onBlur={(e) => {
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
									}}/>
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
													document.getElementById("errRealEstateOffice").textContent = strRequireText;
													e.target.classList.add("border_on_error");
												}
											else if(e.target.value.length < 4){
													document.getElementById("errRealEstateOffice").textContent = strShortRealEstate;
													e.target.classList.add("border_on_error");
												}
											else if(e.target.value.length >= 4){
													document.getElementById("errRealEstateOffice").textContent = strNone;
													e.target.classList.remove("border_on_error");
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
													document.getElementById("errAgentName").textContent = strRequireName;
													e.target.classList.add("border_on_error");
												}
											else if(e.target.value.length < 4){
													document.getElementById("errAgentName").textContent = strShortName;
													e.target.classList.add("border_on_error");
												}
											else if(e.target.value.length >= 4){
													document.getElementById("errAgentName").textContent = strNone;
													e.target.classList.remove("border_on_error");
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
													document.getElementById("errAgentMobile").textContent = strRequireMobile;
													e.target.classList.add("border_on_error");
												}
											else if(e.target.value.length < 8){
													document.getElementById("errAgentMobile").textContent = strShortMobile;
													e.target.classList.add("border_on_error");
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
					<FieldList SampleField={AvailabilityField} />
				</div>
				
				<hr/>
				<p id="errCantSubmit" className="error"></p>
				<button type="submit" className="button-primary green" name="commit">
					Submit Maintenance Request
				</button>
			</form>
		);
	}	
});