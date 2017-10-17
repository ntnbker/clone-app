class AgencyAdminProfileImage < ApplicationRecord
  include AgencyAdminProfileImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :agency_admin
end