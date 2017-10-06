class CreateUrls < ActiveRecord::Migration[5.0]
  def change
    create_table :urls do |t|
      t.text :short_url
      t.text :original_url
      t.timestamps
    end
  end
end
