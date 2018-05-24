class License < ApplicationRecord
  include LicenseImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :trady
  validates :image, presence: { message: "Please pick a file." }
  validates :license_number, presence: true
  validates :license_type, presence: true


  #attr_accessor :perform_presence_validation
  attr_accessor :maintenance_request_id
end 