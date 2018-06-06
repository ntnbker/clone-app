class ReceiptsController < ApplicationController
  before_action :require_login, only:[:show,:index]
  
  before_action(only:[:show,:index]) {allow("Trady")}
  before_action(only:[:show]) {belongs_to_trady}

  def index
    @receipts = Receipt.where(paid:true,trady_id:current_user.trady.id).where("total > ?", 0).as_json
    
    respond_to do |format|
      format.json {render :json=>{receipts:@receipts}}
      format.html 
    end 
  end

  def show
    @receipt = Receipt.find_by(id:params[:id]).as_json(:include => {:invoices => {:include=>{:maintenance_request=>{:include=>{:property=>{}}}}}}, :uploaded_invoices=>{:include=>{:maintenance_request=>{:include=>{:property=>{}}}} ,:methods => [:pdf_url]})
    respond_to do |format|
      format.json {render :json=>{receipt:@receipt}}
      format.html 
    end 
  end

  private

  def belongs_to_trady
    #get all their MR then compare it to this one does their list have this one yes then ok no then redirect
      

    receipt = Receipt.find_by(id:params[:id])
    if current_user.trady.id == receipt.trady_id
      #do nothing 
    else
      flash[:danger] = "Sorry you are not allowed to see that. Please log into your own account thank you."
      redirect_to root_path
    end
    
  end

end 