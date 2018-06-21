class AgencyAdminMaintenanceRequestsController < ApplicationController
  
  # before_action(only: [:show,:index]) { email_auto_login(params[:user_id]) }
  #before_action(only: [:show,:index]) { email_redirect(params[:email]) }
  before_action :email_redirect, only: [:show,:index]
  
  before_action :require_login, only:[:show,:index]

  before_action(only:[:show,:index]) {allow("AgencyAdmin")}
  before_action(only:[:show]) {belongs_to_agency_admin}

  # caches_action :index
  # # , unless: -> { request.format.json? }
  # caches_action :show

  # # caches_action :index, :cache_path => proc {|c|
  # # { :tag => Post.maximum('updated_at') }
  # # }

  # cache_sweeper :action_status_sweeper

  def index
    
    if params[:page] == nil
      params[:page] = 1 
    end 
    
    if params[:maintenance_request_filter] == nil 
      params[:maintenance_request_filter] = 'Initiate Maintenance Request'
    end 

    
    if params[:sort_by_date] == "Oldest to Newest"
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(current_user, params[:maintenance_request_filter]).order('created_at ASC').paginate(:page => params[:page], :per_page => 10)
    else
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(current_user, params[:maintenance_request_filter]).order('created_at DESC').paginate(:page => params[:page], :per_page => 10)
    end

    
    
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
    
    
    # @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    #@maintenance_requests_json = @maintenance_requests.paginate(:page => params[:page], :per_page => 10)

    # .as_json(:include=>{:property=>{}},methods: :get_image_urls)
    # @posts =  Post.all.paginate(:page => params[:page], :per_page => 4)
    # render :json => @posts.to_json(:methods => [:image_url])


    # respond_to do |format|
    #   # format.json {render json:@maintenance_requests_json.as_json(:include=>{:property=>{}},methods: :get_image_urls)}
      
    # end 

    respond_to do |format|
      format.json {
        render :json => {
          :current_page => @maintenance_requests.current_page,
          :per_page => @maintenance_requests.per_page,
          :total_entries => @maintenance_requests.total_entries,
          :entries => @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)}
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
    

    @quote_requests = @maintenance_request.quote_requests.where_exists(:quotes).or(@maintenance_request.quote_requests.where_exists(:conversation)).distinct.includes(trady:[:customer_profile, :trady_profile_image, :trady_company=> :trady_company_profile_image], quotes:[:quote_items, :quote_image],:conversation=>:messages).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:customer_profile=>{},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}},:conversation=>{:include=>{:messages=>{:include=>{:user=>{:include=>{:trady=>{}, :agent=>{},:agency_admin=>{} }}}}}} ,:quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}} }})


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

  # def email_redirect
    
  #   if params[:user_id]
  #     user = User.find_by(id:params[:user_id])

  #   elsif params[:email]
  #     user = User.find_by(email:params[:email])
  #   else
  #     user = current_user
  #   end 


  #   if user.password_set
  #     if current_user
  #       #do nothing 
  #     else
  #       flash[:message] = "To view the maintenance request please login. Once logged in you will be directed towards the maintenance request of interest."
  #       redirect_to menu_login_path(user_type:params[:user_type], maintenance_request_id:params[:id], anchor:params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id])
  #     end 

  #   else
  #     flash[:message] = "Notice: You must first setup a password before you can access any maintenance request. Thank you for your time."
  #     redirect_to new_password_reset_path
  #   end 


  # end

  # def require_agency_admin
  #   if current_user.has_role("AgencyAdmin") && current_user.logged_in_as("AgencyAdmin")
  #     #do nothing 

  #   else
  #     flash[:notice] = "You are not authorized to see that page"
  #     redirect_to root_path
  #   end 
  
  # end

  # def email_auto_login(id)
  #   email_params= params[:user_id]
    
  #   if email_params
  #     user = User.find_by(id:id)
  #     if user  
  #       if current_user
  #         if current_user.logged_in_as("Tenant") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("Trady") || current_user.logged_in_as("Agent")
  #           answer = true
  #         else
  #           answer = false
  #         end 
          
  #         if current_user  && answer && user.has_role("AgencyAdmin")
  #           logout
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "AgencyAdmin")
  #         elsif current_user == nil
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "AgencyAdmin")
  #         elsif current_user && current_user.logged_in_as("AgencyAdmin")
  #             #do nothing
  #         end 
  #       else 
          
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "AgencyAdmin")
           
  #       end 
  #     else 
  #       flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
  #       redirect_to root_path
  #     end
  #   else
  #     #do nothing
  #   end 

  # end

  



end 