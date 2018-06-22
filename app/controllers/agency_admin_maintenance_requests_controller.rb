class AgencyAdminMaintenanceRequestsController < ApplicationController
  
  # before_action(only: [:show,:index]) { email_auto_login(params[:user_id]) }
  #before_action(only: [:show,:index]) { email_redirect(params[:email]) }
  before_action :email_redirect, only: [:show,:index]
  
  before_action :require_login, only:[:show,:index]
  before_action :require_role, only:[:show,:index]
  before_action(only:[:show,:index]) {allow("AgencyAdmin")}
  before_action(only:[:show]) {belongs_to_agency_admin}

  

  def index
    
    if params[:page] == nil
      params[:page] = 1 
    end 
    
    if params[:maintenance_request_filter] == nil 
      params[:maintenance_request_filter] = 'Initiate Maintenance Request'
    end 

    
    # if params[:sort_by_date] == "Oldest to Newest"
    #   @maintenance_requests = MaintenanceRequest.find_maintenance_requests(current_user, params[:maintenance_request_filter]).order('created_at ASC').paginate(:page => params[:page], :per_page => 10)
    # else
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(current_user, params[:maintenance_request_filter]).paginate(:page => params[:page], :per_page => 10)
    # end

    
    
    @sort_by_date = params[:sort_by_date]
    @new_maintenance_requests_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Initiate Maintenance Request")
    @quotes_received_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Received")
    @new_invoice_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "New Invoice")
    #@pending_payment_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Pending Payment")
    
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
    #@archived_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Archive")  
    @jobs_completed = MaintenanceRequest.find_maintenance_requests_total(current_user, "Jobs Completed")
    @cancelled_work_order_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Cancelled Work Order")    
    @send_work_order_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Send Work Order")    
    

    respond_to do |format|
      format.json {
        render :json => {
          :current_page => @maintenance_requests.current_page,
          :per_page => @maintenance_requests.per_page,
          :total_entries => @maintenance_requests.total_entries,
          :entries => @maintenance_requests.as_json(:include=>{:property=>{}, :action_status=>{}},methods: :get_image_urls)}
        }
      
      format.html
    end


  end

  def show
    @current_user = current_user
    @instruction = @current_user.instruction
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @tenants = @maintenance_request.tenants
    #@quotes = @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quote_items => {}, :conversation=>{:include=>:messages}})
    
    @agency = @current_user.agency_admin.agency
    # @quote_requests = @maintenance_request.quote_requests.includes(trady:[:customer_profile, :trady_profile_image, :trady_company=> :trady_company_profile_image], quotes:[:quote_items, :quote_image],:conversation=>:messages).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:customer_profile=>{},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}},:conversation=>{:include=>{:messages=>{:include=>{:user=>{:include=>{:trady=>{}, :agent=>{},:agency_admin=>{} }}}}}} ,:quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}} }})
    

    @quote_requests = QuoteRequest.where(maintenance_request_id:@maintenance_request.id).where_exists(:quotes).or(QuoteRequest.where(maintenance_request_id:@maintenance_request.id).where_exists(:conversation)).distinct.includes(trady:[:customer_profile, :trady_profile_image, :trady_company=> :trady_company_profile_image], quotes:[:quote_items, :quote_image],:conversation=>:messages).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:customer_profile=>{},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}},:conversation=>{:include=>{:messages=>{:include=>{:user=>{:include=>{:trady=>{}, :agent=>{},:agency_admin=>{} }}}}}} ,:quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}} }})


    @quote_request_trady_list = QuoteRequest.tradies_with_quote_requests(@maintenance_request.id)
    @services = Service.all
    @email_quote_id = params[:email_quote_id]
    @email_invoice_id = params[:invoice_quote_id]
    @logs = @maintenance_request.logs
    @pdf_files = @maintenance_request.delivered_uploaded_invoices.as_json(:include => {:trady => {:include => :trady_company}},methods: :pdf_url)
    @invoice_pdf_files = @maintenance_request.delivered_uploaded_invoices.as_json(:include => {:trady => {:include => :trady_company}})
    @invoices = @maintenance_request.delivered_invoices.as_json(:include => {:trady => {:include => :trady_company}, :invoice_items => {}})
    @open_message = params[:message]
    @open_quote_message = params[:quote_message_id]
    # @message = Message.new
    
    # @tradie = Trady.new
    @assigned_trady = @maintenance_request.trady
    @hired_trady = @assigned_trady.as_json({:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}})
    if @assigned_trady
      @invoice_pdf_urls = @maintenance_request.get_pdf_url(@maintenance_request.id, @assigned_trady.id).as_json
    end 
    @status = @maintenance_request.action_status
    @work_order_appointments = @maintenance_request.appointments.where(appointment_type:"Work Order Appointment").includes(:comments).order('created_at DESC').as_json(:include=>{:comments=>{}})
    @quote_appointments = @maintenance_request.appointments.where(appointment_type:"Quote Appointment").includes(:comments).order('created_at DESC').as_json(:include=>{:comments=>{}})
    @landlord_appointments = @maintenance_request.appointments.where(appointment_type:"Landlord Appointment").includes(:comments).order('created_at DESC').as_json(:include=>{:comments=>{}})

    @all_agents = @agency.agents
    @all_agency_admins = @agency.agency_admins
    
    if @maintenance_request.images 
      @gallery = @maintenance_request.get_image_urls
    end 

    if  @maintenance_request.property.landlord 
      @landlord = Landlord.find_by(id:@maintenance_request.property.landlord.id)
    end 
    
    if @maintenance_request.agency_admin 
      @agency_admin = @maintenance_request.agency_admin
      if @maintenance_request.agency_admin.agency.tradies 
        @all_tradies = @maintenance_request.agency_admin.agency.skilled_tradies_required(@maintenance_request.service_type)  
      else 
        @all_tradies= []
      end 
    end 

    if @maintenance_request.agent 
      @agent = @maintenance_request.agent
      if @maintenance_request.agent.agency.tradies 
        @all_tradies = @maintenance_request.agent.agency.skilled_tradies_required(@maintenance_request.service_type) 
      else 
        @all_tradies= []
      end
    end










    

    if @maintenance_request.conversations.where(:conversation_type=>"Tenant").present?
      @tenants_conversation = @maintenance_request.conversations.where(:conversation_type=>"Tenant").first.messages.as_json(:include => {:user=>{:include =>{:tenant => {}, :agency_admin=>{}, :agent=>{} }}})
    end 

    if @maintenance_request.conversations.where(:conversation_type=>"Landlord").present?
      @landlords_conversation = @maintenance_request.conversations.where(:conversation_type=>"Landlord").first.messages.as_json(:include => {:user=>{:include =>{:landlord => {}, :agency_admin=>{}, :agent=>{} }}})
    end 

    if @maintenance_request.trady_id
      #messages for assigned trady
      if @maintenance_request.conversations.where(:conversation_type=>"Trady_Agent").present?
        @trady_agent_conversation = @maintenance_request.conversations.where(:conversation_type=>"Trady_Agent").first.messages.as_json(:include => {:user=>{:include =>{:trady => {}, :agency_admin=>{}, :agent=>{} }}})
      end
    end 
    

    respond_to do |format|
      format.json { render :json=>{hired_trady:@hired_trady,agency_admin:@agency_admin ,:gallery=>@gallery,:instruction=>@instruction ,:status=>@status, :quote_requests=>@quote_requests,  :landlord=> @landlord,:services=>@services ,:assigned_trady=>@assigned_trady,:all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation,:trady_agent_conversation=>@trady_agent_conversation, :agency=>@agency,:property=>@maintenance_request.property, agent:@current_user.agency_admin, invoices:@invoices, :invoice_pdf_files=>@invoice_pdf_files,pdf_files:@pdf_files, :pdf_urls=> @invoice_pdf_urls, tradies_with_quote_requests:@quote_request_trady_list, logs:@logs, all_agents:@all_agents, all_agency_admins:@all_agency_admins,work_order_appointments:@work_order_appointments,quote_appointments:@quote_appointments,:landlord_appointments=>@landlord_appointments,:tenants=>@tenants, time_and_access:@maintenance_request.availability_and_access}}
      format.html{}
    end 

   

  end

  # def update
    
  # end
  
  private

  def belongs_to_agency_admin
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    if current_user
      if current_user.agency_admin.id == maintenance_request.agency_admin_id
        #do nothing
      else 
        flash[:danger] = "Sorry you are not allowed to see that."
        redirect_to root_path
      end 
    end
  
  end

  

  



end 