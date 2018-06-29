const ScreenTradieList = React.createClass({
  getInitialState() {
    const {tradies} = this.props;
    const simpleTradies = [{
      name: 'name1',
      email: 'email1',
      company_name: 'company_name1',
      mobile: 'mobile1',
      insured: 'insured1',
      licensed: 'licensed1',
      id: '1',
    },{
      name: 'name2',
      email: 'email2',
      company_name: 'company_name2',
      mobile: 'mobile2',
      insured: 'insured2',
      licensed: 'licensed2',
      id: '2',
    },{
      name: 'name3',
      email: 'email3',
      company_name: 'company_name3',
      mobile: 'mobile3',
      insured: 'insured3',
      licensed: 'licensed3',
      id: '3',
    },{
      name: 'name4',
      email: 'email4',
      company_name: 'company_name4',
      mobile: 'mobile4',
      insured: 'insured4',
      licensed: 'licensed4',
      id: '4',
    }]
    const perPage = 5;
    const count = (tradies || []).length;

    return {
      tradies,
      count,
      perPage,
      tradiesShow: (tradies || []).slice(0, perPage), 
      page: 1,
    }
  },

  setPage: function(page){
    const {tradies} = this.state;
    const {perPage} = this.state;
    this.setState({
      page: page,
      tradiesShow: (tradies || []).slice((page - 1) * perPage, page * perPage),
    });
  },

  render() {
    const {tradiesShow} = this.state;
    return (
    <div id="recruit" className="main-container">
        <FixCSS className='no-sidebar' />
        <div className="main-content">
          {/* <div className="sidebar">
            <div className="box-shadow flexbox flex-column">
              <GeneralAction
                {...this.props}
              />
            </div>
          </div> */}
          <div className="section">
            <div className="box-shadow">
              <div className="main-data">
                <div className="title">
                  <p>Tradie Registrants</p>
                </div>
                <ScreenTradieTable tradies={tradiesShow} link={this.props.link} />
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


const ScreenTradieTable = React.createClass({
  render() {
    const {tradies, link} = this.props;
    return (
      <div className="tradie-table">
      <div className="table">
        <div className="table-title">
          <div className="name">Name</div>
          <div className="email">Email</div>
          <div className="company-name">Company Name</div>
          <div className="phone">Phone</div>
          <div className="insured">Insured</div>
          <div className="licensed">Licensed</div>
          <div className="view-button">View</div>
        </div>
        {tradies.map((tr, index) => {
          const {insurance, license, id, name, mobile, email, company_name} = tr;
          const insured = insurance && insurance.insured;
          const licensed = license && license.licensed;
          return (
            <div className="table-item" key={index}>
              <div className="name" title={name}>{name}</div>
              <div className="email" title={email}>{email}</div>
              <div className="company-name" title={company_name}>{company_name}</div>
              <div className="phone" title={mobile}>{mobile}</div>
              <div className="insured">{insured ? 'true' : 'false'}</div>
              <div className="licensed">{licensed ? 'true' : 'false'}</div>
              <div className="view-button">
                <button 
                  type="button" 
                  onClick={() => location.href = link + '/' + id}
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