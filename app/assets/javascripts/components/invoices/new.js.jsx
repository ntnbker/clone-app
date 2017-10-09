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
    var Fields = {};
    var params = this.props.params;
    var x = 0;
    const extraProps = { params, removeField: (position) => this.removeField(position) };

    if (existingContent ? existingContent.length > 0 : false) {
      existingContent.map((one, index) => {
        x = index + 1;
        Fields[x] = <SampleField x={x} content={one} {...extraProps} />;
      });

      return { Fields, x }
    } else {
      if(!!this.props.flag && (this.props.flag == "quote" || this.props.flag == "invoice")) {
        x = 1;
        return { Fields: { "1": <SampleField x={x} {...extraProps} />, }, x}
      }
      return { Fields: {}, x }
    }
  },

  addField: function() {
    var SampleField = this.props.SampleField;
    var tmpFields = this.state.Fields || {};
    var params = this.props.params;
    const x = ++this.state.x;
    tmpFields[x] = {params: this.props.params, SampleField, x};
    this.setState({Fields: tmpFields});
  },

  removeField: function(x, item) {
    const self = this;
    const { Fields = {}} = this.state;
    const field = Fields[x];

    if (field) field.params = { ...field.params, remove: true };
    Fields[x] = field;

    const tmpFields = { ...Fields };

    this.setState({ Fields: tmpFields });
  },

  render: function(){
    const { errors } = this.props;
    return <div className="fieldlist">
      <ul id="fieldList">
        {
          Object.values(this.state.Fields).map(({SampleField, params, x} , index) => {
            return (
              <li key={x}>
              {
                <SampleField
                  x={x}
                  params={params}
                  removeField={(position) => this.removeField(position)}
                  validDate={(flag) => this.props.validDate(flag)}
                  errorsForm={errors}
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
    const existingContent = this.props.existingContent;
    var SampleField = this.props.SampleField;
    var Fields = {};
    var params = this.props.params;
    var x = 0;

    if (existingContent ? existingContent.length > 0 : false) {
      existingContent.map((one, index) => {
        x = index + 1;
        Fields[x] = <SampleField x={x} key={x} content={one} params={params} removeField={() => this.removeField(x, { id: one.quote_id })} />;
      });

      return { Fields : Fields, x: x }
    }

    if (this.props.noQuotes) {
      Fields['1'] = <SampleField x={1} key={1} params={params} removeField={() => this.removeField(1)} />;
      return { Fields, x: 1 };
    }

    return { Fields : {}, x: 0 };
  },

  setContent(quote) {
    let { Fields = {}, x = 0 } = this.state;
    let id = x + 1;
    const { SampleField, params } = this.props;
    const invoice_items = [...quote.quote_items].map((item) => ({...item, id: null, invoice_id: null }));
    const item = { ...quote, invoice_items, id, trady_invoice_reference: quote.trady_quote_reference, isCoppy: true, quote_id: quote.id };

    if (Object.keys(Fields).length === 1 && !Object.values(Fields)[0].props.content) {
      id = 1;
      Fields = {[id]: <SampleField key={Date.now()} x={id} content={item} params={params} removeField={() => this.removeField(id, quote)} />};
    } else {
      Fields[id] = <SampleField key={Date.now()} x={id} content={item} params={params} removeField={() => this.removeField(id, quote)} />;
    }

    this.setState({ Fields, x: id });
  },

  addField: function() {
    let { Fields = {}, x = 0 } = this.state;
    let id = x + 1;
    const { SampleField, params } = this.props;
    Fields[id] = <SampleField key={Date.now()} x={id} params={params} removeField={() => this.removeField(id)}/>;

    this.setState({ Fields, x: id });
  },

  removeField: function(x, quote = {}) {
    const { removed = {} } = this.state;
    removed[x] = true;
    if (quote.id) this.props.removeQuote(quote);
    this.setState({ removed });
  },

  render: function(){
    const { Fields = {}, removed = {} } = this.state;
    let indexInvoice = 0;

    return <div className="fieldlist" style={{ paddingBottom: '30px' }}>
      <ul>
        {Object.values(Fields).map((Field, fieldIndex) => {
          const style = {}
          if (!removed[Field.props.x]) indexInvoice += 1;
          else style.display = 'none';


          return (
            <li key={Field.key} style={style}>
              <h5 className="invoice-index"> Invoice #{indexInvoice}</h5>
              {Field}
            </li>
          )
        })}
      </ul>
      <button type="button" className="button-add button-primary" style={{position: 'absolute', bottom: 0, right: 0 }} onClick={() => this.addField()}> Add New Invoice </button>
    </div>
  }
});

var AdditionalInvoice = React.createClass({
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
        <input
          required
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
            type="number"
            placeholder="Amount"
            defaultValue={quote.amount > 0 && quote.amount}
            name={'invoice[invoice_items_attributes][' + x + '][amount]'}
            className={"text-center " +  (!!this.state.hours_input && 'hour price')}
          />
          {   this.state.hours_input ?
              <input
                type="number"
                placeholder="Of Hours"
                defaultValue={quote.hours > 0 ? quote.hours : ''}
                name={'invoice[invoice_items_attributes][' + x + '][hours]'}
                className={"text-center " + (this.state.hours_input && 'hour')}
              />
              : <input type="hidden"
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
        <button type="button" className="button-remove button-primary red" onClick={this.removeField}> Remove </button>
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
    var hours_input = pricing_type == 'Fixed Cost' ? false : true;
    var amount = invoice_item ? invoice_item.amount : 0;
    var numofhours = (invoice_item && invoice_item.hours) ? invoice_item.hours : 1;
    return {
      remove : this.props.params.remove,
      pricing_type: pricing_type,
      hours_input: hours_input,
      amount: amount,
      numofhours: numofhours,
      totalamount: amount * numofhours
    }
  },

  componentWillReceiveProps() {
    this.setState({
      remove: this.props.params.remove
    });
  },

  removeField(x) {
    const { totalamount = 0 } = this.state;
    this.props.params.updatePrice(-totalamount);
    this.props.removeField(x, this.props.content);

    this.setState({remove: true,
             amount: 0,
             totalamount: 0});
  },

  updatePrice(amount) {
    this.props.params.updatePrice(amount - this.state.totalamount);
  },

  onPricing(event) {
    var pricing_type = event.target.value;
    this.setState({pricing_type: pricing_type});

    if (pricing_type == "Hourly") {
      this.setState({hours_input: true, numofhours: 0});
    } else {
      this.setState({hours_input: false,
               numofhours: 1,
               totalamount: this.state.amount});
    }
  },

  onAmount(event) {
    const amount = event.target.value;
    const totalamount = amount * this.state.numofhours;

    this.updatePrice(totalamount);
    this.setState({
      amount: amount,
      totalamount: totalamount
    });
  },

  onHours(event) {
    const hours = event.target.value;
    if (hours > 0)
      this.setState({numofhours: hours});
    else
      this.setState({numofhours: 0});

    const totalamount = this.state.amount * hours;
    this.updatePrice(totalamount);
    this.setState({
      totalamount: totalamount
    });
  },

  render: function() {
    var invoice_item = this.props.content;
    var x= this.props.x;
    var FieldId = null;
    var invoice_id = this.props.params.x;
    if (invoice_item) {
      x = invoice_item.id || x;
      invoice_id = invoice_item.invoice_id || invoice_id;

      if (invoice_item.id) {
        FieldId = <input
                value={x}
                type="hidden"
                name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][id]'}
              />
      }
    }

    if (this.state.remove) {
      return <div>
        <input type="hidden" value={this.state.remove} name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][_destroy]'} />
        {FieldId}
      </div>
    }

    return <div className="invoiceitemfield">
      <fieldset>
        <input
          required
          type="text"
          className="text-center"
          placeholder="Item description"
          ref={(ref) => (this.description = ref)}
          defaultValue={invoice_item ? invoice_item.item_description : null}
          name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][item_description]'}
        />

        <div className="amount">
          <select
            onChange={this.onPricing}
            value={this.state.pricing_type}
            className={"text-center " +  (!!this.state.hours_input && 'hour price')}
            name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][pricing_type]'}
          >
            <option value="Fixed Cost">Fixed Cost</option>
            <option value="Hourly">Hourly</option>
          </select>
          <input
            type="number"
            required
            placeholder="Amount"
            onChange={this.onAmount}
            value={this.state.amount || ''}
            className={"text-center " +  (!!this.state.hours_input && 'hour price')}
            name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][amount]'}
          />
          {
            this.state.hours_input ?
              <input
                type="number"
                required
                onChange={this.onHours}
                placeholder="Number of Hours"
                defaultValue={this.state.numofhours > 0 && this.state.numofhours}
                className={"text-center " + (this.state.hours_input && 'hour')}
                name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][hours]'}
              />
              : <input
                type="hidden"
                value={1}
                name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][hours]'}
              />
          }
        </div>

        <input type="hidden" value={this.state.remove} name={'ledger[invoices_attributes][' + invoice_id + '][invoice_items_attributes][' + x + '][_destroy]'} />
        {FieldId}
      </fieldset>
      <button type="button" className="button-remove button-primary red" onClick={() => this.removeField(this.props.x)}> X </button>
    </div>
  }
});


var InvoiceField = React.createClass({
  getInitialState : function() {
    const invoice = this.props.content;
    var invoice_total = (invoice && invoice.amount) ? invoice.amount : 0;
    var items_total = (invoice && invoice.amount) ? invoice_total/1.1 : 0;
    var tax_total = (invoice && invoice.amount) ? invoice_total - invoice_total/1.1 : 0;
    const tax = (invoice && invoice.tax) ? invoice.tax : false;
    return {
      invoice_total: invoice_total,
      items_total : tax ? items_total : invoice_total,
      tax: tax,
      tax_total: tax ? tax_total : 0,
      remove : false,
    }
  },

  componentWillReceiveProps() {
    this.setState({
      remove: this.props.params.remove
    });
  },

  removeField(x) {
    this.setState({ remove: true });
    this.props.removeField(x);
  },

  calcInvoiceTotal(price) {
    const invoice_total = this.state.invoice_total + price;
    this.setState({
      items_total: this.state.tax ? invoice_total/1.1 : invoice_total,
      invoice_total: invoice_total,
      tax_total: this.state.tax ? invoice_total - invoice_total/(1.1) : 0,
    });
  },
  onTax() {
    const invoice_total = this.state.invoice_total;
    const tax = this.state.tax;
    this.setState({
      tax: !tax,
      invoice_total: invoice_total,
      items_total: !tax ? invoice_total/1.1 : invoice_total,
      tax_total: !tax ? invoice_total - invoice_total/(1.1) : 0,
    });
  },
  render: function() {
    var invoice = this.props.content;
    var invoice_items = (invoice && invoice.invoice_items) || null;
    var x = this.props.x;
    var invoiceInfo = this.props.params;
    const hasInvoice = invoice && !invoice.isCoppy;

    if (hasInvoice) x = invoice.id;
    if (this.state.remove) {
      if (!hasInvoice) return null;

      return (
        <div>
          <input type="hidden" value={x} name={'ledger[invoices_attributes][' + x + '][id]'}/>
          <input type="hidden" value={this.state.remove} name={'ledger[invoices_attributes][' + x + '][_destroy]'}/>
        </div>
      )
    }


    return <div className="invoicefield">
      <input type="hidden" value={(invoice && invoice.maintenance_request_id) ? invoice.maintenance_request_id : invoiceInfo.maintenance_request_id} name={'ledger[invoices_attributes][' + x + '][maintenance_request_id]'}/>
      <input type="hidden" value={(invoice && invoice.trady_id) ? invoice.trady_id : invoiceInfo.trady_id} name={'ledger[invoices_attributes][' + x + '][trady_id]'} />
      <input type="hidden" value={(invoice && invoice.quote_id) ? invoice.quote_id : invoiceInfo.quote_id} name={'ledger[invoices_attributes][' + x + '][quote_id]'} />
      <fieldset>
        <div>
          <FieldList existingContent={invoice_items} SampleField={InvoiceItemField} params={{x:x, updatePrice:this.calcInvoiceTotal, remove:this.state.remove}} flag="invoice"/>
          <div className="text-center m-t-lg">
            <input
            type="text"
            className="text-center"
            placeholder="Invoice Reference Number"
            defaultValue={invoice && invoice.trady_invoice_reference}
            name={'ledger[invoices_attributes][' + x + '][trady_invoice_reference]' }
            />
          </div>
          <label>
            <input type="checkbox" value={this.state.tax} checked={this.state.tax} name={'ledger[invoices_attributes][' + x + '][tax]'} onChange={this.onTax}/>
            Total Includes GST
           </label>
        </div>
        <hr />
        <div className="field">
          <div>
            <p> Invoice Total : </p>
            <input type="text" readOnly="readonly" placeholder="$0.00" value={this.state.invoice_total.toFixed(2)} name={'ledger[invoices_attributes][' + x + '][invoice_total]'} />
          </div>
          <div>
            <p> Tax Total : </p>
            <input type="text" readOnly="readonly" placeholder="$0.00" value={this.state.tax_total.toFixed(2)} name={'ledger[invoices_attributes][' + x + '][tax_total]'} />
          </div>
          <div>
            <p> Items Total : </p>
            <input type="text" readOnly="readonly" placeholder="$0.00" value={this.state.items_total.toFixed(2)} name={'ledger[invoices_attributes][' + x + '][amount]'} />
          </div>
          <div>
            <p> Invoice Due On : </p>
            <input type="date" defaultValue={(invoice && invoice.due_date) || ''} name={'ledger[invoices_attributes][' + x + '][due_date]'} required/>
          </div>
        </div>

        <input type="hidden" value={this.state.remove} name={'ledger[invoices_attributes][' + x + '][_destroy]'}/>
        {hasInvoice && <input type="hidden" value={x} name={'ledger[invoices_attributes][' + x + '][id]'}/>}
      </fieldset>

      <button type="button" className="button-remove button-primary red" onClick={() => this.removeField(this.props.x)}> Remove Invoice </button>
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

  render: function(){
    const {quotes, trady} = this.props;
    const ledger = this.props.ledger || null;
    const id = (ledger && ledger.id) || '';
    const invoiceInfo = {
      maintenance_request_id: this.props.maintenance_request_id,
      trady_id: this.props.trady_id,
      tax: '',
      due_date: ''
    };
    const invoices = (ledger && ledger.invoices) ? ledger.invoices : null;
    const converts = []
    const hasQuotes = (quotes && quotes.length > 0);
    (invoices || []).filter((e) => !!e.quote_id).forEach((e) => converts.push(e.quote_id));

    return <form role="form" id="new_invoice" action={id ? '/update_invoice' : '/invoices'} acceptCharset="UTF-8" method="post">
      <input type="hidden" value={this.props.authenticity_token} name="authenticity_token"/>
      <input type="hidden" value={this.props._method} name="_method" />
      <input type="hidden" name="ledger[grand_total]"/>
      <input type="hidden" value={this.props.maintenance_request_id} name="ledger[maintenance_request_id]"/>
      <input type="hidden" value={this.props.trady_id} name="ledger[trady_id]"/>
      <input type="hidden" value={this.props.quote_id} name="ledger[quote_id]"/>
      <input type="hidden" value={id} name="ledger[ledger_id]" />
      <input type= "hidden" value={this.props.invoice_type} name="ledger[invoice_type]"/>
      {
        hasQuotes &&
        <QuotesInInvoice
          quotes={quotes}
          trady={trady}
          converts={converts}
          ref={(ref) => (this.quotesInInvoice = ref)}
          viewQuote={(key, item) => this.viewItem(key, item)}
          onConvertToInvoice={(item) => this.fieldListForInvoice.setContent(item)}
        />
      }

      <FieldListForInvoice
        params={invoiceInfo}
        noQuotes={!hasQuotes}
        existingContent={invoices}
        SampleField={InvoiceField}
        ref={(ref) => (this.fieldListForInvoice = ref)}
        removeQuote={(quote) => this.quotesInInvoice.removeConvert(quote.id)}
      />

      <div className="qf-button text-center" style={{marginBottom: '50px'}}>
        <a className="button button-primary left" href={this.props.backlink}> Back </a>
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

        <input type="email" placeholder="Email" defaultValue={this.props.email}
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
