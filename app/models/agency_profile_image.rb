class AgencyProfileImage < ApplicationRecord
  include AgencyProfileImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :agency
  validates :image, presence: { message: "Please pick a file." }
  attr_accessor :agency_profile_image_id
end 