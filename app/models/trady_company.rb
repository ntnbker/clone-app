class TradyCompany < ApplicationRecord
  
  has_many :tradies
  validates_presence_of :company_name,:trading_name,:abn,:address,:mailing_address ,:mobile_number,:email
  
  #, if: :perform_uniqueness_validation_of_company_email
  
  validates_uniqueness_of :email


  attr_accessor :maintenance_request_id
  attr_accessor :trady_id
  attr_accessor :trady_company_id

  attr_accessor :perform_uniqueness_validation_of_company_email
  

end 