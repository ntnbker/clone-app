class TradyCompany < ApplicationRecord
  
  has_many :tradies
  has_one :trady_company_profile_image

  attr_accessor :maintenance_request_id
  attr_accessor :trady_id
  attr_accessor :trady_company_id
  attr_accessor :work_flow

  attr_accessor :perform_uniqueness_validation_of_company_email
  attr_accessor :perform_abn_validation
  attr_accessor :perform_account_name_validation
  attr_accessor :perform_bsb_number_validation
  attr_accessor :perform_bank_account_validation
  attr_accessor :trady_company_id 
  attr_accessor :quote_id 
  attr_accessor :invoice_type
  attr_accessor :pdf_file_id 
  attr_accessor :ledger_id
  attr_accessor :system_plan
  attr_accessor :quote_type

  validates_presence_of :company_name,:trading_name,:address,:mailing_address ,:mobile_number,:email
  
  #
  
  validates_uniqueness_of :email, if: :perform_uniqueness_validation_of_company_email
  validates_presence_of :abn, if: :perform_abn_validation
  validates_presence_of :account_name, if: :perform_account_name_validation
  validates_presence_of :bsb_number, if: :perform_bsb_number_validation
  validates_presence_of :bank_account_number, if: :perform_bank_account_validation
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates :mobile_number, :numericality => true, :length => {:minimum=>10, :maximum => 10 }
  

  def capitalize_company_name
    self.company_name.split.map(&:capitalize).join(' ')
  end

  def capitalize_trading_name
    self.trading_name.split.map(&:capitalize).join(' ')
  end

  def perform_bank_validation(system_plan)
    if system_plan == "Quote"
      self.perform_abn_validation = false
      self.perform_account_name_validation = false
      self.perform_bsb_number_validation = false
      self.perform_bank_account_validation = false
    elsif system_plan = "Invoice"
      self.perform_abn_validation = true
      self.perform_account_name_validation = true
      self.perform_bsb_number_validation = true
      self.perform_bank_account_validation = true
    end 
  end

end 