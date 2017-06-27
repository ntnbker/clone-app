class AgencyAdminMaintenanceRequestsController < ApplicationController
  
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action(only:[:show]) {belongs_to_agency_admin}
  before_action :require_login, only:[:show,:index]

  before_action(only:[:show,:index]) {allow("AgencyAdmin")}
  

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
    @tenants = @maintenance_request.tenants
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
    @worker_order_appointments = @maintenance_request.appointments.where(appointment_type:"Work Order Appointment").as_json(:include=>{:comments=>{}})
    @quote_appointments = @maintenance_request.appointments.where(appointment_type:"Quote Appointment").as_json(:include=>{:comments=>{}})
    @landlord_appointments = @maintenance_request.appointments.where(appointment_type:"Landlord Appointment").as_json(:include=>{:comments=>{}})
    
    @all_agents = @agency.agents
    @all_agency_admins = @agency.agency_admins
    
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
      format.json { render :json=>{:gallery=>@gallery, :quotes=> @quotes, :landlord=> @landlord, :all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency,:property=>@maintenance_request.property, agent:@current_user.agency_admin, invoices:@invoices, invoice_pdf_files:@invoice_pdf_files, tradies_with_quote_requests:@quote_request_trady_list, logs:@logs, all_agents:@all_agents, all_agency_admins:@all_agency_admins,work_order_appointments:@work_order_appointments,quote_appointments:@quote_appointments,:landlord_appointments=>@landlord_appointments,:tenants=>@tenants}}
      format.html{render :show}
    end 

 

  end

  # def update
    
  # end
  
  private

  # def require_agency_admin
  #   if current_user.has_role("AgencyAdmin") && current_user.logged_in_as("AgencyAdmin")
  #     #do nothing 

  #   else
  #     flash[:notice] = "You are not authorized to see that page"
  #     redirect_to root_path
  #   end 
  
  # end

  def email_auto_login(id)
    email_params= params[:user_id]
    
    if email_params
      user = User.find_by(id:id)
      if user  
        if current_user
          if current_user.logged_in_as("Tenant") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("Trady") || current_user.logged_in_as("Agent")
            answer = true
          else
            answer = false
          end 
          
          if current_user  && answer && user.has_role("AgencyAdmin")
            logout
            auto_login(user)
            user.current_role.update_attribute(:role, "AgencyAdmin")
          elsif current_user == nil
            auto_login(user)
            user.current_role.update_attribute(:role, "AgencyAdmin")
          elsif current_user && current_user.logged_in_as("AgencyAdmin")
              #do nothing
          end 
        else 
          
            auto_login(user)
            user.current_role.update_attribute(:role, "AgencyAdmin")
           
        end 
      else 
        flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
        redirect_to root_path
      end
    else
      #do nothing
    end 

  end

  def belongs_to_agency_admin
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    
    if current_user.agency_admin.id == maintenance_request.agency_admin_id
      #do nothing
    else 
      flash[:notice] = "Sorry you can't see that."
      redirect_to root_path
    end 
  end



end 