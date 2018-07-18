require "render_anywhere"
 
class InvoicePdf
  include RenderAnywhere
 
  def initialize(invoice)
    @invoice = invoice
  end
 
  def to_pdf
    kit = PDFKit.new(as_html, size: [1024, 1449],
     margins: {
         top: 72, 
         bottom: 72,
         left: 72,
         right: 72
     },)
    kit.to_file("#{Rails.root}/tmp/invoice.pdf")
  end
 
  def filename
    "Invoice #{invoice.id}.pdf"
  end
 
  private
 
    attr_reader :invoice
 
    def as_html
      render template: "pdf_invoices/pdf", layout: "invoice_pdf", locals: { invoice: invoice }
    end
end