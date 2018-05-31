class AddRegistrationStatusColumnToTrady < ActiveRecord::Migration[5.0]
  def change
    add_column :tradies, :registration_status, :string
  end
end
