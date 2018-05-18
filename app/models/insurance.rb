class Insurance < ApplicationRecord
  include InsuranceImageUploader::Attachment.new(:image) # adds an `image` virtual attribute

  validates :image, presence: true 
  belongs_to :trady

end 