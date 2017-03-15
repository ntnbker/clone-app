class InvoicePayment < ApplicationRecord
  belongs_to :invoice


  def check_payment(money_paid)
    if money_paid.to_f < self.invoice.amount 
      self.invoice.update_attribute(:payment_status, "Partial Payment Completed")
    elsif money_paid == self.invoice.amount
      self.invoice.update_attribute(:payment_status, "Full Payment Complete")
    elsif money_paid > self.invoice.amount
      self.invoice.update_attribute(:payment_status, "Over Paid Check Invoice Details")
    end 
  end


  def self.invoice_payment_total(invoice_id)
    invoice_payment_array = InvoicePayment.where(invoice_id:invoice_id)
      array = []

      invoice_payment_array.each do |payment|
        array.push(payment.amount_paid)

      end
    sum = 0
    array.each { |a| sum+=a }

    invoice_payment_array.first.invoice.update_attribute(:amount_paid, sum)
    return sum
  end




end