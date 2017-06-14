var BDM = React.createClass({
    render: function(){    
        return <div>
            <p> Bdm verification </p>
            <input type="text" placeholder="Bdm verification"
                    name="user[agency_admin_attributes][agency_attributes][bdm_verification_id]"
                    id="user_agency_admin_attributes_agency_attributes_bdm_verification_id" required />
        </div>
    }
});

var AgencyAttributes = React.createClass({
    getInitialState: function () {
        return { showBDM: false,
                 same_Address: false,
                 address: '',
                 mailing: '' };
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
            this.setState({mailing: event.target.value,
                           address: event.target.value});
        }
    },

    render: function(){
        return <div className="fields">
            <h4> Agency Information </h4>

            <p> Company Name </p>
            <input type="text" placeholder="Company Name"
                   name={this.generateAtt("name", "company_name")}
                   id={this.generateAtt("id", "company_name")} required />

            <p> Business name </p>
            <input type="text" placeholder="Business name"
                   name={this.generateAtt("name", "business_name")}
                   id={this.generateAtt("id", "business_name")} required />

            <p> Abn </p>
            <input type="text" placeholder="Abn"
                   name={this.generateAtt("name", "abn")}
                   id={this.generateAtt("id", "abn")} required />

            <p> Address </p>
            <input type="text" placeholder="Address" onChange={this.handleChange}
                   name={this.generateAtt("name", "address")}
                   id={this.generateAtt("id", "address")} required />

            <div className="field">
                <label>
                    <input type="checkbox" value="1" onChange={this.onSame}
                           name={this.generateAtt("name", "mailing_same_address")}
                           id={this.generateAtt("id", "mailing_same_address")} />
                    Mailing address same as billing address
                </label>

                <p> Mailing address </p>
                <input type="text" placeholder="Mailing address" value={this.state.mailing}
                       name={this.generateAtt("name", "mailing_address")}
                       id={this.generateAtt("id", "mailing_address")} required />
            </div>

            <p> Phone </p>
            <input type="tel" placeholder="Phone"
                   name={this.generateAtt("name", "phone")}
                   id={this.generateAtt("id", "phone")} />

            <p> Mobile phone </p>
            <input type="tel" placeholder="Mobile phone"
                   name={this.generateAtt("name", "mobile_phone")}
                   id={this.generateAtt("id", "mobile_phone")} />
            
            <div className="license-type">
                <p> License Type </p>
                <label className="one-half column">
                    <input type="radio" value="Individual License"
                           name={this.generateAtt("name", "license_type")}
                           id={this.generateAtt("id", "license_type_individual_license")} required />
                    Individual License
                </label>

                <label className="one-half column">
                    <input type="radio" value="Corporate License"
                           name={this.generateAtt("name", "license_type")}
                           id={this.generateAtt("id", "license_type_corporate_license")} required />
                    Corporate License
                </label>
            </div>

            <p> License number </p>
            <input type="text" placeholder="License number"
                   name={this.generateAtt("name", "license_number")}
                   id={this.generateAtt("id", "license_number")} required />

            <p> Corporation license number </p>
            <input type="text" placeholder="Corporation license number"
                   name={this.generateAtt("name", "corporation_license_number")}
                   id={this.generateAtt("id", "corporation_license_number")} required />
            
            <div className="field">
                <label>
                    <input type="checkbox" value="1" onChange={this.onBDM}
                           name={this.generateAtt("name", "bdm_verification_status")}
                           id={this.generateAtt("id", "bdm_verification_status")} />
                    I Have BDM verfication status
                </label>
                {
                    this.state.showBDM
                        ? <BDM />
                        : null
                }

           </div>
        </div>
    },
    onBDM: function() {
        this.setState({showBDM: !this.state.showBDM});
    },
    onSame: function() {
        this.setState({same_Address: !this.state.same_Address,
                       mailing: this.state.address});
    }
});

var Agency = React.createClass({
    render: function(){    
        return <form role="form" className="agencies" id="new_user" action="/agencies" acceptCharset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="✓"/>
            <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}/>

            <p> Email </p>
            <input type="email" placeholder="Email"
                   name="user[email]"
                   id="user_email" required />

            <p> Password </p>
            <input type="password" placeholder="Password"
                   name="user[password]"
                   id="user_password" required />

            <p> Password confirmation </p>
            <input type="password" placeholder="Password"
                   name="user[password_confirmation]"
                   id="user_password_confirmation" required />


            <p> First name </p>
            <input type="text" placeholder="First name"
                   name="user[agency_admin_attributes][first_name]"
                   id="user_agency_admin_attributes_first_name" required />

            <p> Last name </p>
            <input type="text" placeholder="Last name"
                   name="user[agency_admin_attributes][last_name]"
                   id="user_agency_admin_attributes_last_name" required />

            <p> Mobile phone </p>
            <input type="tel" placeholder="Mobile phone"
                   name="user[agency_admin_attributes][mobile_phone]"
                   id="user_agency_admin_attributes_mobile_phone"/>

            <hr/>
            
            <AgencyAttributes />



            <input type="submit" name="commit" value="Sign Up" className="button-primary green" data-disable-with="Sign Up"/>

            <div className="have-account">
                <p>Already have an Account?</p>
                <a href="/login">Login</a>
            </div>

        </form>
    }
});
