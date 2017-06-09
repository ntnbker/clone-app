class AgencyAdminMaintenanceRequestsController < ApplicationController
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  def index
    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = current_user.agency_admin.maintenance_requests.order('created_at DESC')
    else
      @maintenance_requests = current_user.agency_admin.maintenance_requests.order('created_at ASC')
    end

    @page = params[:page]
    @sort_by_date = params[:sort_by_date]
    @new_maintenance_requests_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Initiate Maintenance Request")
    @quotes_received_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Received Awaiting Approval")
    @new_invoice_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "New Invoice")
    @pending_payment_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Pending Payment")
    
    @awaiting_owner_initiation_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Owner Initiation")
    @awaiting_owner_instruction_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Owner Instruction")
    @quote_requested_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Requested")
    @awaiting_trady_initiation_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Tradie Initiation")
    @awaiting_trady_quote_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Quote")
    @awaiting_quote_approval_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Received Awaiting Approval")
    @trady_organise_appointment_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Approved Tradie To Organise Appointment")
    @trady_confirm_appointment_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Tradie To Confirm Appointment")
    @tenant_confirm_appointment_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Tenant To Confirm Appointment")
    @landlord_confirm_appointment_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Landlord To Confirm Appointment")
    @maintenance_scheduled_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Maintenance Scheduled - Awaiting Invoice")  
  
    

    maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    respond_to do |format|
      format.json {render json:maintenance_requests_json}
      format.html
    end 


  end

  def show
    @current_user = current_user
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    # @tenants = @maintenance_request.tenants
    @quotes = @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}, :conversation=>{:include=>:messages}})

    @agency = @current_user.agency_admin.agency

    @quote_request_trady_list = QuoteRequest.tradies_with_quote_requests(@maintenance_request.id)

    @email_quote_id = params[:email_quote_id]
    @logs = @maintenance_request.logs
    # @pdf_files = @maintenance_request.delivered_uploaded_invoices
    @invoice_pdf_files = @maintenance_request.delivered_uploaded_invoices.as_json(:include => {:trady => {:include => :trady_company}})
    @invoices = @maintenance_request.delivered_invoices.as_json(:include => {:trady => {:include => :trady_company}, :invoice_items => {}})
    
    @message = Message.new
    
    @tradie = Trady.new
    @tenant_and_landlord_appointments = Appointment.tenant_and_landlord_appointments(@maintenance_request.id)
    @tenant_and_trady_appointments = Appointment.tenant_and_trady_appointments(@maintenance_request_id)
     
    if @maintenance_request.images != nil
      @gallery = @maintenance_request.get_image_urls
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
      format.json { render :json=>{:gallery=>@gallery, :quotes=> @quotes, :landlord=> @landlord, :all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency,:property=>@maintenance_request.property, agent:@current_user.agency_admin, invoices:@invoices, invoice_pdf_files:@invoice_pdf_files, tradies_with_quote_requests:@quote_request_trady_list, logs:@logs}}
      format.html{render :show}
    end 

 

  end

  def update
    
  end
  
  private

  def email_auto_login(id)
      if current_user == nil
        user = User.find_by(id:id)
        auto_login(user)
      end 
  end



end 