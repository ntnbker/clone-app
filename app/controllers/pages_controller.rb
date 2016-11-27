class PagesController < ApplicationController
  def home
    @main_users = MainUser.all
  end

end 