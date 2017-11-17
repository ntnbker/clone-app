var AssignTrady = React.createClass({
	render: function() {
		const { current_role } = this.props;
    const trady            = this.props.trady || {};
    trady['trady_company'] = trady['trady_company'] || {};

    const { trady_company: {trady_company_profile_image}, trady_profile_image } = trady;

    const image_url = trady_company_profile_image && trady_company_profile_image.image_url || trady_profile_image && trady_profile_image.image_url;

		return (
			<div className="quotes invoices m-t-xl assign" id="invoices">
				<p>
					{current_role === 'Trady' ? "Work Order For:" : "Work Order Assigned To:"}
				</p>
				<div className="list-quote">
					<div className="item-quote row">
						<div className="user seven columns">
							<span className="icon-user">
                <AvatarImage imageUri={image_url} />
							</span>
							<div className="info">
								<div className="name">
									<span>{trady.name}</span>
								</div>
								<p className="description">
									{trady.company_name}<br />
									{trady.trady_company && trady.trady_company.trading_name}
								</p>
							</div>
						</div>
						<div className="actions-quote">
              <button type="button" className="btn btn-view" onClick={(key, item) => this.props.viewTrady('viewTrady', trady)}>
                View
              </button>
							{
								(current_role.role == 'Agent' || current_role.role == "AgencyAdmin") &&
									<button type="button" className="btn btn-decline" onClick={(modal) => this.props.onModalWith('confirmCancelTrady')}>
										Cancel
									</button>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
});


var ModalViewTrady = React.createClass({
	render: function() {
		const {trady} = this.props;

    trady['trady_company'] = trady['trady_company'] || {};

    const { trady_company: {trady_company_profile_image}, trady_profile_image } = trady;

    const image_url = trady_company_profile_image && trady_company_profile_image.image_url || trady_profile_image && trady_profile_image.image_url;

		return (
			<div className="modal-custom modal-quote fade">
				<div className="modal-dialog">
					<div className="modal-content"  id="print-invoice">
						<div className="modal-header">
							<div className="logo">
                <span className="icon-user">
                  <AvatarImage id="logo" imageUri={image_url} />
                </span>
							</div>
							<div className="info-trady">
								<p>
									<span>
										{trady.company_name}
									</span>
								</p>
								<p>
									<span>
										{trady.trady_company && trady.trady_company.abn}
									</span>
								</p>
								<p>
									<span>
										{trady.trady_company && trady.trady_company.address}
									</span>
								</p>
								<p>
									<span>
										{trady.trady_company && trady.trady_company.mobile_number}
									</span>
								</p>
								<p>
									<span>
										{trady.trady_company && trady.trady_company.email}
									</span>
								</p>
							</div>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
								onClick={this.props.close}
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="footer">
							<div className="bank">
								<div>
									<i className="fa fa-bank" />
									<p className="font-bold">Bank Deposit</p>
								</div>
								<p>
									<span className="font-bold">BSB:</span>
									<span>{trady.trady_company && trady.trady_company.bsb_number}</span>
								</p>
								<p>
									<span className="font-bold">Account Number:</span>
									<span>{trady.trady_company && trady.trady_company.bank_account_number}</span>
								</p>
								<p>
									<span className="font-bold">Account Name:</span>
									<span>{trady.trady_company && trady.trady_company.account_name}</span>
								</p>
							</div>
							<div className="contact">
								<div>
									<i className="fa fa-envelope-o" />
									<p className="font-bold">Mail</p>
								</div>
								<p className="font-bold">
									Make your cheque payable to:
								</p>
								<p>
									{trady.trady_company && trady.trady_company.account_name}
								</p>
								<p className="font-bold">
									Detach this section and mail with your cheque to:
								</p>
								<p>
									{trady.trady_company && trady.trady_company.address}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});


var ModalConfirmCancelTrady = React.createClass({
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
              <h4 className="modal-title text-center">Cancel Work Order</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">Are you sure you want to cancel the work order?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-default success"
                onClick={this.props.cancelWorkOrder}
              >Yes</button>
              <button
                type="button"
                className="btn btn-default cancel"
                onClick={this.props.close}
                data-dismiss="modal"
              >No</button>
            </div>
          </div>
      	</div>
    	</div>
		);
	}
});
