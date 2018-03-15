var ModalEditAddress = React.createClass({
  render: function() {
    return (
      <div className="modal-custom fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center">Edit Address</h4>
            </div>
            <div className="modal-body">
              <form role="form" id="edit_address" action="/edit_address" acceptCharset="UTF-8" method="post">
                <input
                  id='pac-input'
                  className='form-group'
                  type='text'
                  name='address'
                  placeholder="Please tell us the address."
                  onChange={getAddressOfGoogleMap}/>
                <button name="button" type="submit" className="button-primary green">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});