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
    var flag = this.props.flag;
    var Fields = {};
    var params = this.props.params || {};
    var x = 0;
    
    if (existingContent ? existingContent.length > 0 : false) {
      existingContent.map((content, index) => {
        x = index + 1;
        Fields[x] = {params, content, SampleField, x };
      });

      return { Fields, x };
    } else {
      if(!!flag && (flag == "quote" || flag == "invoice" || flag == "splitMR")) {
        x = 1;
        return { Fields: { "1":  {params, SampleField, x } }, x, }
      }
      return { Fields: {}, x }
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors || {} });
  },

  addField: function() {
    var { SampleField, params, content, ...rest } = this.props;
    var tmpFields = this.state.Fields || {};
    const x = ++this.state.x;
    tmpFields[x] = {params, content, SampleField, x, ...rest};
    this.setState({Fields: tmpFields});
  },

  removeField: function(x, item) {
    const self = this;
    const { Fields = {}, errors } = this.state;
    let handledError = errors && errors.errors || errors || {};
    let field = Fields[x];

    if (field) {
      field.params = { ...field.params, remove: true };
      handledError[x] = null;
    }
    if (errors && errors.errors) {
      errors.errors = handledError;
    }
    Fields[x] = field;

    const newErrors = errors && errors.errors ? errors : handledError;
    const tmpFields = { ...Fields };
    this.setState({ Fields: tmpFields, errors: newErrors });
  },

  render: function(){
    const { errors, isSubmitted } = this.props;
    return <div className="fieldlist">
      <ul id="fieldList">
        {
          Object.values(this.state.Fields)
            .filter(({params}) => !params || !params.remove)
            .map(({SampleField, content, params = {}, x} , index) => {
            return (
              <li key={x}>
              {
                <SampleField
                  x={x}
                  position={index + 1}
                  params={params}
                  content={content}
                  removeField={(position) => this.removeField(position)}
                  validDate={(flag) => this.props.validDate(flag)}
                  errorsForm={errors}
                  isSubmitted={isSubmitted}
                />
              }
              </li>
            );
          })
        }
      </ul>
      <div className="text-center">
        <ButtonAddAnotherItem flag={this.props.flag} x={this.state.x} addField={this.addField}/>
      </div>
    </div>
  }
});

var ButtonAddAnotherItem = React.createClass({
  render: function() {
    var self = this.props;
    var x = self.x +1;
    switch(self.flag) {
      case 'date': {
        return (
          <button type="button" className="button-add button-primary" onClick={this.props.addField}>
            { x <= 1 ? "Add Suggeted Appointment Times" : "Add Suggeted Appointment Times To The Section"}
          </button>
        );
      }

      case 'contact': {
        return (
          <button type="button" className="button-add button-primary" onClick={this.props.addField}>
            Add Another Premise Access Contact
          </button>
        );
      }
      default:
        return <button type="button" className="button-add button-primary" onClick={this.props.addField}>Add Another Item</button>
    }
  }
});

var FieldListForInvoice = React.createClass({
  getInitialState : function(){
    const { existingContent, SampleField, params, ...rest } = this.props;
    var Fields = {};
    var x = 0;
    if (existingContent ? existingContent.length > 0 : false) {
      existingContent.map((content, index) => {
        x = index + 1;
        Fields[x] = {params, SampleField, x, content, key: x, ...rest};
      });

      return { Fields, x, removed: {} };
    }

    if (this.props.noQuotes) {
      Fields['1'] = {params, SampleField, content: {}, x: 1, key: 1, ...rest};
      return { Fields, x: 1, removed: {} };
    }

    return { Fields : {}, x: 0, removed: {} };
  },

  setContent(quote) {
    let { Fields = {}, x = 0 } = this.state;
    let id = x + 1;
    const { SampleField, params } = this.props;
    const invoice_items = (quote.quote_items || []).map(item => ({...item, id: null, invoice_id: null }));
    const item = { ...quote, invoice_items, id, trady_invoice_reference: quote.trady_quote_reference, isCoppy: true, quote_id: quote.id };

    Fields[id] = {params, content: item, SampleField, quote, x: id, key: id};

    this.setState({ Fields, x: id });
  },

  addField: function() {
    let { Fields = {}, x = 0 } = this.state;
    const { SampleField, params } = this.props;
    const tempFields = { ...Fields };
    let id = x + 1;
    tempFields[id] = {params, SampleField, x: id, key: id};

    this.setState({Fields: tempFields, x: id});
  },

  removeField: function(x, quote = {}) {
    const { removed = {} } = this.state;
    removed[x] = true;
    if (quote.id) this.props.removeQuote(quote);
    this.setState({ removed });
  },

  render: function(){
    const { Fields = {}, removed = {} } = this.state;
    const { errors } = this.props;
    let indexInvoice = 0;

    return <div className="fieldlist" style={{ paddingBottom: '30px' }}>
      <ul>
        {Object.values(Fields).map(({SampleField, quote, key, x, params, ...rest}, fieldIndex) => {
          const style = {}
          const newParams = { ...params, remove: removed[x] };

          if (!removed[x]) indexInvoice += 1;
          else style.display = 'none';

          return (
            <li key={key} style={style}>
              <h5 className="invoice-index"> Invoice #{indexInvoice}</h5>
                <SampleField
                  params={newParams}
                  {...rest}
                  x={x}
                  quote={quote}
                  errors={errors}
                  removeField={() => this.removeField(x, quote)}
                />
            </li>
          )
        })}
      </ul>
      <div className="text-center">
        <button type="button" className="button-add button-primary" onClick={() => this.addField()}> Add New Invoice </button>
      </div>
    </div>
  }
});

var AdditionalInvoice = React.createClass({
  getInitialState : function() {
    var quote = this.props.content;
    var pricing_type = quote ? quote.pricing_type : 'Fixed Cost';
    var hours_input = pricing_type !== 'Hourly' ? false : true;
    return {
      remove : false,
      pricing_type: pricing_type,
      hours_input: hours_input
    }
  },
  componentWillReceiveProps() {
    this.setState({
      remove: this.props.params.remove
    });
  },

  removeField() {
    this.setState({remove: true});
  },

  onPricing(event) {
    var pricing_type = event.target.value;
    this.setState({
      pricing_type,
      hours_input: pricing_type === "Hourly",
    });
  },
  render: function() {
    var quote = this.props.content;
    var x= this.props.x;
    if (quote) {
      x = quote.id;
    }
    return <div className="quotefield" style={{display: this.state.remove ? 'none' : 'block' }}>
      <fieldset>
        <input
          type="text"
          placeholder="Item description"
          defaultValue={quote ? quote.item_description : ''}
          name={'invoice[invoice_items_attributes][' + x + '][item_description]'}
        />

        <div className="amount">
          <select
            onChange={this.onPricing}
            value={this.state.pricing_type}
            name={'invoice[invoice_items_attributes][' + x + '][pricing_type]'}
            className={"text-center " + (this.state.hours_input && 'hour select')}
          >
            <option value="Fixed Cost">Fixed Cost</option>
            <option value="Hourly">Hourly</option>
          </select>
          <input
            type="text"
            placeholder="Amount"
            defaultValue={quote.amount > 0 && quote.amount}
            name={'invoice[invoice_items_attributes][' + x + '][amount]'}
            className={"text-center " +  (!!this.state.hours_input && 'hour price')}
          />
          {   this.state.hours_input ?
              <input
                type="text"
                placeholder="Of Hours"
                defaultValue={quote.hours > 0 ? quote.hours : ''}
                name={'invoice[invoice_items_attributes][' + x + '][hours]'}
                className={"text-center " + (this.state.hours_input && 'hour')}
              />
              : <input type="hidden"
                value={1}
                name={'invoice[invoice_items_attributes][' + x + '][hours]'}
              />
          }
        </div>
        <input type="hidden" value={this.state.remove} name={'invoice[invoice_items_attributes][' + x + '][_destroy]'}/>
        {   quote &&
          <input type="hidden" value={x} name={'invoice[invoice_items_attributes][' + x + '][id]'}/>
        }
      </fieldset>
      <div className="text-center">
        <button type="button" className="button-remove button-primary" onClick={this.removeField}> Remove </button>
      </div>
    </div>
  }
});

var AdditionalInvoiceField = React.createClass({
  render: function() {
    return <form role="form" id="new_quote" action="/submit_additional_invoice" acceptCharset="UTF-8" method="post">
      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />

      <input name="utf8" type="hidden" value="✓"/>
      <input value={this.props.maintenance_request_id} type="hidden" name="invoice[maintenance_request_id]"/>
      <input value={this.props.trady_id} type="hidden" name="invoice[trady_id]"/>


      <FieldList SampleField={AdditionalInvoice}/>

      <label className="quote_tax">
        <input type="hidden" value="0" name="invoice[tax]" />
        <input type="checkbox" value="1" defaultChecked={this.props.tax ? this.props.tax : false} name="invoice[tax]" />
        Add GST
      </label>

      <hr />

      <div className="qf-button">
        <input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
      </div>
    </form>
  }
});

var InvoiceItemField = React.createClass({
  getInitialState : function() {
    var invoice_item = this.props.content;
    var pricing_type = invoice_item ? invoice_item.pricing_type : 'Fixed Cost';
    var hours_input  = pricing_type == 'Hourly';
    var amount       = invoice_item ? invoice_item.amount || invoice_item.min_price : '';
    var numofhours   = (invoice_item && invoice_item.hours) ? invoice_item.hours : pricing_type === 'Hourly' ? '' : 1;

    return {
      remove      : this.props.params.remove,
      pricing_type: pricing_type,
      hours_input : hours_input,
      amount      : amount,
      numofhours  : numofhours,
      totalamount : amount * numofhours || 0,
      errorsForm  : {},
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      remove: nextProps.params.remove,
      errorsForm: this.filterError(nextProps.errorsForm || {}),
    });
  },

  filterError: function(errors) {
    const filterError      = { item_description: '', amount: ''};
    const descriptionError = errors['invoices.invoice_items.item_description'] || [];
    const amountError      = (errors['invoices.invoice_items.amount'] || []).slice();
    const hoursError      = (errors['invoices.invoice_items.hours'] || []).slice();
    if (descriptionError.length) {
      if (this.description) {
        if (!this.description.value) {
          filterError['item_description'] = descriptionError[0];
        }
      }
    }
    if (amountError.length) {
      if (this.amount) {
        if (!this.amount.value) {
          filterError['amount'] = amountError[0];
        }
        else if (!AMOUNT_REGEX.test(this.amount.value) || this.amount.value === '0') {
          filterError['amount'] = amountError.reverse()[0];
        }
      }
    }
    if (hoursError.length) {
      if (this.hours) {
        if (!this.hours.value) {
          filterError['hours'] = hoursError[0];
        }
        else if (!AMOUNT_REGEX.test(this.hours.value) || this.hours.value === '0') {
          filterError['hours'] = hoursError.reverse()[0];
        }
      }
    }
    return filterError;
  },

  removeField(x) {
    const { totalamount = 0 } = this.state;
    const selectedValue = $(`[name='${`ledger[invoices_attributes][${this.props.params.x}][invoice_items_attributes][${x}][pricing_type]`}']`).val();

    this.props.params.updatePrice(-totalamount);
    this.props.params.updateHourly(true, totalamount, selectedValue === 'Hourly');
    this.props.removeField(x, this.props.content);

    this.setState({
      remove: true,
      amount: 0,
      totalamount: 0
    });
  },

  updatePrice(amount) {
    const selectedValue = $(`[name='${`ledger[invoices_attributes][${this.props.params.x}][invoice_items_attributes][${this.props.x}][pricing_type]`}']`).val();
    if (amount === '') amount = 0;

    if (!isNaN(amount)) {
      this.props.params.updatePrice(amount - this.state.totalamount, selectedValue === 'Hourly');
    }
  },

  onPricing(event) {
    var pricing_type = event.target.value;
    const self = this;
    const isHourly = pricing_type === 'Hourly';

    this.setState({pricing_type});

    this.setState({
      hours_input: isHourly,
      numofhours: isHourly ? '' : 1,
      amount: '',
    }, () => {
      self.onHours({target: {value: isHourly ? '' : 1}});
    })

    self.props.params.updateHourly(false, self.state.totalamount, isHourly);
  },

  onAmount(event) {
    const amount = event.target.value;
    const totalamount = (parseInt(amount) || 0) * this.state.numofhours;

    this.updatePrice(totalamount);
    this.setState({
      amount: amount,
      totalamount: !isNaN(totalamount) ? totalamount : this.state.totalamount,
    });
    this.removeError(event);
  },

  onHours({ target: { value } }) {
    const hours = value;
    this.setState({numofhours: hours});

    const totalamount = this.state.amount * hours;
    this.updatePrice(totalamount);
    this.setState({
      totalamount: !isNaN(totalamount) ? totalamount : this.state.totalamount,
    });
  },

  removeError: function({ target: { id } }) {
    this.setState({
      errorsForm: {
        ...this.state.errorsForm,
        [id]: '',
      },
    })
  },

  renderError: function(error) {
      return <div id="errorbox" className="error">{error || ''}</div>;
  },

  render: function() {
    var invoice_item = this.props.content;
    var invoice_id   = this.props.params.x;
    var x            = this.props.x;
    var position     = this.props.position;
    var errors       = this.state.errorsForm;
    var FieldId      = null;
    var {
      pricing_type, hours_input, remove, amount, numofhours
    } = this.state;

    if (invoice_item) {
      x = invoice_item.id || x;
      invoice_id = invoice_item.invoice_id || invoice_id;

      if (invoice_item.id) {
        FieldId =
        <input
          value={x}
          type="hidden"
          name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][id]'}
        />
      }
    }

    if (this.state.remove) {
      return <div>
        <input type="hidden" value={remove} name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][_destroy]'} />
        {FieldId}
      </div>
    }

    return <div className="invoiceitemfield">
      <fieldset>
        <input
          type="text"
          className={"text-center " + (errors['item_description'] ? 'border_on_error' : '')}
          placeholder="Item description"
          ref={(ref) => (this.description = ref)}
          id="item_description"
          defaultValue={invoice_item ? invoice_item.item_description : null}
          name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][item_description]'}
          onChange={this.removeError}
        />
        {this.renderError(errors['item_description'])}
        <div className="amount">
          <select
            onChange={this.onPricing}
            value={pricing_type}
            className={"text-center " +  (hours_input && 'hour price')}
            name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][pricing_type]'}
          >
            <option value="Fixed Cost">Fixed Cost</option>
            <option value="Hourly">Hourly</option>
          </select>
          <input
            type="text"
            placeholder="Amount"
            ref={e => this.amount = e}
            id="amount"
            onChange={this.onAmount}
            value={amount}
            className={"text-center " +  (!!hours_input ? 'hour price ' : '') + (errors['amount'] ? 'border_on_error ' : '')}
            name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][amount]'}
          />
          {
            hours_input ?
              <input
                type="text"
                onChange={this.onHours}
                ref={e => this.hours = e}
                placeholder="Number of Hours"
                defaultValue={numofhours}
                className={"text-center " + (hours_input && 'hour ') + (errors['hours'] ? 'border_on_error ' : '')}
                name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][hours]'}
              />
              :
              <input
                type="hidden"
                value={1}
                ref={e => this.hours = e}
                name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][hours]'}
              />
          }
        </div>
        {this.renderError(errors['amount'])}
        {this.renderError(errors['hours'])}
        <input type="hidden" value={remove} name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][_destroy]'} />
        {FieldId}
      </fieldset>
      { position > 1 && <button type="button" className="button-remove button-primary" onClick={() => this.removeField(this.props.x)}> X </button>}
    </div>
  }
});

var InvoiceField = React.createClass({
  getInitialState : function() {
    const invoice = this.props.content;
    var invoice_total = (invoice && invoice.amount) ? invoice.amount : 0;
    var hourly_total = 0;

    invoice && invoice.invoice_items && invoice.invoice_items.forEach(function(item) {
      if (item.pricing_type === 'Range') {
        invoice_total += item.min_price;
      }

      if (item.pricing_type === 'Hourly') {
        hourly_total+= item.amount;
      }
    });

    var service_fee = invoice_total > OVER_AMOUNT
                    ? invoice_total * OVER_SERVICE_FEE
                    : invoice_total * UNDER_SERVICE_FEE;

    var items_total = invoice_total/1.1;
    var tax_total = invoice_total - items_total;

    const tax = (invoice && invoice.tax != null) ? invoice.tax : true;

    return {
      invoice_total,
      service_fee: service_fee || 0,
      agency_fee: invoice_total * AGENCY_SERVICE_FEE,
      tax,
      hourly_total,
      items_total : tax ? items_total : invoice_total,
      tax_total: tax ? tax_total : 0,
      remove : false,
      errorDate: '',
      errorReference: '',
      errors: {},
    }
  },

  componentWillReceiveProps({ errors, ...rest }) {
    const { errorDate, errorReference } = this.filterError(errors);
    this.setState({
      errorDate,
      errorReference,
      errors: errors || {},
      remove: rest.params.remove,
    });
  },

  validDate: function(date) {
    var nowDate = this.nowDate(0);
    if (nowDate === date) return false;
    for (let i = 0; i < date.length; i++) {
      if (nowDate[i] > date[i]) return false;
    }
    return true;
  },

  filterError: function(errors) {
    var errorDate = errors && errors['invoices.due_date'];
    var errorReference = errors && errors['invoices.trady_invoice_reference'];

    if (errorDate) {
      if (!this.date.value)                      errorDate = errorDate[0];
      else if (!this.validDate(this.date.value)) errorDate = errorDate.reverse()[0];
      else errorDate = '';
    }

    if (errorReference) {
      if (!this.reference.value) errorReference = errorReference[0];
      else errorReference = '';
    }
    return { errorDate, errorReference };
  },

  nowDate: function(nextDay = 1) {
    var oneDay = 24 * 60 * 60 * 1000;
    var now    = new Date(Date.now() + oneDay*nextDay);
    var month  = now.getMonth() + 1;
    var date   = now.getDate();
    var year   = now.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
  },

  removeField(x) {
    this.setState({ remove: true });
    this.props.removeField(x);
  },

  calcInvoiceTotal(price, isHourly) {
    const invoice_total = this.state.invoice_total + price;
    const SERVICE_FEE = invoice_total > OVER_AMOUNT
                        ? OVER_SERVICE_FEE
                        : UNDER_SERVICE_FEE;
    const { hourly_total } = this.state;

    this.setState({
      items_total: this.state.tax ? invoice_total/1.1 : invoice_total,
      invoice_total: invoice_total,
      tax_total: this.state.tax ? invoice_total - invoice_total/(1.1) : 0,
      service_fee: (invoice_total * SERVICE_FEE).toFixed(2) || 0,
      agency_fee: (invoice_total * AGENCY_SERVICE_FEE).toFixed(2) || 0,
      hourly_total: isHourly ? hourly_total + price : hourly_total,
    });
  },

  calcHourlyTotal(isRemove, price, isHourly) {
    let { hourly_total } = this.state;
    if (isRemove) {
      hourly_total = isHourly ? hourly_total - price : hourly_total;
    } else {
      hourly_total = isHourly ? hourly_total + price : hourly_total - price;
    }
    this.setState({ hourly_total });
  },

  onTax(isTax) {
    const invoice_total = this.state.invoice_total;
    this.setState({
      tax: isTax,
      items_total: isTax ? invoice_total/1.1 : invoice_total,
      tax_total: isTax ? invoice_total - invoice_total/(1.1) : 0,
    });
  },
  render: function() {
    var { content, x, params: { invoiceInfo = {}, trady } } = this.props;
    var {
      errorDate, errorReference, remove, errors, tax, invoice_total, tax_total, items_total, service_fee, hourly_total, agency_fee
    } = this.state;

    var invoice_items = content && content.invoice_items || null;
    var hasInvoice    = content && Object.keys(content).length > 0 && !content.isCoppy;
    var invoice       = this.props.content || {};

    if (hasInvoice) x = invoice.id;
    if (remove) {
      if (!hasInvoice) return null;

      return (
        <div>
          <input type="hidden" value={x} name={'ledger[invoices_attributes][' + x + '][id]'}/>
          <input type="hidden" value={remove} name={'ledger[invoices_attributes][' + x + '][_destroy]'}/>
        </div>
      )
    }

    return <div className="invoicefield">
      <input
        type="hidden"
        value={invoice.maintenance_request_id || invoiceInfo.maintenance_request_id}
        name={'ledger[invoices_attributes][' + x + '][maintenance_request_id]'}
      />
      <input
        type="hidden"
        value={invoice.trady_id || invoiceInfo.trady_id}
        name={'ledger[invoices_attributes][' + x + '][trady_id]'}
      />
      <input
        type="hidden"
        value={invoice.quote_id || invoiceInfo.quote_id}
        name={'ledger[invoices_attributes][' + x + '][quote_id]'}
      />
      <fieldset>
        <div>
          <FieldList existingContent={invoice_items} SampleField={InvoiceItemField} params={{x:x, updatePrice:this.calcInvoiceTotal, updateHourly: this.calcHourlyTotal, remove:remove}} flag="invoice" errors={errors} />
          <div className="text-center m-t-lg">
            <div>Enter your own invoice reference eg: Inv-001</div>
            <input
              type="text"
              className="text-center"
              ref={elem => this.reference = elem}
              placeholder="Invoice Reference"
              defaultValue={invoice && invoice.trady_invoice_reference}
              onChange={() => this.setState({errorReference: ''})}
              name={'ledger[invoices_attributes][' + x + '][trady_invoice_reference]' }
              style={errorReference ? {borderColor: 'red'} : {}}
            />
          </div>
          <p id="errorbox" className="error">{errorReference || ''}</p>
          {/*<label>
            <input type="checkbox" value={tax} checked={tax} name={'ledger[invoices_attributes][' + x + '][tax]'} onChange={this.onTax}/>
            Total Includes GST
           </label>*/}
          <div className="form-group text-center">
            Total Includes GST
            <div className="radio-same-address">
              <label className="radio-option">Yes
                <input
                  type="radio"
                  name={'ledger[invoices_attributes][' + x + '][tax]'}
                  value={true}
                  onChange={() => this.onTax(true)}
                  defaultChecked={!!tax}
                />
                <span className="radio-checkmark"></span>
              </label>
              <label className="radio-option">No
                <input
                  type="radio"
                  name={'ledger[invoices_attributes][' + x + '][tax]'}
                  value={false}
                  onChange={() => this.onTax(false)}
                  defaultChecked={!tax}
                />
                <span className="radio-checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="field">
          <div>
            <p> Invoice Due On: </p>
            <div className="input-dolar">
              <span className="dolar"></span>
              <input
                type="date"
                defaultValue={invoice && invoice.due_date || this.nowDate()}
                ref={e => this.date = e}
                onChange={() => this.setState({errorDate: ''})}
                name={'ledger[invoices_attributes][' + x + '][due_date]'}
                style={errorDate ? {borderColor: 'red'} : {}}
              />
            </div>
          </div>
        </div>
        <p id="errorbox" className="text-center error">{errorDate || ''}</p>
        <hr />
        <div className="field">
          <div className="alert">
            <p> Items Total: </p>
            <div className="input-dolar">
              <span className="dolar">$</span>
              <input type="text" readOnly="readonly" placeholder="$0.00" value={items_total.toFixed(2)} name={'594[invoices_attributes][' + x + '][amount]'} />
            </div>
          </div>
          <div className="alert">
            <p> Hourly Total: </p>
            <div className="input-dolar">
              <span className="dolar">$</span>
              <input type="text" readOnly="readonly" placeholder="$0.00" value={hourly_total.toFixed(2)} name={'ledger[invoices_attributes][' + x + '][hourly_total]'} />
            </div>
          </div>
          <div className="alert">
            <p> Tax Total: </p>
            <div className="input-dolar">
              <span className="dolar">$</span>
              <input type="text" readOnly="readonly" placeholder="$0.00" value={tax_total.toFixed(2)} name={'ledger[invoices_attributes][' + x + '][tax_total]'} />
            </div>
          </div>
          <div className="alert">
            <p> Invoice Total: </p>
            <div className="input-dolar">
              <span className="dolar">$</span>
              <input type="text" readOnly="readonly" placeholder="$0.00" value={invoice_total.toFixed(2)} name={'ledger[invoices_attributes][' + x + '][invoice_total]'} />
            </div>
          </div>
          { trady && trady.jfmo_participant &&
            <div className="alert">
              <p> Service Fee: </p>
              <div className="input-dolar">
                <span className="dolar">$</span>
                <input type="text" readOnly="readonly" placeholder="Service Fee" value={(service_fee - 0).toFixed(2)} name={'ledger[invoices_attributes][' + x + '][service_fee]'} />
              </div>
            </div>
          }
          { trady && trady.jfmo_participant &&
            <div className="alert alert-success">
              <p> You Receive: </p>
              <div className="input-dolar">
                <span className="dolar">$</span>
                <input type="text" readOnly="readonly" placeholder="You Receive" value={(invoice_total - service_fee).toFixed(2)} />
              </div>
            </div>
          }
          { trady && trady.jfmo_participant &&
            <div className="alert alert-message">
              <p> Agency Receives: </p>
              <div className="input-dolar">
                <span className="dolar">$</span>
                <input type="text" readOnly="readonly" placeholder="Agency Receives" value={(agency_fee - 0).toFixed(2)} />
              </div>
            </div>
          }
          { trady && trady.jfmo_participant &&
            <div className="alert alert-message">
              <p> Maintenance App Receives: </p>
              <div className="input-dolar">
                <span className="dolar">$</span>
                <input type="text" readOnly="readonly" placeholder="Maintenance App Receives" value={(service_fee - agency_fee).toFixed(2)} />
              </div>
            </div>
          }
        </div>

        <input type="hidden" value={remove} name={'ledger[invoices_attributes][' + x + '][_destroy]'}/>
        {hasInvoice && <input type="hidden" value={x} name={'ledger[invoices_attributes][' + x + '][id]'}/>}
      </fieldset>
      <div className="text-center">
        <button type="button" className="button-remove button-primary" onClick={() => this.removeField(this.props.x)}> Remove Invoice </button>
      </div>
    </div>
  }
});

var InvoiceFields = React.createClass({
  getInitialState: function() {
    return {
      modal: "",
      isModal: false,
      quote: '',
      quotes: this.props.quotes,
      errors: {},
    }
  },

  isClose: function() {
    if(this.state.isModal == true) {
      this.setState({
        isModal: false,
        modal: ""
      });
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    var div = document.getElementsByClassName('modal-backdrop in')[0];
    if(div){
      div.parentNode.removeChild(div);
    }
  },

  onModalWith: function(modal) {
    this.setState({
      modal: modal,
      isModal: true,
    });
  },

  viewItem: function(key, item) {
    switch(key) {
      case 'viewQuote': {
        this.setState({
          quote: item
        });

        this.onModalWith(key);
        break;
      }

      default: {
        break;
      }
    }

  },

  renderModal: function() {
    if(this.state.isModal) {
      var body = document.getElementsByTagName('body')[0];
      body.className += " modal-open";
      var div = document.getElementsByClassName('modal-backdrop in');

      if(div.length === 0) {
        div = document.createElement('div')
        div.className  = "modal-backdrop in";
        body.appendChild(div);
      }

      switch(this.state.modal) {
        case 'viewQuote': {
          return (
            <ModalViewQuote
              close={this.isClose}
              quote={this.state.quote}
              agency=""
              quotes={this.state.quotes}
              property={this.props.property}
              landlord=""
            />
          );
        }

        default:
          return null;
      }
    }
  },

  handleSummit: function(e) {
    e.preventDefault();
    const ledger = this.props.ledger;
    const id = (ledger && ledger.id) || '';
    const self = this;

    const invoiceRegex = /ledger%5Binvoices_attributes%5D%5B(\d+)%5D%5B_destroy%5D=false/g;
    const serialize = $('#new_invoice').serialize();

    if (!invoiceRegex.test(serialize)) {
      showFlash('There are currently no invoices', 'danger', 'create-invoice');
      return;
    }

    var FD = new FormData(document.getElementById('new_invoice'));

    $.ajax({
      type: 'POST',
      url: id ? '/update_invoice' : '/invoices',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: FD,
      success: function (res) {
        if (res && res.errors) {
          self.setState({errors: res.errors});
        }
      },
      error: function (err) {

      }
    });
    return false;
  },

  render: function(){
    const {quotes, trady} = this.props;
    const errors = this.state.errors;
    const ledger = this.props.ledger || null;
    const id = (ledger && ledger.id) || '';
    const invoiceInfo = {
      maintenance_request_id: this.props.maintenance_request_id,
      trady_id: this.props.trady_id,
      tax: '',
      due_date: ''
    };
    const hasQuotes = (quotes && quotes.length > 0);
    const invoices  = (ledger && ledger.invoices) ? ledger.invoices : [];
    const converts  = (invoices || []).filter(e => e.quote_id).map(e => e.quote_id);

    return <form role="form" id="new_invoice" onSubmit={this.handleSummit} acceptCharset="UTF-8">
      <input type="hidden" value={this.props.authenticity_token} name="authenticity_token"/>
      <input type="hidden" value={this.props._method} name="_method" />
      <input type="hidden" name="ledger[grand_total]"/>
      <input type="hidden" value={this.props.maintenance_request_id} name="ledger[maintenance_request_id]"/>
      <input type="hidden" value={this.props.trady_id} name="ledger[trady_id]"/>
      <input type="hidden" value={this.props.quote_id} name="ledger[quote_id]"/>
      <input type="hidden" value={id} name="ledger[ledger_id]" />
      <input type= "hidden" value={this.props.invoice_type} name="ledger[invoice_type]"/>
      <ShowMessage position="create-invoice" />
      {
        hasQuotes &&
        <QuotesInInvoice
          quotes={quotes}
          trady={trady}
          converts={converts}
          errors={errors}
          ref={(ref) => (this.quotesInInvoice = ref)}
          viewQuote={(key, item) => this.viewItem(key, item)}
          onConvertToInvoice={(item) => this.fieldListForInvoice.setContent(item)}
        />
      }

      <FieldListForInvoice
        errors={errors}
        params={{invoiceInfo, trady}}
        noQuotes={!hasQuotes}
        existingContent={invoices}
        SampleField={InvoiceField}
        ref={(ref) => (this.fieldListForInvoice = ref)}
        removeQuote={(quote) => this.quotesInInvoice.removeConvert(quote.id)}
      />

      <div className="qf-button text-center">
        <button
          type="button"
          className="button button-back"
          onClick={() => location.href = this.props.backlink}
        >
          Back
        </button>
        <button type="submit" name="commit" value="Next" className="button button-primary green">Next</button>
      </div>
      { this.renderModal() }
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

        <input type="text" placeholder="Australian Business Number" defaultValue={this.props.abn}
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
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
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
        <input value={this.props.invoice_type} type="hidden" name="trady_company[invoice_type]"/>
        <input value={this.props.pdf_file_id} type="hidden" name="trady_company[pdf_file_id]"/>
        <input value={this.props.ledger_id} type="hidden" name="trady_company[ledger_id]"/>
        <input type="submit" name="commit" value="Next" className="button-primary green" data-disable-with="Next" />
      </form>
    );
  },
  onSame: function() {
    this.setState({same_Address: !this.state.same_Address,
             mailing: this.state.address});
  }
});
