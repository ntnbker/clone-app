class CreateProfileImages < ActiveRecord::Migration[5.0]
  def change
    
    create_table :agency_admin_profile_images do |t|
      t.integer :agency_admin_id
      t.text :image_data
      t.timestamps
    end


    create_table :agent_profile_images do |t|
      t.integer :agent_id
      t.text :image_data
      t.timestamps
    end

    create_table :trady_company_profile_images do |t|
      t.integer :trady_company_id
      t.text :image_data
      t.timestamps
    end

    create_table :trady_profile_images do |t|
      t.integer :trady_id
      t.text :image_data
      t.timestamps
    end

  end
end
