class AddInsuranceImage < ActiveRecord::Migration[5.0]
  def change
    add_column :insurances,  :image_data, :text
  end
end
