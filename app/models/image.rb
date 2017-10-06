class Image < ApplicationRecord
  include ImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  
  belongs_to :maintenance_request, inverse_of: :images
  accepts_nested_attributes_for :maintenance_request, allow_destroy: true
end 