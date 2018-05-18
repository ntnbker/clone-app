class License < ApplicationRecord
  include LicenseImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :trady
  validates :image, presence: { message: "Please pick a file." }, if: :perform_presence_validation


  attr_accessor :perform_presence_validation
  attr_accessor :maintenance_request_id
end 