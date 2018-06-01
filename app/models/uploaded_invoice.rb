class UploadedInvoice < ApplicationRecord
  # mount_uploaders :invoices, InvoiceUploader
  include InvoicePdfUploader::Attachment.new(:pdf) 
  belongs_to :maintenance_request
  belongs_to :trady
  belongs_to :receipts
  validates :total_invoice_amount, presence: true, numericality: true

  validates_presence_of :due_date
  validate :future_date
    

  def future_date
    if self.due_date == nil
      
    else
      errors.add(:due_date, "can't be in the past") if
        self.due_date <= DateTime.now
    end 
  end

end 