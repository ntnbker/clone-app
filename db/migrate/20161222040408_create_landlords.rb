class CreateLandlords < ActiveRecord::Migration[5.0]
  def change
    create_table :landlords do |t|
      t.name :string
      t.email :string
      t.mobile :string
      t.timestamps 

    end
  end
end
