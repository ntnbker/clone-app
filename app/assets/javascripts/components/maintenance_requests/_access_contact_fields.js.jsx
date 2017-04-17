var AccessContactField = React.createClass({
    getInitialState : function() {
        return {
            remove : false
        }
    },

    generateAtt(name_id, x, type) {
    	if (name_id == "name") {
    		return "maintenance_request[access_contacts_attributes][" + x + "][" + type + "]";
    	}
    	else if (name_id == "id") {
    		return "maintenance_request_access_contacts_attributes_" + x + "_" + type;
    	}
    },

    removeField() {
        this.setState({remove: true});
    },
    
    validateEmail: function(inputText, e, emailid) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      errorMessage = '';
      if(!inputText.match(mailformat)) {
        errorMessage = 'Invalid Email Address!';
        document.getElementById(emailid).textContent = errorMessage;
				e.target.classList.add("border_on_error");
      } else {
        document.getElementById(emailid).textContent = errorMessage;
				e.target.classList.remove("border_on_error");
      }
    },

    validatePhoneNumber:function(inputText, e, mobileid) {
      var numbers = /^[0-9]+$/;
      if(inputText.match(numbers)) {
        errorMessage = '';
        document.getElementById(mobileid).textContent = errorMessage;
				e.target.classList.remove("border_on_error");
      } else {
        errorMessage = 'Invalid Mobile Number!';
        document.getElementById(mobileid).textContent = errorMessage;
				e.target.classList.add("border_on_error");
      }
    },

    render : function() {
      var accessContact = this.props.content;
      var x= this.props.x;
      if (accessContact) {
          x = accessContact.id;
      }
			var $fullnameid = 'errorboxfullname'+x;
			var $emailid='errorboxemail'+x;
			var $mobileid='errorboxmobile'+x;
      return (
        <div className="accesscontactfield" style={{display: this.state.remove ? 'none' : 'block' }}>
          <fieldset>
            <p> Relation </p>
        	  <select name={this.generateAtt("name", x, "relation")}
          	  			  id={this.generateAtt("id", x, "relation")} >
  		  	    <option value="Tenant">Tenant</option>
  		  	    <option value="Husband">Husband</option>
  		  	    <option value="Son">Son</option>
  		  	    <option value="Wife">Wife</option>
  		  	  </select>

  		  	  <p> Name </p>
  		  	  <input type="text" placeholder="Full name"
  		  	  		 name={this.generateAtt("name", x, "name")}
  		  	  		   id={this.generateAtt("id", x, "name")}
							 onBlur={(e) => {
								let valid = true;
								let errorMessage = '';
								if (!e.target.value.length) {
										valid = false;
										errorMessage = 'This field is required';
										document.getElementById($fullnameid).textContent = errorMessage;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length < 4) {
										valid = false;
										errorMessage = 'Full Name must be more than 3 letters';
										document.getElementById($fullnameid).textContent = errorMessage;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length >= 4) {
										valid = false;
										errorMessage = '';
										document.getElementById($fullnameid).textContent = errorMessage;
										e.target.classList.remove("border_on_error");
									}
								}} />
					<p id={$fullnameid} className="error"></p>

  		  	<p> Email </p>
					<input type="email" placeholder="E-mail"
								name={this.generateAtt("name", x, "email")}
									id={this.generateAtt("id", x, "email")} 
							onBlur={(e) => {
								let valid = true;
								let errorMessage = '';
								if (!e.target.value.length) {
										valid = false;
										errorMessage = 'This field is required';
										document.getElementById($emailid).textContent = errorMessage;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length < 4) {
										valid = false;
										errorMessage = 'Name must be more than 3 letters';
										document.getElementById($emailid).textContent = errorMessage;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length >= 4) {
										this.validateEmail(e.target.value, e, $emailid);
									}
								}}  />
					<p id={$emailid} className="error"></p>

					<p> Mobile </p>
					<input type="tel" placeholder="Mobile"
								name={this.generateAtt("name", x, "mobile")}
									id={this.generateAtt("id", x, "mobile")}
							onBlur={(e) => {
								let valid = true;
								let errorMessage = '';
								if (!e.target.value.length) {
										errorMessage = 'Mobile Number is required';
										document.getElementById($mobileid).textContent = errorMessage;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length < 8) {
										errorMessage = 'Mobile Number must be more than 8 digits';
										document.getElementById($mobileid).textContent = errorMessage;
										e.target.classList.add("border_on_error");
									}
								if(e.target.value.length >= 8) {
										this.validatePhoneNumber(e.target.value, e, $mobileid);
									}
								}} maxLength="10" />
						<p id={$mobileid} className="error"></p>

            <input type="hidden" value={this.state.remove}
                name={this.generateAtt("name", x, "_destroy")}
                  id={this.generateAtt("id", x, "_destroy")} />
          </fieldset>
          <button type="button" className="button-remove button-primary red" onClick={this.removeField}> Remove </button>
      	</div>
      );
    }
});