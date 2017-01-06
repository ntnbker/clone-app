class Trady < ApplicationRecord
  has_many :roles, as: :roleable
  belongs_to :user 
  
  belongs_to :tradie_company

  has_many :agency_tradies
  has_many :agencies, through: :agency_tradies
  
  has_many :quotes

  

end 