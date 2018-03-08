var InvoiceSentSuccess = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    const {trady_maintenance_requests_path} = this.props;

    return (
      <div className="invoice-form success">
        <h5>
          Your invoice has been sent
        </h5>
        <div className="mark">
          <i className="fa fa-check" />
        </div>
        <p className="text-center">
          Congratulations!
        </p>
        <p className="text-center">
          Your invoice has been successfully created and sent to the Agent.
        </p>
        <p className="text-center">
          To Head Home click the button below.
        </p>
        <div className="create-invoice-button upload-invoice-button">
          <button
            type="button"
            className="button-primary green"
            onClick={() => location.href = trady_maintenance_requests_path}
          >
            Home
          </button>
        </div>
      </div>
    )
  }
})
