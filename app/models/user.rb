class User < ApplicationRecord
  authenticates_with_sorcery!
  #VALIDATIONS
    # validates :email, uniqueness: true
    validates :email, presence: true
    validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
    validates :password, presence: true
    validates_confirmation_of :password, if: -> { new_record? || changes[:crypted_password] }
  #ASSOCIATIONS
    
    has_many :roles
    has_one :current_role
    has_one :instruction
    #here we setup the relationship that a user can have with each type of user
    #ie a user can only have one agent row in a table aka being one agent
    
    has_one :god
    has_one :tenant
    has_one :landlord
    has_one :agent
    has_one :trady
    attr_accessor :_destroy
    

    #######OLD AGENCY_ADMINS NESTED FORM##########
    has_one :agency_admin, inverse_of: :user
    accepts_nested_attributes_for :agency_admin
    validates_associated :agency_admin


    has_many :emails, class_name: "Ahoy::Message"



  ##CALLBACKS
  before_save :create_tokens
  after_create :create_current_role, unless: :current_role_exists?
  after_create :create_instruction
  def create_tokens
    self.set_password_token = SecureRandom.hex(10)
    self.id_token = SecureRandom.hex(10)
  end

  def create_current_role
    CurrentRole.create(user_id:self.id)
  end

  def current_role_exists?
    current_role_row = CurrentRole.where(user_id:self.id).first
    if current_role_row
      return true
    else
      return false
    end 
  end

  def create_instruction
    Instruction.create(user_id:self.id, read_instruction: false)
  end

 
  #HERE WE ADD MESSAGING SYSTEM ASSOCIATIONS
  ###FIRST SYSTEM#####
    # has_many :conversations
    # has_many :messages

  ###SECOND SYSTEM###
  has_many :user_conversations
  has_many :conversations, :through => :user_conversations
  has_many :messages


  ##THIS IS AN UGLY HACK SO THE ACCESS_CONTACTS PARAMS CAN PASS THROUGH QUICKLY AND CREATE 
  ##A USER WITH OUT MESSING WITH THE ACCESS_CONTACTS PARAMS WHICH CAN BE HEAVILY NESTED
  ##THE PARAMS CAN BE FOUND IN THE MAINTENANCE REQUEST CONTROLLER. 
  ##SAME HACK IS IN THE TENANTS MODEL
    
    attr_accessor :relation
    attr_accessor :name
    attr_accessor :mobile
    attr_accessor :role_picked



##HERE WE ASK IF THE USER HAS THAT TYPE OF ROLE##
  def has_role(the_role)
    answer = false
    roles = self.roles

      roles.each do |role|
        if role.roleable_type == the_role
          answer = true 
        end 
      end 
    return answer

  end

   ##This tells us what type of role they are currently using## 
  # We also use this in the ability calss to tell them if they can go 
  # to a certain end point

  def logged_in_as(the_role)
    if self.current_role.role == the_role
      return true 
    else
      return false
    end
  end

  # def logged_in_as_nobody?
  #   if self.current_role.role == nil
  #     return true 
  #   else
  #     return false
  #   end
  # end

  def get_role(the_role)
    self.roles.where(user_id:self.id,roleable_type:the_role).first
  end


  # def is_god?
  #   answer = false
  #   roles = self.roles

  #     roles.each do |role|
  #       if role.roleable_type == "God"
  #         answer = true 
  #       end 
  #     end 
  #   return answer

  # end
  
  # def is_agent?
  #   answer = false
  #   roles = self.roles

  #     roles.each do |role|
  #       if role.roleable_type == "Agent"
  #         answer = true 
  #       end 
  #     end 
  #   return answer
  # end

  # def is_agency_admin?
  #   answer = false
  #   roles = self.roles

  #     roles.each do |role|
  #       if role.roleable_type == "AgencyAdmin"
  #         answer = true 
  #       end 
  #     end 
  #   return answer
  # end

  # def is_tenant?
  #   answer = false
  #   roles = self.roles

  #     roles.each do |role|
  #       if role.roleable_type == "Tenant"
  #         answer = true 
  #       end 
  #     end 
  #   return answer
  # end

  # def is_landlord?
  #   answer = false
  #   roles = self.roles

  #     roles.each do |role|
  #       if role.roleable_type == "Landlord"
  #         answer = true 
  #       end 
  #     end 
  #   return answer
  # end

  # def is_trady?
  #   answer = false
  #   roles = self.roles

  #     roles.each do |role|
  #       if role.roleable_type == "Trady"
  #         answer = true 
  #       end 
  #     end 
  #   return answer
  # end





  # def logged_in_as_god?
  #   if self.current_role.role == "God"
  #     return true 
  #   else
  #     return false
  #   end
  # end

  # def logged_in_as_agency_admin?
  #   if self.current_role.role == "AgencyAdmin"
  #     return true 
  #   else
  #     return false
  #   end
  # end

  # def logged_in_as_agent?
  #   if self.current_role.role == "Agent"
  #     return true 
  #   else
  #     return false
  #   end
  # end

  # def logged_in_as_tenant?
  #   if self.current_role.role == "Tenant"
  #     return true 
  #   else
  #     return false
  #   end
  # end

  # def logged_in_as_landlord?
  #   if self.current_role.role == "Landlord"
  #     return true 
  #   else
  #     return false
  #   end
  # end

  # def logged_in_as_trady?
  #   if self.current_role.role == "Trady"
  #     return true 
  #   else
  #     return false
  #   end
  # end

  # def logged_in_as_nobody?
  #   if self.current_role.role == nil
  #     return true 
  #   else
  #     return false
  #   end
  # end

  # def get_role(the_role)
  #   self.roles.where(user_id:self.id,roleable_type:the_role).first
  # end






  # OLD AUTHORIZATION SYSTEM

    
  
  #here we ask what type of role the user is then we use it to 
  #define the abilities is has in the Ability model
  # def god?
  #   user = self.role
    
  #   if user == nil
  #     return false
  #   elsif user.roleable_type == "God"
  #     return true 
  #   end 
  # end
  
  # def agent?
  #   user = self.role
  #   if user == nil
  #     return false
  #   elsif user.roleable_type == "Agent"
  #     return true
  #   end 
  # end

  # def agency_admin?
  #   user = self.role
  #   if user == nil
  #     return false
  #   elsif user.roleable_type == "AgencyAdmin"
  #     return true
  #   end 
  # end

  # def tenant?
  #   user = self.role
  #   if user == nil
  #     return false
  #   elsif user.roleable_type == "Tenant"
  #     return true
  #   end
  # end

  # def landlord?
  #   user = self.role
  #   if user == nil
  #     return false
  #   elsif user.roleable_type == "Landlord"
  #     return true
  #   end
  # end

  # def trady?
  #   user = self.role
  #   if user == nil
  #     return false
  #   elsif user.roleable_type == "Trady"
  #     return true
  #   end
  # end









    

end
