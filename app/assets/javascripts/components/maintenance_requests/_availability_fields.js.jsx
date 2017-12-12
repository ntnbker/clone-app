var AvailabilityField = React.createClass({

    getInitialState: function() {
        return {
            remove : false,

        }
    },

    makeDate: function(byNum) {
      var date=[];
      date.push(<option key="-1" value="">--</option>)
      for (var i=0; i<byNum; i++) {
        date.push(<option key={i} value={i}>{i}</option>);
      }
      return date;
    },

    makeHour: function(byNum) {
      var date=[];
      date.push(<option key="-1" value="">--</option>);
      var value = "";
      for (var i=0; i<byNum; i++) {
        if(i == 0) {
          value = "12 AM";
        } else if(i <= 11) {
          value = i < 10 ? "0" + i : i;
          value += " AM";
        } else if(i == 12) {
          value = i + " PM";
        } else if(i >= 13) {
          value = (i - 12) < 10 ? "0" + (i - 12) : (i - 12);
          value += " PM";
        }
        date.push(
          <option key={i} value={i}>
            { value }
          </option>
        );
      }
      return date;
    },

    makeMinute: function() {
      const data = [0, 15, 30, 45];
      var date=[];
      date.push(<option key="-1" value="">--</option>);
      data.map((item, key) => {
        date.push(<option key={key} value={item}>{item == 0 ? item + "0" : item}</option>);
      });

      return date;
    },

    removeField() {
      this.setState({remove: true});
    },

    generateAtt: function(name_id, x, type) {
      if (name_id == "name") {
        return "maintenance_request[availabilities_attributes][" + x + "][" + type + "]";
      }
      else if (name_id == "id") {
        return "maintenance_request_availabilities_attributes_" + x + "_" + type;
      }
    },

    onChange: function(e, datepickerrorid) {
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

    onChangeStartTime: function(e, timepickerrorid) {
      var startTime = (this.refs.startTimeHour.value*60 +  this.refs.startTimeMin.value)/100;
      var finishTime = (this.refs.finishTimeHour.value*60 + this.refs.finishTimeMin.value)/100;
      errorMessage = '';
      if(startTime > finishTime) {
        document.getElementById(timepickerrorid).textContent = strErrSelectTimeB;
        setSubmitFlag = false;
        this.props.validDate(true);
      } else {
        document.getElementById(timepickerrorid).textContent = '';
        setSubmitFlag = true;
        this.props.validDate(false);
      }
    },

    onChangeFinishTime: function(e, timepickerrorid) {
      var startTime = (this.refs.startTimeHour.value*60 +  this.refs.startTimeMin.value)/100;
      var finishTime = (this.refs.finishTimeHour.value*60 + this.refs.finishTimeMin.value)/100;
      errorMessage = '';
      if(startTime > finishTime) {
        document.getElementById(timepickerrorid).textContent = strErrSelectTimeL;
        setSubmitFlag = false;
        this.props.validDate(true);
      } else {
        document.getElementById(timepickerrorid).textContent = '';
        setSubmitFlag = true;
        this.props.validDate(false);
      }
    },

    getToday: function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd < 10) {
          dd = '0'+dd;
      }
      if(mm < 10) {
          mm = '0'+mm;
      }
      today = yyyy+'-'+mm+'-'+dd;
      return today;
    },

    render: function() {
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
                ref={ref => this.startTimeHour = ref}
                id={this.generateAtt("id", x, "start_time_4i")}
                name={this.generateAtt("name", x, "start_time(4i)")}
                onChange={(e) =>this.onChangeStartTime(e, $timepickerrorid)}
              >
                { this.makeHour(24) }
              </select>

              <span> : </span>

              <select
                required="required"
                ref={ref => this.startTimeMin = ref}
                id={this.generateAtt("id", x, "start_time_5i")}
                name={this.generateAtt("name", x, "start_time(5i)")}
                onChange={(e) =>this.onChangeStartTime(e, $timepickerrorid)}
              >
                { this.makeMinute() }
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
                required="required"
                ref={ref => this.finishTimeHour = ref}
                id={this.generateAtt("id", x, "finish_time_4i")}
                name={this.generateAtt("name", x, "finish_time(4i)")}
                onChange={(e) =>this.onChangeFinishTime(e, $timepickerrorid)}
              >
                { this.makeHour(24) }
              </select>

              <span> : </span>

              <select
                required="required"
                ref={ref => this.finishTimeMin = ref}
                id={this.generateAtt("id", x, "finish_time_5i")}
                name={this.generateAtt("name", x, "finish_time(5i)")}
                onChange={(e) =>this.onChangeFinishTime(e, $timepickerrorid)}
              >
                { this.makeMinute() }
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
          <div className="text-center">
            <button type="button" className="button-remove button-primary red" onClick={(position) => this.props.removeField(x)}> Remove </button>
          </div>
        </div>
      );
    },

    onCheck: function() {
      this.setState({dateRequired: !this.state.dateRequired});
    }
});
