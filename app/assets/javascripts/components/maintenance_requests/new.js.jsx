var MaintenanceRequestsNew = React.createClass({
    generateAtt(name_id, type) {
    	if (name_id == "name") {
    		return "maintenance_request[" + type + "]";
    	}
    	else if (name_id == "id") {
    		return "maintenance_request_" + type;
    	}
    },
	render: function(){
		return (
			<form role="form" id="new_maintenance_request" encType="multipart/form-data" acceptCharset="UTF-8" action="/maintenance_requests" method="post">
				<input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
				<div className="field">
					<p> Name </p>
			  		<input type="text" placeholder="Full name"
			  	  		 name={this.generateAtt("name", "name")}
			  	  		   id={this.generateAtt("id", "name")} required />

					<p> Email </p>
	 	        	<input type="email" placeholder="E-mail"
	 	           		 name={this.generateAtt("name", "email")}
	 	           		   id={this.generateAtt("id", "email")} required />

					<p> Mobile </p>
		        	<input type="tel" placeholder="Mobile"
		          		 name={this.generateAtt("name", "mobile")}
		          		   id={this.generateAtt("id", "mobile")} required />
				</div>

				<hr/>

				<AccessContactFields />

				<hr/>

				<div className="field">
					<p> Maintenance heading </p>
					<input type="text"
						   name={this.generateAtt("name", "maintenance_heading")}
						     id={this.generateAtt("id", "maintenance_heading")} required />

					<p> Maintenance description </p>
					<textarea 
						   name={this.generateAtt("name", "maintenance_description")}
						     id={this.generateAtt("id", "maintenance_description")} required >
					</textarea>


					<p> Images </p>
					<input multiple="multiple" type="file"
							name="maintenance_request[maintenance_request_image_attributes][images][]"
							  id="maintenance_request_maintenance_request_image_attributes_images" />
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

				<AvailabilityFields />

				<hr/>

				<input type="submit" className="button-primary green" name="commit" value="Submit Maintenance Request" data-disable-with="Submit Maintenance Request" />
			</form>
		);
	}
});