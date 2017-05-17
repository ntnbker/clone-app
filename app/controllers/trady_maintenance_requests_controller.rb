class TradyMaintenanceRequestsController < ApplicationController

  def index
    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = current_user.trady.maintenance_requests.order('created_at DESC').paginate(:page => params[:page], :per_page => 3)
    else
      @maintenance_requests = current_user.trady.maintenance_requests.order('created_at ASC').paginate(:page => params[:page], :per_page => 3)
    end



    @m = MaintenanceRequest.with_tradies_quote_request(current_user.trady.id)



    @mr = TradyMaintenanceRequest.find_trady_maintenance_requests(current_user.trady.id)

   


  end

  def show

    @current_user = current_user
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @pdf_files = @maintenance_request.delivered_uploaded_invoices
    if @maintenance_request.agency_admin == nil
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent 
    else
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 

    @invoice_pdf_files = @maintenance_request.trady_delivered_uploaded_invoices(@maintenance_request.id).as_json(:include => {:trady => {:include => :trady_company}})
    

    
    @signed_in_trady = current_user.trady
    
    @assigned_trady = @maintenance_request.trady 
    @quotes = @maintenance_request.trady.quotes.where(:delivery_status=>true, :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}})
    #@quote = @quotes.where(:status=>"Approved").first if !nil
    
   
    @invoices = @maintenance_request.trady.invoices.where(:delivery_status=>true, :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => :trady_company}, :invoice_items => {}})


    

    # if @quote
    #   @quote_id = @quote.id
    # else
    #   @quote_id = ''
    # end 

    @message = Message.new
    
    @trady = @signed_in_trady
     
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

      format.json { render :json=>{:gallery=>@gallery.as_json, :quotes=> @quotes, :landlord=> @landlord, :all_tradies=> @all_tradies, :tenants_conversation=> @tenants_conversation,:landlords_conversation=> @landlords_conversation, :agency=>@agency, :property=>@maintenance_request.property, :agent=>@agent ,:assigned_trady=>@assigned_trady, :signed_in_trady=>@signed_in_trady, :invoice_pdf_files=>@invoice_pdf_files, :invoices=>@invoices}}
      format.html{render :show}
    end 

 
  end
end 