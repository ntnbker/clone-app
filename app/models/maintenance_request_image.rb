class MaintenanceRequestImage < ApplicationRecord
  mount_uploaders :images, ImageUploader
  belongs_to :maintenance_request, inverse_of: :maintenance_request_image

end 