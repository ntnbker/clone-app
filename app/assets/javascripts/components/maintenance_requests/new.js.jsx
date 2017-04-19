var MaintenanceRequestsNew = React.createClass({
	getInitialState() {
    	return { 
			images: [],
			cansubmit: false
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
		if(!this.state.cansubmit) {
			e.preventDefault();
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
			window.location.href = event.currentTarget.responseURL;
			console.log('Yeah! Data sent and response loaded.');
		});

		XHR.addEventListener('error', function(event) {
			console.log('Oups! Something went wrong.');
		});

		XHR.open('POST', '/maintenance_requests');
		XHR.setRequestHeader('Accept', 'text/html');
		XHR.send(FD);
		e.preventDefault();				
	},

	validateEmail: function(inputText,e){
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		errorMessage = '';
		if(!inputText.match(mailformat)){
			errorMessage = 'Invalid Email Address!';
			document.getElementById("errorboxemail").textContent = errorMessage;
			e.target.classList.add("border_on_error");
			this.setState({cansubmit: false});
		}
		else{
			document.getElementById("errorboxemail").textContent = errorMessage;
			e.target.classList.remove("border_on_error");
			this.setState({cansubmit: true});
		}
	},

	validatePhoneNumber:function(inputText,e){
		var numbers = /^[0-9]+$/;
		if(inputText.match(numbers)){
			errorMessage = '';
			document.getElementById("errorboxmobile").textContent = errorMessage;
			e.target.classList.remove("border_on_error");
			this.setState({cansubmit: true});
		}
		else{
			errorMessage = 'Invalid Mobile Number!';
			document.getElementById("errorboxmobile").textContent = errorMessage;
			e.target.classList.add("border_on_error");
			this.setState({cansubmit: false});
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
							let valid = true;
							let errorMessage = '';
							if (!e.target.value.length) {
									valid = false;
									errorMessage = 'Name is required';
									document.getElementById("errorbox").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							else if(e.target.value.length < 4){
									valid = false;
									errorMessage = 'Name must be more than 3 letters';
									document.getElementById("errorbox").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							else if(e.target.value.length >= 4){
									valid = false;
									errorMessage = '';
									document.getElementById("errorbox").textContent = errorMessage;
									e.target.classList.remove("border_on_error");
									this.setState({cansubmit: true});
								}
							}} 	required />
					<p id="errorbox" className="error"></p>
					
					<p> Email </p>
					<input type="email" placeholder="E-mail"
	 	           		  name={this.generateAtt("name", "email")}
	 	           		   	id={this.generateAtt("id", "email")}
						onBlur={(e) => {
							let valid = true;
							let errorMessage = '';
							if (!e.target.value.length) {
									valid = false;
									errorMessage = 'Email Address is required';
									document.getElementById("errorboxemail").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							else if(e.target.value.length < 4){
									valid = false;
									errorMessage = 'Email Address must have more than 3 letters';
									document.getElementById("errorboxemail").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							else if(e.target.value.length >= 4){
									this.validateEmail(e.target.value,e);
								}
							}}  required />
					<p id="errorboxemail" className="error"></p>
					
					<p> Mobile </p>
		        	<input type="tel" placeholder="Mobile"
						name={this.generateAtt("name", "mobile")}
						  id={this.generateAtt("id", "mobile")}
					  onBlur={(e) => {
						let valid = true;
						let errorMessage = '';
						if (!e.target.value.length) {
								errorMessage = 'Mobile Number is required';
								document.getElementById("errorboxmobile").textContent = errorMessage;
								e.target.classList.add("border_on_error");
								this.setState({cansubmit: false});
							}
						else if(e.target.value.length < 8){
								errorMessage = 'Mobile Number must be more than 8 digits';
								document.getElementById("errorboxmobile").textContent = errorMessage;
								e.target.classList.add("border_on_error");
								this.setState({cansubmit: false});
							}
						if(e.target.value.length >= 8){
								this.validatePhoneNumber(e.target.value,e);
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
						onBlur={(e) => {
							let valid = true;
							let errorMessage = '';
							if (!e.target.value.length) {
									valid = false;
									errorMessage = 'This field is required';
									document.getElementById("errorboxheading").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							else if(e.target.value.length < 4){
									valid = false;
									errorMessage = 'Heading must be more than 3 letters';
									document.getElementById("errorboxheading").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							if(e.target.value.length >= 4){
									valid = true;
									errorMessage = '';
									document.getElementById("errorboxheading").textContent = errorMessage;
									e.target.classList.remove("border_on_error");
									this.setState({cansubmit: true});
								}
							}}  required />
					<p id="errorboxheading" className="error"></p>

					<p> Maintenance description </p>
					<textarea 
						  name={this.generateAtt("name", "maintenance_description")}
							id={this.generateAtt("id", "maintenance_description")}
						onBlur={(e) => {
							let valid = true;
							let errorMessage = '';
							if (!e.target.value.length) {
									valid = false;
									errorMessage = 'This field is required';
									document.getElementById("errorboxdescription").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							else if(e.target.value.length < 10){
									valid = false;
									errorMessage = 'Description must be more than 10 letters';
									document.getElementById("errorboxdescription").textContent = errorMessage;
									e.target.classList.add("border_on_error");
									this.setState({cansubmit: false});
								}
							if(e.target.value.length >= 10){
									valid = true;
									errorMessage = '';
									document.getElementById("errorboxdescription").textContent = errorMessage;
									e.target.classList.remove("border_on_error");
									this.setState({cansubmit: true});
								}
							}} required >
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
								     id={this.generateAtt("id", "real_estate_office")} required />

	 						<p> Agent name </p>
							<input type="text"
								   name={this.generateAtt("name", "agent_name")}
								     id={this.generateAtt("id", "agent_name")} required />

	 						<p> Agent email </p>
							<input type="text"
								   name={this.generateAtt("name", "agent_email")}
								     id={this.generateAtt("id", "agent_email")} required />

	 						<p> Agent mobile </p>
							<input type="text"
								   name={this.generateAtt("name", "agent_mobile")}
								     id={this.generateAtt("id", "agent_mobile")} required />
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

				<input type="submit" className="button-primary green" name="commit" value="Submit Maintenance Request" data-disable-with="Submit Maintenance Request" />
			</form>
		);
	}	
});