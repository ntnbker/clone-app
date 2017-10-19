class AgentProfileImage < ApplicationRecord
  include AgentImageUploader::Attachment.new(:image) # adds an `image` virtual attribute
  belongs_to :agent


  attr_accessor :agent_profile_image_id
end 