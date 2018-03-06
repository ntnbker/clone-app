class AgencyPaymentRegistrationsController < ApplicationController

  def new
    
  end

  def create
    trady = Trady.find_by(id:params[:trady_id])
    agency = Agency.find_by(id:params[:agency_id])


    if agency.customer_profile && agency.customer_profile.customer_id == nil
      

      customer = Stripe::Customer.create(
        :email => params[:stripeEmail],
        :source  => params[:stripeToken]
      )
      agency.customer_profile.update_attribute(:customer_id, customer.id)

    elsif trady.customer_profile == nil

      customer = Stripe::Customer.create(
        :email => params[:stripeEmail],
        :source  => params[:stripeToken]
      )

      CustomerProfile.create(customer_id:customer.id, trady_id:trady.id)
      
    end 

    respond_to do |format|
          format.json{render :json=>{message:"Thank you for signing up with MaintenanceApp"}}
          
      end
  end

end 