
var Receipt = React.createClass({
  getInitialState: function() {
    return {
      total: 200,
      invoices: [{
        id: 1,
        total: 100,
        service_fee: 15,
        status: 'Paid',
        address: 'Here',
        maintenance_request_id: 2,
      }, {
        id: 2,
        total: 50,
        service_fee: 7.5,
        status: 'Paid',
        address: 'Here',
        maintenance_request_id: 2,
      }, {
        id: 3,
        total: 50,
        service_fee: 7.5,
        status: 'Paid',
        address: 'Here',
        maintenance_request_id: 2,
      }]
    }; 
  },

  render: function() {
    const self = this;
    const {
      total,
      invoices
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
    const {invoice, link, index} = this.props;
    const {id, status, service_fee, total, address, maintenance_request_id} = invoice;

    return (
      <div className="row receipt receipt-item">
        <div className="content main-detail">
          <div className="invoice-title">
            <span className="title">Invoice #{index + 1}</span>
          </div>
          <div className="receipt-information main-information">
            <div className="receipt-information row-information">
                <span className="key">Invoice Total:</span>
                <span className="data">${total}</span>
              </div>
              <div className="receipt-information row-information">
                <span className="key">Service Fee:</span>
                <span className="data">{status}</span>
              </div>
              <div className="receipt-information row-information">
                <span className="key">Work Done at:</span>
                <span className="data address">{address}</span>
              </div>
              <div className="last-row">
                <div className="view-mr-link">
                  <a 
                    href={link + '/' + maintenance_request_id}
                  >
                    View Maintenance Request
                  </a>
                </div>
                <div className="receipt-information row-information">
                  <span className="key">Invoice Service Fee:</span>
                  <span className="data address">${service_fee}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
});