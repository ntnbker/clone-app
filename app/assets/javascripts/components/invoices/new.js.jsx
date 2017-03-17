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

var FieldList = React.createClass({
    getInitialState : function(){
        const existingContent = this.props.existingContent;
        var SampleField = this.props.SampleField;
        var Fields = [];
        var x = 1;

        if (existingContent ? existingContent.length > 0 : false) {
            existingContent.map((one, index) => {
                Fields.push(<SampleField content={one}/>);
                x = index+1;
            });

            return { Fields : Fields,
                     x : x }
        } else {
            return { Fields : [ <SampleField x={x}/> ],
                     x : x }
        }
    },

    addField() {
        var SampleField = this.props.SampleField;
        var tmpFields = this.state.Fields.slice();
        tmpFields.push(<SampleField x={++this.state.x}/>);
        this.setState({Fields: tmpFields});
    },

    render: function(){    
        return <div className="fieldlist">
            <ul>
                {this.state.Fields.map((Field, fieldIndex) => 
                    <li key={fieldIndex}>
                        {Field}
                    </li>
                )}
            </ul>
            <button type="button" className="button-add button-primary" onClick={this.addField}> Add Another Item </button>
        </div>
    }
});

var InvoiceField = React.createClass({
    getInitialState : function() {
        var invoice = this.props.content;
        var pricing_type = invoice ? invoice.pricing_type : 'Fixed Cost';
        var hours_input = pricing_type == 'Fixed Cost' ? false : true;
        return {
            remove : false,
            pricing_type: pricing_type,
            hours_input: hours_input
        }
    },

    removeField() {
        this.setState({remove: true});
    },

    onPricing(event) {
        var pricing_type = event.target.value;
        this.setState({pricing_type: pricing_type});
        if (pricing_type == "Hourly") {
            this.setState({hours_input: true});
        } else {
            this.setState({hours_input: false});
        }
    },

    render: function() {
        var invoice = this.props.content;
        var x= this.props.x;
        if (invoice) {
            x = invoice.id;
        }
        return <div className="invoicefield" style={{display: this.state.remove ? 'none' : 'block' }}>
            <fieldset>
                <input type="text" placeholder="Item description" defaultValue={invoice ? invoice.item_description : null}
                    name={'invoice[invoice_items_attributes][' + x + '][item_description]'}
                    id={'invoice_invoice_items_attributes_' + x + '_item_description'} />

                <input type="text" placeholder="Amount" defaultValue={invoice ? invoice.amount : null}
                    name={'invoice[invoice_items_attributes][' + x + '][amount]'}
                    id={'invoice_invoice_items_attributes_' + x + '_amount'} />

                <p> Pricing type : </p>
                <select value={this.state.pricing_type}
                     onChange={this.onPricing}
                         name={'invoice[invoice_items_attributes][' + x + '][pricing_type]'}
                           id={'invoice_invoice_items_attributes_' + x + '_pricing_type'}>
                    <option value="Fixed Cost">Fixed Cost</option>
                    <option value="Hourly">Hourly</option>
                </select>

                {
                    this.state.hours_input
                    ? <input type="text" placeholder="Number of Hours" defaultValue={invoice ? invoice.hours : null}
                             name={'invoice[invoice_items_attributes][' + x + '][hours]'}
                             id={'invoice_invoice_items_attributes_' + x + '_hours'} />
                    : <input type="hidden"
                             name={'invoice[invoice_items_attributes][' + x + '][hours]'}
                             id={'invoice_invoice_items_attributes_' + x + '_hours'} />
                }
                
                <input type="hidden" value={this.state.remove} name={'invoice[invoice_items_attributes][' + x + '][_destroy]'} id={'invoice_invoice_items_attributes_' + x + '__destroy'}/>
                {invoice
                ? <input type="hidden" value={x} name={'invoice[invoice_items_attributes][' + x + '][id]'} id={'invoice_invoice_items_attributes_' + x + '_id'} />
                : null }
            </fieldset>
            <button type="button" className="button-remove button-primary red" onClick={this.removeField}> X </button>
        </div>
    }
});

var InvoiceFields = React.createClass({
    render: function(){
        var invoice = this.props.invoice ? this.props.invoice : '';
        var id = invoice.id;
        var tax = invoice.tax;
        var prepaid_or_postpaid = invoice.prepaid_or_postpaid;
        var payment_installment_amount = invoice.payment_installment_amount;

        return <form role="form" id="new_invoice" action={id ? '/invoices/'+id : '/invoices'} acceptCharset="UTF-8" method="post">
            <input type="hidden" value={this.props.authenticity_token} name="authenticity_token" />
            <input type="hidden" value={this.props._method} name="_method" />
            <input type="hidden" value={this.props.maintenance_request_id} name="invoice[maintenance_request_id]" id="invoice_maintenance_request_id" />
            <input type="hidden" value={this.props.trady_id} name="invoice[trady_id]" id="invoice_trady_id" />
            <input type="hidden" value={this.props.quote_id} name="invoice[quote_id]" id="invoice_quote_id" />

            <FieldList existingContent={this.props.invoice_items} SampleField={InvoiceField} />

            <hr/>
            <div className="additon">
                <div className="paid-type">
                    <label> <input type="radio" value="Prepaid" defaultChecked={prepaid_or_postpaid ? prepaid_or_postpaid=="Prepaid" : 0} name="invoice[prepaid_or_postpaid]" id="invoice_prepaid_or_postpaid_prepaid" />
                        Payment Required Before Work Can Commense
                    </label>
                    <label> <input type="radio" value="PostPaid" defaultChecked={prepaid_or_postpaid ? prepaid_or_postpaid=="PostPaid" : 0} name="invoice[prepaid_or_postpaid]" id="invoice_prepaid_or_postpaid_postpaid" />
                        Payment Required After Work Completed
                    </label>
                </div>

                <input type="text" placeholder="Payment Amount Required" defaultValue={payment_installment_amount ? payment_installment_amount : null}
                    name="invoice[payment_installment_amount]"
                    id="invoice_payment_installment_amount" />

                <label className="invoice_tax">
                    <input type="hidden" value="0" name="invoice[tax]"/>
                    <input type="checkbox" value="1" defaultChecked={tax ? tax : false} name="invoice[tax]" id="invoice_tax" />
                    Add GST
                </label>
            </div>

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

                <input type="text" placeholder="Company Name" defaultValue={this.props.company_name}
                       name="trady_company[company_name]"
                       id="trady_company_company_name" required />

                <input type="text" placeholder="Trading Name" defaultValue={this.props.trading_name}
                        name="trady_company[trading_name]"
                        id="trady_company_trading_name" required />

                <input type="text" placeholder="Abn" defaultValue={this.props.abn}
                        name="trady_company[abn]"
                        id="trady_company_abn" required />

                <label>
                    <input defaultValue={this.props.gst_registration} type="checkbox" defaultValue={this.props.gst_registration}
                            name="trady_company[gst_registration]"
                            id="trady_company_gst_registration" />
                        GST  Registration
                </label>

                <input type="text" placeholder="Address" onChange={this.handleChange} defaultValue={this.props.address}
                        name="trady_company[address]"
                        id="trady_company_address" required />

                <div className="field">
                    <label>
                        <input type="checkbox" onChange={this.onSame} defaultValue={this.props.mailing_address_same}
                                name="trady_company[mailing_address_same]"
                                id="trady_company_mailing_address_same" />
                            Mailing Address same as Above
                    </label>

                    <input value={this.state.mailing} type="text" placeholder="Mailing Address" defaultValue={this.props.mailing_address}
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