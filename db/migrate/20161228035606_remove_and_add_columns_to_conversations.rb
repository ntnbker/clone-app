class RemoveAndAddColumnsToConversations < ActiveRecord::Migration[5.0]
  def change
    add_column :conversations, :conversation_type, :string
    remove_column :messages, :title
    remove_column :messages, :messageable_id
    remove_column :messages, :messageable_type
  end
end
