class AddGodIdColumnToServiceTable < ActiveRecord::Migration[5.0]
  def change
    add_column :services, :god_id, :integer
    
  end
end
