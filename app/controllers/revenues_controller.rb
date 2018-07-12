class RevenuesController < ApplicationController

  def index
    @all_invoices = AllInvoice.all_outstanding_invoices
    @outstanding_revenue = AllInvoice.outstanding_revenue
    @paid_revenue = AllInvoice.paid_revenue
  end

end 