class AddTypeOfAppointmentToAppointments < ActiveRecord::Migration[5.0]
  def change
    add_column :appointments, :appointment_type, :string
    
  end
end
