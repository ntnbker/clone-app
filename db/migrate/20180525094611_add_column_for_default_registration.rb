class AddColumnForDefaultRegistration < ActiveRecord::Migration[5.0]
  def change
    change_column :insurances, :insured, :boolean, :default => nil
    change_column :licenses, :licensed, :boolean, :default => nil
  end
end
