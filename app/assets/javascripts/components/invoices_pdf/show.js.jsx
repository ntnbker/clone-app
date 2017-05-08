var ModalViewPDFInvoice = React.createClass({
	getInitialState: function() {
		return {
			index: null,
			invoice: this.props.invoice_pdf_file,
			invoices: this.props.invoice_pdf_files,
		};	
	},

	switchSlider: function(key, index) {
		let position = 0;
		let invoice = "";
		if(key == "prev") {
			position = index - 1 < 0 ? this.state.invoices.length - 1 : index-1;
		}else {
			position = index + 1 > this.state.invoices.length - 1 ? 0 : index+1;
		}

		invoice = this.state.invoices[position];
		this.setState({
			index: position,
			invoice: invoice
		});
	},

	componentWillMount: function() {
		this.filterQuote(this.state.invoices);
	},

	componentWillReceiveProps: function(nextProps) {
		this.filterQuote(nextProps.invoice_pdf_files);
		this.setState({
			invoices: nextProps.invoice_pdf_files
		});
	},

	filterQuote: function(invoices) {
		for(var i = 0; i < invoices.length; i++) {
			var item = invoices[i];
			if(item.id == this.state.invoice.id) {
				this.setState({
					index: i+1,
					invoice: item
				});
				break;
			}
		}
	},

	render: function() {
		const self = this.props;
		const invoice = this.state.invoice;
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
											<p>{invoice.trady.name}</p>
											<p className="">{!!invoice.trady.trady_company && invoice.trady.trady_company.address}</p>
											<p className="">{!!invoice.trady.trady_company && invoice.trady.trady_company.email}</p>
											<p className="">Abn: {!!invoice.trady.trady_company && invoice.trady.trady_company.abn}</p>
										</div>
										<div className="info-agency">
											<p>{self.agency.company_name}</p>
											<p>{self.agency.address}</p>
										</div>
									</div>
									<div className="detail-quote">
										<div className="detail-quote">
											<embed src="/assets/pdf-sample2.pdf" className="scroll-custom" width='100%' height='400px'/>
										</div>
									</div>
								</div>
								<div className="button-slider">
									<button className="btn-prev" onClick={(key, index) => this.switchSlider('prev', this.state.index)}>
										<i className="fa fa-angle-left" />
									</button>
									<button className="btn-next" onClick={(key, index) => this.switchSlider('next', this.state.index)}>
										<i className="fa fa-angle-right" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});