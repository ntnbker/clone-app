class Insurance < ApplicationRecord
  include InsuranceImageUploader::Attachment.new(:image) # adds an `image` virtual attribute

  validates :image, presence: { message: "Please pick a file." }
  belongs_to :trady

end 