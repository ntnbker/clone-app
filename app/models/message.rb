class Message < ApplicationRecord
  belongs_to :messageable, polymorphic: true

end 