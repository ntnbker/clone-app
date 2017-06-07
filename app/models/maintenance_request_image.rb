class MaintenanceRequestImage < ApplicationRecord
  # mount_uploaders :images, ImageUploader
  include ImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :maintenance_request, inverse_of: :maintenance_request_image
  
end 