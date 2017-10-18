class TradyCompanyProfileImage < ApplicationRecord
   include TradyCompanyProfileImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :trady_company
end 