class ServicesController < ApplicationController 
  before_action :require_login, only:[:new]
  
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

  def index
    @maintenance_request_id = params[:maintenance_request_id] 
    @trady_id = params[:trady_id] 
    
    @trady_company_id = params[:trady_company_id]
    
    @skill = Skill.new
  end

  def add_services
    Trady.find_by(id: params[:trady_id])

    service_array = params[:skill][:skill]
    trady_id = params[:skill][:trady_id]
    service_array.each do |skill|
      if skill != ''
        Skill.create(skill:skill, trady_id:trady_id)
      end 
    end 
    
  end


    
  private
    def service_params
      params.require(:service).permit(:service)
    end

end 