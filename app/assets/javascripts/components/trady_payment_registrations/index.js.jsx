var TradyPayment = React.createClass({
  submit(params, callback) {
    const self = this;
    param.trady_id               = this.props.trady_id;
    param.trady_company_id       = this.props.trady_company_id;
    param.maintenance_request_id = this.props.maintenance_request_id;

    $.ajax({
      type: 'POST',
      url: '/trady_payment_registrations',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      data: params,
      success: function(res){
        if (res && res.errors) {
          return callback(res.errors);
        }
      },
      error: function(err) {
        return callback(err);
      }
    })
  },

  render() {
    return (
      <Payment
       {...this.props}
        submit={this.submit}
      />
    )
  }
})
