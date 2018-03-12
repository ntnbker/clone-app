class RecruitsController < ApplicationController

  def new
    
  end

  def create
    
    email = params[:email].gsub(/\s+/, "").downcase
    

    trady = Trady.find_by(email:email)

    if trady 
      flash[:danger] = "This person is already a trady. Check to see if they have already been sent a quote request?"
      redirect_to recruit_path(id:params[:jfmo_request_id])
    else
      jfmo = JfmoRequest.find_by(id:params[:jfmo_request_id])
      count = jfmo.tradie_participation_amount + 1
      jfmo.update_attribute(:tradie_participation_amount, count)
      maintenance_request_id = jfmo.maintenance_request_id
      JfmoEmailWorker.perform_async
      flash[:success] = "You have sent an invite to #{email}. Wait for them to register and then send them the quote request email."
      redirect_to recruits_path
    end
  end

  def index
    @jfmo_requests = JfmoRequest.all
  end

  def show
    @jfmo_request = JfmoRequest.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id:@jfmo_request.maintenance_request_id)

  end


  def quote_request
    #check for trady then check to make sure they dont already have a quote request for that MR


    email = params[:email].gsub(/\s+/, "").downcase
    jfmo = JfmoRequest.find_by(id:params[:jfmo_request_id])
    maintenance_request_id = jfmo.maintenance_request_id
    trady = Trady.find_by(email:email)
    
    if trady
      quote_request = QuoteRequest.find_by(trady_id:trady.id, maintenance_request_id:maintenance_request_id)
    end

    if trady
      if quote_request
        flash[:danger] = "You have already sent a quote request to this email/trady and for the maintenance_request"
        redirect_to recruit_path(id:params[:jfmo_request_id])
      else
        QuoteRequest.create(trady_id:trady.id, maintenance_request_id:maintenance_request_id)
        TradyEmailWorker.perform_async(trady.id,maintenance_request_id)
        flash[:success] = "You have sent a quote request to #{email}. "
        redirect_to recruits_path
      end 
    else
      flash[:danger] = "This person is not a trady, please send them an invitation first"
      redirect_to recruit_path(id:params[:jfmo_request_id])
      #does not exist
    end 

  end

end 


