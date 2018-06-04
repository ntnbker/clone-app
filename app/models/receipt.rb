class Receipt < ApplicationRecord
  has_many :invoices
  has_many :uploaded_invoices
  belongs_to :trady



  def all_invoices
    system_invoices = self.invoices.to_a
    uploaded_invoices = self.uploaded_invoices.to_a
    all_invoices = system_invoices + uploaded_invoices
    return  all_invoices
  end

  def mark_as_paid
    invoices = self.all_invoices

    invoices.each do |invoice|
      invoice.update_attribute(:mapp_payment_status, "Paid")
    end 
  end

end 