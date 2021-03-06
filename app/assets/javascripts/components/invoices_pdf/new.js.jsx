var AddInvoicePDF = React.createClass({
	getInitialState: function () {
		const {
			trady_company_id, maintenance_request_id, trady_id, pdf_file, edit_trady_company_path
		} = this.props;
		const total_invoice_amount = (pdf_file || {}).total_invoice_amount || 0;
		return {
			file: {},
			total_invoice_amount,
			due_date: (pdf_file || {}).due_date || this.nowDate(),
			backPath: edit_trady_company_path,
      service_fee: (pdf_file || {}).service_fee || 0,
      agency_fee: total_invoice_amount * AGENCY_SERVICE_FEE
		};
	},

	_handleChangeFile: function (e) {
		const self = this;
		this.setState({errorFile: ''});
		const files = e.target.files;
		let file = files[0];

		var filename = files[0];
		const options = {
			extension: filename.name.match(/(\.\w+)?$/)[0],
			_: Date.now(),
			filename: filename.name,
		}

		// start upload file into S3
		$.getJSON('/upload_invoice_pdf/cache/presign', options, function (result) {
			var fd = new FormData();
			$.each(result.fields, function (key, value) {
				fd.append(key, value);
			});
			fd.append('file', file);
			$.ajax({
				type: 'POST',
				url: result['url'],
				enctype: 'multipart/form-data',
				processData: false,
				contentType: false,
				data: fd,
				xhr: function () {
					var xhr = new window.XMLHttpRequest();
					xhr.upload.addEventListener("loadstart", function (evt) {
						if ($('.progress').length == 0) {
							$('<div class="progress" style="width: 80%;"><div class="progress-bar" style="width: ' + 0 + '%"></div></div>').insertAfter("#input-file");
						}

						if (/Edge/i.test(navigator.userAgent)) {
							var percentComplete = 0;
							var loop = 0;
							let inn = setInterval(() => {
								percentComplete += Math.ceil((51200 * ++loop) / file.size * 100);
								if (percentComplete >= 100) {
									clearInterval(inn);
								} else {
									$('#title-upload').html('Uploading ' + percentComplete + '%');
									$('.progress .progress-bar').css('width', percentComplete + '%');
								}
							}, 500)
						}
					})
					xhr.upload.addEventListener("progress", function (evt) {
						if (evt.loaded > 0 && evt.total > 0) {
							var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
							var progress = $('.progress');
							if (progress.length !== 0) {
								$('.progress .progress-bar').css('width', percentComplete + '%');
							}
							$('#title-upload').html('Uploading ' + percentComplete + '%');
						}
					}, false);
					return xhr;
				},
				success: function (res) {
					setTimeout(function () {
						$('#title-upload').html('<i class="fa fa-upload" /> Choose PDF to upload');
						$('.progress').remove();
					}, 0);
					var filePDF = {
						id: result.fields.key.match(/cache\/(.+)/)[1],
						storage: 'cache',
						metadata: {
							size: file.size,
							filename: file.name.match(/[^\/\\]*$/)[0],
							mime_type: file.type
						}
					};
					self.updateFile(filePDF);
				}
			});
		});
	},

	updateFile: function (filePDF) {
		this.setState({
			file: filePDF
		});
	},

	removeFile: function (index) {
		$('#input-file').val('');
		this.setState({
			file: {},
			error: '',
		});
	},

  changeTotalAmount({target: {value}}) {
    if (value === '') {
      return this.setState({
        errorAmount: '',
        total_invoice_amount: value,
        service_fee: 0,
        agency_fee: 0,
      })
    }
    if (!AMOUNT_REGEX.test(value)) {
      return this.setState({
        errorAmount: '',
        total_invoice_amount: value,
      })
    }

    const SERVICE_FEE = value > OVER_AMOUNT
                        ? OVER_SERVICE_FEE
                        : UNDER_SERVICE_FEE;

    this.setState({
      errorAmount: '',
      service_fee: (value * SERVICE_FEE).toFixed(2) || 0,
      agency_fee: (value * AGENCY_SERVICE_FEE).toFixed(2) || 0,
      total_invoice_amount: value,
    })
  },

  nowDate: function(nextDay = 1) {
    var oneDay = 24 * 60 * 60 * 1000;
    var now    = new Date(Date.now() + oneDay*nextDay);
    var month  = now.getMonth() + 1;
    var date   = now.getDate();
    var year   = now.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
  },

	handelSubmit: function (e) {
		e.preventDefault();
		const self = this;

		if (!this.state.file.id) {
			return this.setState({ errorFile: ['Please upload a file'] });
		}

		var FD = new FormData(document.getElementById('new_uploaded_invoice'));
		FD.append('uploaded_invoice[pdf]', JSON.stringify(this.state.file));

		var props = this.props;
		$.ajax({
			type: 'POST',
			url: '/uploaded_invoices',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-CSRF-Token', props.authenticity_token);
			},
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: FD,
			success: function (res) {
				if (res.error) {
					self.setState({
						errorFile: res.error.pdf,
						errorAmount: res.error.total_invoice_amount,
						errorDate: res.error.due_date
					});
				}
			},
			error: function (err) {

			}
		});
		return false;
	},

	render: function () {
		const { maintenance_request_id, trady_id, quote_id, trady_company, trady_company_id, trady } = this.props;
		const {
			errorFile, errorAmount, errorDate, backPath, total_invoice_amount, service_fee, agency_fee
		} = this.state;

		return (
			<div className="container invoice-form">
				<h5 className="text-center">
					Please Attach Your Invoice(s)!!
				</h5>
				<div>
					<form className="new_uploaded_invoice" role="form" id="new_uploaded_invoice" encType="multipart/form-data" acceptCharset="UTF-8" onSubmit={(e) => this.handelSubmit(e)}>
						{
							this.state.file.id ?
								<div className="file-pdf">
									<span>
										{this.state.file.metadata.filename}
									</span>
									<i className="fa fa-file" />
									<span onClick={this.removeFile}>Remove</span>
								</div>
								:
								<div className="browse-wrap">
									<div className="title" id="title-upload">
										<i className="fa fa-upload" />
										Upload PDF file or Image file
									</div>
									<input
										type="file"
										id="input-file"
										className="upload inputfile"
										accept="image/jpeg, image/png, application/pdf"
										onChange={(e) => this._handleChangeFile(e)}
									/>
								</div>
						}
    				<p id="errorbox" className="error">{errorFile ? errorFile[0] : ''}</p>
    				<div className="text-center">
	            <p> Total Invoice Amount: </p>
							<input
	              type="text"
	              className={'text-center ' + (errorAmount ? 'border_on_error' : '')}
	              placeholder="Total Invoice Amount"
	              value={total_invoice_amount}
	              ref={amount => this.amount = amount}
	              onChange={this.changeTotalAmount}
	              id="uploaded_invoice_maintenance_request_id"
	              name="uploaded_invoice[total_invoice_amount]"
	            />
            </div>
    				<p id="errorbox" className="error">{errorAmount ? errorAmount[0] : ''}</p>
	          <div className="text-center">
	            <p> Invoice Due On: </p>
	            <input
	              type="date"
	              defaultValue={this.state.due_date}
	              ref={e => this.date = e}
	              onChange={() => this.setState({errorDate: ''})}
	              name="uploaded_invoice[due_date]"
	              className={`text-center ${errorDate ? 'border_on_error' : ''}`}
	            />
	          </div>
		        <p id="errorbox" className="error">{errorDate || ''}</p>
	          { trady && trady.jfmo_participant &&
	            <div className="text-center">
	              <p> Service Fee ($): </p>
	              <input
	                type="text"
	                readOnly="readonly"
	                value={this.state.service_fee}
	                ref={e => this.date = e}
	                name="uploaded_invoice[service_fee]"
	                className="text-center"
	              />
	            </div>
	          }
	          { trady && trady.jfmo_participant &&
	            <div className="service-fee">
	              <div className="alert alert-success">
	              	<span className="service-fee-title text-center">You Receive:</span>
	              	<span className="text-center">${(total_invoice_amount - service_fee).toFixed(2)}</span>
	              </div>
	            </div>
	          }
	          { trady && trady.jfmo_participant &&
	            <div className="service-fee">
	              <div className="alert alert-message">
	              	<span className="service-fee-title text-center">Agency Receives:</span>
	              	<span className="text-center">${(agency_fee - 0).toFixed(2)}</span>
	              </div>
	            </div>
	          }
	          { trady && trady.jfmo_participant &&
	            <div className="service-fee">
	              <div className="alert alert-message">
	              	<span className="service-fee-title text-center">Maintenance App Receives:</span>
	              	<span className="text-center">${(service_fee - agency_fee).toFixed(2)}</span>
	              </div>
	            </div>
	          }
						<input
							type="hidden"
							defaultValue={maintenance_request_id}
							id="uploaded_invoice_maintenance_request_id"
							name="uploaded_invoice[maintenance_request_id]"
						/>
						<input
							type="hidden"
							defaultValue={trady_id}
							id="uploaded_invoice_trady_id"
							name="uploaded_invoice[trady_id]"
						/>
						<input
							type="hidden"
							defaultValue={quote_id}
							id="uploaded_invoice_quote_id"
							name="uploaded_invoice[quote_id]"
						/>
						<input
							type="hidden"
							value="pdf_file"
							id="uploaded_invoice_invoice_type"
							name="uploaded_invoice[invoice_type]"
						/>
						<input
							value="Invoice"
							type="hidden"
							name="uploaded_invoice[system_plan]"
							id="uploaded_invoice_system_plan"
						/>
						<div className="invoice-button">
							<button
								className="button-back"
								type="button"
								onClick={() => this.backButton.click()}
							>
								<a href={backPath} ref={(elem) => this.backButton = elem} />
								Back
							</button>
							<button
								type="submit"
								className="button-submit"
							>
								Attach Invoice
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
});
