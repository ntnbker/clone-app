var AssignTrady = React.createClass({
	render: function() {
		const { current_role, stop_appointment, stop_invoice } = this.props;
    const trady            = this.props.trady || {};
    trady['trady_company'] = trady['trady_company'] || {};

    const { trady_company: {trady_company_profile_image}, trady_profile_image } = trady;

    const image_url = trady_company_profile_image && trady_company_profile_image.image_url || trady_profile_image && trady_profile_image.image_url;

    const showStopReminder = this.props.showAppointmentAlreadyMade
                          && !trady.jfmo_participant;

		return (
			<div className="quotes invoices m-t-xl assign" id="invoices">
				<div className="item-quote-request">
					<div className="item-quote row trady-info-group work-order">
						<div className="user seven columns trady-info work-order-title">
              {current_role === 'Trady' ? "Work Order" : "Work Order"}
						</div>
						<div className="contact-button">
              <div className="view-work-order">
                <button type="button" className="btn btn-view" onClick={(key, item) => this.props.viewTrady('viewTrady', trady)}>
                  View Work Order
                </button>
              </div>
							{
								(current_role == 'Agent' || current_role == "AgencyAdmin") &&
									<div className="cancel-work-order">
                    <button type="button" className="btn btn-decline" onClick={(modal) => this.props.onModalWith('confirmCancelTrady')}>
  										Cancel Work Order
  									</button>
                  </div>
							}
              {current_role === 'Trady' &&
                <div className="view-work-order">
                  <button type="button" className="btn btn-view" onClick={(key, item) => this.props.onModalWith('viewConfirm')}>
                    Create Invoice
                  </button>
                </div>
              }
						</div>
					</div>
          <div className="quote-request-button">
            { showStopReminder &&
              <button
                type="button"
                className="btn btn-view appointment-already-made stop-reminder"
                onClick={() => {
                  if (!stop_invoice) this.props.viewTrady('confirmInvoiceAlreadyMade');
                }}
              >
                {!stop_invoice ? "Stop Invoice Reminder" : "Invoice Reminder Stopped"}
              </button>
            }
            { false && showStopReminder &&
              <button
                type="button"
                className="btn btn-view appointment-already-made stop-reminder"
                onClick={() => {
                  if (!stop_appointment) {
                    this.props.onModalWith('confirmAppointmentAlreadyMade');
                  }
                }}
              >
              {
                !stop_appointment
                  ? "Stop Appointment Reminder"
                  : "Appointment Reminder Stopped"
              }
              </button>
            }
          </div>
				</div>
			</div>
		);
	}
});


var ModalViewTrady = React.createClass({
  getInitialState: function() {
    const {
      agency, agent, trady, maintenance_request, property, hasApproved
    } = this.filterData(this.props);

    return { agency, agent, trady, maintenance_request, property, hasApproved };
  },

  filterData(props) {
    const  agency              = props.agency || {};
    const  agent               = props.agent || props.agency_admin || {};
    const  trady               = props.trady || {};
    const  property            = props.property || {};
    const  maintenance_request = props.maintenance_request || {};
    const  hasApproved         = props.hasApproved || false;

    return { agency, agent, trady, maintenance_request, property, hasApproved };
  },

  capitalizeText(text) {
    return !text
      ? ''
      : text.trim().replace(/((^\w)|((\.|\,|\s)\w))/g, newWord => newWord.length === 1
        ? newWord.toUpperCase()
        : (newWord[0] + newWord[1].toUpperCase())
      )
  },

  formatABN(text) {
    return text.match(/.{1,3}/g).join(' ');
  },

  formatMobile(text) {
    return text.replace(/(.{2})(.{4})(.{4})(.*)/, '$1 $2 $3 $4').trim();
  },

  formatPhone(text) {
    return text.replace(/(.{4})(.{3})(.{3})(.*)/, '$1 $2 $3 $4').trim();
  },

  formatBSB(text) {
    return this.formatABN(text);
  },

  formatACC(text) {
    return this.formatABN(text);
  },

  printWork() {
    window.print();
  },

	render: function() {
    const {
      agency, agent, trady, maintenance_request, property, hasApproved
    } = this.state;

    trady['trady_company'] = trady['trady_company'] || {};

    const { trady_company: {trady_company_profile_image}, trady_profile_image } = trady;

    const image_url = trady_company_profile_image && trady_company_profile_image.image_url || trady_profile_image && trady_profile_image.image_url;

		return (
			<div className="modal-custom modal-quote fade">
				<div className="modal-dialog">
					<div className="modal-content"  id="print-work-order">
						<div className="modal-header modal-quote-header">
              <div className="top-part">
                <div className="work-order-for left">
                  <div className="logo">
                    <span className="icon-user">
                      <AvatarImage id="logo" imageUri={image_url} />
                    </span>
                  </div>
                  <div className="info-trady">
                    <p>
                      <span>
                        {this.capitalizeText(trady.company_name || '')}
                      </span>
                    </p>
                    { trady.trady_company.abn &&
                      <p>
                        <span>
                          ABN {this.formatABN(trady.trady_company.abn || '')}
                        </span>
                      </p>
                    }
                    <p>
                      <span>
                        {this.capitalizeText(trady.trady_company.address || '')}
                      </span>
                    </p>
                    { trady.trady_company.mobile_number &&
                      <p>
                        <span>
                          mobile: {this.formatMobile(trady.trady_company.mobile_number || '')}
                        </span>
                      </p>
                    }

                    { trady.trady_company.landline &&
                      <p>
                        <span>
                         landline: {this.formatPhone(trady.trady_company.landline || '')}
                        </span>
                      </p>
                    }
                    { trady.trady_company.email &&
                      <p>
                        <span>
                          email: {trady.trady_company.email}
                        </span>
                      </p>
                    }
                  </div>
                </div>
                <div className="work-order-for right">
                  <div className="logo">
                    <span className="icon-user">
                      <AvatarImage id="logo" imageUri={'/nothing'} />
                    </span>
                  </div>
                  <div className="info-trady">
                    <p>
                      <span className="font-bold">C/- </span>
                      {agency && this.capitalizeText(agency.business_name)}
                    </p>

                    <p>
                      <span>
                        {
                          agency && agency.abn
                          ? `ABN ${this.formatABN(agency.abn || '')}`
                          : ''
                        }
                      </span>
                    </p>

                    <p>
                      <span>
                        {
                          agency && agency.phone
                          ? `phone: ${this.formatMobile(agency.phone || '')}`
                          : ''
                        }
                      </span>
                    </p>
                    <p>
                      <span>
                        {agency && this.capitalizeText(agency.address || '')}
                      </span>
                    </p>
                  </div>
                </div>

    						<button
    							type="button"
    							className="close dontprint"
    							data-dismiss="modal"
    							aria-label="Close"
    							onClick={this.props.close}
    						>
    							<span aria-hidden="true">&times;</span>
    						</button>
              </div>
              <div className="bottom-part">
                <div className="title">
                  WORK ORDER
                </div>
              </div>
						</div>

            <div className="modal-body work-order-detail">
              <div className="job-contact">
                <div className="left job-address rect-info">
                  <div className="title">Job Address</div>
                  <div className="detail">
                    <p>{property && property.property_address}</p>
                  </div>
                </div>
                <div className="right agent-contact rect-info">
                  <div className="title">Agent Contact</div>
                  <div className="detail">
                    <p><span className="heading">Name:</span>{`${agent.first_name || agent.name || ''} ${agent.last_name || ''}`.trim()}</p>
                    <p><span className="heading">Phone:</span>{agent.phone || agent.mobile_phone}</p>
                    <p><span className="heading">Email:</span>{agent.email}</p>
                  </div>
                </div>
              </div>
              <div className="access-contact rect-info">
                  <div className="title">Access Contacts</div>
                  <div className="detail">
                    <p><span className="heading">Name:</span>
                      {this.capitalizeText(maintenance_request.name || '')}
                    </p>
                    <p><span className="heading">Phone:</span>
                      {this.formatMobile(maintenance_request.mobile || '')}
                    </p>
                    <p><span className="heading">Email:</span>{maintenance_request.email}</p>
                  </div>
              </div>
              <div className="approval-note rect-info">
                  <div className="title">Approval Note</div>
                  <div className="detail">
                    <p>
                      <span className={'approval-note ' + (hasApproved ? 'strike' : '')}>
                        {maintenance_request && maintenance_request.preapproved_note}
                      </span>
                      {hasApproved && "As per quote approved"}
                    </p>
                  </div>
              </div>
              <div className="job-description rect-info">
                  <div className="title">Job Description</div>
                  <div className="detail">
                    <p>{maintenance_request && maintenance_request.maintenance_description}</p>
                  </div>
              </div>
            </div>
						{ false &&
              <div className="footer">
                <div className="bank">
                  <div>
                    <i className="fa fa-bank" />
                    <p className="font-bold">Bank Deposit</p>
                  </div>
                  <p>
                    <span className="font-bold">Account Name: </span>
                    <span>{this.capitalizeText(trady.trady_company.account_name)}</span>
                  </p>
                  <p>
                    <span className="font-bold">BSB no. </span>
                    <span>{this.formatBSB(trady.trady_company.bsb_number)}</span>
                  </p>
                  <p>
                    <span className="font-bold">ACC no. </span>
                    <span>{this.formatACC(trady.trady_company.bank_account_number)}</span>
                  </p>
                </div>
                <div className="contact">
                  <div>
                    <i className="fa fa-envelope-o" />
                    <p className="font-bold">Mail</p>
                  </div>
                  <p>
                    <span className="font-bold">Make your cheque payable to: </span>
                    <span>{this.capitalizeText(trady.trady_company.account_name)}</span>
                  </p>
                  <p>
                    <span className="font-bold">Detach this section and mail with your cheque to: </span>
                    <span>{this.capitalizeText(trady.trady_company.address)}</span>
                  </p>
                </div>
              </div>
            }
            <div className="modal-body dontprint">
              <ButtonPrint printQuote={this.printWork} />
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
