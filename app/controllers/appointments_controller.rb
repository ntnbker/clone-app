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
        TradyAlternativeAppointmentTimePickedEmailWorker.perform_in(5.minutes,maintenance_request.id, @appointment.id, trady.id, tenant.id)
        maintenance_request.action_status.update_columns(agent_status: "Tradie To Confirm Appointment",trady_status:"Alternate Appointment Requested")

        log = Log.create(maintenance_request_id:maintenance_request.id, action:"Tenant requested a different appointment. - Tenant: ", name:tenant.name.capitalize)

        #send email to trady letting them know that a new appointment time has been picked 
      elsif params[:appointment][:current_user_role] == "Trady"
        TenantAlternativeAppointmentTimePickedEmailWorker.perform_in(5.minutes,maintenance_request.id, @appointment.id, trady.id, tenant.id)
        maintenance_request.action_status.update_columns(agent_status: "Tenant To Confirm Appointment", trady_status:"Awaiting Appointment Confirmation")

        log = Log.create(maintenance_request_id:maintenance_request.id, action:"Tradie requested an appointment. - Tradie: ", name:trady.name.capitalize)

        #send an email to the tenant saying another appointment has been picked
      else
          #do nothing
      end 

      appointment_and_comments = @appointment.as_json(:include => {:comments =>{}})
      respond_to do |format|
        format.json {render :json=>{appointment_and_comments:appointment_and_comments, log:log}}
      end
    
    else
      respond_to do |format|
        format.json {render :json=>{errors:@appointment.errors.to_hash(true).as_json}}
      end
    end

  end

 

  def accept_appointment
    appointment = Appointment.find_by(id:params[:appointment_id])
    appointment.update_attribute(:status,"Accepted")
    appointment_id = appointment.id
    #maintenance_request_id = params[:maintenance_request_id]
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    trady_id = appointment.trady_id
    tenant_id = appointment.tenant_id
    trady = Trady.find_by(id: trady_id)
    tenant = Tenant.find_by(id: tenant_id)
    #OK NOW WE HAVE TO SEND THE EMAIL TO THE TRADY AND WE HAVE TO CHANGE THE AGENT STATUS TO THE 
    
    
    #params[:current_user_role] We have to distinguish between the trady accepting and the tenant accepting
    if params[:current_user_role] == "Trady"
      TenantAppointmentAcceptedEmailWorker.perform_async(maintenance_request.id,appointment.id,trady.id,tenant.id)
      maintenance_request.action_status.update_columns(agent_status: "Maintenance Scheduled - Awaiting Invoice", trady_status:"Job Booked")

      log = Log.create(maintenance_request_id:maintenance_request.id, action:"Trady confirmed appointment - Tradie: ", name:trady.name.capitalize)
    elsif params[:current_user_role][:role] == "Tenant"
      TradyAppointmentAcceptedEmailWorker.perform_async(maintenance_request.id,appointment.id,trady.id,tenant.id)
      maintenance_request.action_status.update_columns(agent_status: "Maintenance Scheduled - Awaiting Invoice", trady_status:"Job Booked")
      log = Log.create(maintenance_request_id:maintenance_request.id, action:"Tenant confirmed appointment - Tenant: ", name:tenant.name.capitalize)

    end 
    appointment_and_comments = appointment.as_json(:include => {:comments =>{}})
    respond_to do |format|
      format.json {render :json=>{appointment:appointment_and_comments,log:log,note:"You have accepted the appointment. An email has been sent to the other party to let them know. Thank you for your time."}}
    end
  end

  def decline_appointment
    appointment = Appointment.find_by(id:params[:appointment_id])
    appointment.update_attribute(:status,"Declined")
    maintenance_request = appointment.maintenance_request
    tenant = appointment.tenant
    trady = appointment.trady
    
    if params[:current_user_role] == "Trady"
      #Email the tenant that a new appointment will be suggested to them. 
      
        TradyDeclinedAppointmentEmailWorker.perform_async(tenant.id,trady.id,maintenance_request.id,appointment.id)
    elsif params[:current_user_role] == "Tenant"
      #email the trady that a new appointment will be suggested to them. 
        TenantDeclinedAppointmentEmailWorker.perform_async(trady.id)
    end 
    respond_to do |format|
      format.json {render :json=>{appointment:appointment ,note:"You have declined the appointment."}}
    end
  end

  def cancel_appointment
    appointment = Appointment.find_by(id:params[:appointment_id])
    appointment.update_attribute(:status,"Cancelled")
    tenant = appointment.tenant
    trady = appointment.trady
    maintenance_request = appointment.maintenance_request
    if params[:current_user_role] == "Trady"
      #Email the tenant that a new appointment will be suggested to them. 
      
        TradyCancelledAppointmentEmailWorker.perform_async(tenant.id,trady.id,maintenance_request.id)
    elsif params[:current_user_role] == "Tenant"
      #email the trady that a new appointment will be suggested to them. 
        TenantCancelledAppointmentEmailWorker.perform_async(trady.id,maintenance_request.id)
    end 
        
    respond_to do |format|
      format.json {render :json=>{appointment:appointment ,note:"You have cancelled the appointment."}}
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