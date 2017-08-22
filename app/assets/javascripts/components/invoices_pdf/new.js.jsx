var AddInvoicePDF = React.createClass({
	getInitialState: function() {
		return {
			file: {}
		};	
	},

	_handleChangeFile: function(e) {
		const self = this;
		const files = e.target.files;
		let file = files[0];

		var filename = files[0];
		const options = {
			extension: filename.name.match(/(\.\w+)?$/)[0],
			_: Date.now(),
		}

		// start upload file into S3
		$.getJSON('/upload_invoice_pdf/cache/presign', options, function(result) {
			var fd = new FormData();
			$.each(result.fields, function(key, value) {
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
					xhr.upload.addEventListener("progress", function (evt) {
						if(evt.loaded > 0 && evt.total > 0) {
							var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
							var progress = $('.progress');
							if(progress.length == 0) {
								$('<div class="progress" style="width: 80%;"><div class="progress-bar" style="width: ' +  percentComplete + '%"></div></div>').insertAfter("#input-file");
							}else {
								$('.progress .progress-bar').css('width', percentComplete + '%');
							}
							$('#title-upload').html('Uploading ' + percentComplete + '%');
						}
					}, false);
					return xhr;
				},
				success: function(res) {
					setTimeout(function() {
						$('#title-upload').html('<i class="fa fa-upload" /> Choose a file to upload');
						$('.progress').remove();
					}, 0);
					var filePDF = {
						id: result.fields.key.match(/cache\/(.+)/)[1],
						storage: 'cache',
						metadata: {
							size:  file.size,
							filename:  file.name.match(/[^\/\\]*$/)[0],
							mime_type: file.type
						}
					};
					self.updateFile(filePDF);
				}
			});
		});
	},

	updateFile: function(filePDF) {
		this.setState({
			file: filePDF
		});
	},

	removeFile: function(index) {
		$('#input-file').val('');
		this.setState({
			file: {}
		});
	},

	handelSubmit: function(e) {
		e.preventDefault();

		var FD = new FormData(document.getElementById('new_uploaded_invoice'));
		FD.append('uploaded_invoice[pdf]', JSON.stringify(this.state.file));

		var props = this.props;
		$.ajax({
			type: 'POST',
			url: '/uploaded_invoices',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', props.authenticity_token);
			},
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: FD,
			success: function(res){

			},
			error: function(err) {

			}
		});
		return false;
	},

	render: function() {
		const {maintenance_request_id, trady_id, quote_id, trady_company, trady_company_id} = this.props;
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
									<i className="fa fa-file" />
									<span onClick={this.removeFile}>Remove</span>
								</div>
								:
								<div className="browse-wrap">
									<div className="title" id="title-upload">
										<i className="fa fa-upload" />
										Choose image to upload
									</div>
									<input 
										type="file"
										id="input-file"
										className="upload inputfile" 
										accept="application/pdf"
										onChange={(e)=>this._handleChangeFile(e)}
									/>
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
						<div className="text-center">
							<a 
								className="btn btn-default btn-back m-r-lg" 
								href={"/trady_companies/" + trady_company_id + "/edit?invoice_type=pdf_file&maintenance_request_id=" + maintenance_request_id +"&system_plan=Invoice&trady_company_id=" + trady_company_id +"&trady_id=" + trady_id}
							>
								Back
							</a>
							<button
								type="submit"
								className="button-primary green" 
							>
								Attach PDF
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
});
