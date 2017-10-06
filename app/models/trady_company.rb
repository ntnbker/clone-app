class TradyCompany < ApplicationRecord
  
  has_many :tradies
  validates_presence_of :company_name,:trading_name,:address,:mailing_address ,:mobile_number,:email, :account_name, :bsb_number, :bank_account_number
  
  #
  
  validates_uniqueness_of :email, if: :perform_uniqueness_validation_of_company_email
  validates_presence_of :abn, if: :perform_trady_company_banking_validation
  validates_presence_of :account_name, if: :perform_trady_company_banking_validation
  validates_presence_of :bsb_number, if: :perform_trady_company_banking_validation
  validates_presence_of :bank_account_number, if: :perform_trady_company_banking_validation

  attr_accessor :maintenance_request_id
  attr_accessor :trady_id
  attr_accessor :trady_company_id
  attr_accessor :work_flow

  attr_accessor :perform_uniqueness_validation_of_company_email
  attr_accessor :perform_trady_company_banking_validation
  attr_accessor :trady_company_id 
  attr_accessor :quote_id 
  attr_accessor :invoice_type
  attr_accessor :pdf_file_id 
  attr_accessor :ledger_id
  attr_accessor :system_plan
  attr_accessor :quote_type

  def capitalize_company_name
    self.company_name.split.map(&:capitalize).join(' ')
  end

  def capitalize_trading_name
    self.trading_name.split.map(&:capitalize).join(' ')
  end

end 