class AppointmentsController < ApplicationController
  before_action(only: [:new, :edit,:show]) { email_auto_login(params[:user_id]) }
  before_action :require_login, only:[:new,:create,:show,:edit, :accept_appointment]
  def new
    @appointment = Appointment.new
    @appointment.comments.build
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @maintenance_request_id = maintenance_request.id
    @appointments = maintenance_request.appointments
    

    # @current_role_id = 
    @tenant_id  = maintenance_request.property.tenants.first.id

    @trady_id = params[:trady_id]

  end

  def create
    @appointment = Appointment.new(appointment_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:appointment][:maintenance_request_id])
    tenant = Tenant.find_by(id:params[:appointment][:tenant_id])
    # trady_id = params[:appointment][:trady_id]
    trady = Trady.find_by(id:params[:appointment][:trady_id])
    if @appointment.valid?
      @appointment.save
      # Log.create(maintenance_request_id:maintenance_request.id, action:"Tradie suggested appointment time", name:trady.name)
      # TradyRequestsInitialAppointmentEmailWorker.perform_async(maintenance_request.id, @appointment.id,tenant_id, trady_id)
      # maintenance_request.action_status.update_columns(agent_status:"Tenant To Confirm Appointment", trady_status:"Awaiting Appointment Confirmation")
      # redirect_to root_path

      


      if params[:appointment][:current_user_role] == "Tenant"
        TradyAlternativeAppointmentTimePickedEmailWorker.perform_async(maintenance_request.id, @appointment.id, trady.id, tenant.id)
        maintenance_request.action_status.update_columns(agent_status: "Tradie To Confirm Appointment",trady_status:"Alternate Appointment Requested")

        Log.create(maintenance_request_id:maintenance_request.id, action:"Tenant requested a different appointment.", name:tenant.name)

        #send email to trady letting them know that a new appointment time has been picked 
      elsif params[:appointment][:current_user_role] == "Trady"
        TenantAlternativeAppointmentTimePickedEmailWorker.perform_async(maintenance_request.id, @appointment.id, trady.id, tenant.id)
        maintenance_request.action_status.update_columns(agent_status: "Tenant To Confirm Appointment", trady_status:"Awaiting Appointment Confirmation")

        Log.create(maintenance_request_id:maintenance_request.id, action:"Tradie requested an appointment.", name:trady.name)

        #send an email to the tenant saying another appointment has been picked
      else
          #do nothing
      end 

      appointment_and_comments = @appointment.as_json(:include => {:comments =>{}})
      respond_to do |format|
        format.json {render :json=>{appointment_and_comments:appointment_and_comments}}
      end
    
    else
      respond_to do |format|
        format.json {render errors:"Something went wrong please add all information"}
      end
    end

  end

  # def show
    
  #   @appointment = Appointment.find_by(id: params[:id])
  #   @maintenance_request = @appointment.maintenance_request
  #   @tenant_id = params[:tenant_id]
  #   @trady_id = params[:trady_id]
    
  # end


  # def edit
  #   @appointment = Appointment.find_by(id: params[:id])
  #   @comment = Comment.new
    
  #   @maintenance_request_id = params[:maintenance_request_id]
  #   @tenant_id  = params[:tenant_id]
  #   @trady_id = params[:trady_id]
    
  # end

  # def update
  #   #the params has to let me know which user has just sent the new time. If it was the tenant then send a new email to the trady. 
  #   #If the trady picks another time then send a new email to the tenant with the new time. 
  #   #appointment{maintenance_request_id"=>"23", "tenant_id"=>"20", "trady_id"=>"21"}
  #    @appointment = Appointment.find_by(id: params[:id]) 
     
  #    maintenance_request_id = params[:appointment][:maintenance_request_id]
  #    maintenance_request = MaintenanceRequest.find_by(id:params[:appointment][:maintenance_request_id])
  #    appointment_id = @appointment.id
  #    trady_id = params[:appointment][:trady_id]
  #    tenant_id = params[:appointment][:tenant_id] 
  #    trady = Trady.find_by(id:params[:appointment][:trady_id])
  #    tenant = Tenant.find_by(id:params[:appointment][:tenant_id])

  #   if @appointment.update(appointment_params)
  #     flash[:success] = "Thank you for picking a new appointment time. We will send the new time to the trady for confirmation"

  #     ####WE HAVE TO CHANGE THE CURRENT USER TO THE TENANT AND TRADY FOR NOW ITS SET TO AGENCYADMIN

  #     if params[:appointment][:current_user_role] == "Tenant"
  #       TradyAlternativeAppointmentTimePickedEmailWorker.perform_async(maintenance_request_id, appointment_id, trady_id, tenant_id)
  #       maintenance_request.action_status.update_columns(agent_status: "Tradie To Confirm Appointment",trady_status:"Alternate Appointment Requested")

  #       Log.create(maintenance_request_id:maintenance_request.id, action:"Tenant requested alternate appointment time", name:tenant.name)

  #       #send email to trady letting them know that a new appointment time has been picked 
  #     elsif params[:appointment][:current_user_role] == "Trady"
  #       TenantAlternativeAppointmentTimePickedEmailWorker.perform_async(maintenance_request_id, appointment_id, trady_id, tenant_id)
  #       maintenance_request.action_status.update_columns(agent_status: "Tenant To Confirm Appointment", trady_status:"Awaiting Appointment Confirmation")

  #       Log.create(maintenance_request_id:maintenance_request.id, action:"Tradie requested alternate appointment time", name:trady.name)

  #       #send an email to the tenant saying another appointment has been picked
  #     else
  #         #do nothing
  #     end 



  #     redirect_to root_path
  #   else
  #     flash[:danger] = "Something went wrong, please fill everything out"
  #     render :edit

  #   end 
  # end

  def accept_appointment
    appointment = Appointment.find_by(id:params[:appointment_id])
    appointment.update_attribute(:status,"Accepted")
    appointment_id = appointment.id
    maintenance_request_id = params[:maintenance_request_id]
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    trady_id = appointment.trady_id
    tenant_id = appointment.tenant_id
    trady = Trady.find_by(id: trady_id)
    tenant = Tenant.find_by(id: tenant_id)
    #OK NOW WE HAVE TO SEND THE EMAIL TO THE TRADY AND WE HAVE TO CHANGE THE AGENT STATUS TO THE 
    
    
    #params[:current_user_role] We have to distinguish between the trady accepting and the tenant accepting
    if params[:current_user_role] == "Trady"
      TenantAppointmentAcceptedEmailWorker.perform_async(maintenance_request_id,appointment_id,trady_id,tenant_id)
      maintenance_request.action_status.update_columns(agent_status: "Maintenance Scheduled - Awaiting Invoice", trady_status:"Job Booked")

      Log.create(maintenance_request_id:maintenance_request.id, action:"Trady confirmed appointment", name:trady.name)
    elsif params[:current_user_role] == "Tenant"
      TradyAppointmentAcceptedEmailWorker.perform_async(maintenance_request_id,appointment_id,trady_id,tenant_id)
      maintenance_request.action_status.update_columns(agent_status: "Maintenance Scheduled - Awaiting Invoice", trady_status:"Job Booked")
      Log.create(maintenance_request_id:maintenance_request.id, action:"Tenant confirmed appointment", name:tenant.name)

    end 
    appointment_and_comments = appointment.as_json(:include => {:comments =>{}})
    respond_to do |format|
      format.json {render :json=>{appointment:appointment_and_comments,note:"You have accepted the appointment."}}
    end
  end

  def decline_appointment
    appointment = Appointment.find_by(id:params[:appointment_id])
    appointment.update_attribute(:status,"Declined")
    respond_to do |format|
      format.json {render :json=>{appointment:appointment ,note:"You have declined the appointment."}}
    end
  end

  private
    
    def appointment_params
      params.require(:appointment).permit(:date, :time,:status,  :comment,:tenant_id,  :trady_id, :maintenance_request_id, :tenant_id,:current_user_role, :appointment_type, comments_attributes:[:id, :body, :tenant_id, :trady_id ,:appointment_id])  
    end

    def email_auto_login(id)
      if current_user == nil
        user = User.find_by(id:id)
        auto_login(user)
      end 
    end

end 