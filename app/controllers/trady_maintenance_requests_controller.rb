class TradyMaintenanceRequestsController < ApplicationController
  #before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action :email_redirect, only: [:show,:index]
  before_action :require_login, only:[:show,:index]
  before_action :jfmo_terms_and_conditions, only:[:show,:index]
  before_action(only:[:show,:index]) {allow("Trady")}
  before_action(only:[:show]) {belongs_to_trady}
  # authorize_resource :class => false

  # caches_action :index, unless: -> { request.format.json? }
  # caches_action :show

  def index

    if params[:page] == nil
      params[:page] = 1 
    end 
    
    if params[:maintenance_request_filter] == nil 
      params[:maintenance_request_filter] = 'Quote Requests'
    end 

    
    
    trady_id = current_user.trady.id

    if params[:sort_by_date] == "Oldest to Newest"
      @maintenance_requests = TradyMaintenanceRequest.filtered_trady_maintenance_requests(trady_id, params[:maintenance_request_filter]).order('created_at ASC').paginate(:page => params[:page], :per_page => 10)
    else
      @maintenance_requests = TradyMaintenanceRequest.filtered_trady_maintenance_requests(trady_id, params[:maintenance_request_filter]).order('created_at DESC').paginate(:page => params[:page], :per_page => 10)
    end

    @quote_request = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Quote Requests")
    @awaiting_quote_approvals = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Awaiting Quote Approvals")
    @appointments_required = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Appointments Required")
    @awaiting_appointment_confirmation = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Awaiting Appointment Confirmation")
    @alternate_appointment_requested = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Alternate Appointment Requested")
    @job_booked = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Job Booked")
    @awaiting_payment = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Awaiting Payment")
    @job_complete = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Job Complete")
    @declined_quotes = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Declined Quotes")
    @cancelled_work_order_count = TradyMaintenanceRequest.filtered_trady_maintenance_requests_count(trady_id, "Cancelled Work Order")    
    @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

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
    @current_role = current_user.current_role
    @instruction = @current_user.instruction
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @logs = @maintenance_request.logs
    @stop_reminder = params[:stop_reminder]
    @stop_quote_reminder_id = params[:quote_request_id]
     
    if @maintenance_request.agency_admin 
      
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
      
    elsif @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent

    end 

    @tenants = @maintenance_request.tenants

    @quote_message_id = params[:quote_message_id]
    

    
    @signed_in_trady = @current_user.trady
    if @maintenance_request.trady 
      @the_assigned_trady = @maintenance_request.trady 
      @assigned_trady = @maintenance_request.trady.as_json({:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}})
      @invoice_pdf_urls = @maintenance_request.get_pdf_url(@maintenance_request.id, @the_assigned_trady.id).as_json
    end
    
    #@invoice_pdf_files = @maintenance_request.trady_delivered_uploaded_invoices(@maintenance_request.id,@signed_in_trady.id).as_json(:include => {:trady => {:include => :trady_company}})
    
    #@quotes = @maintenance_request.quotes.where(trady_id:@signed_in_trady,:delivery_status=>true, :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quote_items => {}, :conversation=>{:include=>:messages}})   
    @quote_requests = @maintenance_request.quote_requests.where(trady_id:@signed_in_trady, :maintenance_request_id=>@maintenance_request.id).includes(quotes:[:quote_items, :quote_image]).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]}, :customer_profile=>{},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}},:conversation=>{:include=>{:messages=>{:include=>{:user=>{:include=>{:trady=>{}, :agent=>{},:agency_admin=>{} }}}}}} ,:quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}}} })
    
    

    
   
    @invoices = Invoice.where(trady_id:@signed_in_trady.id,:delivery_status=>true, :maintenance_request_id=>@maintenance_request.id).includes(:invoice_items, :trady).as_json(:include => {:trady => {:include => :trady_company}, :invoice_items => {}})
    
    @pdf_files = UploadedInvoice.where(trady_id:@signed_in_trady.id,:delivery_status=>true, :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => :trady_company}},methods: :pdf_url)
    

    # if @quote
    #   @quote_id = @quote.id
    # else
    #   @quote_id = ''
    # end 
    @open_message = params[:message]
    @open_appoinment = params[:appointment_id]
    @message = Message.new
    
    @trady = @signed_in_trady.as_json(:include => {:user => {:include => :current_role}})
     
    if @maintenance_request.images != nil
      @gallery = @maintenance_request.get_image_urls
    end 

    if  @maintenance_request.property.landlord != nil
      @landlord = Landlord.find_by(id:@maintenance_request.property.landlord.id)
    end 
    
    # if @maintenance_request.agency_admin != nil
    #   if @maintenance_request.agency_admin.agency.tradies !=nil
    #     @all_tradies = @maintenance_request.agency_admin.agency.tradies.where(:skill=>@maintenance_request.service_type) 
    #   else 
    #     @all_tradies= []
    #   end 
    # end 

    # if @maintenance_request.agent != nil
    #   if @maintenance_request.agent.agency.tradies !=nil 
    #     @all_tradies = @maintenance_request.agent.agency.tradies.where(:skill=>@maintenance_request.service_type) 
    #   else 
    #     @all_tradies= []
    #   end
    # end 
    

    if @maintenance_request.conversations.where(:conversation_type=>"Tenant").present?
      @tenants_conversation = @maintenance_request.conversations.where(:conversation_type=>"Tenant").first.messages.as_json(:include => {:user=>{:include =>{:tenant => {}, :agency_admin=>{}, :agent=>{}, :trady=>{} }}})
    end 

    if @maintenance_request.conversations.where(:conversation_type=>"Landlord").present?
      @landlords_conversation = @maintenance_request.conversations.where(:conversation_type=>"Landlord").first.messages.as_json(:include => {:user=>{:include =>{:trady => {}, :agency_admin=>{}, :agent=>{}, :landlord=>{} }}})
    end

    if @maintenance_request.trady_id
      #messages for assigned trady
      if @maintenance_request.conversations.where(:conversation_type=>"Trady_Agent").present?
        @trady_agent_conversation = @maintenance_request.conversations.where(:conversation_type=>"Trady_Agent").first.messages.as_json(:include => {:user=>{:include =>{:trady => {}, :agency_admin=>{}, :agent=>{} }}})
      end
    end  

########APPOINTMENT STUFF############
    @appointment = Appointment.new
    @appointment.comments.build
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    
    #@appointments = @maintenance_request.appointments.as_json(:include => {:comments =>{}})
    
    @quote_appointments = @maintenance_request.appointments.where(appointment_type:"Quote Appointment").includes(:comments).order('created_at DESC').as_json(:include => {:comments =>{}})
    @work_order_appointments = @maintenance_request.appointments.where(appointment_type:"Work Order Appointment").includes(:comments).order('created_at DESC').as_json(:include => {:comments =>{}})
    
    # we dont need thishere only in tenant controller show @tenant_id  = maintenance_request.property.tenants.first.id

    #we need to have the tradys_id in the form

########APPOINTMENT STUFF############



    respond_to do |format|
      format.json { render :json=>{:gallery=>@gallery,:instruction=>@instruction ,:quote_requests=>@quote_requests, :landlord=> @landlord,:trady_agent_conversation=>@trady_agent_conversation ,:tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency, :property=>@maintenance_request.property, :agent=>@agent, agency_admin:@agency_admin ,:assigned_trady=>@assigned_trady, :signed_in_trady=>@signed_in_trady, :pdf_urls=>@invoice_pdf_urls, pdf_files:@pdf_files,:invoices=>@invoices, logs:@logs,tenants:@tenants, work_order_appointments:@work_order_appointments, :trady => @trady, :quote_appointments => @quote_appointments,time_and_access:@maintenance_request.availability_and_access}}
      format.html{render :show}
    end 
  end

  private

  def jfmo_terms_and_conditions
    if current_user && current_user.logged_in_as("Trady") && current_user.trady.jfmo_participant == true && current_user.trady.customer_profile.nil?
      flash[:danger] = "Please accept the terms and conditions to continue."
      redirect_to  join_just_find_me_one_path(trady_id:current_user.trady.id)
    else 

      #do nothing 

    end 

  end


  def belongs_to_trady
    #get all their MR then compare it to this one does their list have this one yes then ok no then redirect
    if current_user
      mrs = TradyMaintenanceRequest.find_trady_maintenance_requests(current_user.trady.id).where(id:params[:id])
      
      if !mrs.empty?
        #do nothing 
      else
        flash[:danger] = "Sorry you are not allowed to see that. Please log into your own account thank you."
        redirect_to root_path
      end
    end 
  end


end 