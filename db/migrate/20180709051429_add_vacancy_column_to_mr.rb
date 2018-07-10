class AddVacancyColumnToMr < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :vacant, :boolean
  end
end
