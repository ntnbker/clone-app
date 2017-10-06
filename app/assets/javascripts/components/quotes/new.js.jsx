var QuoteField = React.createClass({
    getInitialState : function() {
        var quote = this.props.content;
        var pricing_type = quote ? quote.pricing_type : 'Fixed Cost';
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
        var quote = this.props.content;
        var x= this.props.x;
        if (quote) {
            x = quote.id;
        }
        return <div className="quotefield" style={{display: this.state.remove ? 'none' : 'block' }}>
            <fieldset>
                <div>
                    <input 
                        required
                        type="text"
                        placeholder="Item description"
                        className="text-center"
                        defaultValue={quote ? quote.item_description : ''}
                        id={'quote_quote_items_attributes_' + x + '_item_description'}
                        name={'quote[quote_items_attributes][' + x + '][item_description]'}
                    />
                </div>
                <div className="amount">
                    <select 
                        onChange={this.onPricing}
                        value={this.state.pricing_type}
                        className="text-center select"
                        id={'quote_quote_items_attributes_' + x + '_pricing_type'}
                        name={'quote[quote_items_attributes][' + x + '][pricing_type]'}
                    >
                        <option value="Fixed Cost">Fixed Cost</option>
                        <option value="Hourly">Hourly</option>
                    </select>
                    <input 
                        required
                        type="number"
                        placeholder="Amount"
                        defaultValue={quote ? quote.amount : ''}
                        className="text-center price"
                        id={'quote_quote_items_attributes_' + x + '_amount'}
                        name={'quote[quote_items_attributes][' + x + '][amount]'}
                    />
                    <input 
                        type="hidden"
                        id={'quote_quote_items_attributes_' + x + '_hours'}
                        name={'quote[quote_items_attributes][' + x + '][hours]'}
                    />
                    <input type="hidden" value={this.state.remove} name={'quote[quote_items_attributes][' + x + '][_destroy]'} id={'quote_quote_items_attributes_' + x + '__destroy'}/>
                    {   quote && 
                        <input type="hidden" value={x} name={'quote[quote_items_attributes][' + x + '][id]'} id={'quote_iquote_items_attributes_' + x + '_id'} />
                    }
                </div>
                
            </fieldset>
            <div className="text-center">
                <button type="button" className="button-remove button-primary red" onClick={this.removeField}> Remove </button>
            </div>
        </div>
    }
});

var QuoteFields = React.createClass({
    render: function() {
        const {trady_company, quote} = this.props;
        return <form role="form" id="new_quote" action={this.props.id ? '/quotes/'+this.props.id : '/quotes'} acceptCharset="UTF-8" method="post">   
            <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
            
            <input type="hidden" name="_method" value={this.props._method} />
            <input type="hidden" value={this.props.maintenance_request_id} name="quote[maintenance_request_id]" id="quote_maintenance_request_id" />
            <input type="hidden" value={this.props.trady_id} name="quote[trady_id]" id="quote_trady_id" />
            <input type="hidden" value={this.props.status} name="quote[status]" id="quote_status" />
            <input type="hidden" value={this.props.delivery_status} name="quote[delivery_status]" id="quote_delivery_status" />
            <input type="hidden" value={this.props.quote_type} name="quote[quote_type]" id="quote_type" />
            <input type="hidden" value={this.props.system_plan} name="quote[system_plan]" id="system_plan" />
            <FieldList existingContent={this.props.quote_items} SampleField={QuoteField} flag="quote"/>

            <div className="text-center">
                <input type="text" className="m-t-lg text-center" defaultValue={quote && quote.trady_quote_reference} name="quote[trady_quote_reference]" placeholder="Quote Reference Number"/>
            </div>

            <label className="quote_tax">
                <input type="hidden" value="0" name="quote[tax]" />
                <input type="checkbox" value="1" defaultChecked={trady_company.gst_registration ? trady_company.gst_registration : false} name="quote[tax]" id="quote_tax" />
                Check box when price includes GST.
            </label>

            <hr />

            <div className="text-center">
                <a className="button m-r-lg" href={this.props.backlink}> Back </a>
                <input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
            </div>
        </form>
    }
});