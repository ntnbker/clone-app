var QuoteOption = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    const {
      trady_company_path, trady_maintenance_request_path
    } = this.props;

    return (
      <div className="container invoice-form">
        <div>
          <p className="optiondescription text-center">
            Easily make quotes using our platform by clicking the <b>Create Quotes</b> button below.
          </p>
          <div className="invoice-button">
            <button
              type="button"
              className="button-back"
              onClick={() => location.href = trady_maintenance_request_path}
            >
              Back
            </button>
            <button
              type="button"
              className="button-submit"
              onClick={() => location.href = trady_company_path}
            >
              Create Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
})
