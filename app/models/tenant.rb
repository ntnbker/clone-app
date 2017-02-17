class Tenant < ApplicationRecord
  
  has_many :roles, as: :roleable
  belongs_to :user
  belongs_to :property
  has_many :tenant_maintenance_requests
  has_many :maintenance_requests, through: :tenant_maintenance_requests
  has_many :action_statuses
  has_many :appointments
  has_many :comments

  












  ##THIS IS AN UGLY HACK SO THE ACCESS_CONTACTS PARAMS CAN PASS THROUGH QUICKLY AND CREATE 
  ##A TENANT WITH OUT MESSING WITH THE ACCESS_CONTACTS PARAMS WHICH CAN BE HEAVILY NESTED.
  ## WE JUST ALLOW THIS VIRTUAL ATTRIBUTE TO BE ALLOWED TO BE SUBMITTED CAUSE ITS PART OF 
  ##THE PARAMS BUT IS NOT ACTUALLY AN ATTRIBUTE OR IS EVEN USED AS A SETTER OR GETTER
  ##THE PARAMS CAN BE FOUND IN THE MAINTENANCE REQUEST CONTROLLER. 
  ##SAME HACK IS IN THE USERS MODEL. THIS IS  QUICK FIX 
  attr_accessor :relation
  attr_accessor :password
  
 
end 