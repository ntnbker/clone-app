class License < ApplicationRecord
  include LicenseImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :trady
  validates :image, presence: { message: "Please pick a file." }
end 