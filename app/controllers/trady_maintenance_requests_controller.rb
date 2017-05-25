class TradyMaintenanceRequestsController < ApplicationController

  def index
    # if params[:sort_by_date] == "Newest to Oldest"
    #   @maintenance_requests = current_user.trady.maintenance_requests.order('created_at DESC').paginate(:page => params[:page], :per_page => 3)
    # else
    #   @maintenance_requests = current_user.trady.maintenance_requests.order('created_at ASC').paginate(:page => params[:page], :per_page => 3)
    # end



    # @m = MaintenanceRequest.with_tradies_quote_request(current_user.trady.id)

    trady_id = current_user.trady.id

    @maintenance_requests =TradyMaintenanceRequest.find_trady_maintenance_requests(trady_id).paginate(:page => params[:page], :per_page => 3)

    @quote_request = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Quote Requests")
    @awaiting_quote_approvals = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Awaiting Quote Approval")
    @appointments_required = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Appointments Required")
    @awaiting_appointment_confirmation = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Awaiting Appointment Confirmation")
    @alternate_appointment_requested = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Alternate Appointment Requested")
    @job_booked = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Job Booked")
    @awaiting_payment = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Awaiting Payment")
    @job_complete = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Job Complete")
    @declined_quotes = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Declined Quotes")


  end

  def show

    @current_user = current_user
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    
    if @maintenance_request.agency_admin == nil
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent 
    else
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 

    
    

    
    @signed_in_trady = current_user.trady
    if @maintenance_request.trady != nil
      @assigned_trady = @maintenance_request.trady 
      
    end
    
    @invoice_pdf_files = @maintenance_request.trady_delivered_uploaded_invoices(@maintenance_request.id,@signed_in_trady.id).as_json(:include => {:trady => {:include => :trady_company}})
    @quotes = @maintenance_request.quotes.where(trady_id:@signed_in_trady,:delivery_status=>true, :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}, :conversation=>{:include=>:messages}})
    #@quote = @quotes.where(:status=>"Approved").first if !nil
    

    
   
    @invoices = Invoice.where(trady_id:@signed_in_trady.id,:delivery_status=>true, :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => :trady_company}, :invoice_items => {}})


    

    # if @quote
    #   @quote_id = @quote.id
    # else
    #   @quote_id = ''
    # end 

    @message = Message.new
    
    @trady = @signed_in_trady
     
    if @maintenance_request.maintenance_request_image != nil
      @gallery = @maintenance_request.maintenance_request_image.images
    end 

    if  @maintenance_request.property.landlord != nil
      @landlord = Landlord.find_by(id:@maintenance_request.property.landlord.id)
    end 
    
    if @maintenance_request.agency_admin != nil
      if @maintenance_request.agency_admin.agency.tradies !=nil
        @all_tradies = @maintenance_request.agency_admin.agency.tradies.where(:skill=>@maintenance_request.service_type) 
      else 
        @all_tradies= []
      end 
    end 

    if @maintenance_request.agent != nil
      if @maintenance_request.agent.agency.tradies !=nil 
        @all_tradies = @maintenance_request.agent.agency.tradies.where(:skill=>@maintenance_request.service_type) 
      else 
        @all_tradies= []
      end
    end 
    

    if @maintenance_request.conversations.where(:conversation_type=>"Tenant").present?
      @tenants_conversation = @maintenance_request.conversations.where(:conversation_type=>"Tenant").first.messages
    end 

    if @maintenance_request.conversations.where(:conversation_type=>"Landlord").present?
      @landlords_conversation = @maintenance_request.conversations.where(:conversation_type=>"Landlord").first.messages
    end 

    respond_to do |format|

      format.json { render :json=>{:gallery=>@gallery.as_json, :quotes=> @quotes, :landlord=> @landlord, :all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency, :property=>@maintenance_request.property, :agent=>@agent ,:assigned_trady=>@assigned_trady, :signed_in_trady=>@signed_in_trady, :invoice_pdf_files=>@invoice_pdf_files, :invoices=>@invoices}}
      format.html{render :show}
    end 

 
  end
end 