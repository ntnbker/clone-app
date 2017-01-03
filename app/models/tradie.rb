class Tradie < ApplicationRecord
  has_many :roles, as: :roleable
  belongs_to :user 
  has_many :quotes

  has_many :agency_tradies
  has_many :agencies, through: :agency_tradies
  
end 