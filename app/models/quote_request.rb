class QuoteRequest < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  has_many :quotes, -> { where delivery_status: true }
  has_one :conversation


  def self.tradies_with_quote_requests(maintenance_request_id)
    
    # QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
    
    trady_ids = self.where(:maintenance_request_id=>maintenance_request_id).pluck(:trady_id)

    tradies = Trady.where(id:trady_ids)
    return tradies.as_json
  end

  def self.submitted_quote
    self.quotes.where(delivery_status: true).distinct
  end


  def self.expire(maintenance_request_id)
    quote_requests = self.where(maintenance_request_id:maintenance_request_id).includes(maintenance_request:[:trady])

    #assigned_trady = maintenance_request.trady
    if quote_requests.count >= 1 
      quote_requests.each do |quote_request|
        assigned_trady = quote_request.maintenance_request.trady
        
        if quote_request.quote_id == nil && quote_request.trady_id != assigned_trady.id
          quote_request.update_attribute(:expired, true)
         
        end 

      end 
    else
      #do nothing

    end


  end





end 