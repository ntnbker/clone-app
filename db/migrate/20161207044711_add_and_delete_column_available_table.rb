class AddAndDeleteColumnAvailableTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :availabilities, :date
    remove_column :availabilities, :start_time
    remove_column :availabilities, :finish_time
    add_column :availabilities, :date, :date
    add_column :availabilities, :start_time, :time
    add_column :availabilities, :finish_time, :time
  end
end
