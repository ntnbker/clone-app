class UploadedInvoice < ApplicationRecord
  # mount_uploaders :invoices, InvoiceUploader
  include InvoicePdfUploader::Attachment.new(:pdf) 
  belongs_to :maintenance_request
  belongs_to :trady

  validates :total_invoice_amount, presence: true, numericality: true

end 