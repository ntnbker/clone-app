var InvoiceOption = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    const {
      upload_invoice_pdf, create_invoice, trady_maintenance_request_path
    } = this.props;

    return (
      <div className="container invoice-form">

        {/*<h1 className="text-center">
          Invoices
        </h1>*/}
        <h4 className="text-center"> Please Choose One</h4>
        <div className="invoice-options">
          <div className="invoice-option">
            <div className="option-content">
              <h4 className="optionheader text-center">Option 1</h4>
              <p className="optiondescription">
                If you use your own app to make invoices such as Xero.
                Please Click <b>Upload Invoice</b> to upload a PDF of your invoice.
              </p>
            </div>

            <div className="invoice-button center-invoice-button">
              <button
                type="button"
                className="button-submit"
                onClick={() => location.href = upload_invoice_pdf}
              >
                Upload Invoice
              </button>
            </div>
          </div>
          <div className="invoice-option">
            <div className="option-content">
              <h4 className="optionheader text-center">Option 2</h4>
              <p className="optiondescription">
                Easily make invoices using our platform by clicking the <b>Create Invoice</b> button below.
              </p>
            </div>
            <div className="invoice-button center-invoice-button">
              <button
                type="button"
                className="button-submit"
                onClick={() => location.href = create_invoice}
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
        <div className="invoice-button center-invoice-button">
          <button
            type="button"
            className="button-back"
            onClick={() => location.href = trady_maintenance_request_path}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
})
