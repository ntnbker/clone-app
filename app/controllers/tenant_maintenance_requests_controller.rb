class TenantMaintenanceRequestsController < ApplicationController
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  def index
    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = current_user.tenant.maintenance_requests.order('created_at DESC').paginate(:page => params[:page], :per_page => 3)
    else
      @maintenance_requests = current_user.tenant.maintenance_requests.order('created_at ASC').paginate(:page => params[:page], :per_page => 3)
    end

    maintenance_requests_json = @maintenance_requests.as_json(:include=>{:maintenance_request_image=>{}, :property=>{} })

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
    @tradie = Trady.new
    @logs = @maintenance_request.logs

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
      format.json { render :json=>{:gallery=>@gallery, :quotes=> @quotes, :landlord=> @landlord, :all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, logs:@logs}}
      format.html{render :show}
    end 

 
  end

  private

  def email_auto_login(id)
      if current_user == nil
        user = User.find_by(id:id)
        auto_login(user)
      end 
  end

end