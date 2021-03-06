class AgentMaintenanceRequestsController < ApplicationController 
  #before_action(only: [:show,:index]) { email_auto_login(params[:user_id]) }
  before_action :email_redirect, only: [:show,:index]
  before_action :require_login, only:[:show,:index]
  before_action :require_role
  before_action(only:[:show,:index]) {allow("Agent")}
  before_action(only:[:show]) {belong_to_agent}

  # caches_action :index, unless: -> { request.format.json? }
  # caches_action :show

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
    #end
    

    @page = params[:page]
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

    @archived_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Archive")
    @jobs_completed = MaintenanceRequest.find_maintenance_requests_total(current_user, "Jobs Completed")  
    @cancelled_work_order_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Cancelled Work Order")    
    @send_work_order_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Send Work Order")    

    # @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    # respond_to do |format|
    #   format.json {render json:@maintenance_requests_json}
    #   format.html
    # end 


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
    # @quote_requests = @maintenance_request.quote_requests.includes(trady:[:customer_profile,:trady_profile_image, :trady_company=> :trady_company_profile_image], quotes:[:quote_items, :quote_image],:conversation=> :messages).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:customer_profile=>{},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}},:conversation=>{:include=>{:messages=>{:include=>{:user=>{:include=>{:trady=>{}, :agent=>{},:agency_admin=>{} }}}}}} ,:quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}} }})
    if @maintenance_request.trady
      @assigned_trady = @maintenance_request.trady
      @assigned_trady_id = @assigned_trady.id
    else
      @assigned_trady = nil
      @assigned_trady_id = nil 
    end 
    @quote_requests = QuoteRequest.where(maintenance_request_id:@maintenance_request.id).where_exists(:quotes).or(QuoteRequest.where(maintenance_request_id:@maintenance_request.id).where_exists(:conversation)).or(QuoteRequest.where(maintenance_request_id:@maintenance_request.id,trady_id:@assigned_trady_id)).distinct.includes(trady:[:customer_profile, :trady_profile_image, :trady_company=> :trady_company_profile_image], quotes:[:quote_items, :quote_image],:conversation=>:messages).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:customer_profile=>{},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}},:conversation=>{:include=>{:messages=>{:include=>{:user=>{:include=>{:trady=>{}, :agent=>{},:agency_admin=>{} }}}}}} ,:quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}} }})
      
    #@quotes = @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quote_items => {}, :conversation=>{:include=>:messages}})
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
    @quote_appointments = @maintenance_request.appointments.where(appointment_type:"Quote Appointment").includes(:comments).order('created_at DESC').as_json(:include=>{:comments=>{}})
    @landlord_appointments = @maintenance_request.appointments.where(appointment_type:"Landlord Appointment").order('created_at DESC').as_json(:include=>{:comments=>{}})
    @status = @maintenance_request.action_status
    @tradie = Trady.new
    #@assigned_trady = @maintenance_request.trady
    @hired_trady = @assigned_trady.as_json({:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}})
    if @assigned_trady
      @invoice_pdf_urls = @maintenance_request.get_pdf_url(@maintenance_request.id, @assigned_trady.id)
    end
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


    if @maintenance_request.access_contacts
      @access_contacts = @maintenance_request.access_contacts
    end

    respond_to do |format|

      format.json { render :json=>{:quote_requests=>@quote_requests,agency_admin:@agency_admin ,hired_trady: @hired_trady,:gallery=>@gallery,:status=>@status ,:instruction=>@instruction, :landlord=> @landlord,:services=>@services,:assigned_trady=>@assigned_trady, :all_tradies=> @all_tradies,:trady_agent_conversation=>@trady_agent_conversation ,:tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency,:property=>@maintenance_request.property, :agent=>@current_user.agent, :invoices=> @invoices, :pdf_files=>@pdf_files,:pdf_urls=> @invoice_pdf_urls, tradies_with_quote_requests:@quote_request_trady_list, logs:@logs, all_agents:@all_agents, all_agency_admins:@all_agency_admins, work_order_appointments:@work_order_appointments,quote_appointments:@quote_appointments,:landlord_appointments=>@landlord_appointments,:tenants=>@tenants,time_and_access:@maintenance_request.availability_and_access, access_contacts:@access_contacts}}
      format.html{render :show}
    end 

  
  end

  private

  # def email_redirect
  #   if current_user
  #     #do nothing 
  #   else
  #     flash[:message] = "To view the maintenance request please login. Once logged in you will be directed towards the maintenance request of interest."
  #     redirect_to menu_login_path(user_type:params[:user_type], maintenance_request_id:params[:id], anchor:params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id])
  #   end 
  # end

  # def email_auto_login(id)
  #  email_params= params[:user_id]
    
  #   if email_params
  #     user = User.find_by(id:id)
  #     if user  
  #       if current_user
  #         if current_user.logged_in_as("Tenant") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("Trady") || current_user.logged_in_as("AgencyAdmin")
  #           answer = true
  #         else
  #           answer = false
  #         end 



  #         if current_user  && answer && user.has_role("Agent")
  #           logout
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "Agent")
  #         elsif current_user == nil
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "Agent")
  #         elsif current_user && current_user.logged_in_as("Agent")
  #             #do nothing
  #         end 
  #       else
  #         auto_login(user)
  #         user.current_role.update_attribute(:role, "Agent")
  #       end
  #     else 
  #       flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
  #       redirect_to root_path
  #     end
  #   else
  #     #do nothing
  #   end   
  # end

  def belong_to_agent
    
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    if current_user
      if current_user.agent.id == maintenance_request.agent_id
        #do nothing
      else 
        flash[:danger] = "Sorry you are not allowed to see that. Please log into your own account thank you."
        redirect_to root_path
      end 
    end 
  
  end

end 