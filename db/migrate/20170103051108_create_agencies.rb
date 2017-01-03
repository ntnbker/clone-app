class CreateAgencies < ActiveRecord::Migration[5.0]
  def change
    create_table :agencies do |t|
      t.string :company_name
      t.string :business_name
      t.timestamps
    end
  end
end
