var ModalViewPDFInvoice = React.createClass({
	getInitialState: function() {
		return {
			index: null,
			invoice: this.props.invoice_pdf_file
		};
	},

	render: function() {
		const self = this.props;
		const {invoice} = this.state;
		const {trady} = this.props;
		let total = 0;
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
							<h4 className="modal-title text-center">PDF VIEWER</h4>
						</div>
						<div className="slider-quote">
							<div className="modal-body">
								<div className="show-quote" onTouchEnd={(key, index) => this.switchSlider('prev', this.state.index)}>
									<div className="info-quote">
										<div className="info-trady">
											<p>{trady.name}</p>
											<p className="">{!!trady.trady_company && trady.trady_company.address}</p>
											<p className="">{!!trady.trady_company && trady.trady_company.email}</p>
											<p className="">Abn: {!!trady.trady_company && trady.trady_company.abn}</p>
										</div>
										<div className="info-agency">
											<p>{self.agency.company_name}</p>
											<p>{self.agency.address}</p>
										</div>
									</div>
									<div className="detail-quote">
										<div className="detail-quote">
											{!!invoice &&
												<object width="100%" height="400" type="application/pdf" data={invoice}>
													<iframe width="100%" height="400" src={`http://docs.google.com/gview?url=${invoice}&embedded=true`} className="scroll-custom" width='100%' height='400' />
												</object>}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
