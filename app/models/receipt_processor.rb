class ReceiptProcessor

  def self.prepare_receipts
  customers_profiles_trady_ids  = CustomerProfile.where.not(trady_id:nil, customer_id:nil).pluck(:trady_id)
  # what we want to do here is we want to create the receipts with the amount that has to be paid for each trady 
  # if the payment is successful then we need to mark those invoices as paid in the system. We will do this by making a method under receipts that makes 
  # that receipt that got paid change its invoices to "Paid". If it fails then we change it. We keep that receipt to try again later. We need to keep track of which receipts have been paid
  # for. 


  customers_profiles_trady_ids.each do |trady_id|
    system_invoices = Invoice.where(active:true,delivery_status:true, mapp_payment_status:"Outstanding", trady_id:trady_id).includes(trady:[:customer_profile]).to_a
    uploaded_invoices = UploadedInvoice.where(active:true, delivery_status:true, mapp_payment_status:"Outstanding", trady_id:trady_id).includes(trady:[:customer_profile]).to_a
    

    all_invoices = system_invoices + uploaded_invoices
    
    if !all_invoices.empty?
      prepared_invoices = []
      all_invoices.each do |invoice|
        if Date.today > invoice.due_date 
          prepared_invoices.push(invoice)
        end
      end
      if !prepared_invoices.empty?
        sum_total = 0
        receipt = Receipt.create(trady_id:trady_id)
        prepared_invoices.each do |invoice|
          #check to see if invoice already belongs to receipt that should be processed. 
          if invoice.receipt_id.nil?
            invoice.update_attribute(:receipt_id, receipt.id)
            sum_total+= invoice.service_fee
          end 
        end 
        receipt.update_attribute(:total, sum_total)
      end 
    end 

  end 




  # system_invoices = Invoice.where(active:true,delivery_status:true, mapp_payment_status:"Outstanding", trady_id:customers_profiles_trady_ids).includes(trady:[:customer_profile]).to_a
  # uploaded_invoices = UploadedInvoice.where(active:true, delivery_status:true, mapp_payment_status:"Outstanding", trady_id:customers_profiles_trady_ids).includes(trady:[:customer_profile]).to_a
  
  # all_invoices = system_invoices + uploaded_invoices


  # #it should grab all the invoices that are ready to be processed 
  # prepared_invoices = []
    
  #   all_invoices.each do |invoice|
  #     if Date.today > invoice.due_date + 30.days
  #       prepared_invoices.push(invoice)
  #       # customer_id = invoice.trady.customer_profile.customer_id
  #       # amount_in_pennies = invoice.service_fee.to_f * 100
  #       # amount  = amount_in_pennies.to_i
  #       #this is where the stripe stuff was
         
  #     else
  #       #do nothing
  #     end
  #   end

    

  end 



end 