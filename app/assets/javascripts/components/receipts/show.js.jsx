
var Receipt = React.createClass({
  getInitialState: function() {
    const {receipt} = this.props;
    const {total, invoices, uploaded_invoices} = receipt;
    return {
      total,
      invoices,
      uploaded_invoices
    }; 
  },

  render: function() {
    const self = this;
    const {
      total,
      invoices,
      uploaded_invoices,
    } = this.state;

    return (
      <div className="receipt-list main-container">
        <FixCSS />
        <div className="receipt-content main-content">
          <div className="sidebar dontprint">
            <div className="box-shadow flexbox flex-column">
              <GeneralAction
                {...this.props}
              />
            </div>
          </div>
          <div className="section">
            <div className="box-shadow">
              <div className="receipt-detail">
                <span className="title">Receipt Details</span>
              </div>
              <div className="receipt-detail">
                <span className="title">Maintenance App Service Fee Total: ${total}</span>
              </div>
              <div className="print-button dontprint">
                <button type="button" onClick={() => window.print()}>Print</button>
              </div>
              <div>
                {
                  invoices.map((invoice, index) => {
                    return (
                      <ReceiptInvoiceItem 
                        startIndex={0}
                        totalKey="amount"
                        index={index} 
                        invoice={invoice} 
                        link={self.props.link}
                      />
                    );
                  })
                }
                {
                  uploaded_invoices.map((invoice, index) => {
                    return (
                      <ReceiptInvoiceItem 
                        startIndex={invoices.length}
                        totalKey="total_invoice_amount"
                        index={index} 
                        invoice={invoice} 
                        link={self.props.link}
                      />
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <DropDownMobileList
          title="Menu"
        />
      </div>
    );
  }
});



var ReceiptInvoiceItem = React.createClass({
  render: function() {
    const {invoice, link, index, startIndex} = this.props;
    const {id, paid, service_fee, totalKey, address, maintenance_request = {}} = invoice;
    const {property} = (maintenance_request || {});
    const {property_address = ''} = (property || {});

    return (
      <div className="row receipt receipt-item">
        <div className="content main-detail">
          <div className="invoice-title">
            <span className="title">Invoice #{startIndex + index + 1}</span>
          </div>
          <div className="receipt-information main-information">
            <div className="receipt-information row-information">
                <span className="key">Invoice Total:</span>
                <span className="data">${invoice[totalKey] || 0}</span>
              </div>
              <div className="receipt-information row-information">
                <span className="key">Service Fee:</span>
                <span className="data">{paid ? 'Paid' : 'Waiting'}</span>
              </div>
              <div className="receipt-information row-information">
                <span className="key">Work Done at:</span>
                <span className="data address">{property_address}</span>
              </div>
              <div className="last-row">
                <div className="view-mr-link">
                  <a 
                    href={link + '/' + maintenance_request.id}
                  >
                    View Maintenance Request
                  </a>
                </div>
                <div className="receipt-information row-information">
                  <span className="key">Invoice Service Fee:</span>
                  <span className="data address">${service_fee || 0}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
});