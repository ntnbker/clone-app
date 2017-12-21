class LandlordMaintenanceRequestsController < ApplicationController
  #before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action :email_redirect, only: [:show,:index]
  before_action :require_login, only:[:show,:index]
  
  before_action(only:[:show,:index]) {allow("Landlord")}
  before_action(only:[:show]) {belongs_to_landlord}


  # caches_action :index, unless: -> { request.format.json? }
  # caches_action :show
  
  def index

    if params[:page] == nil
      params[:page] = 1 
    end 
    
    # if params[:maintenance_request_filter] == nil 
    #   params[:maintenance_request_filter] = 'Quote Requests'
    # end 



    if params[:sort_by_date] == "Oldest to Newest"
      @maintenance_requests = current_user.landlord.order_maintenance_request_by_ascending.paginate(:page => params[:page], :per_page => 10)
    else
      @maintenance_requests = current_user.landlord.order_maintenance_request_by_descending.paginate(:page => params[:page], :per_page => 10)
    end

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
          :entries => @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)}
        }
      
      format.html
    end

    
  end

  def show
    @current_user = current_user
    @instruction = @current_user.instruction
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @non_json_quotes = @maintenance_request.quotes.where(:delivery_status=>true)
    # @quotes = @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}})
    @quote_requests = @maintenance_request.quote_requests.includes(trady:[:trady_profile_image, :trady_company=> :trady_company_profile_image],quotes:[:quote_items, :quote_image]).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}}} })
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
      format.json { render :json=>{:gallery=>@gallery, :instruction=>@instruction,:quotes=> @quotes, :landlord=> @landlord,:signed_in_landlord=>@signed_in_landlord ,:tenant=>@tenants.first, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation,:agency=>@agency,:property=>@maintenance_request.property,:agent=>@agent,:quote=>@quotes,logs:@logs, landlord_appointments:@landlord_appointments,time_and_access:@maintenance_request.availability_and_access}}
      format.html{render :show}
    end 

  end

  private

  # def email_redirect
  #   if current_user
  #     #do nothing 
  #   else
  #     flash[:message] = "To view the maintenance request please login. Once logged in you will be directed towards the maintenance request of interest."
  #     binding.pry
  #     redirect_to menu_login_path(user_type:params[:user_type], maintenance_request_id:params[:id], anchor:params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id], appointment_id:params[:appointment_id])
  #   end 
  # end


  # def email_auto_login(id)
  #   email_params= params[:user_id]
    
  #   if email_params  
  #     user = User.find_by(id:params[:user_id])
  #     if user   
  #       if current_user  
  #         if current_user.logged_in_as("Tenant") || current_user.logged_in_as("AgencyAdmin") || current_user.logged_in_as("Trady") || current_user.logged_in_as("Agent")
  #           answer = true
  #         else
  #           answer = false
  #         end 

  #         if current_user  && answer && user.has_role("Landlord")
  #           logout
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "Landlord")
          
  #         elsif current_user == nil && user.has_role("Landlord")
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "Landlord")
  #         elsif current_user && current_user.logged_in_as("Landlord")
  #             #do nothing
  #         end
  #       else
  #         auto_login(user)
  #         user.current_role.update_attribute(:role, "Landlord")
  #       end 
  #     else 
  #       flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
  #       redirect_to root_path
  #     end
  #   else
  #     #do nothing 
  #   end   
  # end

  def belongs_to_landlord
    maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    
    if current_user
      if current_user.landlord.id == maintenance_request.property.landlord_id
        #do nothing
      else 
        flash[:danger] = "Sorry you are not allowed to see that. Please log into your own account thank you."
        redirect_to root_path
      end 
    end 
  end

end 
