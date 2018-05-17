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

    trady_id = params[:trady_id]
   
   
    if params[:skill]
      service_array = params[:skill][:skill]

      service_array.each do |skill|
        Skill.create(skill:skill, trady_id:trady_id)
      end
      # redirect_to new_tradie_term_agreement_path(maintenance_request_id:params[:maintenance_request_id], trady_company_id:params[:trady_company_id], trady_id:params[:trady_id])
      flash[:success] = "Thank you for signing up with Maintenance App. We will strive to help your business grow :)"
      redirect_to root_path
    else
      # flash[:danger] = "Please choose at least one service from the list below, thank you."
      # redirect_to services_path(maintenance_request_id:params[:maintenance_request_id], trady_id:params[:trady_id], trady_company_id:params[:trady_company_id])
      @maintenance_request_id = params[:maintenance_request_id] 
      @trady_id = params[:trady_id] 
      @trady_company_id = params[:trady_company_id]

      respond_to do |format|
        format.json {render :json=>{errors:"Please choose at least one service from the list below, thank you."}}
        format.html{render :index}
      end
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
    
    trady = Trady.find_by(id:params[:trady_id])
    if params[:skill]
      new_skills= params[:skill][:skill]
    end 
    if new_skills 
      current_skills = trady.services_provided
      #what was removed?
      removed_skills = current_skills - new_skills
      #what was added?
      added_skills = new_skills - current_skills

      removed_skills.each do |skill|
        Skill.where(trady_id: trady.id, skill: skill).destroy_all
      end 

      added_skills.each do |skill|
       Skill.create(trady_id:trady.id, skill:skill)
      end 
      
      #redirect_to new_tradie_term_agreement_path(maintenance_request_id:params[:maintenance_request_id], trady_company_id:params[:trady_company_id], trady_id:params[:trady_id])
      flash[:success] = "Thank you for signing up with Maintenance App. We will strive to help your business grow :)"
      redirect_to root_path
    else
      @skills = Trady.find_by(id:params[:trady_id]).skills.as_json
      @maintenance_request_id = params[:maintenance_request_id] 
      @trady_id = params[:trady_id] 
      @trady_company_id = params[:trady_company_id]
      
      respond_to do |format|
        format.json {render :json=>{errors:"Please choose at least one service from the list below, thank you."}}
        format.html{render :edit_services}
      end
    end 
     

  end


  def new_service_onboarding
    @maintenance_request_id = params[:maintenance_request_id] 
    @trady_id = params[:trady_id] 
    @skill = Skill.new
  end

  def create_service_onboarding
    
    user = Trady.find_by(id:params[:trady_id]).user
    trady_id = params[:trady_id]
   
    if params[:skill]
      service_array = params[:skill][:skill]

      service_array.each do |skill|
        Skill.create(skill:skill, trady_id:trady_id)
      end
      flash[:success] = "Thank you for signing up with Maintenance App. We will strive to help your business grow :)"
      redirect_to new_insurance_path(maintenance_request_id:params[:maintenance_request_id], role:"Trady", trady_id:trady_id)
    else
      # flash[:danger] = "Please choose at least one service from the list below, thank you."
      # redirect_to services_path(maintenance_request_id:params[:maintenance_request_id], trady_id:params[:trady_id], trady_company_id:params[:trady_company_id])
      @maintenance_request_id = params[:maintenance_request_id] 
      @trady_id = params[:trady_id] 
      @skill = Skill.new

      respond_to do |format|
        format.json {render :json=>{errors:"Please choose at least one service from the list below, thank you."}}
        format.html{render :new_service_onboarding}
      end
    end 


  end


    
  private
    def service_params
      params.require(:service).permit(:service)
    end

end 