var ButtonForwardLandlord = React.createClass({
  getInitialState: function() {
    return {
      isSend: this.props.quote.forwarded_to_landlord
    };
  },

  sendEmail: function() {
    if(!!this.props.landlord){
      if (this.state.isSend) {
        return this.props.viewQuote('confirmForwardLandlord', this.props.quote);
      }
      const params = {
        quote_id: this.props.quote.id,
        maintenance_request_id: this.props.quote.maintenance_request_id,
      };

      this.props.sendEmailLandlord(params, this.props.quote);
      this.setState({
        isSend: true
      });
    }else {
      this.props.onModalWith("addLandlordSendEmail");
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      isSend: nextProps.quote.forwarded_to_landlord
    });
  },

  render: function() {
    // const style = {
    // 	opacity: this.state.isSend ? 0.5 : 1
    // };
    return (
      <button
        type="button"
        // style={style}
        onClick={this.sendEmail}
        className="btn btn-trans"
      >
        {!!this.state.isSend ? 'Sent to Landlord' : 'Forward to LandLord'}
      </button>
    );
  }
});

var ButtonCreateQuote = React.createClass({
  render: function() {
    return (
      <button
      type="button"
      className="btn btn-accept"
      onClick={() => this.link.click()}
      >
        <a
          href={this.props.linkCreateQuote}
          style={{display: 'none'}}
          ref={(elem) => this.link = elem}
        />
        Create Quote
      </button>
    );
  }
});

var ButtonAccept = React.createClass({
  updateStatus: function() {
    const params = {
      status: "Approved",
      quote_id: this.props.quote.id,
      maintenance_request_id: this.props.quote.maintenance_request_id,
    };

    this.props.updateStatusQuote(params);
  },

  render: function() {
    return (
      <button
      type="button"
      className="btn btn-accept"
      onClick={this.updateStatus}
      >
        Accept
      </button>
    );
  }
});

var ButtonDecline = React.createClass({
  updateStatus: function() {
    const params = {
      status: "Declined",
      quote_id: this.props.quote.id,
      maintenance_request_id: this.props.quote.maintenance_request_id,
    };

    this.props.updateStatusQuote(params);
  },

  render: function() {
    return (
      <button
      type="button"
      className="btn btn-decline"
      onClick={this.updateStatus}
      >
        Decline
      </button>
    );
  }
});

var ButtonRestore = React.createClass({
  updateStatus: function() {
    const params = {
      status: "Restore",
      quote_id: this.props.quote.id,
      maintenance_request_id: this.props.quote.maintenance_request_id,
    };
    this.props.updateStatusQuote(params);
  },

  render: function() {
    return (
      <button type="button" className="btn btn-trans" onClick={this.updateStatus}>
        Restore
      </button>
    );
  }
});

var ButtonCancle = React.createClass({
  render: function() {
    return (
      <button
        type="button"
        className="btn btn-cancel"
        onClick={(key, item) => this.props.viewQuote('viewConfirmQuote', this.props.quote)}
      >
        Cancel
      </button>
    );
  }
});

var ButtonView = React.createClass({
  render: function() {
    return (
      <button
        type="button"
        className="btn btn-trans"
        onClick={(key, item) => this.props.viewQuote('viewQuote', this.props.quote)}
      >
        View
      </button>
    );
  }
});

var ButtonQuoteAlreadySent = React.createClass({
  render: function() {
    const { viewQuote, quote_request } = this.props;
    return (
      <button
        type="button"
        className="btn btn-default stop-reminder"
        onClick={() => viewQuote('confirmStopQuoteReminder', quote_request)}
      >
        Stop Quote Request Reminder
      </button>
    );
  }
});

var ButtonCallTrady = React.createClass({
  render: function() {
    const { trady } = this.props;
    return (
      <button
        type="button"
        className="btn btn-default"
        onClick={() => this.phone.click()}
      >
        <a
          href={`tel:${trady.mobile}`}
          style={{display: 'none'}}
          ref={(elem) => this.phone = elem}
        />
        <i className="fa fa-phone"></i> Call {trady.name}
      </button>
    );
  }
});

var ButtonViewPhoto = React.createClass({
  render: function() {
    const { chooseQuoteRequest, quote, viewQuote, gallery } = this.props;
    return (
      <button
        type="button"
        className="btn btn-trans"
        onClick={(key, item) => {
          chooseQuoteRequest(quote);
          viewQuote('viewPhoto', gallery);
        }}
      >
        View
      </button>
    );
  }
});

var ButtonRequestAnotherQuote = React.createClass({
  sendEmail: function() {
      const params = {
        maintenance_request_id: this.props.quote.maintenance_request_id,
      };

      this.props.sendEmailLandlord(params);
  },

  render: function() {
    return (
      <button type="button" className="btn btn-trans" onClick={this.sendEmail}>
        Request Another Quote
      </button>
    );
  }
});

var ButtonQuoteMessage = React.createClass({
  render: function() {
    return (
      <button type="button" className="btn btn-message" onClick={(key, item) => this.props.viewQuoteMessage('viewQuoteMessage', this.props.quote)}>
        Message
      </button>
    );
  }
});

var ButtonQuoteRequestMessage = React.createClass({
  render: function() {
    const { name = '', quote_request, viewQuote } = this.props;

    return (
      <button
        type="button"
        className="btn btn-message"
        title={`Message ${name}`}
        onClick={() => viewQuote('viewQuoteRequestMessage', quote_request)
        }
      >
        <i className="fa fa-commenting" aria-hidden="true" />
        Message {name}
      </button>
    );
  }
});

var ButtonPrint = React.createClass({
  render: function() {
    return (
      <button className="btn btn-print" onClick={this.props.printQuote}>
        Print
      </button>
    );
  }
});

var ActionQuote = React.createClass({
  getInitialState() {
    return {
      quote: this.props.quote
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      quote: nextProps.quote
    });
  },

  render: function(){
    const {quote} = this.state;
    const self = this.props;
    const image = quote.quote_image && quote.quote_image.image_url || '';

    if(!!self.keyLandlord && self.keyLandlord === "landlord") {
      return (
        <div className="actions-quote">
          {
            self.showView && image
            ? <ButtonViewPhoto
                viewQuote={this.props.viewQuote}
                gallery={[image]}
                quote={quote}
                chooseQuoteRequest={this.props.chooseQuoteRequest}
              />
            : self.showView
              ? <ButtonView
                  quote={self.quote}
                  viewQuote={(key, item) => self.viewQuote(key, item)}
                />
              : ''
          }
          { quote.status == "Active" &&
              <ButtonAccept
                quote={quote}
                updateStatusQuote={self.updateStatusQuote}
              />
          }
          { quote.status == "Active" &&
              <ButtonRequestAnotherQuote
                quote={quote}
                sendEmailLandlord={self.sendEmailLandlord}
              />
          }
          {
            !!this.props.isModal && this.props.printQuote &&
              <ButtonPrint
                printQuote={this.props.printQuote}
              />
          }
        </div>
      );
    }else if(self.keyLandlord == "trady") {
      return (
        <div className="actions-quote">
          {
            self.showView && image
            ? <ButtonViewPhoto
                viewQuote={this.props.viewQuote}
                gallery={[image]}
                quote={quote}
                chooseQuoteRequest={this.props.chooseQuoteRequest}
              />
            : self.showView
              ? <ButtonView
                  quote={self.quote}
                  viewQuote={(key, item) => self.viewQuote(key, item)}
                />
              : ''
          }
          { (!self.quote_request
            && !!self.current_user_show_quote_message
            && quote.status != "Declined")
            && <ButtonQuoteMessage
                quote={quote}
                viewQuoteMessage={(key, item) => self.viewQuote(key, item)}
              />
          }
          {
            !!this.props.isModal && this.props.printQuote &&
              <ButtonPrint
                printQuote={this.props.printQuote}
              />
          }
        </div>
      );
    }else {
      return (
        <div className="actions-quote">
          {
            self.showView && image
            ? <ButtonViewPhoto
                viewQuote={this.props.viewQuote}
                gallery={[image]}
                quote={quote}
                chooseQuoteRequest={this.props.chooseQuoteRequest}
              />
            : self.showView
              ? <ButtonView
                  quote={self.quote}
                  viewQuote={(key, item) => self.viewQuote(key, item)}
                />
              : ''
          }
          { (!self.quote_request
            && !!self.current_user_show_quote_message
            && quote.status != "Declined")
            && <ButtonQuoteMessage
                quote={quote}
                viewQuoteMessage={(key, item) => self.viewQuote(key, item)}
              />
          }
          { quote.status == "Active" &&
              <ButtonForwardLandlord
                quote={quote}
                landlord={self.landlord}
                viewQuote={self.viewQuote}
                onModalWith={self.onModalWith}
                sendEmailLandlord={self.sendEmailLandlord}
              />
          }
          { quote.status == "Active" &&
              <ButtonAccept
                quote={quote}
                updateStatusQuote={self.updateStatusQuote}
              />
          }
          { quote.status == "Active" &&
              <ButtonDecline
                quote={quote}
                updateStatusQuote={self.updateStatusQuote}
              />
          }
          { !self.hideRestore && (quote.status != "Cancelled" && quote.status != "Active" && quote.status != "Approved") &&
              <ButtonRestore
                quote={quote}
                updateStatusQuote={self.updateStatusQuote}
              />
          }
          {
            !!this.props.isModal && this.props.printQuote &&
              <ButtonPrint
                printQuote={this.props.printQuote}
              />
          }
        </div>
      );
    }
  }
});

var ActionQuoteRequest = React.createClass({
  getInitialState() {
    return {
      quote_request: this.props.quote_request
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      quote_request: nextProps.quote_request
    });
  },

  render: function(){
    const quote_request = this.state.quote_request || {};
    const quotes        = (quote_request.quotes || []).map((quote) => {
      return {
        ...quote,
        trady: quote_request.trady
      };
    });

    return <div className="quote-request">
        {quotes.length > 0 && <Quotes {...this.props} quotes={quotes} />}
      </div>
  }
});

var Quotes = React.createClass({
  getInitialState: function() {
    return {
      quotes: this.props.quotes,
    };
  },

  componentWillMount() {
    this.getPictureImage(this.state.quotes);
  },

  componentWillReceiveProps: function(nextProps) {
    this.getPictureImage(nextProps.quotes);
    this.setState({
      quotes: nextProps.quotes,
    });
  },

  getPictureImage(quotes) {
    const self = this;
    if (!quotes || quotes.length === 0) return this.setState({ pictures: []});

    const pictures = (quotes || []).map((quote) => {
      const trady 											= quote.trady || {};
      const id 													= trady.id || '';
      const trady_company 							= trady.trady_company || {};
      const trady_profile_image 				= trady.trady_profile_image || {};
      const trady_company_profile_image = trady_company.trady_company_profile_image || {};

      return trady_company_profile_image && trady_company_profile_image.image_url
          || trady_profile_image && trady_profile_image.image_url;
    });

    this.setState({ pictures });
  },

  render: function() {
    const {quotes, pictures} = this.state;
    const self = this.props;

    return (
      <div className="quotes m-t-lg" id="quotes">
        <p className="quote-title">
          Quotes
        </p>
        <div className="list-quote">
        {
          quotes.map(function(quote, index) {
            const status = quote.status;
            const showStatus = ['Approved', 'Declined'].indexOf(status) !== -1;

            return (
              <div className="item-quote row" key={index}>
                <div className="user seven columns quote-status">
                  <span className="index quote circle">{index + 1}</span>
                  <span>Status: </span>
                  {showStatus &&
                    <button
                      className={'button-default status ' + status}>
                      <span>{status}</span>
                    </button>
                  }
                </div>
                { !!self.current_user &&
                    <ActionQuote
                       {...self}
                      quote={quote}
                      showView={true}
                      key={quote.id}
                      landlord={self.landlord}
                      keyLandlord={self.keyLandlord}
                      onModalWith={self.onModalWith}
                      updateStatusQuote={self.updateStatusQuote}
                      sendEmailLandlord={self.sendEmailLandlord}
                      viewQuote={(key, item) => self.viewQuote(key, item)}
                      current_user_show_quote_message={self.current_user_show_quote_message}
                    />
                }
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }
});

var QuoteRequests = React.createClass({
  getInitialState: function() {
  	const self = this.props;

    const role = self.current_role && self.current_role.role;
    const quote_requests = role === 'Landlord'
                        ? this.filterQuoteRequestForLandlord(self.quote_requests)
                        : this.filterQuoteRequest(self.quote_requests);
    return {
      quote_requests,
      pictures: [],
      role,
    };
  },

  componentWillMount() {
    this.getPictureImage(this.state.quote_requests);
  },

  componentWillReceiveProps: function(nextProps) {
    const {role} = this.state;
    const quote_requests = role === 'Landlord'
                        ? this.filterQuoteRequestForLandlord(nextProps.quote_requests)
                        : this.filterQuoteRequest(nextProps.quote_requests);

    this.getPictureImage(quote_requests);
    this.setState({
      quote_requests: quote_requests,
    });
  },

  filterQuoteRequest(quote_requests) {
    const filteredQuoteRequest = quote_requests.filter(({trady}) => {
      return trady && (!trady.jfmo_participant || !!trady.customer_profile)
    })

    return filteredQuoteRequest;
  },

  filterQuoteRequestForLandlord(quote_requests) {
    const filtered = this.filterQuoteRequest(quote_requests);

    const filteredQuotesForQuoteRequest = filtered.map((quote_request) => {
      // filter quote inside quote_request
      const quotes = quote_request.quotes.filter((quote) => {
        return quote.delivery_status && quote.forwarded_to_landlord;
      });
      quote_request.quotes = quotes;

      return quote_request;
    })

    // Filter quote_request have empty quotes
    return filteredQuotesForQuoteRequest.filter((qr) => {
      return qr.quotes.length;
    })
  },

  getPictureImage(quote_requests) {
    const self = this;
    if (!quote_requests || quote_requests.length === 0)
      return this.setState({ pictures: []});

    const pictures = (quote_requests || []).map((quote_request) => {
      const trady 											= quote_request.trady || {};
      const id 													= trady.id || '';
      const trady_company 							= trady.trady_company || {};
      const trady_profile_image 				= trady.trady_profile_image || {};
      const trady_company_profile_image = trady_company.trady_company_profile_image || {};

      return trady_company_profile_image && trady_company_profile_image.image_url
          || trady_profile_image && trady_profile_image.image_url;
    });

    this.setState({ pictures });
  },

  render: function() {
    const {quote_requests, pictures, role} = this.state;
    const self = this.props;

    const isCallTrady = role === 'AgencyAdmin' || role === 'Agent';

    // Check if quote request was created by a real trady

    return (
      <div className="quotes m-t-lg box-shadow" id="quote_requests">
        { !!quote_requests.length &&
          <p>
            <span className="index">{quote_requests.length}</span>Quote Requests
          </p>
        }
        <div className="list-quote">
        {
          quote_requests.map(function(quote_request, index) {
            const trady = quote_request.trady || {};
            const assignedTradyValid = !self.assignedTrady
                                    || self.assignedTrady.id === trady.id;

						const isAssigned = self.assignedTrady && self.assignedTrady.id === trady.id;
            const {maintenance_request_id, trady_id} = quote_request;
            const quotes 				= quote_request.quotes || [];
            const quoteAlready  = quotes.filter(quote => !quote.quote_items
                                                       || quote.quote_items.length === 0);

            const isLandlord = self.keyLandlord === "landlord";

            const needAlreadySentButton = !isLandlord
                                       && quotes.length === 0
                                       && !quote_request.quote_sent;

            const needPhotoButton 			= !isLandlord && quote_request.quote_sent;
            const needMessageButton 		= !isLandlord && assignedTradyValid
                                        && !!self.current_user_show_quote_message;

            const messageTo 						= self.keyLandlord === 'trady'
                                        ? 'Agent'
                                        : quote_request.trady
                                          ? quote_request.trady.name
                                          : '';
            const linkCreateQuote = `/quote_options?maintenance_request_id=${maintenance_request_id}&trady_id=${trady_id}`;

            return (
              <div className="item-quote row item-quote-request" key={index}>
                <div className="user seven columns trady-info-group">
                  <div className="trady-info">
                    <span className="icon-user">
                      <AvatarImage imageUri={pictures[index]} />
                    </span>
                    <div className="info">
                      <div className="name">
                        <span className="key">Name: </span>
                        <span className="value">{trady.name}</span>
                      </div>
                      { trady.trady_company &&
                        <div className="business-name">
                          <span className="key">Business Name: </span>
                          <span className="value">{trady.trady_company.trading_name}</span>
                        </div>
                      }
                      <div className="company-name">
                        <span className="key">Company Name: </span>
                        <span className="value">{trady.company_name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="contact-button">
                    { isCallTrady &&
                      <div className="trady-call-button">
                        <ButtonCallTrady
                          trady={trady}
                        />
                      </div>
                    }
                    { needMessageButton &&
                      <div className="trady-message-button">
                        <ButtonQuoteRequestMessage
                          quote_request={quote_request}
                          name={messageTo}
                          viewQuote={self.viewQuote}
                        />
                      </div>
                    }
                  </div>
                </div>
                <div className="quote-request-button">
                  { role === 'Trady'
                    ? <ButtonCreateQuote
                        linkCreateQuote={linkCreateQuote}
                      />
                    : ''
                  }
                  { !quote_request.trady.jfmo_participant && needAlreadySentButton
                    ? <ButtonQuoteAlreadySent
                        {...self}
                        quote_request={quote_request}
                      />
                    : ''
                  }
                  { needPhotoButton
                    ? <ModalImageUpload
                        className="btn btn-default"
                        {...self}
                        chooseImageText="Choose Image or PDF to upload"
                        text="Upload Quote PDF/Image"
                        onClick={() => self.chooseQuoteRequest(quote_request)}
                      />
                    : ''
                  }
                </div>
                { isAssigned &&
									<AssignTrady
										current_role={role}
										stop_appointment={self.stop_appointment}
										stop_invoice={self.stop_invoice}
										showAppointmentAlreadyMade={self.showAppointmentAlreadyMade}
										trady={self.assignedTrady}
										viewTrady={self.viewQuote}
										onModalWith={self.onModalWith}
									/>
                }
                { !!self.current_user && quote_request.quotes && quote_request.length > 0 &&
                    <ActionQuoteRequest
                      {...self}
                      index={index}
                      quote_request={quote_request}
                      key={quote_request.id}
                      landlord={self.landlord}
                      keyLandlord={self.keyLandlord}
                      onModalWith={self.onModalWith}
                      updateStatusQuote={self.updateStatusQuote}
                      sendEmailLandlord={self.sendEmailLandlord}
                      uploadImage={self.uploadImage}
                      chooseQuoteRequest={self.chooseQuoteRequest}
                      viewQuote={(key, item) => self.viewQuote(key, item)}
                      current_user_show_quote_message={self.current_user_show_quote_message}
                    />
                }
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }
});

var QuotesInInvoice = React.createClass({
  getInitialState() {
    const { converts = [] } = this.props;
    return {
      convert: converts.reduce((obj, id) => ({ ...obj, [id]: true }), {}),
    };
  },

  setConvert(id) {
    this.setState((pre) => ({ convert: { ...pre.convert, [id]: true }}));
  },

  removeConvert(id) {
    this.setState((pre) => ({ convert: { ...pre.convert, [id]: false }}));
  },

  render: function() {
    const { convert = {} } = this.state;
    const { quotes, trady } = this.props;
    const self = this;

    return (
      <div className="quotes m-t-lg m-b-lg" id="quotes">
        <p>
          Quotes ({quotes.length})
        </p>
        <div className="list-quote">
        {
          quotes.map(function(quote, index) {
            let amount = quote.amount;

            quote && quote.quote_items && quote.quote_items.forEach(function(item) {
              if (item.pricing_type === 'Range') {
                amount += item.min_price;
              }
            });

            return (
              <div className="item-quote row" key={index}>
                <div className="user seven columns">
                  <span className="icon-user">
                    <i className="fa fa-user" />
                  </span>
                  <div className="info">
                    <div className="name">
                      <span>{quote.trady.name}</span>
                      <button className={'button-default ' + quote.status}>
                        <span>{quote.status}</span>
                      </button>
                    </div>
                    <p className="description">
                      {quote.trady && quote.trady.name} <br />
                      {(quote.trady && quote.trady.trady_company) && quote.trady.trady_company.trading_name}
                    </p>
                  </div>
                </div>
                <div className="actions five columns">
                  <p className="price">Amount: {amount}AUD</p>
                </div>
                <div className="actions-quote">
                  <button
                    type="button"
                    className="btn btn-decline"
                    disabled={!!convert[quote.id]}
                    onClick={() => {
                      self.setConvert(quote.id);
                      self.props.onConvertToInvoice(quote);
                    }}
                  >
                    Convert Into Invoice
                  </button>
                  <ButtonView
                    quote={quote}
                    viewQuote={(key, item) => self.props.viewQuote(key, item)}
                  />
                </div>
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }
});

var DetailQuote = React.createClass({
  render: function() {
    const {quote} = this.props;
    let subTotal = 0;
    let gst = 0;
    if(!!quote) {
      return (
        <table  className="table">
        <thead>
          <tr>
            <th className="quote-description">
              Description
            </th>
            <th className="quote-price">
              Pricing
            </th>
            <th className="text-right quote-rate">
              Rate
            </th>
            <th className="text-right quote-amount">
              Amount
            </th>
          </tr>
          </thead>
          <tbody>
          {
            quote.quote_items.map(function(item, key) {
              if(item.pricing_type == "Fixed Cost") {
                subTotal += item.amount;
              }else {
                subTotal += (item.amount*item.hours);
              }
              let amount = item.amount;
              if(item.pricing_type === 'Range') {
                amount = `$${item.min_price.toFixed(2)}-$${item.max_price.toFixed(2)}`;
              }
              else {
                amount = `$${amount.toFixed(2)}`;
              }

              return (
                <tr key={key}>
                  <td className="quote-description">{item.item_description}</td>
                  <td className="quote-price">{item.pricing_type}</td>
                  <td className="text-right quote-rate">
                    { item.pricing_type == "Hourly" && "$" + item.amount.toFixed(2) }
                  </td>
                  <td className="text-right quote-amount">
                    { item.pricing_type !== "Hourly" && amount }
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      );
    }else {
      <table>
        <tr>
          <th>
            Description
          </th>
          <th>
            Pricing
          </th>
          <th>
            Hours
          </th>
          <th>
            Amount
          </th>
        </tr>
        <tr>
          <td colSpan="4" className="text-center">
            Data is empty.
          </td>
        </tr>
      </table>
    }
  }
});

var ModalViewQuote = React.createClass({
  getInitialState: function() {
    var quote = this.props.quote;
    var quotes = this.props.quotes;

    return {
      index: null,
      quote: quote,
      quotes: quotes,
    };
  },

  switchSlider: function(key, index) {
    let position = 0;
    let quote = "";
    if(key == "prev") {
      position = index - 1 < 0 ? this.state.quotes.length - 1 : index-1;
    }else {
      position = index + 1 > this.state.quotes.length - 1 ? 0 : index+1;
    }

    quote = this.state.quotes[position];
    this.setState({
      index: position,
      quote: quote
    });
  },

  componentWillMount: function() {
    this.filterQuote(this.state.quotes);
  },

  componentWillReceiveProps: function(nextProps) {
    this.filterQuote(nextProps.quotes);
    this.setState({
      quotes: nextProps.quotes
    });
  },

  filterQuote: function(quotes) {
    for(var i = 0; i < quotes.length; i++) {
      var item = quotes[i];
      if(item.id == this.state.quote.id) {
        this.setState({
          index: i+1,
          quote: item
        });
        break;
      }
    }
  },

  capitalizeText(text) {
    return !text
      ? ''
      : text.trim().replace(/((^\w)|((\.|\,|\s)\w))/g, newWord => newWord.length === 1
        ? newWord.toUpperCase()
        : (newWord[0] + newWord[1].toUpperCase())
      )
  },

  formatABN(text) {
    return text.match(/.{1,3}/g).join(' ');
  },

  formatMobile(text) {
    return text.replace(/(.{2})(.{4})(.{4})(.*)/, '$1 $2 $3 $4').trim();
  },

  formatPhone(text) {
    return text.replace(/(.{4})(.{3})(.{3})(.*)/, '$1 $2 $3 $4').trim();
  },

  formatBSB(text) {
    return this.formatABN(text);
  },

  formatACC(text) {
    return this.formatABN(text);
  },

  getImage: function(trady) {
    if (!trady) return '';

    const trady_company = trady.trady_company || {};
    const trady_company_profile_image = trady_company.trady_company_profile_image || {};

    const image_url = trady_company_profile_image.image_url;

    return image_url;
  },

  printQuote: function() {
    window.print();
  },

  render: function() {
    const self = this.props;
    const quote = self.quote;
    const {property} = this.props;
    let total = 0;

    const image_url = this.getImage(quote.trady);

    return (
      <div className="modal-custom modal-quote fade">
        <div className="modal-dialog">
          <div className="modal-content quote-height" id="print-quote">
            <div className="modal-header">
              <div className="logo">
                <span className="icon-user">
                  <AvatarImage
                    id="logo"
                    imageUri={image_url}
                    defaultValue="/empty.png"
                  />
                </span>
              </div>
              <div className="info-trady">
                <p>
                  <span>
                    {this.capitalizeText(quote.trady.company_name)}
                  </span>
                </p>
                { quote.trady.trady_company.abn &&
                  <p>
                    <span>
                      ABN: {this.formatABN(quote.trady.trady_company.abn)}
                    </span>
                  </p>
                }
                <p>
                  <span>
                    {this.capitalizeText(quote.trady.trady_company.address)}
                  </span>
                </p>
                {
                  quote.trady.trady_company.mobile_number &&
                  <p>
                    <span>
                      mobile: {this.formatMobile(quote.trady.trady_company.mobile_number)}
                    </span>
                  </p>
                }
                { quote.trady.trady_company.landline &&
                  <p>
                    <span>
                      landline: {this.formatPhone(quote.trady.trady_company.landline)}
                    </span>
                  </p>
                }
                { quote.trady.trady_company.email &&
                  <p>
                    <span>
                      email: {quote.trady.trady_company.email}
                    </span>
                  </p>
                }
              </div>
              <button
                type="button"
                className="close dontprint"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span className="close" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="slider-quote">
              <div className="modal-body">
                <div className="show-quote" >
                  <div className="info-quote">
                    <div className="info-trady">
                      <div>
                        <p className="font-bold bill-to">Bill To</p>
                        <p>{self.landlord && this.capitalizeText(self.landlord.name)}</p>
                        <p>
                          <span className="font-bold">C/- </span>
                          {self.agency && this.capitalizeText(self.agency.business_name)}
                        </p>
                        <p>{self.agency && this.capitalizeText(self.agency.address)}</p>
                      </div>
                    </div>
                    <div className="info-agency">
                      <p>
                        <span className="font-bold">Quote Reference: </span>
                        <span> {quote.trady_quote_reference != "" ? quote.trady_quote_reference : property.property_address}</span>
                      </p>
                      <p>
                        <span className="font-bold">Quote Date: </span>
                        <span> { moment(quote.created_at).format("LL") }</span>
                      </p>
                    </div>
                  </div>
                  <div className="detail-quote">
                    {!!quote.quote_items && <DetailQuote quote={quote} />}
                  </div>
                </div>
              </div>
              <div className="modal-footer-quote quotes dontprint">
                { !!self.current_user &&
                  <ActionQuote
                    quote={quote}
                    hideRestore={self.hideRestore}
                    isModal="true"
                    className="print"
                    landlord={self.landlord}
                    quotes={this.state.quotes}
                    printQuote={this.printQuote}
                    onModalWith={self.onModalWith}
                    viewQuote={this.props.viewQuote}
                    keyLandlord={this.props.keyLandlord}
                    updateStatusQuote={self.updateStatusQuote}
                    sendEmailLandlord={self.sendEmailLandlord}
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <div id="modal-print">
          <iframe id="printframe" />
        </div>
      </div>
    );
  }
});

var ModalViewQuoteMessage = React.createClass({
  getInitialState: function() {
    return {
      errorMessage: false
    };
  },

  removeError: function(e) {
    this.setState({
      errorMessage: '',
    })
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  onSubmit: function(e) {
    e.preventDefault();
    const self = this;
    const params = {
      message: {
        body: this.message && this.message.value,
        conversation_type: 'Quote',
        quote_id: this.props.quote.id,
      }
    }

    this.props.sendMessageQuote(params, function(err) {
      if (err) {
        self.setState({ errorMessage: err['body'] });
      }
    });
    this.message.value = "";
  },

  render: function() {
    const current_user = this.props.current_user;
    var quote = this.props.quote;
    const { errorMessage } 		 = this.state;
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <form role="form">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title text-center">Message Quote</h4>
              </div>
              <div className="modal-body">
                {<ContentMessage current_user={current_user} messages={quote.conversation && quote.conversation.messages ? quote.conversation.messages : null} />}
              </div>
              <div className="modal-footer">
                <div>
                  <textarea
                    placeholder="Message"
                    readOnly={!current_user}
                    ref={(rel) => this.message = rel}
                    onChange={this.removeError}
                    className={'textarea-message ' + (!current_user ? 'readonly ' : '') + (errorMessage ? ' has-error' : '')}
                  />
                </div>
                {this.renderError(errorMessage)}
                <button
                  type="submit"
                  onClick={this.onSubmit}
                  disabled={!current_user}
                  className="btn btn-default success"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

var ModalViewQuoteRequestMessage = React.createClass({
  getInitialState: function() {
    return {
      errorMessage: false
    };
  },

  removeError: function(e) {
    this.setState({
      errorMessage: '',
    })
  },

  renderError: function(error) {
    return <p id="errorbox" className="error">{error && error[0] ? error[0] : ''}</p>;
  },

  onSubmit: function(e) {
    e.preventDefault();
    const self = this;
    const params = {
      message: {
        body: this.message && this.message.value,
        conversation_type: 'QuoteRequest',
        quote_request_id: this.props.quote_request.id,
      }
    }

    this.props.sendMessageQuoteRequest(params, function(err) {
      if (err) {
        self.setState({ errorMessage: err['body'] });
      }
    });
    this.message.value = "";
  },

  render: function() {
    const current_user 		 = this.props.current_user;
    const quote_request		 = this.props.quote_request;
    const { errorMessage } = this.state;

    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <form role="form">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title text-center">Message Quote Request</h4>
              </div>
              <div className="modal-body">
              {
                <ContentMessage
                  current_user={current_user}
                  messages={quote_request.conversation && quote_request.conversation.messages ? quote_request.conversation.messages : null}
                />
              }
              </div>
              <div className="modal-footer">
                <div>
                  <textarea
                    placeholder="Message"
                    readOnly={!current_user}
                    ref={(rel) => this.message = rel}
                    onChange={this.removeError}
                    className={'textarea-message ' + (!current_user ? 'readonly ' : '') + (errorMessage ? ' has-error' : '')}
                  />
                </div>
                {this.renderError(errorMessage)}
                <button
                  type="submit"
                  onClick={this.onSubmit}
                  disabled={!current_user}
                  className="btn btn-default success"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

var ModalViewPhoto = React.createClass({
  getInitialState: function() {
    const { gallery } = this.props;
    return {
      gallery,
      pdf: gallery && gallery.length && gallery.filter(v => v.includes('.pdf'))[0],
    };
  },

  render: function() {
    const { pdf, gallery } = this.state;
    const self  					 = this.props;

    return (
      <div className="modal-custom modal-quote fade">
        <div className="modal-dialog">
          <div className="modal-content quote-height" id="print-quote">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">
                {this.props.title || 'View Photo'}
              </h4>
            </div>
            { !pdf
              ? <div className="modal-body">
                  <Carousel gallery={gallery} fullWidth />
                </div>
              : <div className="detail-quote">
                  <div className="detail-quote">
                    <iframe
                      src={`https://docs.google.com/gview?url=${pdf.replace(/.pdf\?.*/, '')}.pdf&embedded=true`}
                      className="scroll-custom"
                      style={{ width: 'calc(100% - 4px)', height: '400px' }}
                    />
                  </div>
                </div>
            }
            <div className="modal-footer-quote quotes">
              { !!self.current_user &&
                <ActionQuote
                  isModal="true"
                  className="print"
                  hideRestore={self.hideRestore}
                  quote={self.quote}
                  landlord={self.landlord}
                  quotes={self.quotes}
                  onModalWith={self.onModalWith}
                  keyLandlord={self.keyLandlord}
                  viewQuote={this.props.viewQuote}
                  updateStatusQuote={self.updateStatusQuote}
                  sendEmailLandlord={self.sendEmailLandlord}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ModalConfirmQuote = React.createClass({
  updateStatus: function() {
    const {quote} = this.props;
    const params = {
      status: "Cancel",
      quote_id: quote.id,
      maintenance_request_id: quote.maintenance_request_id,
    };

    this.props.updateStatusQuote(params);
  },

  render: function() {
    const {title, content} = this.props;
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">{title}</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">{content}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default success"
                onClick={this.updateStatus}
                data-dismiss="modal"
              >Yes</button>
              <button
                type="button"
                className="btn btn-primary cancel"
                onClick={this.props.close}
              >No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ModalConfirmAnyThing = React.createClass({
  confirm: function() {
    this.props.confirm();
  },

  render: function() {
    const {title, content, confirmText} = this.props;
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">{title}</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">{content}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default success"
                onClick={this.confirm}
                data-dismiss="modal"
              >{confirmText || 'Yes'}</button>
              <button
                type="button"
                className="btn btn-primary cancel"
                onClick={this.props.close}
              >No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


