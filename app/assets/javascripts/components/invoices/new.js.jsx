var TradyCompanyInvoice = React.createClass({
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
			<form role="form" class="form-horizontal" id="edit_trady_company_2" action="/update_company_invoice" acceptCharset="UTF-8" method="post">
			    <input name="utf8" type="hidden" value="✓" />
			    <input type="hidden" name="_method" value="put" />
				<input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />

				<p> Company Name </p>
				<input defaultValue={this.props.company_name} type="text"
					   name="trady_company[company_name]"
					   id="trady_company_company_name" required />

				<p> Trading Name </p>
				<input defaultValue={this.props.trading_name} type="text"
						name="trady_company[trading_name]"
						id="trady_company_trading_name" required />

				<p> Abn </p>
				<input defaultValue={this.props.abn} type="text"
						name="trady_company[abn]"
						id="trady_company_abn" required />

				<label>
					<input defaultValue={this.props.gst_registration} type="checkbox"
							name="trady_company[gst_registration]"
							id="trady_company_gst_registration" />
						GST  Registration
				</label>

				<p> Address </p>
				<input defaultValue={this.props.address} type="text"  onChange={this.handleChange}
						name="trady_company[address]"
						id="trady_company_address" required />

				<div className="field">
					<label>
						<input defaultdefaultValue={this.props.mailing_address_same} type="checkbox" onChange={this.onSame}
								name="trady_company[mailing_address_same]"
								id="trady_company_mailing_address_same" />
							Mailing Address same as Above
					</label>

					<p> Mailing Address </p>
					<input value={this.state.mailing} type="text"
							name="trady_company[mailing_address]"
							id="trady_company_mailing_address" required />
				</div>

				<p> Mobile Number </p>
				<input defaultValue={this.props.mobile_number} type="text"
						name="trady_company[mobile_number]"
						id="trady_company_mobile_number" required />

				<p> Email </p>
				<input defaultValue={this.props.email} type="text"
						name="trady_company[email]"
						id="trady_company_email" required />

				<p> Bank Account Number </p>
				<input type="text"
						name="trady_company[bank_account_number]"
						id="trady_company_bank_account_number" required />

				<p> BSB Number </p>
				<input type="text"
						name="trady_company[bsb_number]"
						id="trady_company_bsb_number" required />


				<p> Account Name </p>
				<input type="text"
						name="trady_company[account_name]"
						id="trady_company_account_name" required />

				<input value={this.props.maintenance_request_id} type="hidden" name="trady_company[maintenance_request_id]"/>
				<input value={this.props.trady_id} type="hidden" name="trady_company[trady_id]"/>
				<input value={this.props.trady_company_id} type="hidden" name="trady_company[trady_company_id]"/>
				<input value={this.props.quote_id} type="hidden" name="trady_company[quote_id]"/>

				<input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
			</form>
		);
	},
    onSame: function() {
        this.setState({same_Address: !this.state.same_Address,
                       mailing: this.state.address});
    }
});