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

    onChange(e, datepickerrorid) {
      var tmpValue = e.target.value;
      var today = this.getToday();
      errorMessage = '';
      if(tmpValue < today) {
        errorMessage = 'You should select the date after today!';
        document.getElementById(datepickerrorid).textContent = errorMessage;
        e.target.classList.add("border_on_error");
      } else {
        document.getElementById(datepickerrorid).textContent = errorMessage;
        e.target.classList.remove("border_on_error");
      }
      this.setState(state => {
          state.currentValue.date = tmpValue;
          return {currentValue : state.currentValue};
      });
    },

    onChangeStartTime(e, timepickerrorid) {
      var startTime = (this.refs.startTimeHour.value*60 +  this.refs.startTimeMin.value)/100;
      var finishTime = (this.refs.finishTimeHour.value*60 + this.refs.finishTimeMin.value)/100;
      if(finishTime == 0) {
        return;
      }
      errorMessage = '';
      if(startTime > finishTime) {
        errorMessage = 'You should select before than finish time!';
        document.getElementById(timepickerrorid).textContent = errorMessage;
      } else {
        document.getElementById(timepickerrorid).textContent = errorMessage;
      }
    },

    onChangeFinishTime(e, timepickerrorid) {
      var startTime = (this.refs.startTimeHour.value*60 +  this.refs.startTimeMin.value)/100;
      var finishTime = (this.refs.finishTimeHour.value*60 + this.refs.finishTimeMin.value)/100;
      errorMessage = '';
      if(startTime > finishTime) {
        errorMessage = 'You should select later than start time!';
        document.getElementById(timepickerrorid).textContent = errorMessage;
      } else {
        document.getElementById(timepickerrorid).textContent = errorMessage;
      }
    },

    getToday() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10) {
          dd='0'+dd
      } 
      if(mm<10) {
          mm='0'+mm
      } 
      today = yyyy+'-'+mm+'-'+dd;
      return today;
    },

    render : function() {
      var Availability = this.props.content;
      var x= this.props.x;
      if (Availability) {
          x = Availability.id;
      }
      var $datepickerrorid='errorpickdate'+x;
      var $timepickerrorid='errorpicktime'+x;
      return (
        <div className="availabilityfield" style={{display: this.state.remove ? 'none' : 'block' }}>
          <fieldset>
            <p> Date </p>
            <input type="date"
                 name={this.generateAtt("name", x, "date")}
                 id={this.generateAtt("id", x, "date")}  onChange={(e) =>this.onChange(e, $datepickerrorid)} required={this.state.dateRequired}/>
            <p id={$datepickerrorid} className="error"></p>

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
                        id={this.generateAtt("id", x, "start_time_4i")} onChange={(e) =>this.onChangeStartTime(e, $timepickerrorid)} required={this.state.dateRequired} ref="startTimeHour">
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select name={this.generateAtt("name", x, "start_time(5i)")}
                        id={this.generateAtt("id", x, "start_time_5i")} onChange={(e) =>this.onChangeStartTime(e, $timepickerrorid)} required={this.state.dateRequired} ref="startTimeMin">
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
                        id={this.generateAtt("id", x, "finish_time_4i")} onChange={(e) =>this.onChangeFinishTime(e, $timepickerrorid)} required={this.state.dateRequired} ref="finishTimeHour">
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select name={this.generateAtt("name", x, "finish_time(5i)")}
                        id={this.generateAtt("id", x, "finish_time_5i")} onChange={(e) =>this.onChangeFinishTime(e, $timepickerrorid)} required={this.state.dateRequired} ref="finishTimeMin">
                { this.makeDate(60) }
              </select>
            </div>
          </fieldset>
          <p id={$timepickerrorid} className="error"></p>
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