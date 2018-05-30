class AgencyAdminProfileImage < ApplicationRecord
  include AgencyAdminProfileImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :agency_admin
  attr_accessor :agency_admin_profile_image_id
  validates :image, presence: { message: "Please pick a file." }
end