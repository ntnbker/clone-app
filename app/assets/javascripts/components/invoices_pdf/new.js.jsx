var AddInvoicePDF = React.createClass({
	getInitialState: function() {
		return {
			files: []
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
		$.getJSON('/images/cache/presign', options, function(result) {
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
				success: function() {
					setTimeout(function() {
						$('#title-upload').html('<i class="fa fa-upload" /> Choose a file to upload');
						$('.progress').remove();
					}, 500);
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
		const {files} = this.state;
		files.push(filePDF);
		this.setState({
			files: files
		});
	},

	removeFile: function(index) {
		let {files} = this.state;
		files.splice(index, 1);
		this.setState({
			files: files
		});
	},

	handelSubmit: function(e) {
		e.preventDefault();
		var XHR = new XMLHttpRequest();
		var FD = new FormData(document.getElementById('new_uploaded_invoice'));
		this.state.files.map((file, index) => {
			var idx = index + 1;
			FD.append('uploaded_invoice[invoices][' + idx + ']', JSON.stringify(file));
		});

		XHR.open('POST', '/uploaded_invoices');
		XHR.setRequestHeader('Accept', 'text/html');
		XHR.setRequestHeader('X-CSRF-Token', this.props.authenticity_token);
		XHR.upload.addEventListener('loadstart', function(e) {
			$("#spinner").css('display', 'flex');
		});
		XHR.onreadystatechange = function() {
			if (XHR.readyState==4) {
				$("#spinner").css('display', 'none');
			}
		}
		XHR.send(FD);
		return false;
	},

	render: function() {
		const {maintenance_request_id, trady_id, quote_id} = this.props;
		return (
			<div className="container invoice-form">
				<h5>
					Please Attach Your Invoice(s)!!
				</h5>
				<div>
					<form className="new_uploaded_invoice" role="form" id="new_uploaded_invoice" encType="multipart/form-data" acceptCharset="UTF-8" onSubmit={(e) => this.handelSubmit(e)}>
						<input 
							type="file" 
							multiple="multiple" 
							accept="application/pdf"
							id="uploaded_invoice_invoices"
							onChange={(e)=>this._handleChangeFile(e)}
						/>
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
						<button
							type="submit"
							className="button-primary green" 
						>
							Attach PDF
						</button>
						<a 
							className="button-primary green option-button" 
							href="/trady_companies/1/edit?invoice_type=pdf_file&amp;maintenance_request_id=1&amp;system_plan=Invoice&amp;trady_company_id=1&amp;trady_id=1"
						>
							Back
						</a>
					</form>
				</div>
			</div>
		);
	}
});