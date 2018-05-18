class Insurance < ApplicationRecord
  include InsuranceImageUploader::Attachment.new(:image) # adds an `image` virtual attribute

  validates :image, presence: { message: "Please pick a file." }, if: :perform_presence_validation
  belongs_to :trady


  attr_accessor :perform_presence_validation
  attr_accessor :maintenance_request_id
end 