class QuoteImage < ApplicationRecord
  include QuoteImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :quote

  attr_accessor :quote_request_id
  attr_accessor :trady_id
  attr_accessor :maintenance_request_id
  attr_accessor :role
end 