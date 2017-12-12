
class ActionStatus < ApplicationRecord
  
  belongs_to :maintenance_request, touch: true
  belongs_to :agent
  belongs_to :agency_admin
  belongs_to :landlord
  belongs_to :tenant
  belongs_to :trady


end 