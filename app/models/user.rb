class User < ApplicationRecord
  authenticates_with_sorcery!
  #VALIDATIONS
    validates :email, uniqueness: true
    validates :email, presence: true
    validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
    validates :password, presence: true
    validates_confirmation_of :password, if: -> { new_record? || changes[:crypted_password] }
  #ASSOCIATIONS
    
    has_one :role

    #here we setup the relationship that a user can have with each type of user
    #ie a user can only have one agent row in a table aka being one agent
    has_one :agency_admin, inverse_of: :user
    has_one :god

    accepts_nested_attributes_for :agency_admin
    #,reject_if: :all_blank
    validates_associated :agency_admin
  
  #here we ask what type of role the user is then we use it to 
  #define the abilities is has in the Ability model
  def god?
    user = self.role
    
    if user.roleable_type == "God"
      return true
    end 
  end

  def agent?
    user = self.role
    
    if user.roleable_type == "Agent"
      return true
    end 
  end
  

end
