var QuoteField = React.createClass({
  getInitialState : function() {
    var quote = this.props.content;
    var pricing_type = quote ? quote.pricing_type : 'Fixed Cost';
    var hours_input = pricing_type == 'Fixed Cost' ? false : true;
    return {
      remove : false,
      pricing_type: pricing_type,
      hours_input: hours_input,
      item_description_error: '',
      amount_error: '',
      min_price_error: '',
      max_price_error: '',
    }
  },

  validateDescription: function(errors) {
    const error = errors['quote_items.item_description'];
    return error && error.length && !this.item_description.value ? error[0] : '';
  },

  validateAmount: function(errors) {
    const error = errors['quote_items.amount'];
    if (!error || error.length === 0) return '';
    const amount = this.amount && this.amount.value || '';

    if (amount === '') return error.filter(e => e.includes('blank'))[0];
    if (!/^\d+$/.test(amount)) return error.filter(e => e.includes('number'))[0];
    return '';
  },

  validateMinPrice: function(errors) {
    const error = errors['quote_items.min_price'];
    if (!error || error.length === 0) return '';
    const min_price = this.min_price && this.min_price.value || '';

    if (min_price === '') return error[0];
    if (!/^\d+$/.test(min_price)) return error.filter(e => e.includes('number'))[0];
    return '';
  },

  validateMaxPrice: function(errors) {
    const error = errors['quote_items.max_price'];
    if (!error || error.length === 0) return '';
    const max_price = this.max_price && this.max_price.value || '';

    if (max_price === '') return error[0];
    if (!/^\d+$/.test(max_price)) return error.filter(e => e.includes('number'))[0];
    return '';
  },

  componentWillReceiveProps(nextProps) {
    const { errorsForm = {} } = nextProps;

    this.setState({
      item_description_error: this.validateDescription(errorsForm),
      amount_error: this.validateAmount(errorsForm),
      min_price_error: this.validateMinPrice(errorsForm),
      max_price_error: this.validateMaxPrice(errorsForm),
    });
  },

  removeField() {
    this.setState({remove: true});
  },

  onPricing(event) {
    var pricing_type = event.target.value;
    const update = {
      pricing_type,
      hours_input: pricing_type === 'Hourly',
    }
    if (pricing_type === 'Fixed Variable') {
      update.amount = 0;
    }
    this.setState(update);
  },

  removeError: function({ target: { id } }) {
    const field = id.match(/\d+_(\w+)$/);
    if (!field) return;

    this.setState({
      [`${field[1]}_error`]: '',
    })
  },

  renderError: function(error) {
      return <p id="errorbox" className="error">{error || ''}</p>;
  },

  render: function() {
    var quote             = this.props.content;
    var x                 = this.props.x;
    const currentState    = this.state;
    const removeErrorFunc = this.removeError;
    const renderErrorFunc = this.renderError;
    const needToShowTo    = currentState.pricing_type === 'Fixed Variable';

    if (quote) {
      x = quote.id;
    }

    return (
      <div className="quotefield" style={{display: this.state.remove ? 'none' : 'block' }}>
        <fieldset>
          <div>
            <input
              type="text"
              placeholder="Item description"
              className={"text-center" + (currentState['item_description_error'] ? ' has-error' : '')}
              defaultValue={quote ? quote.item_description : ''}
              ref={value => this.item_description = value}
              id={'quote_quote_items_attributes_' + x + '_item_description'}
              name={'quote[quote_items_attributes][' + x + '][item_description]'}
              onChange={removeErrorFunc}
            />
            {renderErrorFunc(currentState['item_description_error'])}
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
              <option value="Fixed Variable">Fixed Variable</option>
            </select>
            <div className="amount-input">
              {!needToShowTo &&
                <input
                  type="text"
                  placeholder="Amount"
                  defaultValue={quote ? quote.amount : ''}
                  ref={value => this.amount = value}
                  className={"text-center price" + (currentState['amount_error'] ? ' has-error' : '')}
                  id={'quote_quote_items_attributes_' + x + '_amount'}
                  name={'quote[quote_items_attributes][' + x + '][amount]'}
                  onChange={removeErrorFunc}
                />
              }
              {needToShowTo &&
                  <input
                  type="text"
                  placeholder="Min Price"
                  defaultValue={quote ? quote.min_price : ''}
                  ref={value => this.min_price = value}
                  className={"text-center price" + (currentState['min_price_error'] ? ' has-error' : '')}
                  id={'quote_quote_items_attributes_' + x + '_min_price'}
                  name={'quote[quote_items_attributes][' + x + '][min_price]'}
                  onChange={removeErrorFunc}
                />
              }
              {needToShowTo && <span className="to">To</span>}
              {needToShowTo &&
                <input
                  type="text"
                  placeholder="Max Price"
                  defaultValue={quote ? quote.max_price : ''}
                  ref={value => this.max_price = value}
                  className={"text-center price" + (currentState['max_price_error'] ? ' has-error' : '')}
                  id={'quote_quote_items_attributes_' + x + '_max_price'}
                  name={'quote[quote_items_attributes][' + x + '][max_price]'}
                  onChange={removeErrorFunc}
                />
              }
            </div>
            <input
              type="hidden"
              id={'quote_quote_items_attributes_' + x + '_hours'}
              name={'quote[quote_items_attributes][' + x + '][hours]'}
            />
            <input
              type="hidden"
              value={this.state.remove}
              name={'quote[quote_items_attributes][' + x + '][_destroy]'}
              id={'quote_quote_items_attributes_' + x + '__destroy'}
            />
            {  quote &&
              <input
                type="hidden"
                value={x}
                name={'quote[quote_items_attributes][' + x + '][id]'}
                id={'quote_iquote_items_attributes_' + x + '_id'}
              />
            }
          </div>
          <div>
            {!needToShowTo && renderErrorFunc(currentState['amount_error'])}
            {needToShowTo && renderErrorFunc(currentState['min_price_error'])}
            {needToShowTo && renderErrorFunc(currentState['max_price_error'])}
          </div>
        </fieldset>
        <div className="text-center">
          <button
            type="button"
            className="button-remove button-primary red"
            onClick={this.removeField}
          >
            Remove
          </button>
        </div>
      </div>
  )}
});

var QuoteFields = React.createClass({
  getInitialState : function() {
    return {
      errors: {},
    }
  },

  handleSummit: function(e) {
    const self = this;
    e.preventDefault();
    var FD = new FormData(document.getElementById('new_quote'));

    const quoteRegex = /quote_items_attributes%5D%5B(\d+)%5D%5B_destroy%5D=false/i
    let isExistQuote = quoteRegex.test($('#new_quote').serialize());

    if (!isExistQuote) {
      showFlash('There are currently no quote items', 'danger', 'create-invoice');
      return;
    }

    $.ajax({
      type: 'POST',
      url: self.props.id ? '/quotes/'+ self.props.id : '/quotes',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success: function (res) {
        if (res.errors) {
          self.setState({errors: res.errors});
        }
      },
      error: function (err) {

      }
    });
    return false;
  },

  render: function() {
    const {trady_company, quote} = this.props;
    return (
      <form
        role="form"
        id="new_quote"
        encType="multipart/form-data"
        acceptCharset="UTF-8"
        onSubmit={this.handleSummit}
      >
        <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />

        <input type="hidden" name="_method" value={this.props._method} />
        <input type="hidden" value={this.props.maintenance_request_id} name="quote[maintenance_request_id]" id="quote_maintenance_request_id" />
        <input type="hidden" value={this.props.trady_id} name="quote[trady_id]" id="quote_trady_id" />
        <input type="hidden" value={this.props.status} name="quote[status]" id="quote_status" />
        <input type="hidden" value={this.props.delivery_status} name="quote[delivery_status]" id="quote_delivery_status" />
        <input type="hidden" value={this.props.quote_type} name="quote[quote_type]" id="quote_type" />
        <input type="hidden" value={this.props.system_plan} name="quote[system_plan]" id="system_plan" />
        <ShowMessage position="create-invoice" />
        <div className="alert alert-message">
          If you have more than one option on costs for the job to be completed, please create more than one quote with each variation. Doing so will allow the agent to pick the most appropriate quote.
        </div>
        <FieldList
          existingContent={this.props.quote_items}
          SampleField={QuoteField}
          errors={this.state.errors}
          flag="quote"
        />

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
        <input type="submit" name="commit" value="Next" className="button-primary green" />
        </div>
      </form>
    )
  }
});
