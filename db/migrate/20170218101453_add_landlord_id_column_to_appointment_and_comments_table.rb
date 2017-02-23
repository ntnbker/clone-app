class AddLandlordIdColumnToAppointmentAndCommentsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :appointments, :landlord_id, :integer
    add_column :comments, :landlord_id, :integer
  end
end
