class AddCurrentUserRoleColumnToAppointment < ActiveRecord::Migration[5.0]
  def change
    add_column :appointments, :current_user_role, :string
  end
end
