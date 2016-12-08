class Query < ApplicationRecord
belongs_to :maintenance_request
validates_presence_of :user_role, :tradie, :address

end 