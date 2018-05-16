var QuoteOption = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    const {
      trady_company_path, trady_maintenance_request_path
    } = this.props;

    return (
      <form className="invoice-form quote-form">
        <p className="optiondescription text-center">
          Easily make quotes using our platform by clicking the <b>Create Quotes</b> button below.
        </p>
        <div className="quote-button">
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
            Send Quote
          </button>
        </div>
      </form>
    );
  }
})
