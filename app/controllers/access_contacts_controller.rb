class AccessContacts < ApplicationController
  before_action :require_login
  before_action :require_role


  def create
    access_contact = AccessContact.new(access_contacts_params)
    
    if access_contact.save
      respond_to do |format|
        format.json {render :json=>{access_contact:access_contact}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{errors:access_contact.errors.to_hash(true).as_json}}
      end 
    end 

  end

  def update
    access_contact = AccessContact.find_by(id:params[:access_contact][:id])
    
    if access_contact.update(access_contacts_params)
      respond_to do |format|
        format.json {render :json=>{access_contact:access_contact}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{errors:access_contact.errors.to_hash(true).as_json}}
      end 
    end 
  end

  private

  def access_contacts_params
    params.require(:access_contact).permit(:name, :relation, :email, :mobile, :maintenance_request_id)
  end

end 

