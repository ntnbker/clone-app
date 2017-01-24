class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      
      format.html { redirect_to login_path, :alert => exception.message }
    end
  end

  
  private
    def not_authenticated
      flash[:danger] = "Please login first"
      redirect_to login_path
    end


end
