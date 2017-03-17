class AddUserIdColumnToAgentsAndAgencyAdminsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :agents, :user_id, :integer
    
  end
end
