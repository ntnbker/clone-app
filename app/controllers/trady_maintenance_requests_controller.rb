class TradyMaintenanceRequestsController < ApplicationController

  def index
    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = current_user.trady.maintenance_requests.order('created_at DESC').paginate(:page => params[:page], :per_page => 3)
    else
      @maintenance_requests = current_user.trady.maintenance_requests.order('created_at ASC').paginate(:page => params[:page], :per_page => 3)
    end
  end

  def show
    @current_user = current_user
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    # @tenants = @maintenance_request.tenants
    @quotes = @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}})
    #@quote = @quotes.where(:status=>"Approved").first if !nil
    @pdf_files = @maintenance_request.delivered_uploaded_invoices
    @agency = @current_user.agency_admin.agency

    @invoice_pdf_files = @maintenance_request.delivered_uploaded_invoices.as_json(:include => {:trady => {:include => :trady_company}})
    @invoices = @maintenance_request.delivered_invoices.as_json(:include => {:trady => {:include => :trady_company}, :invoice_items => {}})

    if @quote
      @quote_id = @quote.id
    else
      @quote_id = ''
    end 

    @message = Message.new
    
    @trady = current_user.trady
     
    if @maintenance_request.maintenance_request_image != nil
      @gallery = @maintenance_request.maintenance_request_image.images
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
      format.json { render :json=>{:gallery=>@gallery.as_json, :quotes=> @quotes, :landlord=> @landlord, :all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency,:property=>@maintenance_request.property, :agent=>@current_user.agency_admin, :invoices=> @invoices, :invoice_pdf_files => @invoice_pdf_files}}
      format.html{render :show}
    end 

 
  end
end 