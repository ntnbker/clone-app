class RecruitsController < ApplicationController

  def new
    
  end

  def create
    
    email = params[:email].gsub(/\s+/, "").downcase
    

    trady = Trady.find_by(email:email)

    if trady 
      flash[:danger] = "This person is already a trady. Check to see if they have already been sent a quote request?"
      redirect_to recruit_path(id:params[:jfmo_request_id])
    else
      jfmo = JfmoRequest.find_by(id:params[:jfmo_request_id])
      count = jfmo.tradie_participation_amount + 1
      jfmo.update_attribute(:tradie_participation_amount, count)
      maintenance_request_id = jfmo.maintenance_request_id
      JfmoEmailWorker.perform_async
      flash[:success] = "You have sent an invite to #{email}. Wait for them to register and then send them the quote request email."
      redirect_to recruits_path
    end
  end

  def index
    @jfmo_requests = JfmoRequest.all.includes(maintenance_request:[:action_status, :property]).as_json(:include=>{:maintenance_request=>{:include=>{:action_status=>{},:property=>{}}}})

    # .as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:customer_profile=>{},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}},:conversation=>{:include=>{:messages=>{:include=>{:user=>{:include=>{:trady=>{}, :agent=>{},:agency_admin=>{} }}}}}} ,:quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}} }})

    # includes(trady:[:customer_profile, :trady_profile_image, :trady_company=> :trady_company_profile_image], quotes:[:quote_items, :quote_image],:conversation=>:messages)
  end

  def show
    
    @jfmo_request = JfmoRequest.includes(maintenance_request:[:action_status, :property,quote_requests:[:quotes, :trady]]).find_by(id:params[:id]).as_json(:include=>{:maintenance_request=>{:include=>{:action_status=>{},:property=>{},:quote_requests=>{:include=>{:quotes=>{},:trady=>{:include=>{:user=>{}, :customer_profile=>{}}}}}}}})

    
    

    @trady = Trady.new
  end


  def quote_request
    #check for trady then check to make sure they dont already have a quote request for that MR

    
    email = params[:trady][:email].gsub(/\s+/, "").downcase
    jfmo = JfmoRequest.find_by(id:params[:trady][:jfmo_request_id])
    maintenance_request_id = jfmo.maintenance_request_id
    maintenance_request = jfmo.maintenance_request
    trady = Trady.find_by(email:email)
    @trady = Trady.new(trady_params)

    if trady
      skill = Skill.where(trady_id:trady.id, skill:maintenance_request.service_type)
      quote_request = QuoteRequest.find_by(trady_id:trady.id, maintenance_request: maintenance_request.id)
      if skill
       #do nothing
      else
        Skill.create(trady_id:trady.id, skill: maintenance_request.service_type)
      end   
        
      if quote_request
        flash[:danger] = "This tradie has a quote request request already for this maintenance request. Either you have already sent it or someone else did."
        redirect_to recruit_path(id:params[:trady][:jfmo_request_id])
      else
        QuoteRequest.create(trady_id:trady.id, maintenance_request_id:maintenance_request.id)
        maintenance_request.action_status.update_attribute(:agent_status,"Awaiting Quote")
        TradyEmailWorker.perform_async(trady.id,maintenance_request.id)
      end 
        
     
      
    else
      
      if @trady.save
        
        user = User.create(email:params[:trady][:email],password:SecureRandom.hex(5))
        role = Role.new(user_id:user.id)
        Skill.create(trady_id:@trady.id, skill: maintenance_request.service_type)
        @trady.update_columns(user_id: user.id, jfmo_participant:true)
        @trady.roles << role
        role.save

        QuoteRequest.create(trady_id:@trady.id, maintenance_request_id:maintenance_request.id)
        JfmoEmailWorker.perform_async(maintenance_request_id, @trady.id)
        maintenance_request.action_status.update_attribute(:agent_status,"Awaiting Quote")
        flash[:success] = "We have sent and email to #{@trady.email}. So they can accept terms, create PW and add their services."
        redirect_to recruit_path(id:params[:trady][:jfmo_request_id])

      else
        @maintenance_request = maintenance_request
        @jfmo_request = jfmo
        
        respond_to do |format|
          format.json {render :json=>{errors:@trady.errors.to_hash(true).as_json}}
          format.html render :show
        end 
      end 
      

    end 

    
    
    

  end


  private

  def trady_params
    params.require(:trady).permit(:id,:name,:mobile,:email,:maintenance_request_id, :company_name)
  end

end 








# if trady
    #   quote_request = QuoteRequest.find_by(trady_id:trady.id, maintenance_request_id:maintenance_request_id)
    # end

    # if trady
    #   if quote_request
    #     flash[:danger] = "You have already sent a quote request to this email/trady and for the maintenance_request"
    #     redirect_to recruit_path(id:params[:jfmo_request_id])
    #   else
    #     QuoteRequest.create(trady_id:trady.id, maintenance_request_id:maintenance_request_id)
    #     TradyEmailWorker.perform_async(trady.id,maintenance_request_id)
    #     flash[:success] = "You have sent a quote request to #{email}. "
    #     redirect_to recruits_path
    #   end 
    # else
    #   flash[:danger] = "This person is not a trady, please send them an invitation first"
    #   redirect_to recruit_path(id:params[:jfmo_request_id])
    #   #does not exist
    # end 
