var AddInvoicePDF = React.createClass({
	getInitialState: function () {
		const {
			trady_company_id, maintenance_request_id, trady_id, pdf_file
		} = this.props;

		const backPath = `/trady_companies/${trady_company_id}/edit?invoice_type=pdf_file&maintenance_request_id=${maintenance_request_id}&system_plan=Invoice&trady_company_id=${trady_company_id}&trady_id=${trady_id}`;

		return {
			file: {},
			total_invoice_amount: (pdf_file || {}).total_invoice_amount || '',
			due_date: (pdf_file || {}).due_date || this.nowDate(),
			backPath,
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

  nowDate: function(nextDay = 1) {
    var oneDay = 24 * 60 * 60 * 1000;
    var now    = new Date(Date.now() + oneDay*nextDay);
    var month  = now.getMonth() + 1;
    var date   = now.getDate();
    var year   = now.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
  },

  isClose: function() {
    if(this.state.isModal == true) {
      this.setState({
        isModal: false,
        modal: "",
      });
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("modal-open");
    var div = document.getElementsByClassName('modal-backdrop in')[0];
    if(div){
      div.parentNode.removeChild(div);
    }
  },

  openModal(modal) {
    this.setState({
      isModal: true,
      modal,
    })
  },

  renderModal() {
    if (this.state.isModal) {
      var body = document.getElementsByTagName('body')[0];
      body.className += " modal-open";
      var div = document.getElementsByClassName('modal-backdrop in');

      if(div.length === 0) {
        div = document.createElement('div')
        div.className  = "modal-backdrop in";
        body.appendChild(div);
      }

      switch (this.state.modal) {
        case 'payment':
          return (
            <ModalAddPayment
              close={this.isClose}
              submit={this.submitPayment}
            />
          )

        case 'message':
          return (
            <ModalNotification
              close={this.isClose}
              bgClass={this.state.notification.bgClass}
              title={this.state.notification.title}
              content={this.state.notification.content}
            />
          )

        default:
        return '';
      }
    }
  },

  submitPayment(params, callback) {
    const self = this;
    params.trady_id               = this.props.trady_id;
    params.trady_company_id       = this.props.trady_company_id;
    params.maintenance_request_id = this.props.maintenance_request_id;

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
        self.setState({
          isModal: true,
          modal: 'message',
          customer: res.customer,
          notification: {
            title: "Credit or debit card",
            content: res.message,
            bgClass: "bg-success",
          }
        })
      },
      error: function(err) {
        self.setState({
          isModal: true,
          modal: 'message',
          notification: {
            title: "Credit or debit card",
            content: err.responseText,
            bgClass: "bg-error",
          }
        })
      }
    })
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
		const { maintenance_request_id, trady_id, quote_id, trady_company, trady_company_id } = this.props;
		const { errorFile, errorAmount, errorDate, backPath } = this.state;

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
										Choose PDF to upload
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
						<input
							type="text"
							className={'text-center ' + (errorAmount ? 'border_on_error' : '')}
							placeholder="Total Invoice Amount"
							defaultValue={this.state.file ? this.state.total_invoice_amount : ''}
							ref={amount => this.amount = amount}
							onChange={() => this.setState({errorAmount: ''})}
							id="uploaded_invoice_maintenance_request_id"
							name="uploaded_invoice[total_invoice_amount]"
						/>
    				<p id="errorbox" className="error">{errorAmount ? errorAmount[0] : ''}</p>
	          <div className="text-center">
	            <p> Invoice Due On : </p>
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
						<div className="text-center">
							<button
								className="btn btn-default btn-back m-r-lg"
								onClick={() => this.backButton.click()}
							>
								<a href={backPath} ref={(elem) => this.backButton = elem} />
								Back
							</button>
							<button
								type="submit"
								className="button-primary green"
							>
								Attach PDF
							</button>
						</div>
					</form>
				</div>
        { this.renderModal() }
			</div>
		);
	}
});
