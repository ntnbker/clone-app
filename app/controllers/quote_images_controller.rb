class QuoteImagesController < ApplicationController 

  def create


    
    @quote_image = QuoteImage.new(quote_image_params)
    @maintenance_request = MaintenanceRequest.find_by(id:params[:picture][:maintenance_request_id])
    
    if @quote_image.valid?
      quote = Quote.create(maintenance_request_id:params[:picture][:maintenance_request_id], trady_id:params[:picture][:trady_id],quote_request_id:params[:picture][:quote_request_id], delivery_status:true, status: "Active")
      @quote_image.quote_id = quote.id 
      @quote_image.save

      if params[:picture][:role] == "Agent"
          @quote_requests = @maintenance_request.quote_requests.as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}, :conversation=>{:include=>:messages}}} })
      elsif params[:picture][:role] == "Trady"
          @quote_requests = Quote_requests.where(trady_id:@signed_in_trady, :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}, :conversation=>{:include=>:messages}}} })
      end 


      respond_to do |format|
        format.json {render :json=>{quote_requests:@quote_requests}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{errors:@quote_image.errors.to_hash(true).as_json}}
      end 
    end 
  end
   
  private

  def quote_image_params
   params.require(:picture).permit(:image, :trady_id, :maintenance_request_id, :quote_request_id)
  end

end 