class AgentProfileImage < ApplicationRecord
  include AgentImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :agent

end 