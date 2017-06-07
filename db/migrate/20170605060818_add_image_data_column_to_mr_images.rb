class AddImageDataColumnToMrImages < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_request_images, :image_data, :text
  end
end
