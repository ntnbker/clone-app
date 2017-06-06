class Image < ApplicationRecord
  include ImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  
  belongs_to :maintenance_request, inverse_of: :image
end 