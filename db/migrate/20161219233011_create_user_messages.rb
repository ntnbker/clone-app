class CreateUserMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :user_messages do |t|
      t.integer :sender_id
      t.integer :message_id
      t.timestamps

    end
  end
end
