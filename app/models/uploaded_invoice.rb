class UploadedInvoice < ApplicationRecord
  # mount_uploaders :invoices, InvoiceUploader
  include InvoicePdfUploader::Attachment.new(:pdf) 
  belongs_to :maintenance_request
  belongs_to :trady
  belongs_to :receipt
  validates :total_invoice_amount, presence: true, numericality: true

  validates_presence_of :due_date
  validate :future_date
  validate :positive_total_invoice_amount

  def future_date
    if self.due_date == nil
      
    else
      errors.add(:due_date, "can't be in the past") if
        self.due_date <= DateTime.now
    end 
  end

  def positive_total_invoice_amount
    if self.total_invoice_amount == nil || self.total_invoice_amount <= 0 
      errors.add(:total_invoice_amount, "Must be a number greater or equal to 1") 
    else
        
    end
     
  end

end 