class Invoice < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :invoices

  belongs_to :quote
  belongs_to :trady
  belongs_to :ledger, inverse_of: :invoices
  has_many :invoice_items, inverse_of: :invoice
  belongs_to :receipt
  accepts_nested_attributes_for :invoice_items, allow_destroy: true
  validates_associated :invoice_items
  validates_presence_of :due_date
  validates_presence_of :trady_invoice_reference, :length => {:minimum=>3, :maximum => 10 }
  validate :future_date
    

  def future_date
    if self.due_date == nil
      
    else
      errors.add(:due_date, "can't be in the past") if
        self.due_date <= DateTime.now
    end 
  end






  has_many :invoice_payments
  before_save :create_invoice_number
  #attr_accessor :quote_id

  def calculate_invoice_items_totals
    items_amount = []
    sum = 0
    self.invoice_items.each do |item|

      if item.hours == nil
        items_amount.push(item.amount)
      else
        i = item.amount * item.hours
        item.update_attribute(:total_per_hour, i)
        items_amount.push(i)
      end


    end

    items_amount.each { |a| sum+=a }
    return sum
  end

  def save_total
    total = self.calculate_invoice_items_totals
    self.update_attribute(:amount, total)
    self.calculate_tax
    
  end


  def due_on
    self.due_date.strftime("%A %B %d %Y")
  end


  def calculate_tax
    invoices_amount = []

    if self.tax == nil || self.tax == false
        invoice_total_amount = self.amount
        #invoice_total_amount = self.amount/1.10
        #tax_amount = invoice_total_amount * 0.10
        # invoices_amount.push(invoice_total_amount)
        self.update_attribute(:amount, invoice_total_amount)
        self.update_attribute(:gst_amount, 0.00)

      return invoice_total_amount
    else  
        
        invoice_total_amount = self.amount/1.10
        tax_amount = invoice_total_amount * 0.10
        self.update_attribute(:gst_amount, tax_amount.round(3))
        # total = self.amount
        # invoices_amount.push(total.round(3))
        return invoice_total_amount
    end

  end

  def set_ledger_id
    self.update_attribute(:ledger_id, self.maintenance_request.ledger.id)
  end

  def recalculate_ledger
    ledger = self.ledger
    ledger.calculate_grand_total
    ledger.save_grand_total
    # total = self.amount + self.ledger.grand_total
    # self.ledger.update_attribute(:grand_total, total)
  end

  def create_invoice_number
    self.invoice_number = "I" + SecureRandom.hex(5)
  end



  # def calculate_total(items_hash={})
  #   array = []

  #   items_hash.each do |key, value|

  #     if value[:hours] == ""
  #       total = value[:amount].to_f * 1
  #     else
  #       total = value[:amount].to_f * value[:hours].to_f
  #     end


  #     array.push(total)
  #   end

  #   sum = 0
 
  #   array.each { |a| sum+=a }

  #     if tax == false
  #       total = sum
  #     elsif tax == true

  #       total = sum * 1.10
  #     end

  #   return total
  # end


  def check_payment(money_paid)
    if money_paid.to_f < amount
      self.update_attribute(:payment_status, "Partial Payment Completed")
    elsif money_paid == amount
      self.update_attribute(:payment_status, "Full Payment Complete")
    end
  end


end