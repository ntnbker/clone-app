class QuoteRequest < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  has_many :quotes



  def self.tradies_with_quote_requests(maintenance_request_id)
    
    # QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
    
    trady_ids = self.where(:maintenance_request_id=>maintenance_request_id).pluck(:trady_id)

    tradies = Trady.where(id:trady_ids)
    return tradies.as_json
  end






end 