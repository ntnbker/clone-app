class AddColumnSuperledgerIdToLegers < ActiveRecord::Migration[5.0]
  def change
    add_column :ledgers, :super_ledger_id, :integer
  end
end
