class AddPdfDataColumnToUploadedPdf < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices , :pdf_data, :text
  end
end
