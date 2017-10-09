var EditTradyCompany = React.createClass({
	getInitialState: function() {
		return {
    	errorABN: false,
    	openModal: false,
      errorPhone: false,
      errorEmail: false,
    	errorAddress: false,
    	same_Address: false,
      errorBsbNumber: false,
      errorBankNumber: false,
    	errorCompanyName: false,
    	errorTradingName: false,
    	errorAccountName: false,
    	errorMailingAdress: false,
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
    if (!!this.state.same_Address) {
      this.setState({
      	mailing_address: this.address.value,
      });
    }
  },

  onSame: function() {
  	if(!this.state.same_Address) {
  		this.setState({
	     	mailing_address: this.state.address

	   	});
  	}

  	this.setState({
  		same_Address: !this.state.same_Address
  	});
  },

  changeMailingAddress: function(e) {
  	this.setState({
  		mailing_address: e.target.value
  	});
  },

	checkValidate: function(e) {
  	const target = e.target.id;
  	switch (target.key) {
  		case 'email': {
  			if(EMAIL_REGEXP.test(target.value))
  				return this.setState({
  					errorEmail: false
  				});
  			else
  				return this.setState({
  					errorEmail: true
  				});
  		}
  		case 'mobile_number': {
  			if(PHONE_REGEXP.test(target.value))
  				return this.setState({
  					errorPhone: false
  				});
  			else
  				return this.setState({
  					errorPhone: true
  				});
  		}
  		case "abn": {
				if(NUMBER_REGEXP.test(target.value))
  				return this.setState({
  					errorABN: false
  				});
  			else
  				return this.setState({
  					errorABN: true
  				});
  		}
  		default:
  			break;
  	}
  },

  edit: function(e) {

  	var flag = false;
    let isInvoice = this.props.system_plan === "Invoice";

  	if(!this.company_name.value) {
  		flag = true;
  		this.setState({
  			errorCompanyName: true
  		});
  	}

    if (isInvoice) {
      if(!this.trading_name.value) {
        flag = true;
        this.setState({
          errorTradingName: true
        });
      }

      if(!this.abn.value || !NUMBER_REGEXP.test(this.abn.value)) {
        flag = true;
        this.setState({
          errorTradingName: true
        });
      }

      if(!this.account_name.value) {
        flag = true;
        this.setState({
          errorAccountName: true
        });
      }

      if(!this.bsb_number.value || !NUMBER_REGEXP.test(this.bsb_number.value)) {
        flag = true;
        this.setState({
          errorBsbNumber: true
        });
      }

      if(!this.bank_account_number.value || !NUMBER_REGEXP.test(this.bank_account_number.value)) {
        flag = true;
        this.setState({
          errorBankNumber: true
        });
      }
  	}

  	if(!this.address.value) {
  		flag = true;
  		this.setState({
  			errorAddress: true
  		});
  	}

  	if(!this.mailing_address.value) {
  		flag = true;
  		this.setState({
  			errorTradingName: true
  		});
  	}

  	if(!this.email.value || !EMAIL_REGEXP.test(this.email.value)) {
  		flag = true;
  		this.setState({
  			errorEmail: true
  		});
  	}

  	if(!this.mobile_number.value || !PHONE_REGEXP.test(this.mobile_number.value)) {
  		flag = true;
  		this.setState({
  			errorPhone: true
  		});
  	}

  	if(!flag) {
  		var params = {
  			trady_company: {
  				email: this.email.value,
  				address: this.address.value,
  				trady_id: this.props.trady_id,
  				quote_id: this.props.quote_id,
  				ledger_id: this.props.ledger_id,
  				trady_company_id: this.props.id,
  				work_flow: this.props.work_flow,
  				quote_type: this.props.quote_type,
          pdf_file_id: this.props.pdf_file_id,
          system_plan: this.props.system_plan,
          company_name: this.company_name.value,
          trading_name: this.trading_name.value,
          invoice_type: this.props.invoice_type,
          mobile_number: this.mobile_number.value,
          mailing_address: this.mailing_address.value,
          maintenance_request_id: this.props.maintenance_request_id,
  			}
      }

      if (isInvoice) {
        params.trady_company.abn = this.abn.value;
        params.trady_company.bsb_number = this.bsb_number.value;
        params.trady_company.account_name = this.account_name.value;
        params.trady_company.gst_registration = this.state.gst_registration;
        params.trady_company.bank_account_number = this.bank_account_number.value;
      }

  		const self = this;
			$.ajax({
				type: 'PUT',
				url: '/trady_companies/'+ self.props.id,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
				},
				data: params,
				success: function(res){

				},
				error: function(err) {

				}
			});
  	}

    e.preventDefault();
  	return;
  },

  renderButtonBack: function() {
    if(this.props.system_plan == "Invoice") {
      return (
        <a className="btn btn-default btn-back m-r-lg" href={"/invoice_options?maintenance_request_id=" + this.props.maintenance_request_id + "&trady_id=" + this.props.trady_id + "&quote_id=" + this.props.quote_id + "&trady_company_id=" + this.props.id}>
          Back
        </a>
      );
    }else if(this.props.system_plan == "Quote") {
      return (
        <a className="btn btn-default btn-back m-r-lg" href={"/quote_options?maintenance_request_id=" + this.props.maintenance_request_id + "&trady_id=" + this.props.trady_id}>
          Back
        </a>
      );
    }
  },

	render: function() {
    let isInvoice = this.props.system_plan === "Invoice";

		return (
			<form role="form" className="form-horizontal" id="new_trady_company" onSubmit={this.edit}>
				<div className="form-group">
					<label className="control-label col-sm-2 required">Company name</label>
					<div className="col-sm-10">
						<input
							required
							type="text"
							id="company_name"
							placeholder="Company Name"
							defaultValue={this.props.company_name}
              ref={(ref) => this.company_name = ref}
							className={"form-control " + (this.state.errorCompanyName ? "has-error" : "")}
						/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2 required">Trading name</label>
					<div className="col-sm-10">
						<input
							required
							type="text"
							id="trading_name"
							className="form-control"
							placeholder="Trading Name"
  		        defaultValue={this.props.trading_name}
  		        ref={(ref) => this.trading_name = ref}
  		        className={"form-control " + (!!this.state.errorTradingName && "has-error")}
						/>
					</div>
				</div>
        { isInvoice &&
  				<div className="form-group">
  					<label className="control-label col-sm-2 required">Abn</label>
  					<div className="col-sm-10">
  						<input
  							required
  							id="abn"
  							type="text"
  							placeholder="Abn"
  			        defaultValue={this.props.abn}
  			        ref={(ref) => this.abn = ref}
  			        className={"form-control " + (!!this.state.errorABN && "has-error")}
  						/>
  					</div>
  				</div>
        }
        { isInvoice &&
  				<div className="form-group">
  					<div className="col-sm-10 col-sm-offset-2">
  						<input
  		          type="checkbox"
  		          id="gst_registration"
  		          onChange={() => {
  		          	this.setState({
  		          		gst_registration: !this.state.gst_registration
  		          	});
  		          }}
  		          checked={!!this.state.gst_registration ? "checked" : false}
  	          />
  	          GST  Registration
  					</div>
  				</div>
        }
				<div className="form-group">
          <label className="control-label col-sm-2 required">Address</label>
          <div className="col-sm-10">
  	        <input
  		        required
  		        type="text"
  		        id="address"
  		        placeholder="Address"
  		        defaultValue={this.state.address}
  		        onChange={this.handleChange}
  		        ref={(ref) => this.address = ref}
  		        className={"form-control " + (!!this.state.errorAddress && "has-error")}
  	        />
          </div>
        </div>
				<div className="form-group">
          <input
          	type="checkbox"
            onChange={this.onSame}
            id="mailing_address_same"
          />
          Mailing Address same as Above
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 required">Mailing address</label>
          <div className="col-sm-10">
          	<input
		          required
		          type="text"
		          id="mailing_address"
		          placeholder="Mailing Address"
		          value={this.state.mailing_address}
		          onChange={this.changeMailingAddress}
		          ref={(ref) => this.mailing_address = ref}
		          className={"form-control " + (!!this.state.errorMailingAdress && "has-error")}
	          />
          </div>
        </div>
				<div className="form-group">
          <label className="control-label col-sm-2 required">Mobile number</label>
          <div className="col-sm-10">
  	        <input
  		        required
  		        type="text"
  		        id="mobile_number"
  		        placeholder="Mobile Number"
  		        onChange={this.checkValidate}
  		        defaultValue={this.props.mobile_number}
  		        ref={(ref) => this.mobile_number = ref}
  		        className={"form-control " + (!!this.state.errorPhone && "has-error")}
  	        />
          </div>
        </div>
				<div className="form-group">
          <label className="control-label col-sm-2 required">Company Email</label>
          <div className="col-sm-10">
  	        <input
  	          required
  	          id="email"
  		        type="text"
  		        placeholder="Email"
  		        onChange={this.checkValidate}
  		        defaultValue={this.props.email}
  	          ref={(ref) => this.email = ref}
  		        className={"form-control " + (!!this.state.errorEmail && "has-error")}
  	        />
          </div>
        </div>
        <div className="text-center">
          { this.renderButtonBack() }
          <button type="submit" className="button-primary green option-button">
            Next
          </button>
        </div>
			</form>
		);
	}
});
