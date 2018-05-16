var QuoteField = React.createClass({
  getInitialState : function() {
    var quote = this.props.content;
    var pricing_type = quote ? quote.pricing_type : 'Fixed Cost';
    var hours_input = pricing_type == 'Hourly';
    var isRange = pricing_type === 'Range';
    return {
      remove : false,
      pricing_type: pricing_type,
      hours_input: hours_input,
      item_description_error: '',
      amount_error: '',
      min_price_error: '',
      max_price_error: '',
      amount: quote ? quote.amount : isRange ? 0 : '',
      min_price: quote ? quote.min_price : isRange ? '' : 0,
      max_price: quote ? quote.max_price : isRange ? '' : 0,
    }
  },

  componentWillMount() {
    const {content: quote, params: {changeFee}, x} = this.props;
    if (!quote) return;

    const {pricing_type, min_price, max_price, amount} = quote;

    let valueFee = pricing_type !== 'Range' ? amount : {
      min: min_price,
      max: max_price
    }
    changeFee(valueFee, pricing_type, x);
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
    if (!AMOUNT_REGEX.test(amount)) return error.filter(e => e.includes('number'))[0];
    return '';
  },

  validateMinPrice: function(errors) {
    const error = errors['quote_items.min_price'];
    if (!error || error.length === 0) return '';
    const min_price = this.min_price && this.min_price.value || '';

    if (min_price === '') return error[0];
    if (!AMOUNT_REGEX.test(min_price)) return error.filter(e => e.includes('number'))[0];
    return '';
  },

  validateMaxPrice: function(errors) {
    const error = errors['quote_items.max_price'];
    if (!error || error.length === 0) return '';
    const max_price = this.max_price && this.max_price.value || '';

    if (max_price === '') return error[0];
    if (!AMOUNT_REGEX.test(max_price)) return error.filter(e => e.includes('number'))[0];
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
    const {params: {changeFee}, x} = this.props;
    const {pricing_type} = this.state;
    // Reset value to 0 when remove the quote item
    const defaultValue = pricing_type !== 'Range' ? 0 : {min: 0, max: 0};

    changeFee(defaultValue, pricing_type, x);
    this.setState({remove: true});
  },

  onPricing(event) {
    const {params: {changeFee}, x} = this.props;
    const {pricing_type} = this.state;
    const isRange = pricing_type === 'Range';
    // Reset value to 0 when change to other price type
    const defaultValue = isRange ? {min: 0, max: 0} : 0;
    changeFee(defaultValue, pricing_type, x);

    var new_pricing_type = event.target.value;
    const update = {
      pricing_type: new_pricing_type,
      hours_input: new_pricing_type === 'Hourly',
    }
    update.min_price = new_pricing_type === 'Range' ? '' : 0;
    update.max_price = new_pricing_type === 'Range' ? '' : 0;
    update.amount = new_pricing_type === 'Range' ? 0 : '';

    this.setState(update);
  },

  removeError: function({ target: { id, value } }) {
    const field = id.match(/\d+_(\w+)$/);
    if (!field) return;
    const { pricing_type } = this.state;
    const { params: { changeFee }, x } = this.props;

    let valueFee = pricing_type !== 'Range' ? value : {
      min: this.min_price.value,
      max: this.max_price.value
    }
    changeFee(valueFee, pricing_type, x);

    this.setState({
      [`${field[1]}_error`]: '',
      [field[1]]: value,
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
    const needToShowTo    = currentState.pricing_type === 'Range';

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
              onChange={() => this.setState({item_description_error: ''})}
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
              <option value="Range">Range</option>
            </select>
            <div className="amount-input">
              <input
                type="text"
                placeholder="Amount"
                defaultValue={quote ? quote.amount : ''}
                value={this.state.amount}
                ref={value => this.amount = value}
                className={"text-center price" + (currentState['amount_error'] ? ' has-error' : '')}
                id={'quote_quote_items_attributes_' + x + '_amount'}
                name={'quote[quote_items_attributes][' + x + '][amount]'}
                onChange={removeErrorFunc}
                style={needToShowTo ? {display: 'none'} : {}}
              />
                <input
                type="text"
                placeholder="Min Price"
                defaultValue={quote ? quote.min_price : ''}
                value={this.state.min_price}
                ref={value => this.min_price = value}
                className={"text-center price" + (currentState['min_price_error'] ? ' has-error' : '')}
                id={'quote_quote_items_attributes_' + x + '_min_price'}
                name={'quote[quote_items_attributes][' + x + '][min_price]'}
                isMin={true}
                onChange={removeErrorFunc}
                style={!needToShowTo ? {display: 'none'} : {}}
              />
              <span
                className="to"
                style={!needToShowTo ? {display: 'none'} : {}}
              >
                To
              </span>
              <input
                type="text"
                placeholder="Max Price"
                defaultValue={quote ? quote.max_price : ''}
                value={this.state.max_price}
                ref={value => this.max_price = value}
                className={"text-center price" + (currentState['max_price_error'] ? ' has-error' : '')}
                id={'quote_quote_items_attributes_' + x + '_max_price'}
                name={'quote[quote_items_attributes][' + x + '][max_price]'}
                onChange={removeErrorFunc}
                style={!needToShowTo ? {display: 'none'} : {}}
              />
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
          <button
            type="button"
            className="button-remove button-primary"
            onClick={this.removeField}
          >
            X
          </button>
      </div>
  )}
});

var QuoteFields = React.createClass({
  getInitialState : function() {
    return {
      errors: {},
      cost: {
        ['Fixed Cost']: [],
        Hourly: [],
        Range: [],
      },
      maxCost: 500,
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

  changeFee(value, type, index) {
    const {cost} = this.state;
    if (type === 'Range') {
      if (!AMOUNT_REGEX.test(value.min) || !AMOUNT_REGEX.test(value.max)) return;
    }
    else {
      if (!AMOUNT_REGEX.test(value)) return;
    }
    if (cost[type]) {
      cost[type][index] = typeof value !== 'object'
                        ? parseFloat(value)
                        : {min: parseFloat(value.min), max: parseFloat(value.max)};
    }
    this.setState({ cost });
  },

  renderServiceFee() {
    const {cost: {['Fixed Cost']: Fixed, Hourly, Range}, maxCost} = this.state;
    const fixedCost  = Fixed .reduce((total, cost) => total + cost || 0, 0);
    const hourlyCost = Hourly.reduce((total, cost) => total + cost || 0, 0);
    const rangeCost  = Range .reduce((total, cost) => ({
      min: total.min + (cost && cost.min || 0),
      max: total.max + (cost && cost.max || 0),
    }), {min: 0, max: 0});

    const greater    = fixedCost > maxCost || hourlyCost > maxCost;
    const feePercent = greater ? 0.10 : 0.15;

    return (
      <div className="service-fee-group alert alert-danger">
        <div className="service-fee text-center">
          <div className="service-fee-title">
          Estimated app service fee based on your quote (Pay only if awarded job):
            {greater ? ' 10% ' : ' 15% '}
            of invoice total if
            {greater ? ' greater than ' : ' less than '}
            ${maxCost.toFixed(2)}
          </div>
          <div className="service-fee-item">
            <div className="fixed-fee">
              Fixed Fee: ${(fixedCost*feePercent).toFixed(2)}
            </div>
            <div className="hourly-fee">
              Hourly Fee: ${(hourlyCost*feePercent).toFixed(2)}/hr
            </div>
            <div className="range-fee">
              Range Fee: ${(rangeCost.min*feePercent).toFixed(2)}
              -
              ${(rangeCost.max*feePercent).toFixed(2)}
            </div>
          </div>
        </div>
        { !greater && rangeCost.max > maxCost &&
          <div className="service-fee-split"></div>
        }
        { !greater && rangeCost.max > maxCost &&
          <div className="service-fee text-center">
            <div className="service-fee-title">
            Estimated app service fee based on your quote (Pay only if awarded job): 10% of invoice total if greater than ${maxCost.toFixed(2)}
            </div>
            <div className="service-fee-item">
              <div className="fixed-fee">
                Fixed Fee: ${(fixedCost*0.10).toFixed(2)}
              </div>
              <div className="hourly-fee">
                Hourly Fee: ${(hourlyCost*0.10).toFixed(2)}/hr
              </div>
              <div className="range-fee">
              Range Fee: ${(rangeCost.min*0.10).toFixed(2)}
              -
              ${(rangeCost.max*0.10).toFixed(2)}
              </div>
            </div>
          </div>
        }
      </div>
    )
  },

  render: function() {
    const {trady_company, quote, trady} = this.props;
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
          params={{changeFee: this.changeFee}}
          SampleField={QuoteField}
          errors={this.state.errors}
          flag="quote"
        />

        <div className="text-center">
        <input type="text" className="m-t-lg text-center" defaultValue={quote && quote.trady_quote_reference} name="quote[trady_quote_reference]" placeholder="Quote Reference Number"/>
        </div>

        {/*<label className="quote_tax">
        <input type="hidden" value="0" name="quote[tax]" />
        <input type="checkbox" value="1" defaultChecked={trady_company.gst_registration ? trady_company.gst_registration : false} name="quote[tax]" id="quote_tax" />
        Check box when price includes GST.
        </label>
        */}
        <div className="quote-tax text-center">
          Does price include GST?
          <div className="radio-same-address">
            <label className="radio-option">Yes
              <input
                type="radio"
                name="quote[tax]"
                value="1"
                defaultChecked={!!trady_company.gst_registration}
              />
              <span className="radio-checkmark"></span>
            </label>
            <label className="radio-option">No
              <input
                type="radio"
                name="quote[tax]"
                value="0"
                defaultChecked={!trady_company.gst_registration}
              />
              <span className="radio-checkmark"></span>
            </label>
          </div>
        </div>
        {trady.jfmo_participant && this.renderServiceFee()}
        <hr />
        <div className="qf-button">
          <button
            type="button"
            className="button-back"
            onClick={() => location.href = this.props.backlink}
          >
            Back
          </button>
          <button type="submit" className="button-submit">Next</button>
        </div>
      </form>
    )
  }
});
