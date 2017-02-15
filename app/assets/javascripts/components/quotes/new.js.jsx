var FieldList = React.createClass({
    render: function(){    
        return <ul>
            {this.props.fields.map((field, fieldIndex) => 
                <li key={fieldIndex}>
                    {field}
                    <button className="button-remove button-primary red" onClick={this.props.removeField} value={fieldIndex}> Remove </button>
                </li>
            )}
        </ul>;
    }
});

var QuoteField = React.createClass({
    render: function() {
        return <div className="field">
            <fieldset>
                <p> Item description </p>
                <input type="text" name={'quote[quote_items_attributes][' + this.props.x + '][item_description]'}
                                     id={'quote_quote_items_attributes_' + this.props.x + '_item_description'} required />

                <p> Amount </p>
                <input type="text" name={'quote[quote_items_attributes][' + this.props.x + '][amount]'}
                                     id={'quote_quote_items_attributes_' + this.props.x + '_amount'} required />
            </fieldset>
        </div>
    }
});

var QuoteList = React.createClass({
    getInitialState : function() {
      return {
        fields : [ <QuoteField x={0}/> ],
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
            fields: this.state.fields.concat([ <QuoteField x={++this.state.x}/> ])
        });
    
        e.preventDefault();
    },

    render: function(){ 
        return(
            <div>
                <FieldList fields={this.state.fields} removeField={this.removeField} />
                <button className="button-add button-primary" onClick={this.addField}> Add Another Item </button>
            </div>
        );
    }
});

var QuoteFields = React.createClass({
    render: function(){
        return <form role="form" id="new_quote" action="/quotes" acceptCharset="UTF-8" method="post">   
            <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />

            <input type="hidden" value={this.props.maintenance_request_id} name="quote[maintenance_request_id]" id="quote_maintenance_request_id" />
            <input type="hidden" value={this.props.trady_id} name="quote[trady_id]" id="quote_trady_id" />
            <input type="hidden" value={this.props.status} name="quote[status]" id="quote_status" />
            <input type="hidden" value={this.props.delivery_status} name="quote[delivery_status]" id="quote_delivery_status" />

            <QuoteList />

            <hr />

            <div className="qf-button">
                <button className="button"> <a href={this.props.backlink}> Back </a> </button>
                <input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
            </div>
        </form>
    }
});