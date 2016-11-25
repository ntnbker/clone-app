class Role <ActiveRecord::Base
  belongs_to :user
  belongs_to :roleable, polymorphic: true


end 