class AddPreapprovedAmountToMr < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :preapproved_note, :text
  end
end
