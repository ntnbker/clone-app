class AgentMaintenanceRequestsController < ApplicationController 
  before_action(only: [:show,:index]) { email_auto_login(params[:user_id]) }
  
  before_action :require_login, only:[:show,:index]
  before_action(only:[:show,:index]) {allow("Agent")}
  before_action(only:[:show]) {belong_to_agent}
  def index
    if params[:sort_by_date] == "Oldest to Newest"
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(current_user, "Initiate Maintenance Request").order('created_at ASC')
    else
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(current_user, "Initiate Maintenance Request").order('created_at DESC')
    end
    

    @page = params[:page]
    @sort_by_date = params[:sort_by_date]
    @new_maintenance_requests_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Initiate Maintenance Request")
    @quotes_received_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Received")
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
    @maintenance_scheduled_with_landlord_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Maintenance Scheduled With Landlord")  
    @deferred_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Defer")  
    @archived_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Archive")
    @jobs_completed = MaintenanceRequest.find_maintenance_requests_total(current_user, "Jobs Completed")  
    @cancelled_work_order_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Cancelled Work Order")    
    @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    respond_to do |format|
      format.json {render json:@maintenance_requests_json}
      format.html
    end 








  end

  def show
    @current_user = current_user
    @instruction = @current_user.instruction
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @tenants = @maintenance_request.tenants
    
    @quotes = @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}, :conversation=>{:include=>:messages}})
    @agency = @current_user.agent.agency
    @quote_request_trady_list = QuoteRequest.tradies_with_quote_requests(@maintenance_request.id)

    @email_quote_id = params[:email_quote_id]
    @email_invoice_id = params[:invoice_quote_id]
    @open_message = params[:message]
    @open_quote_message = params[:quote_message_id]
    @pdf_files = @maintenance_request.delivered_uploaded_invoices.as_json(:include => {:trady => {:include => :trady_company}},methods: :pdf_url)
    @invoices = @maintenance_request.delivered_invoices.as_json(:include => {:trady => {:include => :trady_company}, :invoice_items => {}})
    @logs = @maintenance_request.logs

    @message = Message.new
    @services = Service.all
    @work_order_appointments = @maintenance_request.appointments.where(appointment_type:"Work Order Appointment").order('created_at DESC').as_json(:include=>{:comments=>{}})
    @quote_appointments = @maintenance_request.appointments.where(appointment_type:"Quote Appointment").order('created_at DESC').as_json(:include=>{:comments=>{}})
    @landlord_appointments = @maintenance_request.appointments.where(appointment_type:"Landlord Appointment").order('created_at DESC').as_json(:include=>{:comments=>{}})
    @status = @maintenance_request.action_status
    @tradie = Trady.new
    @assigned_trady = @maintenance_request.trady
    @hired_trady = @assigned_trady.as_json({:include => :trady_company})
    if @assigned_trady
      @invoice_pdf_urls = @maintenance_request.get_pdf_url(@maintenance_request.id, @assigned_trady.id)
    end
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
        @all_tradies = @maintenance_request.agency_admin.agency.skilled_tradies_required(@maintenance_request.service_type)  
      else 
        @all_tradies= []
      end 
    end 

    if @maintenance_request.agent != nil
      if @maintenance_request.agent.agency.tradies !=nil 
        @all_tradies = @maintenance_request.agent.agency.skilled_tradies_required(@maintenance_request.service_type)  
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

    if @maintenance_request.trady_id
      #messages for assigned trady
      if @maintenance_request.conversations.where(:conversation_type=>"Trady_Agent").present?
        @trady_agent_conversation = @maintenance_request.conversations.where(:conversation_type=>"Trady_Agent").first.messages
      end
    end  

    respond_to do |format|

      format.json { render :json=>{hired_trady: @hired_trady,:gallery=>@gallery,:status=>@status ,:instruction=>@instruction,:quotes=> @quotes, :landlord=> @landlord,:services=>@services,:assigned_trady=>@assigned_trady, :all_tradies=> @all_tradies,:trady_agent_conversation=>@trady_agent_conversation ,:tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency,:property=>@maintenance_request.property, :agent=>@current_user.agent, :invoices=> @invoices, :pdf_files=>@pdf_files,:pdf_urls=> @invoice_pdf_urls, tradies_with_quote_requests:@quote_request_trady_list, logs:@logs, all_agents:@all_agents, all_agency_admins:@all_agency_admins, work_order_appointments:@work_order_appointments,quote_appointments:@quote_appointments,:landlord_appointments=>@landlord_appointments,:tenants=>@tenants,time_and_access:@maintenance_request.availability_and_access}}
      format.html{render :show}
    end 

  
  end

  private

  def email_auto_login(id)
   email_params= params[:user_id]
    
    if email_params
      user = User.find_by(id:id)
      if user  
        if current_user
          if current_user.logged_in_as("Tenant") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("Trady") || current_user.logged_in_as("AgencyAdmin")
            answer = true
          else
            answer = false
          end 



          if current_user  && answer && user.has_role("Agent")
            logout
            auto_login(user)
            user.current_role.update_attribute(:role, "Agent")
          elsif current_user == nil
            auto_login(user)
            user.current_role.update_attribute(:role, "Agent")
          elsif current_user && current_user.logged_in_as("Agent")
              #do nothing
          end 
        else
          auto_login(user)
          user.current_role.update_attribute(:role, "Agent")
        end
      else 
        flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
        redirect_to root_path
      end
    else
      #do nothing
    end   
  end

  def belong_to_agent
    
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    if current_user
      if current_user.agent.id == maintenance_request.agent_id
        #do nothing
      else 
        flash[:notice] = "Sorry you can't see that."
        redirect_to root_path
      end 
    end 
  
  end

end 