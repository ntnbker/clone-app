Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root :to => 'users#new'
  resources :user_sessions, only:[:create]
  resources :users, only:[:create,:update]
  get 'sign_up' => 'users#new', :as =>:sign_up
  get 'login' => 'user_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout

end
