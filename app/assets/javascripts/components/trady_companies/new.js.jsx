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
			<form role="form" id="new_trady_company" action="/trady_companies" acceptCharset="UTF-8" method="post">   
				<input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />

				<p> Company name </p>
				<input defaultValue={this.props.company_name} type="text"
					   name="trady_company[company_name]"
					   id="trady_company_company_name" required />

				<p> Trading name </p>
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
						GST  registration
				</label>

				<p> Address </p>
				<input defaultValue={this.props.address} type="text"  onChange={this.handleChange}
						name="trady_company[address]"
						id="trady_company_address" required />

				<div className="field">
					<label>
						<input defaultValue={this.props.mailing_address_same} type="checkbox" onChange={this.onSame}
								name="trady_company[mailing_address_same]"
								id="trady_company_mailing_address_same" />
							Mailing Address same as Above
					</label>

					<p> Mailing address </p>
					<input value={this.state.mailing} type="text"
							name="trady_company[mailing_address]"
							id="trady_company_mailing_address" required />
				</div>

				<p> Mobile number </p>
				<input defaultValue={this.props.mobile_number} type="text"
						name="trady_company[mobile_number]"
						id="trady_company_mobile_number" required />

				<p> Company Email </p>
				<input defaultValue={this.props.email} type="text"
						name="trady_company[email]"
						id="trady_company_email" required />

				<p>
				Tradie Email : {this.props.email} 
				<br />
				Click Here To Edit Tradie/User Email
				</p>

				<input defaultValue={this.props.maintenance_request_id} type="hidden" name="trady_company[maintenance_request_id]" id="trady_company_maintenance_request_id" />
				<input defaultValue={this.props.trady_id} type="hidden" name="trady_company[trady_id]" id="trady_company_trady_id" />

				<input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
			</form>
		);
	},
    onSame: function() {
        this.setState({same_Address: !this.state.same_Address,
                       mailing: this.state.address});
    }
});