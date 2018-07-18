class TradyCompany < ApplicationRecord
  before_save :format_company_name, :format_trading_name, :format_address, :format_mailing_address
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
  attr_accessor :perform_professional_license_validation
  attr_accessor :trady_company_id 
  attr_accessor :quote_id 
  attr_accessor :invoice_type
  attr_accessor :pdf_file_id 
  attr_accessor :ledger_id
  attr_accessor :system_plan
  attr_accessor :quote_type

  validates_presence_of :company_name,:trading_name,:address,:mailing_address ,:mobile_number,:email, :landline
  
  #
  before_save :format_account_name, if: :perform_account_name_validation
  
  validates_uniqueness_of :email, if: :perform_uniqueness_validation_of_company_email
  validates_presence_of :abn, if: :perform_abn_validation
  validates_presence_of :account_name, if: :perform_account_name_validation
  validates_presence_of :bsb_number, if: :perform_bsb_number_validation
  validates_presence_of :bank_account_number, if: :perform_bank_account_validation
  validates_presence_of :profession_license_number, if: :perform_professional_license_validation
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates :mobile_number, :numericality => true, :length => {:minimum=>10, :maximum => 10 }
  validates :landline, :numericality => true, :length => {:minimum=>10, :maximum => 10 }

  def capitalize_company_name
    self.company_name.split.map(&:capitalize).join(' ')
  end

  def capitalize_account_name
    self.account_name.split.map(&:capitalize).join(' ')
  end

  def capitalize_address
    self.address.split.map(&:capitalize).join(' ')
  end

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
    elsif system_plan == "Invoice"
      self.perform_abn_validation = true
      self.perform_account_name_validation = true
      self.perform_bsb_number_validation = true
      self.perform_bank_account_validation = true
      self.perform_bank_account_validation = true
      self.perform_professional_license_validation = true
    end 
  end

  def format_company_name
    self.company_name = self.company_name.split.map(&:capitalize).join(' ')
  end

  def format_trading_name
    self.trading_name = self.trading_name.split.map(&:capitalize).join(' ')
  end

  def format_address
    self.address = self.address.split.map(&:capitalize).join(' ')
  end

  def format_mailing_address
    self.mailing_address = self.mailing_address.split.map(&:capitalize).join(' ')
  end

  def format_account_name
    self.account_name = self.account_name.split.map(&:capitalize).join(' ')
  end

  def format_mobile_number
    self.mobile_phone.unpack("A4A3A3A*").join' '
  end

  def format_landline
    self.landline.unpack("A2A4A4A*").join' '
  end

  def format_abn
    self.abn.unpack("A3A3A3A*").join' '
  end

  def format_bsb_number
    self.bsb_number.unpack("A3A3A3A*").join' '
  end

  def format_bank_account_number
    self.bank_account_number.unpack("A3A3A3A*").join' '
  end



end 