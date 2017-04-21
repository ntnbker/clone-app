class Landlord < ApplicationRecord
has_many :roles, as: :roleable
belongs_to :user
has_many :properties
has_many :action_statuses
has_many :appointments
attr_accessor :maintenance_request_id


validates_presence_of :name, :email, :mobile


def all_maintenance_requests
  maintenance_requests = []
  self.properties.each do |property|
    property.maintenance_requests.each do |mr|
      maintenance_requests.push(mr)
    end 
  end 
  return maintenance_requests 
end




end 