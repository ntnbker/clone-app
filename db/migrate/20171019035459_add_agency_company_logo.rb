class AddAgencyCompanyLogo < ActiveRecord::Migration[5.0]
  def change
    create_table :agency_profile_images do |t|
      t.integer :agency_id
      t.text :image_data
      t.timestamps
    end
  end
end
