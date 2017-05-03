var TradyCompanies = React.createClass({
    getInitialState: function () {
        return { same_Address: false,
                 address: this.props.address,
                 mailing: this.props.mailing_address };
    },

    handleChange: function(event) {
	    this.setState({address: event.target.value});
	    if (this.state.same_Address) {
	        this.setState({mailing: event.target.value,
	                       address: event.target.value});
	    }
    },

	render: function() {
		return (
      <form role="form" id="new_trady_company" action={this.props.id ? '/trady_companies/'+this.props.id : '/trady_companies'} acceptCharset="UTF-8" method="post">   
        <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
        <input type="hidden" name="_method" value={this.props._method} />
        <input type="text" placeholder="Company Name" defaultValue={this.props.company_name} name="trady_company[company_name]" id="trady_company_company_name" required />
        <input type="text" placeholder="Trading Name" defaultValue={this.props.trading_name} name="trady_company[trading_name]" id="trady_company_trading_name" required />
        <input type="text" placeholder="Abn" defaultValue={this.props.abn} name="trady_company[abn]" id="trady_company_abn" required />

        <label>
          <input defaultValue={this.props.gst_registration} type="checkbox" defaultValue={this.props.gst_registration} name="trady_company[gst_registration]" id="trady_company_gst_registration" />
            GST  Registration
        </label>

        <input type="text" placeholder="Address" onChange={this.handleChange} defaultValue={this.props.address} name="trady_company[address]" id="trady_company_address" required />

        <div className="field">
            <label>
                <input type="checkbox" onChange={this.onSame} defaultValue={this.props.mailing_address_same}
                       name="trady_company[mailing_address_same]"
                       id="trady_company_mailing_address_same" />
                    Mailing Address same as Above
            </label>

            <input value={this.state.mailing} type="text" placeholder="Mailing Address" 
                   defaultValue={this.props.mailing_address} 
                   name="trady_company[mailing_address]"
                   id="trady_company_mailing_address" required />
        </div>

        <input type="text" placeholder="Mobile Number" defaultValue={this.props.mobile_number}
               name="trady_company[mobile_number]"
               id="trady_company_mobile_number" required />

        <input type="text" placeholder="Email" defaultValue={this.props.email}
               name="trady_company[email]"
                id="trady_company_email" required />

        <input type="text" placeholder="Bank Account Number" defaultValue={this.props.account_name}
                name="trady_company[bank_account_number]"
                id="trady_company_bank_account_number" required />

        <input type="text" placeholder="BSB Number" defaultValue={this.props.bsb_number}
                name="trady_company[bsb_number]"
                id="trady_company_bsb_number" required />

        <input type="text" placeholder="Account Name" defaultValue={this.props.bank_account_number}
                name="trady_company[account_name]"
                id="trady_company_account_name" required />


        <input value={this.props.maintenance_request_id} type="hidden" name="trady_company[maintenance_request_id]" id="trady_company_maintenance_request_id" />
        <input value={this.props.trady_id} type="hidden" name="trady_company[trady_id]" id="trady_company_trady_id" />
        <input value={this.props.work_flow} type="hidden" name="trady_company[work_flow]" id="trady_company_work_flow" />

        <input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
      </form>
			// <form role="form" id="new_trady_company" action={this.props.id ? '/trady_companies/'+this.props.id : '/trady_companies'} acceptCharset="UTF-8" method="post">   
			// 	<input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
			// 	<input type="hidden" name="_method" value={this.props._method} />
			// 	<p> Company name </p>
			// 	<input defaultValue={this.props.company_name} type="text"
			// 		   name="trady_company[company_name]"
			// 		   id="trady_company_company_name" required />

			// 	<p> Trading name </p>
			// 	<input defaultValue={this.props.trading_name} type="text"
			// 			name="trady_company[trading_name]"
			// 			id="trady_company_trading_name" required />

			// 	<p> Abn </p>
			// 	<input defaultValue={this.props.abn} type="text"
			// 			name="trady_company[abn]"
			// 			id="trady_company_abn" required />

			// 	<label>
			// 		<input defaultValue={this.props.gst_registration} type="checkbox"
			// 				name="trady_company[gst_registration]"
			// 				id="trady_company_gst_registration" />
			// 			GST  registration
			// 	</label>

			// 	<p> Address </p>
			// 	<input defaultValue={this.props.address} type="text"  onChange={this.handleChange}
			// 			name="trady_company[address]"
			// 			id="trady_company_address" required />

			// 	<div className="field">
			// 		<label>
			// 			<input defaultValue={this.props.mailing_address_same} type="checkbox" onChange={this.onSame}
			// 					name="trady_company[mailing_address_same]"
			// 					id="trady_company_mailing_address_same" />
			// 				Mailing Address same as Above
			// 		</label>

			// 		<p> Mailing address </p>
			// 		<input value={this.state.mailing} type="text"
			// 				name="trady_company[mailing_address]"
			// 				id="trady_company_mailing_address" required />
			// 	</div>

			// 	<p> Mobile number </p>
			// 	<input defaultValue={this.props.mobile_number} type="text"
			// 			name="trady_company[mobile_number]"
			// 			id="trady_company_mobile_number" required />

			// 	<p> Company Email </p>
			// 	<input defaultValue={this.props.email} type="text"
			// 			name="trady_company[email]"
			// 			id="trady_company_email" required />


			// 	<input value={this.props.maintenance_request_id} type="hidden" name="trady_company[maintenance_request_id]" id="trady_company_maintenance_request_id" />
			// 	<input value={this.props.trady_id} type="hidden" name="trady_company[trady_id]" id="trady_company_trady_id" />
			// 	<input value={this.props.work_flow} type="hidden" name="trady_company[work_flow]" id="trady_company_work_flow" />

			// 	<input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
			// </form>
		);
	},
    



    onSame: function() {
        this.setState({same_Address: !this.state.same_Address,
                       mailing: this.state.address});
    }
});