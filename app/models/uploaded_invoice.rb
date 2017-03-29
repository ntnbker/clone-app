class UploadedInvoice < ApplicationRecord
  mount_uploaders :invoices, ImageUploader
  belongs_to :maintenance_request


end 