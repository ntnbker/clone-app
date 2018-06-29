class ContactUsController < ApplicationController
  def create
    contact = ContactUs.new(contact_us_params)
    
    if contact.valid?
      name = params[:contact][:name]
      email = params[:contact][:email]
      message = params[:contact][:message]
      ContactUsEmailWorker.perform_async(name, email, message) 
      flash[:message] = "Thank you for reaching out to us. We will respond as soon as possible."
      redirect_to contact_us_path
    else
      respond_to do |format|
        format.json {render :json=>{errors:contact.errors.to_hash(true).as_json}}
        
      end
    end 
  end

  private

  def contact_us_params
    params.fetch(:contact, {}).permit(:name, :email, :message)
  end

end 