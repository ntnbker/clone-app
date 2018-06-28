class ContactUsController < ApplicationController
  def create
    binding.pry
  end

  private

  def contact_us_params
    params.require(:contact).permit(:name, :email, :message)
  end

end 