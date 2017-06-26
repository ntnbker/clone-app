class TenantMaintenanceRequestsController < ApplicationController
  before_action(only:[:show]) { email_auto_login(params[:user_id]) }
  before_action(only:[:show]) {belongs_to_tenant}
  before_action :require_login, only:[:show,:index]
  before_action(only:[:show,:index]) {allow("Tenant")}
  def index
    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = current_user.tenant.maintenance_requests.order('created_at DESC')
    else
      @maintenance_requests = current_user.tenant.maintenance_requests.order('created_at ASC')
    end

    maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    respond_to do |format|
      format.json {render json:maintenance_requests_json}
      format.html
    end 



    
  end

  def show
    @current_user = current_user
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    
    @quotes = @maintenance_request.quotes.where(:delivery_status=>true)
    @pdf_files = @maintenance_request.delivered_uploaded_invoices

    @message = Message.new
    # @tradie = Trady.new
    @logs = @maintenance_request.logs
    @tenant = @current_user.tenant.as_json(:include => {:user => {:include => :current_role}})

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

    @appointment = Appointment.new
    @appointment.comments.build
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])


    

    @quote_appointments = @maintenance_request.appointments.where(appointment_type:"Quote Appointment").as_json(:include => {:comments =>{}})
    @work_order_appointments = @maintenance_request.appointments.where(appointment_type:"Work Order Appointment").as_json(:include => {:comments =>{}})
    @landlord_appointments = @maintenance_request.appointments.where(appointment_type:"Landlord Appointment").as_json(:include => {:comments =>{}})

    respond_to do |format|
      format.json { render :json=>{:gallery=>@gallery, :quotes=> @quotes, :landlord=> @landlord, :all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, logs:@logs, quote_appointments:@quote_appointments, work_order_appointments:@work_order_appointments,landlord_appointments:@landlord_appointments, tenant:@tenant}}
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
          if current_user.logged_in_as("AgencyAdmin") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("Trady") || current_user.logged_in_as("Agent")
            answer = true
          else
            answer = false
          end 

          if current_user  && answer && user.has_role("Tenant")
            logout
            auto_login(user)
            user.current_role.update_attribute(:role, "Tenant")
          elsif current_user == nil
            auto_login(user)
            user.current_role.update_attribute(:role, "Tenant")
          elsif current_user && current_user.logged_in_as("Tenant")
              #do nothing
          end 
        else 
          # if user 
            auto_login(user)
            user.current_role.update_attribute(:role, "Tenant")
          # else
          #   flash[:notice] = "Please log in first"
          #   redirect_to menu_login_path
          # end  
        end
      else 
        flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
        redirect_to root_path
      end 
    else
      #do nothing
    end 
  end 
  

  def belongs_to_tenant
    maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    
    tenants = maintenance_request.tenants
    id_array = []
    tenants.each do |tenant|
      
      id_array.push(tenant.user_id)
    end
    if id_array.include?(current_user.id)
      #do nothing 
    else
      flash[:notice] = "Sorry you can't see that."
      redirect_to root_path
    end
  end

end