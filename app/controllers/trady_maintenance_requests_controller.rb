class TradyMaintenanceRequestsController < ApplicationController
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action(only:[:show]) {belongs_to_trady}
  before_action :require_login, only:[:show,:index]
  before_action(only:[:show,:index]) {allow("Trady")}
  # authorize_resource :class => false

  def index
    
    trady_id = current_user.trady.id

    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = TradyMaintenanceRequest.find_trady_maintenance_requests(trady_id).order('created_at DESC')
    else
      @maintenance_requests = TradyMaintenanceRequest.find_trady_maintenance_requests(trady_id).order('created_at ASC')
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

    maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    respond_to do |format|
      format.json {render json:maintenance_requests_json}
      format.html
    end
  end

  def show

    @current_user = current_user
    @current_role = current_user.current_role
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @logs = @maintenance_request.logs
    if @maintenance_request.agency_admin == nil
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent 
    else
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 

    @tenants = @maintenance_request.tenants

    
    

    
    @signed_in_trady = @current_user.trady
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
      @tenants_conversation = @maintenance_request.conversations.where(:conversation_type=>"Tenant").first.messages
    end 

    if @maintenance_request.conversations.where(:conversation_type=>"Landlord").present?
      @landlords_conversation = @maintenance_request.conversations.where(:conversation_type=>"Landlord").first.messages
    end

########APPOINTMENT STUFF############
    @appointment = Appointment.new
    @appointment.comments.build
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    
    #@appointments = @maintenance_request.appointments.as_json(:include => {:comments =>{}})
    
    @quote_appointments = @maintenance_request.appointments.where(appointment_type:"Quote Appointment").order('created_at DESC').as_json(:include => {:comments =>{}})
    @work_order_appointments = @maintenance_request.appointments.where(appointment_type:"Work Order Appointment").order('created_at DESC').as_json(:include => {:comments =>{}})
    
    # we dont need thishere only in tenant controller show @tenant_id  = maintenance_request.property.tenants.first.id

    #we need to have the tradys_id in the form

########APPOINTMENT STUFF############



    respond_to do |format|
      format.json { render :json=>{:gallery=>@gallery, :quotes=> @quotes, :landlord=> @landlord, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency, :property=>@maintenance_request.property, :agent=>@agent ,:assigned_trady=>@assigned_trady, :signed_in_trady=>@signed_in_trady, :invoice_pdf_files=>@invoice_pdf_files, :invoices=>@invoices, logs:@logs,tenants:@tenants, work_order_appointments:@work_order_appointments, :trady => @trady, :quote_appointments => @quote_appointments}}
      format.html{render :show}
    end 
  end

  private

  def email_auto_login(id)
    email_params = params[:user_id]  
    if email_params  
      user = User.find_by(id:id)
      if user
        if current_user
          if current_user
            if current_user.logged_in_as("Tenant") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("AgencyAdmin") || current_user.logged_in_as("Agent")
              answer = true
            else
              answer = false
            end 
          else
            auto_login(user)
            user.current_role.update_attribute(:role, "Trady")
          end 

          if current_user  && answer && user.has_role("Trady")
            logout
            auto_login(user)
            user.current_role.update_attribute(:role, "Trady")
          elsif current_user == nil
            auto_login(user)
            user.current_role.update_attribute(:role, "Trady")
          elsif current_user && current_user.logged_in_as("Trady")
              #do nothing
          end 
        else
          auto_login(user)
          user.current_role.update_attribute(:role, "Trady")
        end 
      else 
        flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
        redirect_to root_path
      end 
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
        flash[:notice] = "Sorry you can't see that."
        redirect_to root_path
      end
    end 
  end


end 