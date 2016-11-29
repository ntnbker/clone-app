class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      
      format.html { redirect_to login_path, :alert => exception.message }
    end
  end


  private
    def not_authenticated
      redirect_to login_path, alert: "Please login first"
    end


end
