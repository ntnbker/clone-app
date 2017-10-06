class UploadedQuote < ApplicationRecord
  # mount_uploaders :quotes, QuoteUploader
  belongs_to :maintenance_request
  belongs_to :trady
end 