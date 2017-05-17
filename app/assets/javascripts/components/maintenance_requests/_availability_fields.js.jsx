var AvailabilityField = React.createClass({
    
    getInitialState : function() {
        return {
            remove : false,

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
      if(tmpValue < today) {
        document.getElementById(datepickerrorid).textContent = strErrSelectDate;
        e.target.classList.add("border_on_error");
      } else {
        document.getElementById(datepickerrorid).textContent = strNone;
        e.target.classList.remove("border_on_error");
        this.setState(state => {
          return {currentValue : tmpValue};
        });
      }
    },

    onChangeStartTime(e, timepickerrorid) {
      var startTime = (this.refs.startTimeHour.value*60 +  this.refs.startTimeMin.value)/100;
      var finishTime = (this.refs.finishTimeHour.value*60 + this.refs.finishTimeMin.value)/100;
      errorMessage = '';
      if(startTime > finishTime) {
        document.getElementById(timepickerrorid).textContent = strErrSelectTimeB;
        setSubmitFlag = false;
      } else {
        document.getElementById(timepickerrorid).textContent = '';
        setSubmitFlag = true;
      }
    },

    onChangeFinishTime(e, timepickerrorid) {
      var startTime = (this.refs.startTimeHour.value*60 +  this.refs.startTimeMin.value)/100;
      var finishTime = (this.refs.finishTimeHour.value*60 + this.refs.finishTimeMin.value)/100;
      errorMessage = '';
      if(startTime > finishTime) {
        document.getElementById(timepickerrorid).textContent = strErrSelectTimeL;
        setSubmitFlag = false;
      } else {
        document.getElementById(timepickerrorid).textContent = '';
        setSubmitFlag = true;
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
            <input 
              type="date"
              required="required"
              id={this.generateAtt("id", x, "date")}  
              name={this.generateAtt("name", x, "date")}
              onChange={(e) =>this.onChange(e, $datepickerrorid)} 
            />
            <p id={$datepickerrorid} className="error"></p>

            <div className="starttime">
              <p> Start time </p>

              <input 
                type="hidden" 
                value={new Date().getFullYear()}
                id={this.generateAtt("id", x, "start_time_1i")} 
                name={this.generateAtt("name", x, "start_time(1i)")}
              />

              <input 
                type="hidden" 
                value={new Date().getMonth()+1}
                id={this.generateAtt("id", x, "start_time_2i")} 
                name={this.generateAtt("name", x, "start_time(2i)")}
              />

              <input 
                type="hidden" value={new Date().getDate()}
                id={this.generateAtt("id", x, "start_time_3i")} 
                name={this.generateAtt("name", x, "start_time(3i)")}
              /> 

              <select 
                required="required"
                id={this.generateAtt("id", x, "start_time_4i")} 
                name={this.generateAtt("name", x, "start_time(4i)")}
                required={this.state.dateRequired} ref="startTimeHour"
                onChange={(e) =>this.onChangeStartTime(e, $timepickerrorid)} 
              >
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select 
                required="required"
                ref="startTimeMin"
                required={this.state.dateRequired} 
                id={this.generateAtt("id", x, "start_time_5i")} 
                name={this.generateAtt("name", x, "start_time(5i)")}
                onChange={(e) =>this.onChangeStartTime(e, $timepickerrorid)} 
              >
                { this.makeDate(60) }
              </select>
            </div>

            <div className="finishtime">
              <p> Finish time </p>
              <input 
                type="hidden" 
                value={new Date().getFullYear()}
                id={this.generateAtt("id", x, "finish_time_1i")} 
                name={this.generateAtt("name", x, "finish_time(1i)")}
              />

              <input 
                type="hidden" 
                value={new Date().getMonth()+1}
                id={this.generateAtt("id", x, "finish_time_2i")} 
                name={this.generateAtt("name", x, "finish_time(2i)")}
              />

              <input 
                type="hidden" value={new Date().getDate()}
                name={this.generateAtt("name", x, "finish_time(3i)")}
                id={this.generateAtt("id", x, "finish_time_3i")} 
              /> 

              <select 
                id={this.generateAtt("id", x, "finish_time_4i")} 
                name={this.generateAtt("name", x, "finish_time(4i)")}
                required={this.state.dateRequired} ref="finishTimeHour"
                onChange={(e) =>this.onChangeFinishTime(e, $timepickerrorid)}
              >
                { this.makeDate(24) }
              </select>

              <span> : </span>

              <select 
                required="required"
                id={this.generateAtt("id", x, "finish_time_5i")} 
                name={this.generateAtt("name", x, "finish_time(5i)")}
                required={this.state.dateRequired} ref="finishTimeMin"
                onChange={(e) =>this.onChangeFinishTime(e, $timepickerrorid)} 
              >
                { this.makeDate(60) }
              </select>
            </div>
          </fieldset>
          <p id={$timepickerrorid} className="error"></p>
          <label>
            <input 
              value="1" 
              type="checkbox" 
              onChange={this.onCheck}
              id={this.generateAtt("id", x, "available_only_by_appointment")} 
              name={this.generateAtt("name", x, "available_only_by_appointment")}
            />
            Check box if accesss only available by appointment
          </label>
          <input 
            type="hidden" 
            value={this.state.remove}
            id={this.generateAtt("id", x, "_destroy")} 
            name={this.generateAtt("name", x, "_destroy")}
          />
          <button type="button" className="button-remove button-primary red" onClick={this.removeField}> Remove </button>
        </div>
      );
    },

    onCheck() {
      this.setState({dateRequired: !this.state.dateRequired});
    }
});