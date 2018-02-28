var NewTradyCompany = React.createClass({
  getInitialState: function () {
    const {trady_company} = this.props;
    return {
      errors: {},
      address: trady_company && trady_company.address,
      same_address: trady_company && trady_company.mailing_address_same,
      mailing_address: trady_company && trady_company.mailing_address,
      gst_registration: trady_company && trady_company.gst_registration ? true : false,
      trady_company: trady_company || {},
      notification: {
        title: "",
        bgClass: "",
        contnet: "",
      }
    };
  },

  handleChange: function(event) {
    this.setState({address: event.target.value});
    if (!!this.state.same_address) {
      this.removeError({ target: {id: 'mailing_address' }});
      this.setState({
        mailing_address: this.address.value,
      });
    }
    this.removeError(event);
  },

  onSame: function(isSame) {
    if(!this.state.same_address) {
      this.removeError({ target: {id: 'mailing_address' }});
      this.setState({mailing_address: this.state.address});
    }

    this.setState({
      same_address: isSame
    });
  },


  changeMailingAddress: function(e) {
    this.setState({
      mailing_address: e.target.value
    });
    this.removeError(e);
  },

  onSubmit: function(e){

    var flag = false;
    let isInvoice = this.props.system_plan === 'Invoice';

    const getValidValue = obj => obj && obj.value;

    var trady_company = {
      trady_id:        this.props.trady_id || '',
      email:           getValidValue(this.email),
      address:         getValidValue(this.address),
      company_name:    getValidValue(this.company_name),
      trading_name:    getValidValue(this.trading_name),
      mobile_number:   getValidValue(this.mobile_number),
      mailing_address: getValidValue(this.mailing_address),
      maintenance_request_id: this.props.maintenance_request_id || '',
    }

    trady_company.abn =                 getValidValue(this.abn);
    trady_company.landline =            getValidValue(this.landline);
    trady_company.mailing_address_same = this.state.same_address;
    trady_company.gst_registration =    this.state.gst_registration;
    trady_company.bsb_number =          getValidValue(this.bsb_number);
    trady_company.account_name =        getValidValue(this.account_name);
    trady_company.bank_account_number = getValidValue(this.bank_account_number);
    trady_company.profession_license_number = getValidValue(this.profession_license_number);

    if (this.props.trady_company) {
      trady_company.id = this.props.trady_company.id;
    }

    var params = { trady_company };

    const self = this;
    $.ajax({
      type: trady_company.id ? 'PUT' : 'POST',
      url: trady_company.id ? '/update_tradie_company' : '/create_tradie_company',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        self.setState({errors: res.errors || {}});
      },
      error: function(err) {
      }
    });

    e.preventDefault();

    return;
  },

  removeError: function({ target: { id } }) {
    let errors     = Object.assign({}, this.state.errors);
    if (errors[id]) {
      errors[id] = false;
      this.setState({ errors });
    }
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  renderButtonBack: function() {
    return (
      <button
        type="button"
        className="button-back"
        onClick={() => this.backButton.click()}
      >
        <a
          style={{ display: 'none' }}
          href={this.props.new_tradie_registration_path}
          ref={(elem) => this.backButton = elem}
        >
        </a>
        Back
      </button>
    );
  },

  render: function() {
    let isInvoice = this.props.system_plan === "Invoice";
    let { errors } = this.state;
    const renderErrorFunc = this.renderError;
    const removeErrorFunc = this.removeError;

    return (
      <div>
      <form role="form" className="form-horizontal" id="new_trady_company" onSubmit={this.onSubmit} >

        <div className="form-group">
          <div className="col-sm-10">
            <input

              type="text"
              id="company_name"
              placeholder="Company Name"
              defaultValue={this.state.trady_company.company_name}
              ref={(ref) => this.company_name = ref}
              className={"form-control " + (errors['company_name'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['company_name'])}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input

              type="text"
              id="trading_name"
              placeholder="Trading Name"
              defaultValue={this.state.trady_company.trading_name}
              ref={(ref) => this.trading_name = ref}
              className={"form-control " + (errors['trading_name'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['trading_name'])}
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-10">
            <input

              id="abn"
              type="text"
              placeholder="Australian Business Number"
              defaultValue={this.state.trady_company.abn}
              ref={(ref) => this.abn = ref}
              className={"form-control " + (errors['abn'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['abn'])}
          </div>
        </div>
          <div className="form-group">
            <div className="col-sm-10">
              <input

                id="profession_license_number"
                type="text"
                placeholder="Profession License Number"
                defaultValue={this.state.trady_company.profession_license_number}
                ref={(ref) => this.profession_license_number = ref}
                className={"form-control " + (errors['profession_license_number'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['profession_license_number'])}
            </div>
          </div>
        <div className="form-group text-center">
          Is your business registered for GST?
          <div className="radio-same-address">
            <label className="radio-option">Yes
              <input
                type="radio"
                name="gst_registration"
                value={true}
                onChange={() => this.setState({gst_registration: true})}
                defaultChecked={!!this.state.gst_registration}
              />
              <span className="radio-checkmark"></span>
            </label>
            <label className="radio-option">No
              <input
                type="radio"
                name="gst_registration"
                value={false}
                onChange={() => this.setState({gst_registration: false})}
                defaultChecked={!this.state.gst_registration}
              />
              <span className="radio-checkmark"></span>
            </label>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input

              type="text"
              id="address"
              placeholder="Address"
              defaultValue={this.state.address}
              onChange={this.handleChange}
              ref={(ref) => this.address = ref}
              className={"form-control " + (errors['address'] ? "has-error" : "")}
              // onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['address'])}
          </div>
        </div>

        <div className="form-group text-center">
          Is your mailing address the same as the address above?
          <div className="radio-same-address">
            <label className="radio-option">Yes
              <input
                type="radio"
                name="same-address"
                value={true}
                onChange={() => this.onSame(true)}
                defaultChecked={!!this.state.same_address}
              />
              <span className="radio-checkmark"></span>
            </label>
            <label className="radio-option">No
              <input
                type="radio"
                name="same-address"
                onChange={() => this.onSame(false)}
                value={false}
                defaultChecked={!this.state.same_address}
              />
              <span className="radio-checkmark"></span>
            </label>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input

              type="text"
              id="mailing_address"
              placeholder="Mailing Address"
              readOnly={this.state.same_address}
              value={this.state.mailing_address}
              onChange={this.changeMailingAddress}
              ref={(ref) => this.mailing_address = ref}
              className={"form-control " + (errors['mailing_address'] ? "has-error" : "")}
            />
            {renderErrorFunc(errors['mailing_address'])}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input
              type="text"
              id="mobile_number"
              placeholder="Mobile Number"
              defaultValue={this.state.trady_company.mobile_number}
              ref={(ref) => this.mobile_number = ref}
              className={"form-control " + (!!this.state.errors['mobile_number'] && "has-error")}
              onChange={removeErrorFunc}
            />
            {this.renderError(errors['mobile_number'])}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input
              id="landline"
              type="text"
              placeholder="Landline Number"
              defaultValue={this.state.trady_company.landline}
              ref={(ref) => this.landline = ref}
              className={"form-control " + (errors['landline'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['landline'])}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input

              type="text"
              id="email"
              placeholder="Email"
              defaultValue={this.state.trady_company.email}
              ref={(ref) => this.email = ref}
              className={"form-control " + (!!this.state.errors['email'] && "has-error")}
              onChange={removeErrorFunc}
            />
            {this.renderError(errors['email'])}
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-10">
            <input
              type="text"
              id="bsb_number"
              placeholder="BSB Number"
              // onChange={this.checkValidate}
              defaultValue={this.state.trady_company.bsb_number}
              ref={(ref) => this.bsb_number = ref}
              className={"form-control " + (errors['bsb_number'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['bsb_number'])}
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-10">
            <input
              type="text"
              id="bank_account_number"
              placeholder="Bank Account Number"
              defaultValue={this.state.trady_company.bank_account_number}
              ref={(ref) => this.bank_account_number = ref}
              className={"form-control " + (errors['bank_account_number'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['bank_account_number'])}
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-10">
            <input
              type="text"
              id="account_name"
              placeholder="Account Name"
              // onChange={this.checkValidate}
              defaultValue={this.state.trady_company.account_name}
              ref={(ref) => this.account_name = ref}
              className={"form-control " + (errors['account_name'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['account_name'])}
          </div>
        </div>
        <div className="text-center buttons">
          { this.renderButtonBack() }
          <button type="submit" className="button-submit green option-button">
            Next
          </button>
        </div>
      </form>
      </div>
    );
  }
});
