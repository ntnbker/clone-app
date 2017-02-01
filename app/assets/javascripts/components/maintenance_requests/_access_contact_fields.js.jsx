var FieldList = React.createClass({
    render: function(){    
        return <ul>
            {this.props.fields.map((field, fieldIndex) => 
                <li key={fieldIndex}>
                    {field}
                    <button className="button-remove button-primary red" onClick={this.props.removeField} value={fieldIndex}> Remove </button>
                </li>
            )}
        </ul>;
    }
 });

var AccessContactField = React.createClass({
    getInitialState : function() {
      return {
        currentValue : {relation: '', name: '', email: '', mobile: ''}
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

    onChange(e) {
    	var tmpValue = e.target.value;
      this.setState(state => {
          state.currentValue.relation = tmpValue;
          return {currentValue : state.currentValue};
      });
    },

    render : function() {
      var x = this.props.x;
      var currentValue = this.state.currentValue;
      return (
        <div className="field">
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
          </fieldset>
      	</div>
      );
    }
});

var AccessContactFields = React.createClass({
    getInitialState : function() {
      return {
        fields : [ <AccessContactField x={0}/> ],
        x : 0
      }
    },
    
    removeField: function(e) {
        var fieldIndex = parseInt(e.target.value, 10);
        this.setState(state => {
            state.fields.splice(fieldIndex, 1);
            return {fields: state.fields};
        });
    },

    addField:function (e){
        this.setState({
            fields: this.state.fields.concat([ <AccessContactField x={++this.state.x}/> ])
        });
    
        e.preventDefault();
    },

    render: function(){ 
        return(
            <div id="access_contacts">
                <FieldList fields={this.state.fields} removeField={this.removeField} />
                <button className="button-add button-primary" onClick={this.addField}> Add Another Access Contact </button>
            </div>
        );
    }
});