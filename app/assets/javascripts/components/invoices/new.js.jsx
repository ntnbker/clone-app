var StepProgress = React.createClass({
    matchClass(nth, step) {
        if (nth < step)
            return "done";
        else if (nth == step)
            return "active";
        else
            return null;
    },

    matchChar(nth, step) {
        if (nth < step)
            return "✔";
        else
            return nth;
    },

    render: function() {
        return <div className="progress">
            <h4> SEND INOVICE </h4>
            <div>
                <div className={'circle ' + this.matchClass(1,this.props.step)}>
                    <span className="label">{this.matchChar(1,this.props.step)}</span>
                    <span className="title">Template Details</span>
                </div>

                <span className={'bar ' + this.matchClass(2,this.props.step)}></span>

                <div className={'circle ' + this.matchClass(2,this.props.step)}>
                    <span className="label">{this.matchChar(2,this.props.step)}</span>
                    <span className="title">Item Details</span>
                </div>

                <span className={'bar ' + this.matchClass(3,this.props.step)}></span>

                <div className={'circle ' + this.matchClass(3,this.props.step)}>
                    <span className="label">{this.matchChar(3,this.props.step)}</span>
                    <span className="title">Invoice Print View</span>
                </div>
            </div>
        </div>
    }
});

var InvoiceFieldList = React.createClass({
    render: function(){    
        return <ul>
            {this.props.fields.map((field, fieldIndex) => 
                <li key={fieldIndex}>
                    {field}
                    <button className="button-remove button-primary red" onClick={this.props.removeField} value={fieldIndex}> X </button>
                </li>
            )}
        </ul>;
    }
});

var InvoiceField = React.createClass({
    render: function() {
        return <div className="field">
            <fieldset>
                <input type="text" placeholder="Item description"
                    name={'invoice[invoice_items_attributes][' + this.props.x + '][item_description]'}
                    id={'invoice_invoice_items_attributes_' + this.props.x + '_item_description'} required />

                <input type="text" placeholder="Amount"
                    name={'invoice[invoice_items_attributes][' + this.props.x + '][amount]'}
                    id={'invoice_invoice_items_attributes_' + this.props.x + '_amount'} required />
            </fieldset>
        </div>
    }
});

var InvoiceList = React.createClass({
    getInitialState : function() {
      return {
        fields : [ <InvoiceField x={0}/> ],
        x : 0
      }
    },
    
    removeField: function(e) {
        var fieldIndex = parseInt(e.target.value, 10);
        this.setState(state => {
            state.fields.splice(fieldIndex, 1);
            return {fields: state.fields};
        });
    },

    addField:function (e){
        this.setState({
            fields: this.state.fields.concat([ <InvoiceField x={++this.state.x}/> ])
        });
    
        e.preventDefault();
    },

    render: function(){ 
        return(
            <div>
                <InvoiceFieldList fields={this.state.fields} removeField={this.removeField} />
                <button className="button-add button-primary" onClick={this.addField}> Add Another Item </button>
            </div>
        );
    }
});

var InvoiceFields = React.createClass({
    render: function(){
        return <form role="form" id="new_invoice" action="/invoices" acceptCharset="UTF-8" method="post">
            <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />

            <input type="hidden" value={this.props.maintenance_request_id} name="invoice[maintenance_request_id]" id="invoice_maintenance_request_id" />
            <input type="hidden" value={this.props.trady_id} name="invoice[trady_id]" id="invoice_trady_id" />
            <input type="hidden" value={this.props.quote_id} name="invoice[quote_id]" id="invoice_quote_id" /   >

            <InvoiceList />

            <div className="qf-button">
                <button className="button button-primary left"> <a href={this.props.backlink}> Back </a> </button>
                <input type="submit" name="commit" value="Next" className="button button-primary green" data-disable-with="Next" />
            </div>
        </form>
    }
});

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
			<form role="form" id="edit_trady_company_2" action="/update_company_invoice" acceptCharset="UTF-8" method="post">
			    <input name="utf8" type="hidden" value="✓" />
			    <input type="hidden" name="_method" value="put" />
				<input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />

				<input type="text" placeholder="Company Name"
					   name="trady_company[company_name]"
					   id="trady_company_company_name" required />

				<input type="text" placeholder="Trading Name"
						name="trady_company[trading_name]"
						id="trady_company_trading_name" required />

				<input type="text" placeholder="Abn"
						name="trady_company[abn]"
						id="trady_company_abn" required />

				<label>
					<input defaultValue={this.props.gst_registration} type="checkbox"
							name="trady_company[gst_registration]"
							id="trady_company_gst_registration" />
						GST  Registration
				</label>

				<input type="text" placeholder="Address" onChange={this.handleChange}
						name="trady_company[address]"
						id="trady_company_address" required />

				<div className="field">
					<label>
						<input type="checkbox" onChange={this.onSame}
								name="trady_company[mailing_address_same]"
								id="trady_company_mailing_address_same" />
							Mailing Address same as Above
					</label>

					<input value={this.state.mailing} type="text" placeholder="Mailing Address"
							name="trady_company[mailing_address]"
							id="trady_company_mailing_address" required />
				</div>

				<input type="text" placeholder="Mobile Number"
						name="trady_company[mobile_number]"
						id="trady_company_mobile_number" required />

				<input type="text" placeholder="Email"
						name="trady_company[email]"
						id="trady_company_email" required />

				<input type="text" placeholder="Bank Account Number"
						name="trady_company[bank_account_number]"
						id="trady_company_bank_account_number" required />

				<input type="text" placeholder="BSB Number"
						name="trady_company[bsb_number]"
						id="trady_company_bsb_number" required />

				<input type="text" placeholder="Account Name"
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