class QuoteImages < ApplicationRecord
  include QuoteImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :quote

  #attr_accessor :quote_image_id
end 