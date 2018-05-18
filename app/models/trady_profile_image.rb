class TradyProfileImage < ApplicationRecord
  include TradyProfileImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :trady
  validates :image, presence: { message: "Please pick a file." }
  attr_accessor :trady_profile_image_id
end 