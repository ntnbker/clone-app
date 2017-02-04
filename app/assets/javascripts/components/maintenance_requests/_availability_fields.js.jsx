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

var AvailabilityField = React.createClass({
    getInitialState : function() {
      return {
        currentValue : {date: '', start1: '', end1: '', start2: '', end2: ''}
      }
    },

    makeDate(byNum) {
      var date=[];
      for (var i=0; i<byNum; i++) {
        date.push(<option key={i} value={i}>{i}</option>);
      }
      return date;
    },

    generateAtt(name_id, x, type) {
      if (name_id == "name") {
        return "maintenance_request[availabilities_attributes][" + x + "][" + type + "]";
      }
      else if (name_id == "id") {
        return "maintenance_request_availabilities_attributes_" + x + "_" + type;
      }
    },

    onChange(e) {
      var tmpValue = e.target.value;
      this.setState(state => {
          state.currentValue.date = tmpValue;
          return {currentValue : state.currentValue};
      });
    },

    render : function() {
      var x = this.props.x;
      var currentValue = this.state.currentValue;
      return (
        <div className="field">
          <fieldset>
            <p> Date </p>
            <input type="date" value='' value={currentValue.date}
                 name={this.generateAtt("name", x, "date")}
                 id={this.generateAtt("id", x, "date")}  onChange={this.onChange}/>
            
            <div className="starttime">
              <p> Start time </p>

              <input type="hidden" value={new Date().getFullYear()}
                     name={this.generateAtt("name", x, "start_time(1i)")}
                       id={this.generateAtt("id", x, "start_time_1i")} />

              <input type="hidden" value={new Date().getMonth()+1}
                     name={this.generateAtt("name", x, "start_time(2i)")}
                       id={this.generateAtt("id", x, "start_time_2i")} />

              <input type="hidden" value={new Date().getDate()}
                     name={this.generateAtt("name", x, "start_time(3i)")}
                       id={this.generateAtt("id", x, "start_time_3i")} /> 

              <select name={this.generateAtt("name", x, "start_time(4i)")}
                        id={this.generateAtt("id", x, "start_time_4i")} >
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select name={this.generateAtt("name", x, "start_time(5i)")}
                        id={this.generateAtt("id", x, "start_time_5i")} >
                { this.makeDate(60) }
              </select>
            </div>

            <div className="finishtime">
              <p> Finish time </p>

              <input type="hidden" value={new Date().getFullYear()}
                     name={this.generateAtt("name", x, "finish_time(1i)")}
                       id={this.generateAtt("id", x, "finish_time_1i")} />

              <input type="hidden" value={new Date().getMonth()+1}
                     name={this.generateAtt("name", x, "finish_time(2i)")}
                       id={this.generateAtt("id", x, "finish_time_2i")} />

              <input type="hidden" value={new Date().getDate()}
                     name={this.generateAtt("name", x, "finish_time(3i)")}
                       id={this.generateAtt("id", x, "finish_time_3i")} /> 

              <select name={this.generateAtt("name", x, "finish_time(4i)")}
                        id={this.generateAtt("id", x, "finish_time_4i")} >
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select name={this.generateAtt("name", x, "finish_time(5i)")}
                        id={this.generateAtt("id", x, "finish_time_5i")} >
                { this.makeDate(60) }
              </select>
            </div>
          </fieldset>
          <label>
            <input type="checkbox" value="1" name={this.generateAtt("name", x, "available_only_by_appointment")}
                               id={this.generateAtt("id", x, "available_only_by_appointment")} />
            Check box if accesss only available by appointment
          </label>
        </div>
      );
    }
});

var AvailabilityFields = React.createClass({
    getInitialState : function() {
      return {
        fields : [ <AvailabilityField x={0}/> ],
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
            fields: this.state.fields.concat([ <AvailabilityField x={++this.state.x}/> ])
        });
    
        e.preventDefault();
    },

    render: function(){ 
        return(
            <div id="availabilities">
                <FieldList fields={this.state.fields} removeField={this.removeField} />
                <button className="button-add button-primary" onClick={this.addField}> Add Another Availability </button>
            </div>
        );
    }
});