class AppointmentsController < ApplicationController
  def new
    @appointment = Appointment.new
    @appointment.comments.build
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @maintenance_request_id = maintenance_request.id
    @tenant_id  = maintenance_request.tenants.first.id
    @trady_id = params[:trady_id]

  end

  def create
    binding.pry
    @appointment = Appointment.new(appointment_params)
    maintenance_request_id = params[:appointment][:maintenance_request_id]
    tenant_id = params[:appointment][:tenant_id]
    trady_id = params[:appointment][:trady_id]
    if @appointment.valid?
      @appointment.save
      TradyRequestsInitialAppointmentEmailWorker.perform_async(maintenance_request_id, @appointment.id,tenant_id, trady_id)
      redirect_to root_path
      
    else
      render :new
    end 

  end

  def show
    binding.pry
    @appointment = Appointment.find_by(id: params[:id])
    @maintenance_request = @appointment.maintenance_request
    @tenant_id = params[:tenant_id]
    @trady_id = params[:trady_id]
    
  end


  def edit
    @appointment = Appointment.find_by(id: params[:id])
    @comment = Comment.new
    
    @maintenance_request_id = params[:maintenance_request_id]
    @tenant_id  = params[:tenant_id]
    @trady_id = params[:trady_id]




    
  end

  def update
    #the params has to let me know which user has just sent the new time. If it was the tenant then send a new email to the trady. 
    #If the trady picks another time then send a new email to the tenant with the new time. 
     @appointment = Appointment.find_by(id: params[:id]) 
    if @appointment.update(appointment_params)
      flash[:success] = "Thank you for picking a new appointment time. We will send the new time to the trady for confirmation"
      redirect_to root_path
    else
      flash[:danger] = "Something went wrong, please fill everything out"
      render :edit

    end 
  end

  def accept_appointment
    appointment = Appointment.find_by(id:params[:appointment_id])
    appointment.update_attribute(:status,"Accepted")
    appointment_id = appointment.id
    maintenance_request_id = params[:maintenance_request_id]
    trady_id = params[:trady_id]
    tenant_id = params[:tenant_id]

    TradyAppointmentAcceptedEmailWorker.perform_async(maintenance_request_id,appointment_id,trady_id,tenant_id)
    #OK NOW WE HAVE TO SEND THE EMAIL TO THE TRADY AND WE HAVE TO CHANGE THE AGENT STATUS TO THE 
    


    
  end

  private
    
    def appointment_params
      params.require(:appointment).permit(:date, :time,:status,  :comment,:tenant_id,  :trady_id, :maintenance_request_id, :tenant_id, comments_attributes:[:id, :body, :tenant_id, :trady_id ,:appointment_id])  
    end

end 