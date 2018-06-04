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

end 