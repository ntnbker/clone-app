class CreateInvoiceScheduler < ActiveRecord::Migration[5.0]
  def change
    create_table :invoice_schedulers do |t|
      t.date :run_date 
      t.timestamps
    end
  end
end
