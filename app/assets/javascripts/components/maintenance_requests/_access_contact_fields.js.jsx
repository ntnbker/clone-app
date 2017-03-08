
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

    render : function() {
      var accessContact = this.props.content;
      var x= this.props.x;
      if (accessContact) {
          x = accessContact.id;
      }
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
  		  	  		   id={this.generateAtt("id", x, "name")} />

  		  	  <p> Email </p>
   	          <input type="email" placeholder="E-mail"
   	           		 name={this.generateAtt("name", x, "email")}
   	           		   id={this.generateAtt("id", x, "email")} />
   	           		   
 	      	  <p> Mobile </p>
	          <input type="tel" placeholder="Mobile"
	          		 name={this.generateAtt("name", x, "mobile")}
	          		   id={this.generateAtt("id", x, "mobile")} />

            <input type="hidden" value={this.state.remove}
                name={this.generateAtt("name", x, "_destroy")}
                  id={this.generateAtt("id", x, "_destroy")} />
          </fieldset>
          <button type="button" className="button-remove button-primary red" onClick={this.removeField}> Remove </button>
      	</div>
      );
    }
});