class TenantMaintenanceRequest < ApplicationRecord
  belongs_to :tenant
  belongs_to :maintenance_request

end 