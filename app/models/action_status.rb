
class ActionStatus < ApplicationRecord
  searchkick word_start: [:agent_status]
  belongs_to :maintenance_request, touch: true
  belongs_to :agent
  belongs_to :agency_admin
  belongs_to :landlord
  belongs_to :tenant
  belongs_to :trady

  after_save :reindex_after_save
  after_update :reindex_after_update

  def reindex_after_save
    self.reindex
  end

  def reindex_after_update
    self.reindex
  end


end 