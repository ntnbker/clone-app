class UploadedInvoice < ApplicationRecord
  mount_uploaders :invoices, InvoiceUploader
  belongs_to :maintenance_request



end 