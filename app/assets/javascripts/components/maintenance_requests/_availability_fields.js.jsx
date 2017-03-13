
var AvailabilityField = React.createClass({
    getInitialState : function() {
        return {
            remove : false
        }
    },

    makeDate(byNum) {
      var date=[];
      for (var i=0; i<byNum; i++) {
        date.push(<option key={i} value={i}>{i}</option>);
      }
      return date;
    },

    removeField() {
      this.setState({remove: true});
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
      var Availability = this.props.content;
      var x= this.props.x;
      if (Availability) {
          x = Availability.id;
      }

      return (
        <div className="availabilityfield" style={{display: this.state.remove ? 'none' : 'block' }}>
          <fieldset>
            <p> Date </p>
            <input type="date"
                 name={this.generateAtt("name", x, "date")}
                 id={this.generateAtt("id", x, "date")}  onChange={this.onChange} required={this.state.dateRequired}/>
            
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
                        id={this.generateAtt("id", x, "start_time_4i")} required={this.state.dateRequired}>
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select name={this.generateAtt("name", x, "start_time(5i)")}
                        id={this.generateAtt("id", x, "start_time_5i")} required={this.state.dateRequired}>
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
                        id={this.generateAtt("id", x, "finish_time_4i")} required={this.state.dateRequired}>
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select name={this.generateAtt("name", x, "finish_time(5i)")}
                        id={this.generateAtt("id", x, "finish_time_5i")} required={this.state.dateRequired}>
                { this.makeDate(60) }
              </select>
            </div>
          </fieldset>
          <label>
            <input type="checkbox" value="1" onChange={this.onCheck}
                   name={this.generateAtt("name", x, "available_only_by_appointment")}
                     id={this.generateAtt("id", x, "available_only_by_appointment")} />
            Check box if accesss only available by appointment
          </label>
          <input type="hidden" value={this.state.remove}
                name={this.generateAtt("name", x, "_destroy")}
                  id={this.generateAtt("id", x, "_destroy")} />
          <button type="button" className="button-remove button-primary red" onClick={this.removeField}> Remove </button>
        </div>
      );
    },

    onCheck() {
      this.setState({dateRequired: !this.state.dateRequired});
    }
});