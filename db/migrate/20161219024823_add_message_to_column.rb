class AddMessageToColumn < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :message_to, :string
  end
end
