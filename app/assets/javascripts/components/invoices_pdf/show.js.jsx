var ModalViewPDFInvoice = React.createClass({
	getInitialState: function() {
		return {
			index: null,
			invoice: this.props.invoice_pdf_file
		};
	},

	printInvoice: function() {
		window.print();
  },
  
  download(data, strFileName, strMimeType) {
    var self = window, // this script is only for browsers anyway...
      _this = this,
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


    if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
      fileName = url.split("/").pop().split("?")[0];
      url = url.slice(0, url.lastIndexOf('/') + 1) + fileName + '?_version=1';
      anchor.href = url; // assign href prop to temp anchor
      if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        _this.setState({isDownloading: true});
        var ajax=new XMLHttpRequest();
        ajax.open( "GET", url, true);
        ajax.responseType = 'blob';
        ajax.onload= function(e){ 
          _this.download(e.target.response, fileName, defaultMime);
          _this.setState({isDownloading: false});
        };
        setTimeout(function(){ ajax.send();}, 500); // allows setting custom ajax headers using the return:
        return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else{//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}, /* end download() */

	render: function() {
		const self = this.props;
		const {invoice, isDownloading} = this.state;
		const {pdf_url, trady} = invoice;
		const {role} = this.props;

		const isPdf = /store\/\w+\.pdf/.test(pdf_url);
    const isShowVoidModal = invoice.paid === false && invoice.active === false;
    const isShowVoidButton = invoice.paid === false && invoice.active !== false;
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
									<div className="detail-quote position-rl">
                    {isShowVoidModal &&
                      <div className="text-center position-ab reason-void">
                        <div className="reason-header">INVOICE VOID DO NOT PAY</div>
                        <div className="reason-title">Reason for voiding:</div>
                        <div className="reason-content">{invoice.void_reason}</div>
                      </div>
                    }
                    <div className="download-button">
                      <button type="button" onClick={() => this.download(pdf_url)}>
                        <a 
                          id="download_target"
                          className="display-none"
                        />
                        {!isDownloading && <i className="fa fa-download"></i>} Download{isDownloading && 'ing ...'}
                      </button>
                    </div>
										{!!pdf_url &&
											<div id="Iframe-Master-CC-and-Rs" className="set-margin set-padding set-border set-box-shadow center-block-horiz">
                        <div
                          className="responsive-wrapper responsive-wrapper-wxh-572x612"
                          style={{height: isPdf ? '350px' : "100%"}}
                        >
                          <object
                            width="100%"
                            height={isPdf ? '350px' : "100%"}
                            data={pdf_url}
                          >
                            <iframe
                              width="100%"
                              height={isPdf ? '350px' : "100%"}
                              src={`https://docs.google.com/gview?url=${pdf_url.replace(/(\..*)\?.*/g, '$1&embedded=true')}`}
                              className="scroll-custom" 
                            />
                          </object>
                        </div>
                      </div>
										}
									</div>
									<div className="text-center">
										Invoice Total: {invoice.total_invoice_amount || 0}
									</div>
					        { role === 'Trady' && trady.jfmo_participant && invoice.service_fee &&
                    <div className="text-center">
                      Service Fee: {invoice.service_fee}
                    </div>
                  }
					        <div className="text-center">
					          Invoice Due On: {invoice.due_date}
					        </div>
								</div>
							</div>
						</div>
            	<div className="modal-body dontprint">
                {
                  isShowVoidButton &&
                    <button type="button" className="btn btn-decline" onClick={(item) => self.viewInvoice('voidInvoice', invoice)}>
                      Void Invoice
                    </button>
                }
                { !isPdf && <ButtonPrint printQuote={this.printInvoice} /> }
              </div>
          </div>
				</div>
			</div>
		);
	}
});

var SubmitInvoicePDF = React.createClass({
	getInitialState() {
		const {customer, trady} = this.props;

		return {
			customer, trady
		}
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

  renderModal: function() {
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

  submitInvoicePdf(e) {
    const {customer, trady} = this.state;
    const {send_pdf_invoice_path} = this.props;
    if (customer && !customer.customer_id && trady.jfmo_participant) {
      return this.openModal('payment');
    }

    const self = this;

    $.ajax({
      type: 'POST',
      url: send_pdf_invoice_path,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', self.props.authenticity_token);
      },
      success: function(res){
        if (res && res.errors) {
          return callback(res.errors);
        }
      },
      error: function(err) {
        self.setState({
          isModal: true,
          modal: 'message',
          notification: {
            title: "Submit Invoice PDF",
            content: err.responseText,
            bgClass: "bg-error",
          }
        })
      }
    })
  },

	render() {
		const {pdf_url, pdf, edit_uploaded_invoice_path, pdf_path} = this.props;
    const {trady, customer} = this.state;

		const isPdf = /store\/\w+\.pdf/.test(pdf_url);

		return (
			<div className="container well invoice-form" id="submit-invoice">
			  {!isPdf
          ? <div className="modal-body">
              <Carousel gallery={[pdf_url]} />
            </div>
          : <div id="Iframe-Master-CC-and-Rs" className="set-margin set-padding set-border set-box-shadow center-block-horiz">
            <div
              className="responsive-wrapper responsive-wrapper-wxh-572x612"
              style={{height: isPdf ? '500px' : "100%"}}
            >
              <object
                width="100%"
                height={isPdf ? '500px' : "100%"}
                data={pdf_url}
              >
                <iframe
                  width="100%"
                  height={isPdf ? '500px' : "100%"}
                  src={pdf_path}
                  className="scroll-custom"
                />
              </object>
            </div>
          </div>
        }
			  <div className="text-center m-b-lg">
			    Invoice Total: {pdf.total_invoice_amount}
			  </div>
        <div className="text-center m-b-lg">
          Invoice Due On : {pdf.due_date}
        </div>
			  { trady.jfmo_participant &&
          <div className="text-center m-b-lg">
            Service Fee: {pdf.service_fee}
          </div>
        }
        { trady.jfmo_participant && 
          <div className="alert alert-message">
            Please Note: Every invoice submitted will have an associated service fee. If a mistake has been made on an invoice and it was submitted please void that invoice and submit a new invoice to avoid double service fee payment.
          </div>
        }
			  <div className="text-center m-b-lg qf-button">
		      <button
		      	type="button"
			      className="button-back"
						onClick={() => location.href = edit_uploaded_invoice_path}
			    >
			      Back
		      </button>
			    <button
			    	type="button"
			    	className="button-type button-submit green right"
			    	onClick={this.submitInvoicePdf}
			    >
			      Submit
			    </button>
			  </div>
			  { this.renderModal() }
		  </div>
		)
	}
})
