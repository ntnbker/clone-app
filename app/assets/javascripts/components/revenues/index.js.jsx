const Dashboard = React.createClass({
  getInitialState() {
    const {invoices} = this.props;
    const perPage = 10;
    const count = (invoices || []).length;

    return {
      invoices: invoices,
      count,
      perPage,
      invoicesShow: (invoices || []).slice(0, perPage), 
      page: 1,
    }
  },

  setPage: function(page){
    const {invoices} = this.state;
    const {perPage} = this.state;
    this.setState({
      page: page,
      invoicesShow: (invoices || []).slice((page - 1) * perPage, page * perPage),
    });
  },

  render() {
    const {invoicesShow} = this.state;
    const {paid_revenue, outstanding_revenue} = this.props;
    return (
    <div id="recruit" className="main-container dashboard">
        <FixCSS className='no-sidebar' />
        <div id="dashboard" className="main-content">
          {/* <div className="sidebar">
            <div className="box-shadow flexbox flex-column">
              <GeneralAction
                {...this.props}
              />
            </div>
          </div> */}
          <div className="section">
            <div className="box-shadow">
              <div className="dashboard-title text-center">Maintenance App Revenue</div>
              <div className="amount-statistics">
                <div className="you-made">
                  <div className="title">Fees Collected to Date</div>
                  <div className="amount">${paid_revenue}</div>
                </div>
                <div className="total-revenue">
                  <div className="title">Outstanding Service Fees Owed</div>
                  <div className="amount">${outstanding_revenue}</div>
                </div>
                <div className="agent-made">
                  <div className="title">Leon and Martin's Happiness Index</div>
                  <div className="amount">${(parseFloat(paid_revenue || 0) + parseFloat(outstanding_revenue))}</div>
                </div>
              </div>
              <div className="main-data">
                <div className="title">
                  <p>Outstanding Mapp Invoices</p>
                </div>
                <DashboardItemTable invoices={invoicesShow} link={this.props.link} />
                { this.state.count > this.state.perPage &&
                  <Pagination
                    page={this.state.page}
                    setPage={this.setPage}
                    total={this.state.count}
                    prePage={this.state.perPage}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
})


const DashboardItemTable = React.createClass({
  render() {
    const {invoices, link} = this.props;
    return (
      <div className="tradie-table">
      <div className="table">
        <div className="table-title">
          <div className="id insured text-center">Invoice ID</div>
          <div className="invoice-total company-name">Invoice Total</div>
          <div className="due-date">Due Date</div>
          <div className="service-fee">Service Fee</div>
          <div className="status text-center company-name">Service Fee Status</div>
          <div className="view-button company-name">Maintenance Request</div>
        </div>
        {invoices.map((invoice, index) => {
          const {
            id, mapp_payment_status, service_fee, amount, total_invoice_amount, 
            due_date, maintenance_request_id
          } = invoice;

          let totalInvoice = amount === undefined ? total_invoice_amount : amount;

          return (
            <div className="table-item" key={index}>
              <div className="id insured text-center" title={id}>{id}</div>
              <div className="invoice-total company-name" title={totalInvoice}>${totalInvoice}</div>
              <div className="due-date" title={due_date}>{due_date}</div>
              <div className="service-fee" title={service_fee}>${service_fee}</div>
              <div className="status text-center company-name">{mapp_payment_status ? mapp_payment_status : 'Outstanding'}</div>
              <div className="view-button company-name">
                <button 
                  type="button" 
                  onClick={() => location.href = link + '/' + maintenance_request_id}
                >
                  View
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    )
  }
})