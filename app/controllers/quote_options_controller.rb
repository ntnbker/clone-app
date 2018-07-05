class QuoteOptionsController < ApplicationController
  # before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action :require_login, only:[:show]
  before_action :require_role
  before_action(only:[:show,:index]) {allow("Trady")}
  before_action :check_for_assignment

  def show
    @maintenance_request= MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = @trady.id
  end


  private

  def check_for_assignment
    # check if the MR has an assigned trady
    # if is does have an assigned trady check if the assigned trady is the same as currentUser.trady
    #   if yes then do ntohing 
    #     if no 
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    if maintenance_request.trady
      if current_user.trady == maintenance_request.trady
        #do nothing
      else
        flash[:danger] = "Sorry this job has been awarded to another tradie. To increase your chance of being awarded jobs please submit quotes as soon as possible."
        redirect_to trady_maintenance_request_path(maintenance_request)
      end 
    else
      #do nothing 
    end 
      
  end
end 


