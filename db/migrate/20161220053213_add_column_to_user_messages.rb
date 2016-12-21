class AddColumnToUserMessages < ActiveRecord::Migration[5.0]
  def change
    
    add_column :user_messages , :recipient_id, :integer
    remove_column :messages, :message_to
  end
end
