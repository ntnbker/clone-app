var BDM = React.createClass({
    render: function(){    
      return <div>
        <p> Bdm verification </p>
        <input 
          required
          type="text" 
          placeholder="Bdm verification"
          id="user_agency_admin_attributes_agency_attributes_bdm_verification_id"
          name="user[agency_admin_attributes][agency_attributes][bdm_verification_id]"
        />
      </div>
    }
});

var AgencyAttributes = React.createClass({
    getInitialState: function () {
      return { 
        showBDM: false,
        same_Address: false,
        address: '',
        mailing: '' 
      };
    },

    generateAtt(name_id, type) {
      if (name_id == "name") {
          return "user[agency_admin_attributes][agency_attributes][" + type + "]";
      }
      else if (name_id == "id") {
          return "user_agency_admin_attributes_agency_attributes_" + type;
      }
    },

    handleChange: function(event) {
      this.setState({address: event.target.value});
      if (this.state.same_Address) {
        this.setState({
          mailing: event.target.value,
          address: event.target.value
        });
      }
    },

    render: function(){
      return <div className="fields">
        <h4> Agency Information </h4>
        <p> Company Name </p>
        <input 
          required
          type="text" 
          placeholder="Company Name"
          id={this.generateAtt("id", "company_name")} 
          name={this.generateAtt("name", "company_name")}
        />

        <p> Business name </p>
        <input
          required
          type="text"
          placeholder="Business name"
          id={this.generateAtt("id", "business_name")}
          name={this.generateAtt("name", "business_name")}
        />

        <p> Abn </p>
        <input 
          required
          type="text" 
          placeholder="Abn"
          id={this.generateAtt("id", "abn")}
          name={this.generateAtt("name", "abn")}
        />

        <p> Address </p>
        <input 
          required
          type="text" 
          placeholder="Address" 
          onChange={this.handleChange}
          id={this.generateAtt("id", "address")}
          name={this.generateAtt("name", "address")}
        />

        <div className="field">
          <label>
            <input 
              value="1"
              type="checkbox" 
              onChange={this.onSame}
              id={this.generateAtt("id", "mailing_same_address")} 
              name={this.generateAtt("name", "mailing_same_address")}
            />
            Mailing address same as billing address
          </label>

          <p> Mailing address </p>
          <input
            required
            type="text"
            value={this.state.mailing}
            placeholder="Mailing address"
            id={this.generateAtt("id", "mailing_address")}
            name={this.generateAtt("name", "mailing_address")}
          />
        </div>

        <p> Phone </p>
        <input
          required
          type="tel"
          placeholder="Phone"
          id={this.generateAtt("id", "phone")}
          name={this.generateAtt("name", "phone")}
        />

        <p> Mobile phone </p>
        <input
          required
          type="tel" 
          placeholder="Mobile phone"
          id={this.generateAtt("id", "mobile_phone")}
          name={this.generateAtt("name", "mobile_phone")}
        />
            
        <div className="license-type">
          <p> License Type </p>
          <label className="one-half column">
              <input 
                required
                type="radio" 
                value="Individual License"
                name={this.generateAtt("name", "license_type")}
                id={this.generateAtt("id", "license_type_individual_license")}
              />
              Individual License
          </label>
          <label className="one-half column">
            <input
              required
              type="radio"
              value="Corporate License"
              name={this.generateAtt("name", "license_type")}
              id={this.generateAtt("id", "license_type_corporate_license")}
            />
            Corporate License
          </label>
        </div>

        <p> License number </p>
        <input
          required
          type="text"
          placeholder="License number"
          id={this.generateAtt("id", "license_number")}
          name={this.generateAtt("name", "license_number")}
        />

        <p> Corporation license number </p>
        <input
          required
          type="text"
          placeholder="Corporation license number"
          id={this.generateAtt("id", "corporation_license_number")}
          name={this.generateAtt("name", "corporation_license_number")}
        />
            
        <div className="field">
            <label>
                <input
                  type="checkbox" 
                  value="1" 
                  onChange={this.onBDM}
                  id={this.generateAtt("id", "bdm_verification_status")} 
                  name={this.generateAtt("name", "bdm_verification_status")}
                />
                I Have BDM verfication status
            </label>
            {
              this.state.showBDM && 
                <BDM />
            }
        </div>
      </div>
    },
    onBDM: function() {
      this.setState({showBDM: !this.state.showBDM});
    },
    onSame: function() {
      this.setState({
        same_Address: !this.state.same_Address,
        mailing: this.state.address
      });
    }
});

var Agency = React.createClass({
  render: function(){    
    return <form role="form" className="agencies" id="new_user" action="/agencies" acceptCharset="UTF-8" method="post">
      <input name="utf8" type="hidden" value="✓"/>
      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}/>

      <p> Email </p>
      <input 
        required
        type="email" 
        id="user_email" 
        name="user[email]"
        placeholder="Email"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
      />

      <p> Password </p>
      <input 
        required
        type="password" 
        id="user_password" 
        name="user[password]"
        placeholder="Password"
      />

      <p> Password confirmation </p>
      <input 
        required
        type="password"
        placeholder="Password"
        id="user_password_confirmation"
        name="user[password_confirmation]"
      />

      <p> First name </p>
      <input 
        required
        type="text" 
        placeholder="First name"
        id="user_agency_admin_attributes_first_name"
        name="user[agency_admin_attributes][first_name]"
      />

      <p> Last name </p>
      <input 
        required
        type="text" 
        placeholder="Last name"
        id="user_agency_admin_attributes_last_name"
        name="user[agency_admin_attributes][last_name]"
      />

      <p> Mobile phone </p>
      <input
        required
        type="tel" 
        placeholder="Mobile phone"
        id="user_agency_admin_attributes_mobile_phone"
        name="user[agency_admin_attributes][mobile_phone]"
      />

      <hr/>
      
      <AgencyAttributes />

      <input 
        type="submit" 
        name="commit" 
        value="Sign Up" 
        data-disable-with="Sign Up"
        className="button-primary green" 
      />

      <div className="have-account">
          <p>Already have an Account?</p>
          <a href="/login">Login</a>
      </div>
    </form>
  }
});
