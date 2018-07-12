
  class AllInvoice 

    def self.all_outstanding_invoices
       customers_profiles_trady_ids  = CustomerProfile.where.not(trady_id:nil, customer_id:nil).pluck(:trady_id)
    # what we want to do here is we want to create the receipts with the amount that has to be paid for each trady 
    # if the payment is successful then we need to mark those invoices as paid in the system. We will do this by making a method under receipts that makes 
    # that receipt that got paid change its invoices to "Paid". If it fails then we change it. We keep that receipt to try again later. We need to keep track of which receipts have been paid
    # for. 


      
        outstanding_system_invoices = Invoice.where(active:true,delivery_status:true, mapp_payment_status:"Outstanding", trady_id:customers_profiles_trady_ids).where.not(service_fee:nil).to_a
        outstanding_uploaded_invoices = UploadedInvoice.where(active:true, delivery_status:true, mapp_payment_status:"Outstanding", trady_id:customers_profiles_trady_ids).where.not(service_fee:nil).to_a
        
        all_outstanding_invoices = outstanding_system_invoices + outstanding_uploaded_invoices
      

      return all_outstanding_invoices
    end

    def self.all_paid_invoices
         customers_profiles_trady_ids  = CustomerProfile.where.not(trady_id:nil, customer_id:nil).pluck(:trady_id)
    # what we want to do here is we want to create the receipts with the amount that has to be paid for each trady 
    # if the payment is successful then we need to mark those invoices as paid in the system. We will do this by making a method under receipts that makes 
    # that receipt that got paid change its invoices to "Paid". If it fails then we change it. We keep that receipt to try again later. We need to keep track of which receipts have been paid
    # for. 


      
        paid_system_invoices = Invoice.where(active:true,delivery_status:true, mapp_payment_status:"Paid", trady_id:customers_profiles_trady_ids).where.not(service_fee:nil).to_a
        paid_uploaded_invoices = UploadedInvoice.where(active:true, delivery_status:true, mapp_payment_status:"Paid", trady_id:customers_profiles_trady_ids).where.not(service_fee:nil).to_a
        
        all_paid_invoices = paid_system_invoices + paid_uploaded_invoices
      

      return all_paid_invoices
    end


    def self.outstanding_revenue
      all_outstanding_invoices = AllInvoice.all_outstanding_invoices
      sum = 0
      all_outstanding_invoices.each do |invoice|
         
        sum = sum + invoice.service_fee 

      end 
      return sum
    end



    def self.paid_revenue
      all_paid_invoices = AllInvoice.all_paid_invoices
      sum = 0
      all_paid_invoices.each do |invoice|
         
        sum = sum + invoice.service_fee 

      end 
      return sum
    end

    def self.current_and_future_revenue
      grand_total = AllInvoice.paid_revenue + AllInvoice.outstanding_revenue
    end

  end 
