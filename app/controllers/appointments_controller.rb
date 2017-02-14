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
    
    @appointment = Appointment.find_by(id: params[:id])
    @maintenance_request = @appointment.maintenance_request
  end


  def edit
    
  end

  def update
    
  end

  def accept_appointment
    appointment = Appointment.find_by(id:params[:appointment_id])
    appointment.update_attribute(:status,"Accepted")
    binding.pry
  end

  private
    
    def appointment_params
      params.require(:appointment).permit(:date, :time,:status,  :comment,:tenant_id,  :trady_id, :maintenance_request_id, :tenant_id, comments_attributes:[:id, :body, :tenant_id, :trady_id ,:appointment_id])  
    end

end 