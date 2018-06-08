
var ReceiptList = React.createClass({
  getInitialState: function() {
    const {receipts} = this.props;
    const perPage = 5;
    const dataShow = (receipts || []).slice(0, perPage);
    return {
      page: 1,
      count: (receipts || []).length,
      perPage,
      dataShow,
      receipts: receipts || [],
    }
  },

  getData: function(link, page, params = {}) {
    params.page = page;
    const {receipts, perPage} = this.state;
    const dataShow = (receipts).slice((page - 1) * perPage, page * perPage);

    this.setState({page, dataShow});
    // const self = this;
    // $.ajax({
    //   type: 'GET',
    //   url: link,
    //   data: params,
    //   success: function(res){
    //     const dataShow = res.entries;
    //     self.setState({
    //       count: res.total_entries,
    //       dataShow: dataShow,
    //       perPage: res.per_page,
    //       page: res.current_page,
    //     });
    //   },
    //   error: function(err) {
    //     self.setState({
    //       count: 0,
    //       dataShow: [],
    //     });
    //   }
    // });
  },

  componentWillMount: function() {
    //this.getMaintenanceRequests();
    // this.setPage(1);
  },

  setPage: function(page){
    this.setState({
      page: page
    });
    this.getData(this.props.link, page, {});
  },

  render: function() {
    const self = this;

    return (
      <div className="receipt-list main-container">
        <FixCSS />
        <div className="receipt-content main-content">
          <div className="sidebar">
            <div className="box-shadow flexbox flex-column">
              <GeneralAction
                {...this.props}
              />
            </div>
          </div>
          <div className="section">
            <div>
              {
                this.state.dataShow.map((receipt, key) => {
                  return (
                    <ReceiptItem 
                      key={key} 
                      receipt={receipt} 
                      link={self.props.link}
                    />
                  );
                })
              }
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
        <DropDownMobileList
          title="Menu"
        />
      </div>
    );
  }
});

var ReceiptItem = React.createClass({
  render: function() {
    const {receipt, link} = this.props;
    const {id, paid, total, number_invoice} = receipt;

    return (
      <div className="row main-item box-shadow">
        <div className="content main-detail">
          <div className="receipt-detail">
            <span className="title">Receipt Detail:</span>
          </div>
          <div className="receipt-information main-information">
            <div className="receipt-information row-information">
                <span className="key">Status:</span>
                <span className="data status">{paid ? 'Paid' : 'Waiting'}</span>
              </div>
              <div className="receipt-information row-information">
                <span className="key">Number of Invoice Processed:</span>
                <span className="data address">{number_invoice}</span>
              </div>
              <div className="receipt-information row-information">
                <span className="key">Service Fee Total:</span>
                <span className="data">${parseFloat(total || 0).toFixed(2)}</span>
              </div>
          </div>
        </div>
        <div className="view-button">
          <button 
            type="button"
            className="btn-view" 
            onClick={() => location.href = this.props.link + "/" + id}
          >
            View
          </button>
        </div>
      </div>
    );
  }
});