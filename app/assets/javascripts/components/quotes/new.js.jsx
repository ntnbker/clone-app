var QuoteField = React.createClass({
    getInitialState : function() {
        return {
            remove : false
        }
    },

    removeField() {
        this.setState({remove: true});
    },

    render: function() {
        var quote = this.props.content;
        var x= this.props.x;
        if (quote) {
            x = quote.id;
        }
        return <div className="quotefield" style={{display: this.state.remove ? 'none' : 'block' }}>
            <fieldset>
                <p> Item description </p>
                <input type="text" name={'quote[quote_items_attributes][' + x + '][item_description]'}
                                     id={'quote_quote_items_attributes_' + x + '_item_description'}
                           defaultValue={quote ? quote.item_description : null} />

                <p> Amount </p>
                <input type="text" name={'quote[quote_items_attributes][' + x + '][amount]'}
                                     id={'quote_quote_items_attributes_' + x + '_amount'}
                           defaultValue={quote ? quote.amount : null} />

                <input type="hidden" value={this.state.remove} name={'quote[quote_items_attributes][' + x + '][_destroy]'} id={'quote_quote_items_attributes_' + x + '__destroy'}/>
                {quote
                ? <input type="hidden" value={x} name={'quote[quote_items_attributes][' + x + '][id]'} id={'quote_iquote_items_attributes_' + x + '_id'} />
                : null }
            </fieldset>
            <button type="button" className="button-remove button-primary red" onClick={this.removeField}> Remove </button>
        </div>
    }
});

var QuoteFields = React.createClass({
    render: function() {
        return <form role="form" id="new_quote" action={this.props.id ? '/quotes/'+this.props.id : '/quotes'} acceptCharset="UTF-8" method="post">   
            <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
            
            <input type="hidden" name="_method" value={this.props._method} />
            <input type="hidden" value={this.props.maintenance_request_id} name="quote[maintenance_request_id]" id="quote_maintenance_request_id" />
            <input type="hidden" value={this.props.trady_id} name="quote[trady_id]" id="quote_trady_id" />
            <input type="hidden" value={this.props.status} name="quote[status]" id="quote_status" />
            <input type="hidden" value={this.props.delivery_status} name="quote[delivery_status]" id="quote_delivery_status" />

            <FieldList existingContent={this.props.quote_items} SampleField={QuoteField} />

            <hr />

            <div className="qf-button">
                <button className="button"> <a href={this.props.backlink}> Back </a> </button>
                <input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
            </div>
        </form>
    }
});