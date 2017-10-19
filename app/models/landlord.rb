class Landlord < ApplicationRecord
has_many :roles, as: :roleable
belongs_to :user
has_many :properties
has_many :action_statuses
has_many :appointments
attr_accessor :maintenance_request_id


validates_presence_of :name, :email, :mobile
validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
validates :mobile,:numericality => true, :length => {:minimum=>10, :maximum => 10 }

def capitalize_name
  self.name.split.map(&:capitalize).join(' ')
end

def all_maintenance_requests
  maintenance_requests = []
  self.properties.each do |property|
    property.maintenance_requests.each do |mr|
      maintenance_requests.push(mr)
    end 
  end 
  return maintenance_requests 
end


def order_maintenance_request_by_descending
  maintenance_requests = self.all_maintenance_requests.sort { |value1, value2| value2.created_at <=> value1.created_at }
  return maintenance_requests
end

def order_maintenance_request_by_ascending
  maintenance_requests = self.all_maintenance_requests.sort { |value1, value2| value1.created_at <=> value2.created_at }
  return maintenance_requests
end




end 