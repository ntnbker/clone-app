require "render_anywhere"
 
class InvoicePdf
  include RenderAnywhere
 
  def initialize(invoice, current_user)
    @invoice = invoice
    @current_user = current_user
  end
 
  def to_pdf
    kit = PDFKit.new(as_html, page_size: 'A4', print_media_type:true, dpi: 400)
    kit.to_file("#{Rails.root}/tmp/invoice.pdf")
  end
 
  def filename
    "Invoice #{invoice.id}.pdf"
  end
 
  private
 
    attr_reader :invoice
 
    def as_html
      render template: "download_pdfs/show", layout: "invoice_pdf", locals: { invoice: invoice, current_user:@current_user }
    end
end