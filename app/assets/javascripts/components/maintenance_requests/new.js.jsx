var setSubmitFlag = false;
var MaintenanceRequestsNew = React.createClass({
	getInitialState() {
    	return { 
			images: [],
			validName: false,
			validEmail: false,
			validMobile: false,
			validDate: false,
		};
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
		if(!this.state.validName || !this.state.validEmail || !this.state.validMobile || !this.state.validDate) {
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
		XHR.send(FD);
		e.preventDefault();				
	},

	validateEmail: function(inputText, e, agentFlag){
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!inputText.match(mailformat)){
			if(agentFlag == false)
				document.getElementById("errorboxemail").textContent = strInvalidEmail;
			else
				document.getElementById("errAgentEamil").textContent = strInvalidEmail;
			e.target.classList.add("border_on_error");
			this.setState({validEmail: false});
		}
		else{
			if(agentFlag == false)
				document.getElementById("errorboxemail").textContent = strNone;
			else
				document.getElementById("errAgentEamil").textContent = strNone;
			e.target.classList.remove("border_on_error");
			this.setState({validEmail: true});
		}
	},

	validatePhoneNumber:function(inputText, e, agentFlag){
		var numbers = /^[0-9]+$/;
		if(inputText.match(numbers)){
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
				<input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
				<div className="field">
					<p> Name </p>
			  		<input type="text" placeholder="Full name"
			  	  		 name={this.generateAtt("name", "name")}
			  	  		   id={this.generateAtt("id", "name")} 
					   onBlur={(e) => {
							if (!e.target.value.length) {
									document.getElementById("errorbox").textContent = strRequireName;
									e.target.classList.add("border_on_error");
									this.setState({validName: false});
								}
							else if(e.target.value.length < 4){
									document.getElementById("errorbox").textContent = strShortName;
									e.target.classList.add("border_on_error");
									this.setState({validName: false});
								}
							else if(e.target.value.length >= 4){
									document.getElementById("errorbox").textContent = strNone;
									e.target.classList.remove("border_on_error");
									this.setState({validName: true});
								}
							}} 	required />
					<p id="errorbox" className="error"></p>
					
					<p> Email </p>
					<input type="email" placeholder="E-mail"
	 	           		  name={this.generateAtt("name", "email")}
	 	           		   	id={this.generateAtt("id", "email")}
						onBlur={(e) => {
							if (!e.target.value.length) {
									document.getElementById("errorboxemail").textContent = strRequireEmail;
									e.target.classList.add("border_on_error");
									this.setState({validEmail: false});
								}
							else if(e.target.value.length < 4){
									document.getElementById("errorboxemail").textContent = strShortEmail;
									e.target.classList.add("border_on_error");
									this.setState({validEmail: false});
								}
							else if(e.target.value.length >= 4){
									this.validateEmail(e.target.value, e, false);
								}
							}}  required />
					<p id="errorboxemail" className="error"></p>
					
					<p> Mobile </p>
		        	<input type="tel" placeholder="Mobile"
						name={this.generateAtt("name", "mobile")}
						  id={this.generateAtt("id", "mobile")}
					  onBlur={(e) => {
						if (!e.target.value.length) {
								document.getElementById("errorboxmobile").textContent = strRequireMobile;
								e.target.classList.add("border_on_error");
								this.setState({validMobile: false});
							}
						else if(e.target.value.length < 8){
								document.getElementById("errorboxmobile").textContent = strShortMobile;
								e.target.classList.add("border_on_error");
								this.setState({validMobile: false});
							}
						if(e.target.value.length >= 8){
								this.validatePhoneNumber(e.target.value, e, false);
							}
						}} maxLength="10" required />																														
					<p id="errorboxmobile" className="error"></p>
				</div>
				
				<hr/>
				
				<div id="access_contacts">
					<FieldList SampleField={AccessContactField} />
				</div>

				<hr/>

				<div className="field">
					<p> Maintenance heading </p>
					<input type="text"
						  name={this.generateAtt("name", "maintenance_heading")}
							id={this.generateAtt("id", "maintenance_heading")}
						/>

					<p> Maintenance description </p>
					<textarea 
						  name={this.generateAtt("name", "maintenance_description")}
							id={this.generateAtt("id", "maintenance_description")} >
					</textarea>
					<p id="errorboxdescription" className="error"></p>

					<p> Images </p>
					<input className="fileInput" type="file" name="maintenance_request[maintenance_request_image_attributes][images][]" id="maintenance_request_maintenance_request_image_attributes_images" onChange={(e)=>this._handleImageChange(e)} multiple />
							
					<div className="imgPreview">{$imagePreview}</div>

				</div>

				{ (!this.props.current_user || this.props.current_user.tenant) ?
					<div className="field">
						<hr/>
						<div className="person_in_charge">
							<label className="one-half column">
								<input type="radio" value="Agent"
									   name={this.generateAtt("name", "person_in_charge")}
									     id={this.generateAtt("id", "person_in_charge_agent")} required />
								Agent
							</label>

							<label className="one-half column">
							    <input type="radio" value="Owner"
							    	   name={this.generateAtt("name", "person_in_charge")}
							    	     id={this.generateAtt("id", "person_in_charge_owner")} required />
								Owner
				    	    </label>
						</div>

						<div>
							<p> Real estate office </p>
							<input type="text"
								   name={this.generateAtt("name", "real_estate_office")}
								     id={this.generateAtt("id", "real_estate_office")} 
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
									}} 	required />
							<p id="errRealEstateOffice" className="error"></p>

	 						<p> Agent name </p>
							<input type="text"
								   name={this.generateAtt("name", "agent_name")}
								     id={this.generateAtt("id", "agent_name")} 
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
									}} 	required />
							<p id="errAgentName" className="error"></p>

	 						<p> Agent email </p>
							<input type="text"
								   name={this.generateAtt("name", "agent_email")}
								     id={this.generateAtt("id", "agent_email")} 
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
									}}  required />
							<p id="errAgentEamil" className="error"></p>
	 						<p> Agent mobile </p>
							<input type="text"
								   name={this.generateAtt("name", "agent_mobile")}
								     id={this.generateAtt("id", "agent_mobile")} 
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
									}} maxLength="10" required />
							<p id="errAgentMobile" className="error"></p>
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
				<input type="submit" className="button-primary green" name="commit" value="Submit Maintenance Request" data-disable-with="Submit Maintenance Request" />
			</form>
		);
	}	
});