var AddTradycompany = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
      address: this.props.address,
      mailing_address: this.props.mailing_address,
      gst_registration: !!this.props.gst_registration ? true : false,
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
        mailing_address: event.target.value,
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

  openModalNotification: function(params) {
  	if(params) {
  		var body = document.getElementsByTagName('body')[0];
			body.className += "modal-open";
			var div = document.getElementsByClassName('modal-backdrop in');

			if(div.length === 0) {
				div = document.createElement('div')
				div.className  = "modal-backdrop in";
				body.appendChild(div);
			}
			this.setState({
				openModal: true,
				notification: {
					title: params.title,
					bgClass: params.bgClass,
					content: params.content,
				}
			});
  	}
  },

  closeModal: function() {
		var body = document.getElementsByTagName('body')[0];
		body.classList.remove("modal-open");
		var div = document.getElementsByClassName('modal-backdrop in')[0];
		div.parentNode.removeChild(div);
		this.setState({
			openModal: false,
			notification: {
				title: "",
				bgClass: "",
				content: "",
			}
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
      email:           getValidValue(this.email),
      address:         getValidValue(this.address),
      landline:        getValidValue(this.landline),
      company_name:    getValidValue(this.company_name),
      trading_name:    getValidValue(this.trading_name),
      mobile_number:   getValidValue(this.mobile_number),
      mailing_address: getValidValue(this.mailing_address),
      trady_id:               this.props.trady_id,
      quote_id:               this.props.quote_id,
      work_flow:              this.props.work_flow,
      quote_type:             this.props.quote_type,
      system_plan:            this.props.system_plan,
      invoice_type:           this.props.invoice_type,
      maintenance_request_id: this.props.maintenance_request_id,
      quote_id:               this.props.quote_id                || null,
      ledger_id:              this.props.ledger_id               || null,
      pdf_file_id:            this.props.pdf_file_id             || null,
      trady_company_id:       this.props.trady_company_id        || null,
    }

    if (isInvoice) {
      trady_company.abn =                 getValidValue(this.abn);
      trady_company.gst_registration =    this.state.gst_registration;
      trady_company.bsb_number =          getValidValue(this.bsb_number);
      trady_company.account_name =        getValidValue(this.account_name);
      trady_company.bank_account_number = getValidValue(this.bank_account_number);
      trady_company.profession_license_number = getValidValue(this.profession_license_number);
    }

    var params = { trady_company };

		const self = this;
		$.ajax({
			type: 'POST',
			url: '/trady_companies',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
			},
			data: params,
			success: function(res){
        self.setState({errors: res.errors || {}});
			},
			error: function(err) {
				self.openModalNotification({
					bgClass: 'bg-error',
					title: "Add Trady Company",
					content: "Add trady company is error!",
				});
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
    let backPath = '';
    if(this.props.system_plan == "Invoice") {
      backPath = "/invoice_options?maintenance_request_id=" + this.props.maintenance_request_id + "&trady_id=" + this.props.trady_id + "&quote_id=" + this.props.quote_id + "&trady_company_id=" + this.props.id;
    } else if(this.props.system_plan == "Quote") {
      backPath = "/quote_options?maintenance_request_id=" + this.props.maintenance_request_id + "&trady_id=" + this.props.trady_id;
    }

    return (
      <button
        type="button"
        className="button-back"
        onClick={() => this.backButton.click()}
      >
        <a href={backPath} style={{display: 'none'}} ref={e => this.backButton = e}/>
        Back
      </button>
    )
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
          {/*<label className="control-label col-sm-2 required">Company Name / Sole Trader Name</label>*/}
          <div className="col-sm-10">
            <input
              type="text"
              id="company_name"
              placeholder="Company Name / Sole Trader Name"
              defaultValue={this.props.company_name}
              ref={(ref) => this.company_name = ref}
              className={"form-control " + (errors['company_name'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['company_name'])}
          </div>
        </div>
        <div className="form-group">
          {/*<label className="control-label col-sm-2 required">Trading name</label>*/}
          <div className="col-sm-10">
  	        <input

  		        type="text"
  		        id="trading_name"
  		        placeholder="Trading Name"
  		        defaultValue={this.props.trading_name}
  		        ref={(ref) => this.trading_name = ref}
              className={"form-control " + (errors['trading_name'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['trading_name'])}
          </div>
        </div>

        { isInvoice &&
          <div className="form-group">
            {/*<label className="control-label col-sm-2 required">Abn</label>*/}
            <div className="col-sm-10">
              <input

                id="abn"
                type="text"
                placeholder="Australian Business Number"
                defaultValue={this.props.abn}
                ref={(ref) => this.abn = ref}
                className={"form-control " + (errors['abn'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['abn'])}
            </div>
          </div>
        }
        { isInvoice &&
          <div className="form-group">
            {/*<label className="control-label col-sm-2 required">
                          Profession License Number
                        </label>*/}
            <div className="col-sm-10">
              <input

                id="profession_license_number"
                type="text"
                placeholder="Profession License Number"
                defaultValue={this.props.profession_license_number}
                ref={(ref) => this.profession_license_number = ref}
                className={"form-control " + (errors['profession_license_number'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['profession_license_number'])}
            </div>
          </div>
        }
        { isInvoice &&
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
        }
				<div className="form-group">
          {/*<label className="control-label col-sm-2 required">Address</label>*/}
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
          {/*<label className="control-label col-sm-2 required">Mobile number</label>*/}
          <div className="col-sm-10">
  	        <input

  		        type="text"
  		        id="mobile_number"
  		        placeholder="Mobile Number"
              defaultValue={this.props.mobile_number}
              ref={(ref) => this.mobile_number = ref}
              className={"form-control " + (!!this.state.errors['mobile_number'] && "has-error")}
  		        onChange={removeErrorFunc}
  	        />
            {this.renderError(errors['mobile_number'])}
          </div>
        </div>
        <div className="form-group">
          {/*<label className="control-label col-sm-2 required">Landline Number</label>*/}
          <div className="col-sm-10">
            <input

              id="landline"
              type="text"
              placeholder="Landline Number"
              defaultValue={this.props.landline}
              ref={(ref) => this.landline = ref}
              className={"form-control " + (errors['landline'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['landline'])}
          </div>
        </div>
        <div className="form-group">
          {/*<label className="control-label col-sm-2 required">Company Email</label>*/}
          <div className="col-sm-10">
  	        <input

  	          id="email"
  		        type="text"
  		        placeholder="Email"
  		        defaultValue={this.props.email}
  	          ref={(ref) => this.email = ref}
              className={"form-control " + (errors['email'] ? "has-error" : "")}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(errors['email'])}
          </div>
        </div>

        { isInvoice && [
          <div className="form-group">
            {/*<label className="control-label col-sm-2 required">Account name</label>*/}
            <div className="col-sm-10">
    	        <input
    			      type="text"
    			      id="account_name"
    			      placeholder="Account Name"
                // onChange={this.checkValidate}
    			      defaultValue={this.props.account_name}
    			      ref={(ref) => this.account_name = ref}
                className={"form-control " + (errors['account_name'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['account_name'])}
            </div>
          </div>,

          <div className="form-group">
            {/*<label className="control-label col-sm-2 required">Bsb number</label>*/}
            <div className="col-sm-10">
    	        <input
    			      type="text"
    			      id="bsb_number"
    			      placeholder="BSB Number"
    			      // onChange={this.checkValidate}
    			      defaultValue={this.props.bsb_number}
    			      ref={(ref) => this.bsb_number = ref}
                className={"form-control " + (errors['bsb_number'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['bsb_number'])}
            </div>
          </div>,

          <div className="form-group">
            {/*<label className="control-label col-sm-2 required">Bank account number</label>*/}
            <div className="col-sm-10">
    	        <input
    		        type="text"
    		        id="bank_account_number"
    		        placeholder="Bank Account Number"
    		        defaultValue={this.props.bank_account_number}
    		        ref={(ref) => this.bank_account_number = ref}
                className={"form-control " + (errors['bank_account_number'] ? "has-error" : "")}
                onChange={removeErrorFunc}
              />
              {renderErrorFunc(errors['bank_account_number'])}
            </div>
          </div>
        ]}
        <div className="buttons">
          { this.renderButtonBack() }
          <button type="submit" className="button-primary green option-button">
            Next
          </button>
        </div>
      </form>
      { this.state.openModal ?
      		<ModalNotification
						title={this.state.notification.title}
						content={this.state.notification.content}
						close={this.closeModal}
						bgClass={this.state.notification.bgClass}
					/>
					:
					null
      }
      </div>
		);
	}
});
