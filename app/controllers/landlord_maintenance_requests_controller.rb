class LandlordMaintenanceRequestsController < ApplicationController
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  
  before_action :require_login, only:[:show,:index]
  
  before_action(only:[:show,:index]) {allow("Landlord")}
  before_action(only:[:show]) {belongs_to_landlord}
  def index
    if params[:sort_by_date] == "Oldest to Newest"
      @maintenance_requests = current_user.landlord.order_maintenance_request_by_ascending
    else
      @maintenance_requests = current_user.landlord.order_maintenance_request_by_descending
    end

    @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    respond_to do |format|
      format.json {render json:@maintenance_requests_json}
      format.html
    end 


    
  end

  def show
    @current_user = current_user
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @non_json_quotes = @maintenance_request.quotes.where(:delivery_status=>true)
    @quotes = @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}})
    @agency = @maintenance_request.property.agency
    @email_quote_id = params[:email_quote_id]
    @pdf_files = @maintenance_request.delivered_uploaded_invoices

    @message = Message.new
    @open_message = params[:message]
    @open_appoinment = params[:appointment_id]
    @tradie = Trady.new
    @logs = @maintenance_request.logs 

    if @maintenance_request.agency_admin == nil
      
      @agent = @maintenance_request.agent 
    else
      
      @agent = @maintenance_request.agency_admin
    end 
    
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

    @tenants = @maintenance_request.tenants 

########APPOINTMENT STUFF############
    @appointment = Appointment.new
    @appointment.comments.build
    # maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @signed_in_landlord = @current_user.landlord.as_json(:include => {:user => {:include => :current_role}})
    
    @landlord_appointments = @maintenance_request.appointments.where(appointment_type:"Landlord Appointment").order('created_at DESC').as_json(:include => {:comments =>{}})

     
    # we dont need thishere only in tenant controller show @tenant_id  = maintenance_request.property.tenants.first.id

    #we need to have the tradys_id in the form

########APPOINTMENT STUFF############





    respond_to do |format|
      format.json { render :json=>{:gallery=>@gallery, :quotes=> @quotes, :landlord=> @landlord,:signed_in_landlord=>@signed_in_landlord ,:tenant=>@tenants.first, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation,:agency=>@agency,:property=>@maintenance_request.property,:agent=>@agent,:quote=>@quotes,logs:@logs, landlord_appointments:@landlord_appointments,time_and_access:@maintenance_request.availability_and_access}}
      format.html{render :show}
    end 

  end

  private

  def email_auto_login(id)
    email_params= params[:user_id]
    
    if email_params  
      user = User.find_by(id:params[:user_id])
      if user   
        if current_user  
          if current_user.logged_in_as("Tenant") || current_user.logged_in_as("AgencyAdmin") || current_user.logged_in_as("Trady") || current_user.logged_in_as("Agent")
            answer = true
          else
            answer = false
          end 

          if current_user  && answer && user.has_role("Landlord")
            logout
            auto_login(user)
            user.current_role.update_attribute(:role, "Landlord")
          
          elsif current_user == nil && user.has_role("Landlord")
            auto_login(user)
            user.current_role.update_attribute(:role, "Landlord")
          elsif current_user && current_user.logged_in_as("Landlord")
              #do nothing
          end
        else
          auto_login(user)
          user.current_role.update_attribute(:role, "Landlord")
        end 
      else 
        flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
        redirect_to root_path
      end
    else
      #do nothing 
    end   
  end

  def belongs_to_landlord
    maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    
    if current_user
      if current_user.landlord.id == maintenance_request.property.landlord_id
        #do nothing
      else 
        flash[:notice] = "Sorry you can't see that."
        redirect_to root_path
      end 
    end 
  end

end 
