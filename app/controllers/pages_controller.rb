class PagesController < ApplicationController
  def home
    @main_users = MainUser.all
    @service = Service.all
  end

end 