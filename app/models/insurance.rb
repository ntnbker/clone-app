class Insurance < ApplicationRecord
  include InsuranceImageUploader::Attachment.new(:image) # adds an `image` virtual attribute

  belongs_to :trady

end 