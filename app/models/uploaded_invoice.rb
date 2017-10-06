class UploadedInvoice < ApplicationRecord
  # mount_uploaders :invoices, InvoiceUploader
  include InvoicePdfUploader::Attachment.new(:pdf) 
  belongs_to :maintenance_request
  belongs_to :trady


end 