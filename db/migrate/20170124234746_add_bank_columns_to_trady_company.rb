class AddBankColumnsToTradyCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :trady_companies, :account_name, :string
    add_column :trady_companies, :bsb_number, :string
    add_column :trady_companies, :bank_account_number, :string
  end
end
