var AddTradycompany = React.createClass({
  getInitialState: function () {
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
  		case "bsb_number": {
  			if(NUMBER_REGEXP.test(target.value))
  				return this.setState({
  					errorBsbNumber: false
  				});
  			else
  				return this.setState({
  					errorBsbNumber: true
  				});
  		}
  		case "bank_account_number": {
  			if(NUMBER_REGEXP.test(target.value))
  				return this.setState({
  					errorBankNumber: false
  				});
  			else
  				return this.setState({
  					errorBankNumber: true
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

  changeMailingAddress: function(e) {
  	this.setState({
  		mailing_address: e.target.value
  	});
  },

  onSubmit: function(e){
  	
  	var flag = false;

  	if(!this.company_name.value) {
  		flag = true;
  		this.setState({
  			errorCompanyName: true
  		});
  	}

  	if(!this.trading_name.value) {
  		flag = true;
  		this.setState({
  			errorTradingName: true
  		});
  	}

  	if(!this.abn.value || !NUMBER_REGEXP.test(this.abn.value)) {
  		flag = true;
  		this.setState({
  			errorABN: true
  		});
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
  			errorMailingAdress: true
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

  	if(!flag) {
  		var params = {
  			trady_company: {
  				abn: this.abn.value,
  				email: this.email.value,
  				address: this.address.value,
  				trady_id: this.props.trady_id,
          quote_id: this.props.quote_id,
          work_flow: this.props.work_flow,
          bsb_number: this.bsb_number.value,
          quote_type: this.props.quote_type,
          system_plan: this.props.system_plan,
          company_name: this.company_name.value,
          trading_name: this.trading_name.value,
          invoice_type: this.props.invoice_type,
  				account_name: this.account_name.value,
  				mobile_number: this.mobile_number.value,
  				mailing_address: this.mailing_address.value,
  				gst_registration: this.state.gst_registration,
  				bank_account_number: this.bank_account_number.value,
          maintenance_request_id: this.props.maintenance_request_id,
          quote_id: this.props.quote_id ? this.props.quote_id : null,
          ledger_id: this.props.ledger_id ? this.props.ledger_id : null,
          pdf_file_id: this.props.pdf_file_id ? this.props.pdf_file_id : null,
          trady_company_id: this.props.trady_company_id ? this.props.trady_company_id : null,
  			}
  		}

  		const self = this;
			$.ajax({
				type: 'POST',
				url: '/trady_companies',
				beforeSend: function(xhr) {
					xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
				},
				data: params,
				success: function(res){
				},
				error: function(err) {
					self.openModalNotification({
						bgClass: 'bg-error',
						title: "Add Trady Company",
						content: "Add trady company is error!",
					});
				}
			});
  	}
  		
		e.preventDefault();

  	return;
  },

  renderButtonBack: function() {
    if(this.props.system_plan == "Invoice") {
      return (
        <a className="btn btn-default btn-back m-r-lg" href={"/invoice_options?maintenance_request_id=" + this.props.maintenance_request_id + "&trady_id=" + this.props.trady_id + "&quote_id=" + this.props.quote_id + "&trady_company_id=" + this.props.trady_company_id}>
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
		return (
			<div>
      <form role="form" className="form-horizontal" id="new_trady_company" onSubmit={this.onSubmit} >   

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
  		        placeholder="Trading Name" 
  		        defaultValue={this.props.trading_name} 
  		        ref={(ref) => this.trading_name = ref}
  		        className={"form-control " + (!!this.state.errorTradingName && "has-error")}
  	        />
          </div>
        </div>

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

				<div className="form-group">
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

        <div className="form-group">
          <label className="control-label col-sm-2 required">Account name</label>
          <div className="col-sm-10">
  	        <input 
  			      required 
  			      type="text" 
  			      id="account_name" 
  			      placeholder="Account Name" 
  			      defaultValue={this.props.account_name}
  			      ref={(ref) => this.account_name = ref}
  			      className={"form-control " + (!!this.state.errorAccountName ? "has-error" : "")}
  	        />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-2 required">Bsb number</label>
          <div className="col-sm-10">
  	        <input 
  			      required 
  			      type="text" 
  			      id="bsb_number" 
  			      placeholder="BSB Number" 
  			      onChange={this.checkValidate}
  			      defaultValue={this.props.bsb_number}
  			      ref={(ref) => this.bsb_number = ref}
  			      className={"form-control " + (!!this.state.errorBsbNumber ? "has-error" : "")}
  	        />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-2 required">Bank account number</label>
          <div className="col-sm-10">
  	        <input 
  		        required 
  		        type="text" 
  		        id="bank_account_number" 
  		        placeholder="Bank Account Number" 
  		        defaultValue={this.props.bank_account_number}
  		        ref={(ref) => this.bank_account_number = ref}
  		        className={"form-control " + (!!this.state.errorBankNumber ? "has-error" : "")}
  	        />
          </div>
        </div>
        <div className="text-center">
          { this.renderButtonBack() }
          <button type="submit" name="commit" value="Next" className="button-primary green option-button">
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
