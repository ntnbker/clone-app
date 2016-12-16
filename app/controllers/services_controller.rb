class ServicesController < ApplicationController 
  before_action :require_login
  
  def new
    @service = Service.new 
    @god = God.find_by(id:params[:god_id])
    authorize! :new, @god
  end

  def create
    
    @service = Service.new(service_params) 
    @god = God.find_by(id:params[:god_id])
    authorize! :create, @god
    
    if @service.valid?
      @service.god_id = @god.id
      @service.save
      redirect_to god_path(@god.id)
      flash[:success] = "You have added a new Service"
    else
      render :new
      flash[:danger] = "Oops something went wrong!"
    end 

  end


    
  private
    def service_params
      params.require(:service).permit(:service)
    end

end 