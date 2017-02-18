class AppointmentsController < ApplicationController
  before_action(only: [:new, :edit,:show]) { email_auto_login(params[:user_id]) }
  before_action :require_login, only:[:new,:create,:show,:edit, :accept_appointment]
  def new
    @appointment = Appointment.new
    @appointment.comments.build
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @maintenance_request_id = maintenance_request.id
    @tenant_id  = maintenance_request.tenants.first.id
    @trady_id = params[:trady_id]

  end

  def create
    

    @appointment = Appointment.new(appointment_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:appointment][:maintenance_request_id])
    tenant_id = params[:appointment][:tenant_id]
    trady_id = params[:appointment][:trady_id]

    if @appointment.valid?
      @appointment.save
      
      TradyRequestsInitialAppointmentEmailWorker.perform_async(maintenance_request.id, @appointment.id,tenant_id, trady_id)
      
      maintenance_request.action_status.update_columns(agent_status:"Tenant To Confirm Appointment")

      
      redirect_to root_path
      
    else
      render :new
    end 




    # if the person_requesting appointment is tradie then do 
    #   TradyRequestsInitialAppointmentEmailWorker.perform_async(maintenance_request.id, @appointment.id,tenant_id, trady_id)
    # elsif the person_requesting appointment is landlord then do 
    #   LandlordRequestsInitialAppointmentEmailWorker.perform_async((maintenance_request.id, @appointment.id,tenant_id, landlord_id))
    I HAVE TO ADD A NEW HIDDEN FEILD THAT WILL TELL ME WHO IS ASKING FOR THE APPOINTMENT 



  end

  def show
    
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
    #appointment{maintenance_request_id"=>"23", "tenant_id"=>"20", "trady_id"=>"21"}
     @appointment = Appointment.find_by(id: params[:id]) 
     
     maintenance_request_id = params[:appointment][:maintenance_request_id]
     maintenance_request = MaintenanceRequest.find_by(id:params[:appointment][:maintenance_request_id])
     appointment_id = @appointment.id
     trady_id = params[:appointment][:trady_id]
     tenant_id = params[:appointment][:tenant_id] 
    if @appointment.update(appointment_params)
      flash[:success] = "Thank you for picking a new appointment time. We will send the new time to the trady for confirmation"

      ####WE HAVE TO CHANGE THE CURRENT USER TO THE TENANT AND TRADY FOR NOW ITS SET TO AGENCYADMIN

      if params[:appointment][:current_user_role] == "Tenant"
        TradyAlternativeAppointmentTimePickedEmailWorker.perform_async(maintenance_request_id, appointment_id, trady_id, tenant_id)
        maintenance_request.action_status.update_attribute(:agent_status, "Tradie To Confirm Appointment")
        #send email to trady letting them know that a new appointment time has been picked 
      elsif params[:appointment][:current_user_role] == "Trady"
        TenantAlternativeAppointmentTimePickedEmailWorker.perform_async(maintenance_request_id, appointment_id, trady_id, tenant_id)
        maintenance_request.action_status.update_attribute(:agent_status, "Tenant To Confirm Appointment")
        #send an email to the tenant saying another appointment has been picked
      else
          #do nothing
      end 



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
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    trady_id = params[:trady_id]
    tenant_id = params[:tenant_id]

    
    #OK NOW WE HAVE TO SEND THE EMAIL TO THE TRADY AND WE HAVE TO CHANGE THE AGENT STATUS TO THE 
    
    
    #params[:current_user_role] We have to distinguish between the trady accepting and the tenant accepting
    if params[:current_user_role] == "Trady"
      TenantAppointmentAcceptedEmailWorker.perform_async(maintenance_request_id,appointment_id,trady_id,tenant_id)
      maintenance_request.action_status.update_attribute(:agent_status, "Maintenance Scheduled - Awaiting Invoice")
    elsif params[:current_user_role] == "Tenant"
      TradyAppointmentAcceptedEmailWorker.perform_async(maintenance_request_id,appointment_id,trady_id,tenant_id)
      maintenance_request.action_status.update_attribute(:agent_status, "Maintenance Scheduled - Awaiting Invoice")
    end 
    flash[:success] = "Thank you for accepting the appointment."
    redirect_to root_path
    
  end

  private
    
    def appointment_params
      params.require(:appointment).permit(:date, :time,:status,  :comment,:tenant_id,  :trady_id, :maintenance_request_id, :tenant_id, comments_attributes:[:id, :body, :tenant_id, :trady_id ,:appointment_id])  
    end

    def email_auto_login(id)
      if current_user == nil
        user = User.find_by(id:id)
        auto_login(user)
      end 
    end

end 