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
    trady_id = params[:trady_id]
    
    if service_array[0] == '' && service_array.count == 1 
      flash[:danger] = "Please choose at least one service from the list below, thank you."
      redirect_to services_path
    else
      service_array.each do |skill|
        if skill != ''
          Skill.create(skill:skill, trady_id:trady_id)
        end 
      end
      redirect_to new_tradie_term_agreement_path(maintenance_request_id:params[:maintenance_request_id], trady_company_id:params[:trady_company_id], trady_id:params[:trady_id])
    end  
  end


  def edit_services
    #old_array - new_array = array of elements that are gone. We can then delete these. 
    @maintenance_request_id = params[:maintenance_request_id] 
    @trady_id = params[:trady_id] 
    @trady_company_id = params[:trady_company_id]
    @service = Service.new
    @services = Service.all
    @skills = Trady.find_by(id:params[:trady_id]).skills.as_json
    
  end


  def update
    #the id in the params is the same ID as the trady so dont get confused
    binding.pry
  end


    
  private
    def service_params
      params.require(:service).permit(:service)
    end

end 