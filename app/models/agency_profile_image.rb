class AgencyProfileImage < ApplicationRecord
  include AgencyProfileImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :agency

  attr_accessor :agency_profile_image_id
end 