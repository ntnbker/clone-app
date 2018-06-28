class ContactUsController < ApplicationController
  def create
    contact = ContactUs.new(contact_us_params)

    if contact.valid?
      #send email 
      #redirect to contact page
    else
      respond_to do |format|
        format.json {render :json=>{errors:contact.errors.to_hash(true).as_json}}
        #format.html{render con}
      end
    end 
  end

  private

  def contact_us_params
    params.fetch(:contact, {}).permit(:name, :email, :message)
  end

end 