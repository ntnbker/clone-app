var AccessContactField = React.createClass({
    getInitialState : function() {
        return {
            remove : false
        };
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

    changeRelation: function(e, position) {
      if( e.target.value == "Tenant"){
        $("#maintenance_request_access_contacts_attributes_" + position + "_email").attr('required', 'required');
      }else {
        $("#maintenance_request_access_contacts_attributes_" + position + "_email").removeAttr("required");
        $("#maintenance_request_access_contacts_attributes_" + position + "_email").removeClass("border_on_error");
        document.getElementById('errorboxemail' + position).textContent = "";
      }
    },
    
    validateEmail: function(inputText, e, emailid) {
      if(!!e.target.required) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!inputText.match(mailformat)) {
          document.getElementById(emailid).textContent = strInvalidEmail;
          e.target.classList.add("border_on_error");
        } else {
          document.getElementById(emailid).textContent = strNone;
          e.target.classList.remove("border_on_error");
        }
      }
    },

    validatePhoneNumber:function(inputText, e, mobileid) {
      var numbers = /^[0-9]+$/;
      if(inputText.match(numbers)) {
        document.getElementById(mobileid).textContent = strNone;
				e.target.classList.remove("border_on_error");
      } else {
        document.getElementById(mobileid).textContent = strInvalidMobile;
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
            <p> Contenant </p>
        	  <select 
              name={this.generateAtt("name", x, "relation")}
  	  			  id={this.generateAtt("id", x, "relation")}
              onChange={(e) => {this.changeRelation(e, x)}}
            >
  		  	    <option value="Tenant">Tenant</option>
  		  	    <option value="family">Family(Non-tenant)</option>
  		  	    <option value="friend">Friend(Non-tenant)</option>
  		  	  </select>

  		  	  <p> Name </p>
  		  	  <input 
              required="required"
              type="text" placeholder="Full name"
              id={this.generateAtt("id", x, "name")}
	  	  		  name={this.generateAtt("name", x, "name")}
							onBlur={(e) => {
								if (!e.target.value.length) {
										document.getElementById($fullnameid).textContent = strRequireText;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length < 4) {
										document.getElementById($fullnameid).textContent = strShortName;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length >= 4) {
										document.getElementById($fullnameid).textContent = strNone;
										e.target.classList.remove("border_on_error");
									}
								}} />
					<p id={$fullnameid} className="error"></p>

  		  	<p> Email </p>
					<input
            type="email" 
            required="required"
            placeholder="E-mail"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
						id={this.generateAtt("id", x, "email")} 
            name={this.generateAtt("name", x, "email")}
						onBlur={(e) => {
              if(!!e.target.required) {
                if (!e.target.value.length) {
                  document.getElementById($emailid).textContent = strRequireText;
                  e.target.classList.add("border_on_error");
                }
                else if(e.target.value.length < 4) {
                  document.getElementById($emailid).textContent = strShortEmail;
                  e.target.classList.add("border_on_error");
                }
                else if(e.target.value.length >= 4) {
                  this.validateEmail(e.target.value, e, $emailid);
                }
              }
            }}  />
					<p id={$emailid} className="error"></p>

					<p> Mobile </p>
					<input 
            required="required"
            type="tel" placeholder="Mobile"
						name={this.generateAtt("name", x, "mobile")}
						id={this.generateAtt("id", x, "mobile")}
						onBlur={(e) => {
								if (!e.target.value.length) {
										document.getElementById($mobileid).textContent = strRequireMobile;
										e.target.classList.add("border_on_error");
									}
								else if(e.target.value.length < 8) {
										document.getElementById($mobileid).textContent = strShortMobile;
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
          <div className="text-center">
            <button type="button" className="button-remove button-primary red" onClick={(position) => {this.props.removeField(x)}}> Remove </button>
          </div>
      	</div>
      );
    }
});